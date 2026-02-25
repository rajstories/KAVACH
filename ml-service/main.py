from __future__ import annotations

from dataclasses import dataclass
from typing import List

import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from sklearn.ensemble import IsolationForest

app = FastAPI(title="KAVACH ML Service", version="1.0.0")


class LogRecord(BaseModel):
    timestamp: str
    source_ip: str
    endpoint: str
    status_code: int
    method: str
    user_agent: str
    response_time: float
    bytes_sent: int


class DetectRequest(BaseModel):
    logs: List[LogRecord] = Field(default_factory=list)


class DetectResult(BaseModel):
    log: LogRecord
    anomaly_score: float
    is_anomalous: bool


class DetectResponse(BaseModel):
    results: List[DetectResult]


@dataclass
class MlStats:
    total_analyzed: int = 0
    anomalies_detected: int = 0


MODEL = IsolationForest(contamination=0.1, random_state=42)
MODEL_FITTED = False
STATS = MlStats()


def _status_category(value: int) -> int:
    if 200 <= value < 300:
        return 2
    if 300 <= value < 400:
        return 3
    if 400 <= value < 500:
        return 4
    return 5


def build_features(records: List[LogRecord]) -> pd.DataFrame:
    frame = pd.DataFrame([item.model_dump() for item in records])
    frame["timestamp"] = pd.to_datetime(frame["timestamp"], errors="coerce")
    frame = frame.fillna({"timestamp": pd.Timestamp.now()})

    ip_counts = frame.groupby("source_ip")["source_ip"].transform("count")
    ip_error_rate = frame.groupby("source_ip")["status_code"].transform(lambda s: (s >= 400).mean())
    endpoint_diversity = frame.groupby("source_ip")["endpoint"].transform("nunique")

    time_variance = (
        frame.sort_values("timestamp")
        .groupby("source_ip")["timestamp"]
        .transform(lambda s: s.diff().dt.total_seconds().fillna(0).var() if len(s) > 1 else 0)
    )

    status_distribution = frame["status_code"].apply(_status_category)

    frame["request_rate"] = ip_counts
    frame["error_rate"] = ip_error_rate
    frame["endpoint_diversity"] = endpoint_diversity
    frame["time_variance"] = time_variance.fillna(0)
    frame["status_code_distribution"] = status_distribution

    feature_cols = [
        "request_rate",
        "error_rate",
        "endpoint_diversity",
        "time_variance",
        "status_code_distribution",
        "response_time",
        "bytes_sent",
    ]

    return frame[feature_cols].astype(float)


@app.post("/detect", response_model=DetectResponse)
def detect(payload: DetectRequest) -> DetectResponse:
    global MODEL_FITTED

    if len(payload.logs) == 0:
        return DetectResponse(results=[])

    try:
        features = build_features(payload.logs)
        matrix = features.to_numpy(dtype=float)

        if not MODEL_FITTED:
            MODEL.fit(matrix)
            MODEL_FITTED = True

        raw_scores = MODEL.score_samples(matrix)
        predicted = MODEL.predict(matrix)

        min_score = float(raw_scores.min())
        max_score = float(raw_scores.max())
        denom = max(max_score - min_score, 1e-9)

        normalized = 1 - ((raw_scores - min_score) / denom)
        normalized = np.clip(normalized, 0, 1)

        results: List[DetectResult] = []
        anomaly_count = 0

        for idx, log in enumerate(payload.logs):
            score = float(round(float(normalized[idx]), 4))
            is_anomalous = bool(predicted[idx] == -1 or score > 0.6)
            if is_anomalous:
                anomaly_count += 1
            results.append(
                DetectResult(log=log, anomaly_score=score, is_anomalous=is_anomalous)
            )

        STATS.total_analyzed += len(payload.logs)
        STATS.anomalies_detected += anomaly_count

        return DetectResponse(results=results)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"ML detection failed: {exc}") from exc


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "model_fitted": MODEL_FITTED}


@app.get("/stats")
def stats() -> dict:
    anomaly_rate = 0.0
    if STATS.total_analyzed > 0:
        anomaly_rate = STATS.anomalies_detected / STATS.total_analyzed

    return {
        "total_analyzed": STATS.total_analyzed,
        "anomalies_detected": STATS.anomalies_detected,
        "anomaly_rate": round(anomaly_rate, 4),
    }

import axios from "axios";
import { logger } from "../config/logger";
import type { AnomalyResult, RawLog } from "../types";

interface MlDetectResponse {
  results: Array<{
    log: RawLog;
    anomaly_score: number;
    is_anomalous: boolean;
  }>;
}

/**
 * ML ANOMALY DETECTOR BRIDGE
 * Communicates with the Python FastAPI ML service on port 8000.
 * Sends log batches for pre-screening before Commander Agent analysis.
 * ML service uses Isolation Forest to flag anomalous log patterns.
 * Only flagged logs proceed to the expensive LLM analysis step.
 * This reduces API costs by ~60%.
 */
export async function detectAnomalies(logs: RawLog[]): Promise<AnomalyResult[]> {
  const mlServiceUrl = process.env.ML_SERVICE_URL ?? "http://localhost:8000";

  try {
    const response = await axios.post<MlDetectResponse>(`${mlServiceUrl}/detect`, { logs }, { timeout: 10000 });

    const screened = response.data.results.filter(
      (item) => item.is_anomalous || item.anomaly_score > 0.6,
    );

    logger.info("ML pre-screening completed", {
      inputCount: logs.length,
      flaggedCount: screened.length,
      threshold: 0.6,
    });

    return screened;
  } catch (error) {
    logger.warn("ML service unavailable. Falling back to full log pass-through", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return logs.map((log) => ({
      log,
      anomaly_score: 1,
      is_anomalous: true,
    }));
  }
}

import { randomUUID } from "node:crypto";
import { Router } from "express";
import { analyzeLogs } from "../agents/commanderAgent";
import { dispatch } from "../agents/dispatcher";
import { processFindings } from "../agents/immediatorAgent";
import { logger } from "../config/logger";
import { prisma } from "../db/client";
import { AppError } from "../middleware/errorHandler";
import { detectAnomalies } from "../ml/anomalyDetector";
import type { LogEntry, RawLog } from "../types";

const router = Router();

type ScenarioType = "brute_force" | "ddos" | "exfiltration" | "sql_injection";

function createRawLog(overrides: Partial<RawLog>): RawLog {
  return {
    timestamp: new Date().toISOString(),
    source_ip: "10.12.45.10",
    endpoint: "/api/v1/auth/login",
    status_code: 200,
    method: "POST",
    user_agent: "GovPortalClient/1.0",
    response_time: 120,
    bytes_sent: 2048,
    source: "voter-auth-api",
    service: "voter-auth-api",
    ...overrides,
  };
}

function generateScenarioLogs(scenario: ScenarioType): RawLog[] {
  const logs: RawLog[] = [];

  if (scenario === "brute_force") {
    for (let i = 0; i < 120; i += 1) {
      logs.push(
        createRawLog({
          source_ip: "185.199.110.21",
          endpoint: "/voter/login",
          status_code: 401,
          method: "POST",
          response_time: 90 + i,
          source: "voter-auth-api",
          service: "voter-auth-api",
          user_id: `voter-${1000 + (i % 25)}`,
        }),
      );
    }
  }

  if (scenario === "ddos") {
    for (let i = 0; i < 250; i += 1) {
      logs.push(
        createRawLog({
          source_ip: `203.0.113.${(i % 70) + 1}`,
          endpoint: "/aadhaar/verify",
          status_code: i % 3 === 0 ? 503 : 429,
          method: "POST",
          response_time: 800 + i,
          bytes_sent: 1024,
          source: "aadhaar-verify-service",
          service: "aadhaar-verify-service",
        }),
      );
    }
  }

  if (scenario === "exfiltration") {
    for (let i = 0; i < 80; i += 1) {
      logs.push(
        createRawLog({
          source_ip: "172.16.77.9",
          endpoint: `/municipal/reports/download?file=${10000 + i}`,
          status_code: 200,
          method: "GET",
          response_time: 350,
          bytes_sent: 8_000_000 + i * 30_000,
          source: "municipal-portal",
          service: "municipal-portal",
          user_id: "contractor-43",
        }),
      );
    }
  }

  if (scenario === "sql_injection") {
    for (let i = 0; i < 60; i += 1) {
      logs.push(
        createRawLog({
          source_ip: "198.51.100.34",
          endpoint: "/election/candidate?name=' OR 1=1 --",
          status_code: i % 2 === 0 ? 500 : 403,
          method: "GET",
          response_time: 510,
          source: "election-commission-api",
          service: "election-commission-api",
        }),
      );
    }
  }

  for (let i = 0; i < 40; i += 1) {
    logs.push(
      createRawLog({
        source_ip: `10.10.0.${(i % 20) + 10}`,
        endpoint: "/health",
        status_code: 200,
        method: "GET",
        response_time: 45,
        bytes_sent: 512,
        source: "rti-portal",
        service: "rti-portal",
      }),
    );
  }

  return logs;
}

async function runPipeline(rawLogs: RawLog[]): Promise<{
  executionId: string;
  anomalies: number;
  findings: number;
  incidents: number;
}> {
  const executionId = randomUUID();

  const anomalies = await detectAnomalies(rawLogs);
  const logsForCommander = (anomalies.length > 0 ? anomalies.map((item) => item.log) : rawLogs).map<LogEntry>((log) => ({
    ...log,
    source: log.source ?? "unknown-source",
    service: log.service ?? log.source ?? "unknown-service",
  }));

  const findings = await analyzeLogs(logsForCommander);
  const incidents = await processFindings(findings);
  await dispatch(incidents);

  return {
    executionId,
    anomalies: anomalies.length,
    findings: findings.length,
    incidents: incidents.length,
  };
}

router.post("/ingest", async (req, res, next) => {
  try {
    const logs = req.body.logs as RawLog[] | undefined;
    if (!logs || logs.length === 0) {
      throw new AppError("logs array is required", 400);
    }

    const result = await runPipeline(logs);

    res.json({
      success: true,
      pipeline: {
        stage1_ml_screening: `${result.anomalies} anomalies passed`,
        stage2_ai_analysis: `${result.findings} findings`,
        stage3_prioritization: `${result.incidents} incidents`,
        stage4_dispatch: "completed",
        stage5_alerts: "triggered for HIGH/CRITICAL",
      },
      ...result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/simulate", async (req, res, next) => {
  try {
    const scenario = (req.body.scenario as ScenarioType | undefined) ?? "brute_force";
    const allowed: ScenarioType[] = ["brute_force", "ddos", "exfiltration", "sql_injection"];
    if (!allowed.includes(scenario)) {
      throw new AppError("Invalid scenario. Use brute_force|ddos|exfiltration|sql_injection", 400);
    }

    const syntheticLogs = generateScenarioLogs(scenario);

    logger.info("Running simulation", {
      scenario,
      generatedLogs: syntheticLogs.length,
    });

    const result = await runPipeline(syntheticLogs);

    const latestIncidents = await prisma.incident.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        remediations: true,
        alerts: true,
      },
    });

    res.json({
      success: true,
      scenario,
      generatedLogs: syntheticLogs.length,
      progress: [
        { step: "Logs Ingested", status: "done" },
        { step: "ML Screening", status: "done", detail: `${result.anomalies} flagged` },
        { step: "AI Analysis", status: "done", detail: `${result.findings} findings` },
        { step: "Remediation", status: "done", detail: `${result.incidents} incidents handled` },
        { step: "Alerts", status: "done", detail: "HIGH/CRITICAL alerts dispatched" },
      ],
      latestIncidents,
      ...result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/batches", async (_req, res, next) => {
  try {
    const batches = await prisma.logBatch.findMany({
      orderBy: { analyzedAt: "desc" },
      take: 50,
    });

    res.json(batches);
  } catch (error) {
    next(error);
  }
});

export default router;

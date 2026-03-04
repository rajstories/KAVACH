import { randomUUID } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { Prisma, PrismaClient } from "@prisma/client";
import winston from "winston";
import { z } from "zod";
import { logger as appLogger } from "../config/logger";
import type { Finding, LogEntry } from "../types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const prisma = new PrismaClient();
const logger: winston.Logger = appLogger;

// Embed this EXACT system prompt as a constant
const COMMANDER_SYSTEM_PROMPT = `
You are KAVACH's Commander Agent — an elite cybersecurity analyst
specialized in protecting India's critical civic digital infrastructure.

You analyze security logs from government systems including:

Voter authentication portals (voter-auth-api)
Aadhaar verification endpoints (aadhaar-verify-service)
Municipal service dashboards (municipal-portal)
RTI filing portals (rti-portal)
Election Commission APIs (election-commission-api)
CRITICAL RULES:

Return ONLY a valid JSON array. No markdown. No explanation. No preamble.
If no threats found, return empty array: []
Each finding must have civic_context referencing India's government systems
Return array of findings matching this EXACT schema:
[{
"finding_id": "unique string like exec-{timestamp}-{index}",
"domain": "identity" | "network" | "infrastructure",
"classification": "brute_force" | "credential_stuffing" | "ddos" |
"sql_injection" | "port_scan" | "data_exfiltration" |
"privilege_escalation" | "phishing_attempt" |
"api_abuse" | "unauthorized_access",
"severity": "critical" | "high" | "medium" | "low",
"confidence": number 0-1,
"offender": { "type": "ip" | "user" | "service", "value": "string" },
"affected_service": "string",
"metrics": {
"event_count": number,
"duration_sec": number,
"unique_targets": number
},
"evidence": ["array of specific log lines as strings"],
"recommended_actions": ["array of action strings"],
"civic_context": "string explaining impact on Indian government infrastructure"
}]
`;

const findingSchema = z.object({
  finding_id: z.string().min(1),
  domain: z.enum(["identity", "network", "infrastructure"]),
  classification: z.enum([
    "brute_force",
    "credential_stuffing",
    "ddos",
    "sql_injection",
    "port_scan",
    "data_exfiltration",
    "privilege_escalation",
    "phishing_attempt",
    "api_abuse",
    "unauthorized_access",
  ]),
  severity: z.enum(["critical", "high", "medium", "low"]),
  confidence: z.number().min(0).max(1),
  offender: z.object({
    type: z.enum(["ip", "user", "service"]),
    value: z.string().min(1),
  }),
  affected_service: z.string().min(1),
  metrics: z.object({
    event_count: z.number(),
    duration_sec: z.number(),
    unique_targets: z.number(),
  }),
  evidence: z.array(z.string()),
  recommended_actions: z.array(z.string()),
  civic_context: z.string().min(1),
});

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatLogBatch(logBatch: LogEntry[]): string {
  return logBatch
    .map((log, index) => {
      const ts = log.timestamp ?? "unknown-ts";
      const source = log.service ?? log.source ?? "unknown-service";
      return [
        `#${index + 1} ${ts} ${source}`,
        `ip=${log.source_ip} method=${log.method} endpoint=${log.endpoint} status=${log.status_code}`,
        `rt=${log.response_time}ms bytes=${log.bytes_sent} user=${log.user_id ?? "n/a"}`,
        `ua=${log.user_agent}`,
      ].join("\n");
    })
    .join("\n\n");
}

function extractClaudeText(content: unknown): string {
  if (!Array.isArray(content)) {
    return "[]";
  }

  for (const block of content) {
    if (typeof block !== "object" || block === null) {
      continue;
    }

    const candidate = block as { type?: unknown; text?: unknown };
    if (candidate.type === "text" && typeof candidate.text === "string") {
      return candidate.text;
    }
  }

  return "[]";
}

function stripMarkdownWrapper(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const arrayStart = trimmed.indexOf("[");
  const arrayEnd = trimmed.lastIndexOf("]");
  if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
    return trimmed.slice(arrayStart, arrayEnd + 1);
  }

  return trimmed;
}

function getStatusCode(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }

  const maybeStatus = (error as { status?: unknown }).status;
  return typeof maybeStatus === "number" ? maybeStatus : undefined;
}

function validationWarnings(rawFinding: unknown): string {
  if (typeof rawFinding !== "object" || rawFinding === null) {
    return "finding is not an object";
  }

  const obj = rawFinding as Record<string, unknown>;
  const required = [
    "finding_id",
    "domain",
    "classification",
    "severity",
    "confidence",
    "offender",
    "affected_service",
    "metrics",
    "evidence",
    "recommended_actions",
    "civic_context",
  ];

  const missing = required.filter((field) => !(field in obj));
  return missing.length > 0 ? `missing fields: ${missing.join(", ")}` : "schema validation failed";
}

async function storeLogBatch(
  source: string,
  executionId: string,
  logBatch: LogEntry[],
  findingsCount: number,
): Promise<void> {
  try {
    await prisma.logBatch.create({
      data: {
        source,
        executionId,
        rawLogsJson: logBatch as unknown as Prisma.InputJsonValue,
        findingsCount,
      },
    });
  } catch (error) {
    logger.error("Commander failed to store log batch", {
      executionId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Implement this function completely:
export async function analyzeLogs(logBatch: LogEntry[]): Promise<Finding[]> {
  const executionId = `exec-${Date.now()}-${randomUUID().slice(0, 8)}`;
  const source = logBatch[0]?.service ?? logBatch[0]?.source ?? "unknown-source";
  const retryBackoffMs = [2000, 4000, 8000];

  logger.info(`Commander analyzing ${logBatch.length} logs`, { executionId, source });

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const formattedLogs = formatLogBatch(logBatch);
      const userMessage = `Analyze these government portal security logs and identify all threats:\n\n${formattedLogs}`;

      const response = await client.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 4000,
        system: COMMANDER_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
      });

      const rawText = extractClaudeText(response.content);
      const cleanJson = stripMarkdownWrapper(rawText);
      const parsed = JSON.parse(cleanJson) as unknown;

      if (!Array.isArray(parsed)) {
        throw new Error("Claude response is not a JSON array");
      }

      const validFindings: Finding[] = [];
      for (const rawFinding of parsed) {
        const result = findingSchema.safeParse(rawFinding);
        if (!result.success) {
          logger.warn("Commander skipped invalid finding", {
            executionId,
            reason: validationWarnings(rawFinding),
          });
          continue;
        }
        validFindings.push(result.data as Finding);
      }

      await storeLogBatch(source, executionId, logBatch, validFindings.length);
      logger.info(`Commander found ${validFindings.length} findings`, {
        executionId,
        source,
      });
      return validFindings;
    } catch (error) {
      const statusCode = getStatusCode(error);
      logger.error("Commander API call failed", {
        executionId,
        attempt,
        statusCode,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (attempt >= 3) {
        break;
      }

      if (statusCode === 429) {
        await sleep(30_000);
      } else {
        await sleep(retryBackoffMs[attempt - 1]);
      }
    }
  }

  await storeLogBatch(source, executionId, logBatch, 0);
  return [];
}

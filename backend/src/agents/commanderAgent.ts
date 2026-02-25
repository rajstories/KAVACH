import { randomUUID } from "node:crypto";
import { z } from "zod";
import { anthropic, ANTHROPIC_MODEL } from "../config/anthropic";
import { logger } from "../config/logger";
import { prisma } from "../db/client";
import type { Finding, LogEntry } from "../types";

/**
 * COMMANDER AGENT
 * The primary AI brain of KAVACH.
 * Receives raw log batches, sends to Claude API with specialized
 * government security context prompt, returns structured findings.
 */
const COMMANDER_SYSTEM_PROMPT = `
You are KAVACH's Commander Agent — an elite cybersecurity analyst 
specialized in protecting India's critical civic digital infrastructure.

You analyze security logs from government systems including:
- Voter authentication portals
- Aadhaar verification endpoints  
- Municipal service dashboards
- RTI filing portals
- Election Commission APIs

For each log batch, identify ALL security incidents and return 
ONLY a valid JSON array of findings. Each finding must follow 
this exact schema:
{
  "finding_id": "string (unique)",
  "domain": "identity|network|infrastructure",
  "classification": "brute_force|credential_stuffing|ddos|sql_injection|
                     port_scan|data_exfiltration|privilege_escalation|
                     phishing_attempt|api_abuse|unauthorized_access",
  "severity": "critical|high|medium|low",
  "confidence": number between 0 and 1,
  "offender": { "type": "ip|user|service", "value": "string" },
  "affected_service": "string",
  "metrics": {
    "event_count": number,
    "duration_sec": number,
    "unique_targets": number
  },
  "evidence": ["string array of specific log lines"],
  "recommended_actions": ["string array"],
  "civic_context": "string explaining why this matters for government infrastructure"
}

CRITICAL RULES:
1. Return ONLY the JSON array. No markdown. No explanation.
2. civic_context must reference India's government systems specifically.
3. If no threats found, return empty array [].
4. Confidence must reflect actual evidence strength.
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
    event_count: z.number().nonnegative(),
    duration_sec: z.number().nonnegative(),
    unique_targets: z.number().nonnegative(),
  }),
  evidence: z.array(z.string()),
  recommended_actions: z.array(z.string()),
  civic_context: z.string().min(1),
});

const findingsSchema = z.array(findingSchema);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractText(content: unknown): string {
  if (!Array.isArray(content)) {
    return "[]";
  }

  const textBlock = content.find((block) => {
    if (typeof block !== "object" || block === null) {
      return false;
    }

    return "type" in block && block.type === "text";
  });

  if (typeof textBlock !== "object" || textBlock === null || !("text" in textBlock)) {
    return "[]";
  }

  return typeof textBlock.text === "string" ? textBlock.text.trim() : "[]";
}

export async function analyzeLogs(logBatch: LogEntry[]): Promise<Finding[]> {
  const executionId = randomUUID();
  const source = logBatch[0]?.source ?? "unknown-source";
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      logger.info("Commander Agent analyzing log batch", {
        executionId,
        source,
        logCount: logBatch.length,
        attempt,
      });

      const userPrompt = [
        "Analyze this government cybersecurity log batch and return findings as a JSON array.",
        JSON.stringify(logBatch, null, 2),
      ].join("\n\n");

      const response = await anthropic.messages.create({
        model: ANTHROPIC_MODEL,
        max_tokens: 4096,
        system: COMMANDER_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      });

      const rawText = extractText(response.content);
      const parsed = JSON.parse(rawText) as unknown;
      const validated = findingsSchema.parse(parsed);

      await prisma.logBatch.create({
        data: {
          executionId,
          source,
          rawLogsJson: logBatch,
          findingsCount: validated.length,
        },
      });

      logger.info("Commander Agent completed analysis", {
        executionId,
        findingsCount: validated.length,
      });

      return validated;
    } catch (error) {
      logger.error("Commander Agent failed", {
        executionId,
        attempt,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (attempt === maxAttempts) {
        await prisma.logBatch.create({
          data: {
            executionId,
            source,
            rawLogsJson: logBatch,
            findingsCount: 0,
          },
        });

        throw error;
      }

      const delayMs = 500 * 2 ** (attempt - 1);
      await sleep(delayMs);
    }
  }

  return [];
}

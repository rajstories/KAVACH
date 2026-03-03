import { randomUUID } from "node:crypto";
import { Domain, IncidentStatus, PrismaClient, Severity } from "@prisma/client";
import winston from "winston";
import { logger as appLogger } from "../config/logger";
import type { Finding, PrioritizedIncident } from "../types";

const prisma = new PrismaClient();
const logger: winston.Logger = appLogger;

// Civic impact multipliers - these make KAVACH government-specific
const CIVIC_MULTIPLIERS: Record<string, number> = {
  "election-commission-api": 2.0,
  "voter-auth-api": 2.0,
  "aadhaar-verify-service": 1.8,
  "aadhaar-verify": 1.8,
  "rti-portal": 1.5,
  "municipal-portal": 1.3,
  default: 1.0,
};

const SEVERITY_WEIGHTS: Record<string, number> = {
  critical: 10,
  high: 7,
  medium: 4,
  low: 1,
};

type EnrichedIncident = PrioritizedIncident & {
  escalated: boolean;
  escalation_reason?: string;
};

function getFindingTimestamp(finding: Finding, fallbackMs: number): number {
  for (const line of finding.evidence) {
    const match = line.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z/);
    if (!match) {
      continue;
    }

    const parsed = Date.parse(match[0]);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return fallbackMs;
}

function serviceMultiplier(service: string): number {
  const normalized = service.toLowerCase();
  if (CIVIC_MULTIPLIERS[normalized] !== undefined) {
    return CIVIC_MULTIPLIERS[normalized];
  }

  if (normalized.includes("election") || normalized.includes("voter")) {
    return CIVIC_MULTIPLIERS["election-commission-api"];
  }

  if (normalized.includes("aadhaar")) {
    return CIVIC_MULTIPLIERS["aadhaar-verify-service"];
  }

  if (normalized.includes("rti")) {
    return CIVIC_MULTIPLIERS["rti-portal"];
  }

  if (normalized.includes("municipal")) {
    return CIVIC_MULTIPLIERS["municipal-portal"];
  }

  return CIVIC_MULTIPLIERS.default;
}

function toDomain(domain: string): Domain {
  const normalized = domain.toUpperCase();
  if (normalized === "IDENTITY") {
    return Domain.IDENTITY;
  }
  if (normalized === "NETWORK") {
    return Domain.NETWORK;
  }
  return Domain.INFRASTRUCTURE;
}

function toSeverity(severity: string): Severity {
  const normalized = severity.toUpperCase();
  if (normalized === "CRITICAL") {
    return Severity.CRITICAL;
  }
  if (normalized === "HIGH") {
    return Severity.HIGH;
  }
  if (normalized === "MEDIUM") {
    return Severity.MEDIUM;
  }
  return Severity.LOW;
}

function deduplicateFindings(findings: Finding[]): Finding[] {
  const sorted = [...findings]
    .map((finding, index) => ({
      finding,
      timestamp: getFindingTimestamp(finding, Date.now() + index * 1000),
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  const grouped = new Map<string, Array<{ finding: Finding; timestamp: number }>>();
  const fiveMinutesMs = 5 * 60 * 1000;

  for (const item of sorted) {
    const key = `${item.finding.offender.value}:${item.finding.classification}`;
    const existing = grouped.get(key) ?? [];
    const last = existing[existing.length - 1];

    if (!last) {
      existing.push(item);
      grouped.set(key, existing);
      continue;
    }

    if (item.timestamp - last.timestamp <= fiveMinutesMs) {
      if (item.finding.confidence > last.finding.confidence) {
        existing[existing.length - 1] = item;
      }
      grouped.set(key, existing);
      continue;
    }

    existing.push(item);
    grouped.set(key, existing);
  }

  return Array.from(grouped.values())
    .flat()
    .map((item) => item.finding);
}

export async function processFindings(findings: Finding[]): Promise<EnrichedIncident[]> {
  try {
    const executionId = `exec-${Date.now()}-${randomUUID().slice(0, 8)}`;
    const deduped = deduplicateFindings(findings);

    const enrichedFindings = deduped.map((finding) => {
      const severityScore = SEVERITY_WEIGHTS[finding.severity] ?? 1;
      const civicMultiplier = serviceMultiplier(finding.affected_service);

      let severity = finding.severity;
      let escalated = false;
      let escalationReason: string | undefined;

      if (civicMultiplier >= 2.0 && severity === "high") {
        severity = "critical";
        escalated = true;
        escalationReason = "Election infrastructure";
      }

      const finalScore = severityScore * finding.confidence * civicMultiplier;

      return {
        ...finding,
        severity,
        finalScore,
        civicMultiplier,
        escalated,
        escalation_reason: escalationReason,
      };
    });

    enrichedFindings.sort((a, b) => b.finalScore - a.finalScore);

    const incidentsWithIds: EnrichedIncident[] = [];
    let escalatedCount = 0;

    for (const finding of enrichedFindings) {
      if (finding.escalated) {
        escalatedCount += 1;
      }

      const detectedAt = new Date();
      const created = await prisma.incident.create({
        data: {
          executionId,
          domain: toDomain(finding.domain.toUpperCase()),
          severity: toSeverity(finding.severity.toUpperCase()),
          status: IncidentStatus.OPEN,
          classification: finding.classification,
          confidence: finding.confidence,
          offenderType: finding.offender.type,
          offenderValue: finding.offender.value,
          affectedService: finding.affected_service,
          evidenceJson: finding.evidence,
          recommendedActionsJson: finding.recommended_actions,
          rawFindingJson: finding,
          detectedAt,
        },
      });

      incidentsWithIds.push({
        incidentId: created.id,
        executionId,
        findingId: finding.finding_id,
        domain: finding.domain,
        classification: finding.classification,
        severity: finding.severity,
        confidence: finding.confidence,
        offender: finding.offender,
        affectedService: finding.affected_service,
        evidence: finding.evidence,
        recommendedActions: finding.recommended_actions,
        civicContext: finding.civic_context,
        civicImpactMultiplier: finding.civicMultiplier,
        finalScore: finding.finalScore,
        detectedAt: detectedAt.toISOString(),
        escalated: finding.escalated,
        escalation_reason: finding.escalation_reason,
      });
    }

    logger.info(
      `Immediator processed ${incidentsWithIds.length} findings, ${escalatedCount} escalated to CRITICAL`,
      {
        inputCount: findings.length,
        deduplicatedCount: deduped.length,
      },
    );

    return incidentsWithIds;
  } catch (error) {
    logger.error("Immediator failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

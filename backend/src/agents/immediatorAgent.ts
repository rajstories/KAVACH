import { randomUUID } from "node:crypto";
import { Domain, Severity } from "@prisma/client";
import { logger } from "../config/logger";
import { prisma } from "../db/client";
import type { Finding, PrioritizedIncident } from "../types";

/**
 * IMMEDIATOR AGENT
 * Receives raw findings from Commander Agent.
 * Normalizes, deduplicates, and prioritizes incidents.
 * Enriches with threat intelligence context.
 * Returns a structured IncidentQueue sorted by severity + confidence.
 */
const severityWeights: Record<string, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

const dedupeCache = new Map<string, number>();
const dedupeWindowMs = 5 * 60 * 1000;

function calculateCivicImpactMultiplier(service: string): number {
  const normalized = service.toLowerCase();
  if (normalized.includes("election") || normalized.includes("voter")) {
    return 2;
  }

  if (normalized.includes("aadhaar") || normalized.includes("uidai")) {
    return 1.8;
  }

  if (normalized.includes("municipal") || normalized.includes("mcd") || normalized.includes("ndmc")) {
    return 1.3;
  }

  return 1.1;
}

function toPrismaDomain(domain: Finding["domain"]): Domain {
  if (domain === "identity") {
    return Domain.IDENTITY;
  }

  if (domain === "network") {
    return Domain.NETWORK;
  }

  return Domain.INFRASTRUCTURE;
}

function toPrismaSeverity(severity: Finding["severity"]): Severity {
  if (severity === "critical") {
    return Severity.CRITICAL;
  }

  if (severity === "high") {
    return Severity.HIGH;
  }

  if (severity === "medium") {
    return Severity.MEDIUM;
  }

  return Severity.LOW;
}

export async function processFindings(findings: Finding[]): Promise<PrioritizedIncident[]> {
  try {
    const executionId = randomUUID();
    const nowMs = Date.now();
    const deduped: Finding[] = [];

    for (const finding of findings) {
      const key = `${finding.offender.value}:${finding.classification}`;
      const lastSeen = dedupeCache.get(key);

      if (lastSeen && nowMs - lastSeen < dedupeWindowMs) {
        continue;
      }

      dedupeCache.set(key, nowMs);
      deduped.push(finding);
    }

    const scored = deduped.map((finding) => {
      const civicImpactMultiplier = calculateCivicImpactMultiplier(finding.affected_service);
      const severityWeight = severityWeights[finding.severity] ?? 1;
      const finalScore = severityWeight * finding.confidence * civicImpactMultiplier;

      return {
        finding,
        civicImpactMultiplier,
        finalScore,
      };
    });

    scored.sort((a, b) => b.finalScore - a.finalScore);

    const prioritized: PrioritizedIncident[] = [];

    for (const item of scored) {
      const detectedAt = new Date();
      const incident = await prisma.incident.create({
        data: {
          executionId,
          domain: toPrismaDomain(item.finding.domain),
          severity: toPrismaSeverity(item.finding.severity),
          classification: item.finding.classification,
          confidence: item.finding.confidence,
          offenderType: item.finding.offender.type,
          offenderValue: item.finding.offender.value,
          affectedService: item.finding.affected_service,
          evidenceJson: item.finding.evidence,
          recommendedActionsJson: item.finding.recommended_actions,
          rawFindingJson: item.finding,
          detectedAt,
        },
      });

      prioritized.push({
        incidentId: incident.id,
        executionId,
        findingId: item.finding.finding_id,
        domain: item.finding.domain,
        classification: item.finding.classification,
        severity: item.finding.severity,
        confidence: item.finding.confidence,
        offender: item.finding.offender,
        affectedService: item.finding.affected_service,
        evidence: item.finding.evidence,
        recommendedActions: item.finding.recommended_actions,
        civicContext: item.finding.civic_context,
        civicImpactMultiplier: item.civicImpactMultiplier,
        finalScore: item.finalScore,
        detectedAt: detectedAt.toISOString(),
      });
    }

    logger.info("Immediator processed findings", {
      inputCount: findings.length,
      dedupedCount: deduped.length,
      prioritizedCount: prioritized.length,
    });

    return prioritized;
  } catch (error) {
    logger.error("Immediator failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    throw error;
  }
}

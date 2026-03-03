import { PrismaClient } from "@prisma/client";
import { logger } from "../../config/logger";
import type { PrioritizedIncident, RemediationResult } from "../../types";

const prisma = new PrismaClient();

type ActionResult = {
  action: string;
  target: string;
  success: true;
  timestamp: string;
  message: string;
};

function waitRandomDelay(): Promise<void> {
  const ms = 100 + Math.floor(Math.random() * 301);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateServiceIsolation(service: string): Promise<ActionResult> {
  logger.info(`INFRA AGENT: Executing isolate_service on ${service}`);
  await waitRandomDelay();
  return {
    action: "isolate_service",
    target: service,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Isolated ${service} into restricted containment network segment`,
  };
}

async function simulateForceMFA(affectedUsers: string[]): Promise<ActionResult> {
  const target = affectedUsers.length > 0 ? affectedUsers.join(",") : "all-privileged-users";
  logger.info(`INFRA AGENT: Executing force_mfa on ${target}`);
  await waitRandomDelay();
  return {
    action: "force_mfa",
    target,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Forced MFA re-enrollment for users: ${target}`,
  };
}

async function simulateTriggerBackup(service: string): Promise<ActionResult> {
  logger.info(`INFRA AGENT: Executing trigger_backup on ${service}`);
  await waitRandomDelay();
  return {
    action: "trigger_backup",
    target: service,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Started immutable emergency backup for ${service}`,
  };
}

async function simulateCreateCERTInDraft(incident: PrioritizedIncident): Promise<ActionResult> {
  logger.info(`INFRA AGENT: Executing create_cert_in_draft on ${incident.incidentId}`);
  await waitRandomDelay();
  const draft = [
    `CERT-In Draft: Incident ${incident.incidentId}`,
    `Service: ${incident.affectedService}`,
    `Classification: ${incident.classification}`,
    `Severity: ${incident.severity.toUpperCase()}`,
    `Offender: ${incident.offender.type}:${incident.offender.value}`,
    `Detected At: ${incident.detectedAt}`,
    "Immediate controls initiated by KAVACH autonomous remediation pipeline.",
  ].join("\n");

  return {
    action: "create_cert_in_draft",
    target: incident.incidentId,
    success: true,
    timestamp: new Date().toISOString(),
    message: draft,
  };
}

async function simulateEscalateToHuman(incident: PrioritizedIncident): Promise<ActionResult> {
  logger.info(`INFRA AGENT: Executing escalate_to_human on ${incident.incidentId}`);
  await waitRandomDelay();
  const ticketKey = `KAVACH-${Date.now().toString().slice(-6)}`;
  return {
    action: "escalate_to_human",
    target: ticketKey,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Created incident response ticket ${ticketKey} for human SOC commander`,
  };
}

function extractAffectedUsers(incident: PrioritizedIncident): string[] {
  const usernames = new Set<string>();

  for (const line of incident.evidence) {
    const match = line.match(/user(?:name)?=([A-Za-z0-9_.-]+)/i);
    if (match?.[1]) {
      usernames.add(match[1]);
    }
  }

  if (usernames.size === 0 && incident.offender.type === "user") {
    usernames.add(incident.offender.value);
  }

  return Array.from(usernames);
}

export async function remediateInfra(incident: PrioritizedIncident): Promise<RemediationResult & { actions: ActionResult[] }> {
  try {
    let actions: ActionResult[] = [];

    switch (incident.classification) {
      case "data_exfiltration":
        actions = await Promise.all([
          simulateServiceIsolation(incident.affectedService),
          simulateTriggerBackup(incident.affectedService),
          simulateEscalateToHuman(incident),
        ]);
        break;
      case "privilege_escalation":
        actions = await Promise.all([
          simulateForceMFA(extractAffectedUsers(incident)),
          simulateServiceIsolation(incident.affectedService),
        ]);
        break;
      case "phishing_attempt":
        actions = await Promise.all([
          simulateCreateCERTInDraft(incident),
          simulateEscalateToHuman(incident),
        ]);
        break;
      default:
        actions = [await simulateEscalateToHuman(incident)];
        break;
    }

    if (incident.severity === "critical" && !actions.some((action) => action.action === "escalate_to_human")) {
      actions.push(await simulateEscalateToHuman(incident));
    }

    const executedAt = new Date();

    await prisma.remediation.create({
      data: {
        incidentId: incident.incidentId,
        agentType: "INFRASTRUCTURE",
        actionTaken: JSON.stringify(actions),
        success: true,
        responseJson: {
          incidentId: incident.incidentId,
          actions,
        },
        executedAt,
      },
    });

    return {
      incidentId: incident.incidentId,
      agentType: "INFRA",
      actions,
      actionsTaken: actions.map((action) => action.action),
      success: true,
      response: {
        actions,
      },
      executedAt: executedAt.toISOString(),
    };
  } catch (error) {
    logger.error("Infrastructure remediation failed", {
      incidentId: incident.incidentId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

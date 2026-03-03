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

async function simulateBlockIP(ip: string): Promise<ActionResult> {
  logger.info(`AUTH AGENT: Executing block_ip on ${ip}`);
  await waitRandomDelay();
  return {
    action: "block_ip",
    target: ip,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Blocked IP ${ip} at perimeter firewall and edge gateway ACL`,
  };
}

async function simulateLockAccount(username: string): Promise<ActionResult> {
  logger.info(`AUTH AGENT: Executing lock_account on ${username}`);
  await waitRandomDelay();
  return {
    action: "lock_account",
    target: username,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Locked government user account '${username}' and forced re-verification`,
  };
}

async function simulateRevokeTokens(userId: string): Promise<ActionResult> {
  logger.info(`AUTH AGENT: Executing revoke_tokens on ${userId}`);
  await waitRandomDelay();
  return {
    action: "revoke_tokens",
    target: userId,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Revoked all active session tokens linked to ${userId}`,
  };
}

async function simulateEnableAccountLockout(service: string): Promise<ActionResult> {
  logger.info(`AUTH AGENT: Executing enable_account_lockout on ${service}`);
  await waitRandomDelay();
  return {
    action: "enable_account_lockout",
    target: service,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Enabled progressive lockout policy on ${service} after repeated failed logins`,
  };
}

async function simulateAuditLog(incident: PrioritizedIncident): Promise<ActionResult> {
  logger.info(`AUTH AGENT: Executing audit_log on ${incident.incidentId}`);
  await waitRandomDelay();
  return {
    action: "audit_log",
    target: incident.incidentId,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Created tamper-proof security audit record for incident ${incident.incidentId}`,
  };
}

function extractUsernameFromEvidence(incident: PrioritizedIncident): string {
  const patterns = [/user(?:name)?=([A-Za-z0-9_.-]+)/i, /\bfor\s+([A-Za-z0-9_.-]+)\b/i];
  for (const line of incident.evidence) {
    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match?.[1]) {
        return match[1];
      }
    }
  }

  return incident.offender.value;
}

export async function remediateAuth(incident: PrioritizedIncident): Promise<RemediationResult & { actions: ActionResult[] }> {
  try {
    let actions: ActionResult[] = [];

    switch (incident.classification) {
      case "brute_force": {
        const username = extractUsernameFromEvidence(incident);
        const parallelActions = await Promise.all([
          simulateBlockIP(incident.offender.value),
          simulateLockAccount(username),
        ]);
        const lockout = await simulateEnableAccountLockout(incident.affectedService);
        actions = [...parallelActions, lockout];
        break;
      }
      case "credential_stuffing":
        actions = await Promise.all([
          simulateBlockIP(incident.offender.value),
          simulateRevokeTokens(incident.affectedService),
        ]);
        break;
      case "unauthorized_access":
        actions = await Promise.all([
          simulateLockAccount(incident.offender.value),
          simulateAuditLog(incident),
        ]);
        break;
      default:
        actions = [await simulateAuditLog(incident)];
        break;
    }

    const executedAt = new Date();

    await prisma.remediation.create({
      data: {
        incidentId: incident.incidentId,
        agentType: "AUTH_IDENTITY",
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
      agentType: "AUTH",
      actions,
      actionsTaken: actions.map((action) => action.action),
      success: true,
      response: {
        actions,
      },
      executedAt: executedAt.toISOString(),
    };
  } catch (error) {
    logger.error("Auth remediation failed", {
      incidentId: incident.incidentId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

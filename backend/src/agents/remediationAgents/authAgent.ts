import { logger } from "../../config/logger";
import { prisma } from "../../db/client";
import type { PrioritizedIncident, RemediationResult } from "../../types";

/**
 * AUTH & IDENTITY REMEDIATION AGENT
 * Handles: brute_force, credential_stuffing, unauthorized_access
 * Actions: block_ip, lock_account, revoke_token, enable_lockout_policy
 * Simulates calling government identity management APIs
 */
function randomDelay(): Promise<void> {
  const delayMs = 100 + Math.floor(Math.random() * 400);
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function simulateBlockIP(ip: string): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated block_ip action", { ip });
  return { action: "block_ip", success: true, detail: `Firewall rule added for ${ip}` };
}

async function simulateLockAccount(identifier: string): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated lock_account action", { identifier });
  return { action: "lock_account", success: true, detail: `Account ${identifier} locked for forensic review` };
}

async function simulateRevokeTokens(identifier: string): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated revoke_token action", { identifier });
  return { action: "revoke_token", success: true, detail: `Issued tokens revoked for ${identifier}` };
}

async function simulateEnableLockoutPolicy(): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated enable_lockout_policy action");
  return {
    action: "enable_lockout_policy",
    success: true,
    detail: "Adaptive lockout policy enforced across identity service",
  };
}

async function simulateAuditLog(identifier: string): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated audit log action", { identifier });
  return { action: "audit_log", success: true, detail: `Audit trail generated for ${identifier}` };
}

export async function remediateAuth(incident: PrioritizedIncident): Promise<RemediationResult> {
  try {
    const actions: Array<{ action: string; success: boolean; detail: string }> = [];

    switch (incident.classification) {
      case "brute_force":
        actions.push(await simulateBlockIP(incident.offender.value));
        actions.push(await simulateLockAccount(incident.offender.value));
        actions.push(await simulateEnableLockoutPolicy());
        break;
      case "credential_stuffing":
        actions.push(await simulateBlockIP(incident.offender.value));
        actions.push(await simulateRevokeTokens(incident.offender.value));
        break;
      case "unauthorized_access":
        actions.push(await simulateLockAccount(incident.offender.value));
        actions.push(await simulateAuditLog(incident.offender.value));
        break;
      default:
        actions.push(await simulateAuditLog(incident.offender.value));
        break;
    }

    const success = actions.every((action) => action.success);
    const executedAt = new Date().toISOString();

    await prisma.remediation.create({
      data: {
        incidentId: incident.incidentId,
        agentType: "AUTH",
        actionTaken: actions.map((action) => action.action),
        success,
        responseJson: {
          details: actions,
          offender: incident.offender,
          classification: incident.classification,
        },
      },
    });

    return {
      incidentId: incident.incidentId,
      agentType: "AUTH",
      success,
      actionsTaken: actions.map((action) => action.action),
      response: {
        details: actions,
      },
      executedAt,
    };
  } catch (error) {
    logger.error("Auth remediation failed", {
      incidentId: incident.incidentId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

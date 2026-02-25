import { logger } from "../../config/logger";
import { prisma } from "../../db/client";
import type { PrioritizedIncident, RemediationResult } from "../../types";

/**
 * INFRASTRUCTURE REMEDIATION AGENT
 * Handles: data_exfiltration, privilege_escalation, phishing_attempt
 * Actions: isolate_service, trigger_backup, force_mfa,
 *          notify_cert_in, escalate_to_human
 * For critical severity: always escalate_to_human
 */
function randomDelay(): Promise<void> {
  const delayMs = 100 + Math.floor(Math.random() * 400);
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function simulateServiceIsolation(service: string): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated isolate_service action", { service });
  return { action: "isolate_service", success: true, detail: `Service ${service} isolated to containment segment` };
}

async function simulateBackup(service: string): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated trigger_backup action", { service });
  return { action: "trigger_backup", success: true, detail: `Immutable backup triggered for ${service}` };
}

async function simulateForceMFA(): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated force_mfa action");
  return { action: "force_mfa", success: true, detail: "Emergency MFA enforcement enabled for privileged users" };
}

async function simulateAuditAll(): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated audit_all action");
  return { action: "audit_all", success: true, detail: "Full infra audit initiated for anomalous access traces" };
}

async function simulateCertInDraft(incidentId: string): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated CERT-In draft notification", { incidentId });
  return {
    action: "notify_cert_in",
    success: true,
    detail: `CERT-In draft prepared for incident ${incidentId}`,
  };
}

async function simulateEscalateToHuman(): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated escalate_to_human action");
  return {
    action: "escalate_to_human",
    success: true,
    detail: "Escalated to on-call cyber incident commander",
  };
}

export async function remediateInfra(incident: PrioritizedIncident): Promise<RemediationResult> {
  try {
    const actions: Array<{ action: string; success: boolean; detail: string }> = [];

    switch (incident.classification) {
      case "data_exfiltration":
        actions.push(await simulateServiceIsolation(incident.affectedService));
        actions.push(await simulateBackup(incident.affectedService));
        actions.push(await simulateEscalateToHuman());
        break;
      case "privilege_escalation":
        actions.push(await simulateForceMFA());
        actions.push(await simulateAuditAll());
        break;
      case "phishing_attempt":
        actions.push(await simulateForceMFA());
        actions.push(await simulateEscalateToHuman());
        break;
      default:
        actions.push(await simulateAuditAll());
        break;
    }

    if (incident.severity === "critical") {
      actions.push(await simulateCertInDraft(incident.incidentId));
      actions.push(await simulateEscalateToHuman());
    }

    const success = actions.every((action) => action.success);
    const executedAt = new Date().toISOString();

    await prisma.remediation.create({
      data: {
        incidentId: incident.incidentId,
        agentType: "INFRA",
        actionTaken: actions.map((action) => action.action),
        success,
        responseJson: {
          details: actions,
          civicContext: incident.civicContext,
        },
      },
    });

    return {
      incidentId: incident.incidentId,
      agentType: "INFRA",
      success,
      actionsTaken: actions.map((action) => action.action),
      response: {
        details: actions,
      },
      executedAt,
    };
  } catch (error) {
    logger.error("Infrastructure remediation failed", {
      incidentId: incident.incidentId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

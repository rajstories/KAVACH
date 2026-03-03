import { IncidentStatus, PrismaClient } from "@prisma/client";
import { sendEmailAlert } from "../alerts/emailAlert";
import { sendTelegramAlert } from "../alerts/telegramAlert";
import { logger } from "../config/logger";
import type { PrioritizedIncident, RemediationResult } from "../types";
import { remediateAuth } from "./remediationAgents/authAgent";
import { remediateInfra } from "./remediationAgents/infraAgent";
import { remediateNetwork } from "./remediationAgents/networkAgent";

const prisma = new PrismaClient();

const AUTH_CLASSIFICATIONS = ["brute_force", "credential_stuffing", "unauthorized_access"];
const NETWORK_CLASSIFICATIONS = ["ddos", "api_abuse", "sql_injection", "port_scan"];
const INFRA_CLASSIFICATIONS = ["data_exfiltration", "privilege_escalation", "phishing_attempt"];

type GroupRunResult = {
  successes: RemediationResult[];
  failures: Array<{ incidentId: string; error: string }>;
};

async function runGroup(
  incidents: PrioritizedIncident[],
  handler: (incident: PrioritizedIncident) => Promise<RemediationResult>,
): Promise<GroupRunResult> {
  const settled = await Promise.allSettled(incidents.map((incident) => handler(incident)));
  const successes: RemediationResult[] = [];
  const failures: Array<{ incidentId: string; error: string }> = [];

  settled.forEach((result, index) => {
    const incidentId = incidents[index].incidentId;
    if (result.status === "fulfilled") {
      successes.push(result.value);
      return;
    }

    failures.push({
      incidentId,
      error: result.reason instanceof Error ? result.reason.message : "Unknown remediation error",
    });
  });

  return { successes, failures };
}

async function markIncidentFailure(incident: PrioritizedIncident, errorMessage: string): Promise<void> {
  await prisma.incident.update({
    where: { id: incident.incidentId },
    data: {
      status: IncidentStatus.OPEN,
      rawFindingJson: {
        ...incident,
        dispatch_error: errorMessage,
        dispatch_failed_at: new Date().toISOString(),
      },
    },
  });
}

export async function dispatch(incidents: PrioritizedIncident[]): Promise<void> {
  try {
    const authIncidents = incidents.filter((incident) => AUTH_CLASSIFICATIONS.includes(incident.classification));
    const networkIncidents = incidents.filter((incident) => NETWORK_CLASSIFICATIONS.includes(incident.classification));
    const infraIncidents = incidents.filter((incident) => INFRA_CLASSIFICATIONS.includes(incident.classification));
    const unknownIncidents = incidents.filter(
      (incident) =>
        !AUTH_CLASSIFICATIONS.includes(incident.classification) &&
        !NETWORK_CLASSIFICATIONS.includes(incident.classification) &&
        !INFRA_CLASSIFICATIONS.includes(incident.classification),
    );

    if (unknownIncidents.length > 0) {
      logger.warn("Dispatcher found incidents with unknown classification", {
        count: unknownIncidents.length,
        incidentIds: unknownIncidents.map((item) => item.incidentId),
      });
    }

    const [authSettled, networkSettled, infraSettled] = await Promise.allSettled([
      runGroup(authIncidents, remediateAuth),
      runGroup(networkIncidents, remediateNetwork),
      runGroup(infraIncidents, remediateInfra),
    ]);

    const allSuccesses: RemediationResult[] = [];
    const allFailures: Array<{ incidentId: string; error: string }> = unknownIncidents.map((incident) => ({
      incidentId: incident.incidentId,
      error: `Unknown classification: ${incident.classification}`,
    }));

    const mergeGroupResult = (
      settled: PromiseSettledResult<GroupRunResult>,
      groupIncidents: PrioritizedIncident[],
      groupName: string,
    ): void => {
      if (settled.status === "fulfilled") {
        allSuccesses.push(...settled.value.successes);
        allFailures.push(...settled.value.failures);
        return;
      }

      const groupError = settled.reason instanceof Error ? settled.reason.message : "Unknown group failure";
      logger.error("Dispatcher group execution failed", { group: groupName, error: groupError });
      groupIncidents.forEach((incident) => {
        allFailures.push({ incidentId: incident.incidentId, error: groupError });
      });
    };

    mergeGroupResult(authSettled, authIncidents, "auth");
    mergeGroupResult(networkSettled, networkIncidents, "network");
    mergeGroupResult(infraSettled, infraIncidents, "infra");

    const remediationByIncident = new Map<string, RemediationResult>();
    allSuccesses.forEach((result) => {
      remediationByIncident.set(result.incidentId, result);
    });

    const failureByIncident = new Map<string, string>();
    allFailures.forEach((failure) => {
      failureByIncident.set(failure.incidentId, failure.error);
    });

    for (const incident of incidents) {
      const remediation = remediationByIncident.get(incident.incidentId);
      if (remediation && remediation.success) {
        await prisma.incident.update({
          where: { id: incident.incidentId },
          data: { status: IncidentStatus.CONTAINED },
        });
        continue;
      }

      const errorMessage = failureByIncident.get(incident.incidentId) ?? "Remediation failed";
      await markIncidentFailure(incident, errorMessage);
    }

    const highCriticalIncidents = incidents.filter(
      (incident) => incident.severity === "high" || incident.severity === "critical",
    );

    const alertPromises = highCriticalIncidents.flatMap((incident) => {
      const remediation = remediationByIncident.get(incident.incidentId) ?? {
        incidentId: incident.incidentId,
        agentType: "INFRA",
        success: false,
        actionsTaken: ["no_successful_remediation"],
        response: { note: "No successful remediation result found" },
        executedAt: new Date().toISOString(),
      };

      const tasks: Array<Promise<void>> = [sendTelegramAlert(incident, remediation)];
      if (incident.severity === "critical") {
        tasks.push(sendEmailAlert(incident));
      }

      return tasks;
    });

    const alertResults = await Promise.allSettled(alertPromises);
    const failedAlerts = alertResults.filter((result) => result.status === "rejected").length;
    if (failedAlerts > 0) {
      logger.error("Dispatcher alert delivery failures", { failedAlerts });
    }

    logger.info(
      `Dispatcher completed: ${authIncidents.length} auth, ${networkIncidents.length} network, ${infraIncidents.length} infra incidents processed`,
      {
        remediationSuccesses: allSuccesses.length,
        remediationFailures: allFailures.length,
      },
    );
    logger.info(`Alerts sent for ${highCriticalIncidents.length} HIGH/CRITICAL incidents`, {
      failedAlerts,
    });
  } catch (error) {
    logger.error("Dispatcher failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

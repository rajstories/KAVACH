import { IncidentStatus } from "@prisma/client";
import { sendEmailAlert } from "../alerts/emailAlert";
import { sendTelegramAlert } from "../alerts/telegramAlert";
import { logger } from "../config/logger";
import { prisma } from "../db/client";
import type { PrioritizedIncident, RemediationResult } from "../types";
import { remediateAuth } from "./remediationAgents/authAgent";
import { remediateInfra } from "./remediationAgents/infraAgent";
import { remediateNetwork } from "./remediationAgents/networkAgent";

/**
 * DISPATCHER
 * Routes prioritized incidents to the correct domain remediation agent.
 * Runs domain agents in parallel for independent incidents.
 * Aggregates results and triggers alert pipeline.
 */
async function triggerAlerts(
  incidents: PrioritizedIncident[],
  remediationMap: Map<string, RemediationResult>,
): Promise<void> {
  for (const incident of incidents) {
    if (incident.severity !== "high" && incident.severity !== "critical") {
      continue;
    }

    const remediation = remediationMap.get(incident.incidentId);
    if (!remediation) {
      continue;
    }

    await Promise.allSettled([
      sendTelegramAlert(incident, remediation),
      sendEmailAlert(incident),
    ]);
  }
}

export async function dispatch(incidents: PrioritizedIncident[]): Promise<void> {
  try {
    const authIncidents = incidents.filter((incident) => incident.domain === "identity");
    const networkIncidents = incidents.filter((incident) => incident.domain === "network");
    const infraIncidents = incidents.filter((incident) => incident.domain === "infrastructure");

    const [authResults, networkResults, infraResults] = await Promise.allSettled([
      Promise.all(authIncidents.map((incident) => remediateAuth(incident))),
      Promise.all(networkIncidents.map((incident) => remediateNetwork(incident))),
      Promise.all(infraIncidents.map((incident) => remediateInfra(incident))),
    ]);

    const remediationResults: RemediationResult[] = [];

    if (authResults.status === "fulfilled") {
      remediationResults.push(...authResults.value);
    }

    if (networkResults.status === "fulfilled") {
      remediationResults.push(...networkResults.value);
    }

    if (infraResults.status === "fulfilled") {
      remediationResults.push(...infraResults.value);
    }

    const remediationMap = new Map<string, RemediationResult>();
    remediationResults.forEach((result) => {
      remediationMap.set(result.incidentId, result);
    });

    for (const incident of incidents) {
      const remediation = remediationMap.get(incident.incidentId);
      await prisma.incident.update({
        where: { id: incident.incidentId },
        data: {
          status: remediation?.success ? IncidentStatus.CONTAINED : IncidentStatus.OPEN,
        },
      });
    }

    await triggerAlerts(incidents, remediationMap);

    logger.info("Dispatcher completed", {
      totalIncidents: incidents.length,
      remediated: remediationResults.length,
    });
  } catch (error) {
    logger.error("Dispatcher failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

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

async function simulateRateLimit(ip: string, requestsPerMin: number): Promise<ActionResult> {
  logger.info(`NETWORK AGENT: Executing apply_rate_limit on ${ip}`);
  await waitRandomDelay();
  return {
    action: "apply_rate_limit",
    target: ip,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Applied ${requestsPerMin} req/min cap for source ${ip}`,
  };
}

async function simulateWAFRule(pattern: string, service: string): Promise<ActionResult> {
  logger.info(`NETWORK AGENT: Executing enable_waf_rule on ${service}`);
  await waitRandomDelay();
  return {
    action: "enable_waf_rule",
    target: service,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Deployed WAF rule for pattern '${pattern}' on ${service}`,
  };
}

async function simulateTrafficScrubbing(service: string): Promise<ActionResult> {
  logger.info(`NETWORK AGENT: Executing traffic_scrubbing on ${service}`);
  await waitRandomDelay();
  return {
    action: "traffic_scrubbing",
    target: service,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Routed ${service} traffic through anti-DDoS scrubbing center`,
  };
}

async function simulateEndpointBlock(endpoint: string): Promise<ActionResult> {
  logger.info(`NETWORK AGENT: Executing endpoint_block on ${endpoint}`);
  await waitRandomDelay();
  return {
    action: "endpoint_block",
    target: endpoint,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Temporarily blocked endpoint ${endpoint} pending forensic validation`,
  };
}

async function simulateGeoBlock(country: string): Promise<ActionResult> {
  logger.info(`NETWORK AGENT: Executing geo_block on ${country}`);
  await waitRandomDelay();
  return {
    action: "geo_block",
    target: country,
    success: true,
    timestamp: new Date().toISOString(),
    message: `Blocked suspicious traffic geolocated to ${country}`,
  };
}

function inferWAFPattern(incident: PrioritizedIncident): string {
  if (incident.classification === "sql_injection") {
    return "SQLi payload signatures";
  }

  if (incident.classification === "api_abuse") {
    return "API abuse + token replay";
  }

  return "Volumetric/abnormal network pattern";
}

export async function remediateNetwork(
  incident: PrioritizedIncident,
): Promise<RemediationResult & { actions: ActionResult[] }> {
  try {
    let actions: ActionResult[] = [];

    switch (incident.classification) {
      case "ddos":
        actions = await Promise.all([
          simulateRateLimit(incident.offender.value, 120),
          simulateTrafficScrubbing(incident.affectedService),
        ]);
        break;
      case "sql_injection":
        actions = await Promise.all([
          simulateWAFRule(inferWAFPattern(incident), incident.affectedService),
          simulateEndpointBlock(incident.affectedService),
        ]);
        break;
      case "api_abuse":
        actions = await Promise.all([
          simulateRateLimit(incident.offender.value, 90),
          simulateWAFRule(inferWAFPattern(incident), incident.affectedService),
        ]);
        break;
      case "port_scan":
        actions = await Promise.all([
          simulateGeoBlock("Unknown High-Risk Region"),
          simulateRateLimit(incident.offender.value, 30),
        ]);
        break;
      default:
        actions = [
          await simulateWAFRule("generic-protection", incident.affectedService),
        ];
        break;
    }

    const executedAt = new Date();
    await prisma.remediation.create({
      data: {
        incidentId: incident.incidentId,
        agentType: "NETWORK_DEFENSE",
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
      agentType: "NETWORK",
      actions,
      actionsTaken: actions.map((action) => action.action),
      success: true,
      response: {
        actions,
      },
      executedAt: executedAt.toISOString(),
    };
  } catch (error) {
    logger.error("Network remediation failed", {
      incidentId: incident.incidentId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

import { logger } from "../../config/logger";
import { prisma } from "../../db/client";
import type { PrioritizedIncident, RemediationResult } from "../../types";

/**
 * NETWORK & HTTP REMEDIATION AGENT
 * Handles: ddos, api_abuse, sql_injection, port_scan
 * Actions: apply_rate_limit, block_ip_range, enable_waf_rule,
 *          geo_block, traffic_scrubbing
 * Simulates calling WAF and network infrastructure APIs
 */
function randomDelay(): Promise<void> {
  const delayMs = 100 + Math.floor(Math.random() * 400);
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function simulateRateLimit(ip: string): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated apply_rate_limit action", { ip });
  return { action: "apply_rate_limit", success: true, detail: `Rate limiting enabled for traffic from ${ip}` };
}

async function simulateTrafficScrubbing(): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated traffic_scrubbing action");
  return { action: "traffic_scrubbing", success: true, detail: "Traffic rerouted through scrubbing center" };
}

async function simulateWAFRule(): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated enable_waf_rule action");
  return { action: "enable_waf_rule", success: true, detail: "Managed WAF SQLi and API abuse rules enabled" };
}

async function simulateEndpointBlock(endpoint: string): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated endpoint block action", { endpoint });
  return { action: "endpoint_block", success: true, detail: `Temporary endpoint block applied on ${endpoint}` };
}

async function simulateApiKeyRevoke(): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated api key revoke action");
  return { action: "api_key_revoke", success: true, detail: "Suspect API keys revoked and rotated" };
}

async function simulateGeoBlock(): Promise<{ action: string; success: boolean; detail: string }> {
  await randomDelay();
  logger.info("Simulated geo_block action");
  return { action: "geo_block", success: true, detail: "Temporary geo-blocking enforced for anomalous regions" };
}

export async function remediateNetwork(incident: PrioritizedIncident): Promise<RemediationResult> {
  try {
    const actions: Array<{ action: string; success: boolean; detail: string }> = [];

    switch (incident.classification) {
      case "ddos":
        actions.push(await simulateRateLimit(incident.offender.value));
        actions.push(await simulateTrafficScrubbing());
        actions.push(await simulateGeoBlock());
        break;
      case "sql_injection":
        actions.push(await simulateWAFRule());
        actions.push(await simulateEndpointBlock(incident.affectedService));
        break;
      case "api_abuse":
        actions.push(await simulateRateLimit(incident.offender.value));
        actions.push(await simulateApiKeyRevoke());
        break;
      case "port_scan":
        actions.push(await simulateWAFRule());
        actions.push(await simulateGeoBlock());
        break;
      default:
        actions.push(await simulateWAFRule());
        break;
    }

    const success = actions.every((action) => action.success);
    const executedAt = new Date().toISOString();

    await prisma.remediation.create({
      data: {
        incidentId: incident.incidentId,
        agentType: "NETWORK",
        actionTaken: actions.map((action) => action.action),
        success,
        responseJson: {
          details: actions,
          affectedService: incident.affectedService,
        },
      },
    });

    return {
      incidentId: incident.incidentId,
      agentType: "NETWORK",
      success,
      actionsTaken: actions.map((action) => action.action),
      response: {
        details: actions,
      },
      executedAt,
    };
  } catch (error) {
    logger.error("Network remediation failed", {
      incidentId: incident.incidentId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

export type IncidentSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type IncidentDomain = "IDENTITY" | "NETWORK" | "INFRASTRUCTURE";
export type IncidentStatus = "OPEN" | "CONTAINED" | "RESOLVED" | "ARCHIVED";

export interface Incident {
  id: string;
  executionId: string;
  domain: IncidentDomain;
  severity: IncidentSeverity;
  status: IncidentStatus;
  classification: string;
  confidence: number;
  offenderType: string;
  offenderValue: string;
  affectedService: string;
  evidenceJson: string[];
  recommendedActionsJson: string[];
  rawFindingJson: Record<string, unknown>;
  detectedAt: string;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Remediation {
  id: string;
  incidentId: string;
  agentType: string;
  actionTaken: string[];
  success: boolean;
  responseJson: Record<string, unknown>;
  executedAt: string;
}

export interface AlertLog {
  id: string;
  incidentId: string;
  channel: "TELEGRAM" | "EMAIL" | "SLACK";
  status: "SENT" | "FAILED";
  messagePreview: string;
  sentAt: string;
}

export interface IncidentDetail extends Incident {
  remediations: Remediation[];
  alerts: AlertLog[];
}

export interface IncidentListResponse {
  data: Incident[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IncidentStats {
  totalIncidents: number;
  criticalCount: number;
  containedToday: number;
  avgResponseTimeMinutes: number;
  bySeverity: Record<string, number>;
  byDomain: Record<string, number>;
  byStatus: Record<string, number>;
}

export interface TimelinePoint {
  hour: string;
  count: number;
  critical: number;
  high: number;
}

export interface CopilotMessage {
  role: "user" | "assistant";
  message: string;
  timestamp: string;
}

export interface CopilotResponse {
  sessionId: string;
  language: "HINDI" | "ENGLISH";
  reply: string;
  messages: CopilotMessage[];
}

export interface DailyBriefing {
  hindi: string;
  english: string;
  generatedAt: string;
}

export interface SimulationResponse {
  success: boolean;
  scenario: string;
  generatedLogs: number;
  executionId: string;
  anomalies: number;
  findings: number;
  incidents: number;
  progress: Array<{ step: string; status: string; detail?: string }>;
  latestIncidents: IncidentDetail[];
}

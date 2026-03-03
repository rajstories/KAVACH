import { useEffect, useState } from "react";
import { useSimulationMutation } from "../api/logs";
import { PipelineStatus } from "../components/PipelineStatus";
import { SeverityBadge } from "../components/SeverityBadge";

const scenarioOptions = [
  { label: "Voter Portal Brute Force", value: "brute_force" },
  { label: "Aadhaar API DDoS", value: "ddos" },
  { label: "Municipal Portal Data Exfiltration", value: "exfiltration" },
  { label: "Election Commission SQL Injection", value: "sql_injection" },
];

type StepStatus = "pending" | "running" | "done";

interface Step {
  step: string;
  status: StepStatus;
  detail?: string;
}

const baseSteps: Step[] = [
  { step: "Logs Ingested", status: "pending" },
  { step: "ML Screening", status: "pending" },
  { step: "AI Analysis", status: "pending" },
  { step: "Remediation", status: "pending" },
  { step: "Alerts", status: "pending" },
];

export default function SimulatorPage() {
  const [scenario, setScenario] = useState("brute_force");
  const [steps, setSteps] = useState<Step[]>(baseSteps);
  const mutation = useSimulationMutation();

  useEffect(() => {
    if (!mutation.isPending) {
      return;
    }

    setSteps(baseSteps);
    let current = 0;

    const timer = window.setInterval(() => {
      setSteps((prev) =>
        prev.map((item, index) => {
          if (index < current) {
            return { ...item, status: "done" as StepStatus };
          }

          if (index === current) {
            return { ...item, status: "running" as StepStatus };
          }

          return { ...item, status: "pending" as StepStatus };
        }),
      );

      current += 1;
      if (current > baseSteps.length) {
        window.clearInterval(timer);
      }
    }, 700);

    return () => {
      window.clearInterval(timer);
    };
  }, [mutation.isPending]);

  useEffect(() => {
    if (!mutation.data) {
      return;
    }

    setSteps(
      mutation.data.progress.map((item) => ({
        step: item.step,
        status: "done" as StepStatus,
        detail: item.detail,
      })),
    );
  }, [mutation.data]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-panel">
        <h2 className="text-xl font-semibold text-slate-100">Attack Simulator</h2>
        <p className="mt-1 text-sm text-slate-400">Demo page for March 28 live walkthrough.</p>

        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <select
            value={scenario}
            onChange={(event) => setScenario(event.target.value)}
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          >
            {scenarioOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            onClick={() => mutation.mutate(scenario)}
            disabled={mutation.isPending}
          >
            Launch Attack Simulation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <PipelineStatus steps={steps} />
        </div>

        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-panel xl:col-span-2">
          <h3 className="text-lg font-semibold text-slate-100">Simulation Results</h3>

          {mutation.isPending ? <p className="text-sm text-slate-400">Running simulation pipeline...</p> : null}

          {mutation.data ? (
            <>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <Metric label="Generated Logs" value={mutation.data.generatedLogs} />
                <Metric label="Anomalies" value={mutation.data.anomalies} />
                <Metric label="Findings" value={mutation.data.findings} />
                <Metric label="Incidents" value={mutation.data.incidents} />
              </div>

              <div className="space-y-3">
                {mutation.data.latestIncidents.map((incident) => (
                  <div key={incident.id} className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-mono text-xs text-slate-300">{incident.id}</p>
                      <SeverityBadge severity={incident.severity} />
                    </div>
                    <p className="text-sm text-slate-200">
                      {incident.classification} on {incident.affectedService}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Actions: {incident.remediations[0]?.actionTaken?.join(", ") ?? "In progress"}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400">Run a scenario to see detection and remediation details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-100">{value}</p>
    </div>
  );
}

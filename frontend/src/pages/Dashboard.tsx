import { useMemo } from "react";
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import { useIncidentsQuery, useIncidentStatsQuery, useIncidentTimelineQuery } from "../api/incidents";
import { IncidentFeed } from "../components/IncidentFeed";
import { ThreatHeatmap } from "../components/ThreatHeatmap";

const pieColors = ["#ef4444", "#f59e0b", "#14b8a6"];

export default function Dashboard() {
  const statsQuery = useIncidentStatsQuery();
  const timelineQuery = useIncidentTimelineQuery();
  const incidentFeedQuery = useIncidentsQuery({ page: 1, limit: 25 });

  const stateData = useMemo(() => {
    const total = statsQuery.data?.totalIncidents ?? 0;
    const critical = statsQuery.data?.criticalCount ?? 0;
    return [
      { state: "Delhi", incidents: Math.max(2, Math.round(total * 0.2)), critical: Math.max(0, Math.round(critical * 0.25)), x: 135, y: 70, w: 64, h: 44 },
      { state: "UP", incidents: Math.max(2, Math.round(total * 0.18)), critical: Math.max(0, Math.round(critical * 0.15)), x: 190, y: 78, w: 78, h: 52 },
      { state: "MH", incidents: Math.max(2, Math.round(total * 0.16)), critical: Math.max(0, Math.round(critical * 0.15)), x: 120, y: 164, w: 84, h: 60 },
      { state: "GJ", incidents: Math.max(1, Math.round(total * 0.1)), critical: Math.max(0, Math.round(critical * 0.12)), x: 70, y: 132, w: 54, h: 50 },
      { state: "KA", incidents: Math.max(1, Math.round(total * 0.09)), critical: Math.max(0, Math.round(critical * 0.1)), x: 130, y: 250, w: 66, h: 56 },
      { state: "WB", incidents: Math.max(1, Math.round(total * 0.1)), critical: Math.max(0, Math.round(critical * 0.1)), x: 248, y: 135, w: 54, h: 46 },
      { state: "TN", incidents: Math.max(1, Math.round(total * 0.08)), critical: Math.max(0, Math.round(critical * 0.08)), x: 175, y: 322, w: 64, h: 52 },
      { state: "RJ", incidents: Math.max(1, Math.round(total * 0.09)), critical: Math.max(0, Math.round(critical * 0.05)), x: 68, y: 76, w: 72, h: 60 },
    ];
  }, [statsQuery.data?.criticalCount, statsQuery.data?.totalIncidents]);

  const domainData = useMemo(
    () =>
      Object.entries(statsQuery.data?.byDomain ?? {}).map(([name, value]) => ({
        name,
        value,
      })),
    [statsQuery.data?.byDomain],
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Incidents" value={statsQuery.data?.totalIncidents ?? 0} tone="slate" />
        <StatCard title="Critical Count" value={statsQuery.data?.criticalCount ?? 0} tone="red" />
        <StatCard title="Contained Today" value={statsQuery.data?.containedToday ?? 0} tone="emerald" />
        <StatCard
          title="Avg Response Time"
          value={`${statsQuery.data?.avgResponseTimeMinutes ?? 0} min`}
          tone="amber"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <ThreatHeatmap stateData={stateData} />
        </div>
        <div className="xl:col-span-2">
          <IncidentFeed incidents={incidentFeedQuery.data?.data ?? []} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-panel">
          <h3 className="mb-4 text-lg font-semibold text-slate-100">Incidents Timeline (Last 24h)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <LineChart data={timelineQuery.data ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#020617", border: "1px solid #334155" }} />
                <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="critical" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-panel">
          <h3 className="mb-4 text-lg font-semibold text-slate-100">Domain Breakdown</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={domainData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {domainData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#020617", border: "1px solid #334155" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, tone }: { title: string; value: string | number; tone: "slate" | "red" | "emerald" | "amber" }) {
  const toneMap: Record<typeof tone, string> = {
    slate: "from-slate-900 to-slate-800 text-slate-100",
    red: "from-red-950 to-red-800 text-red-100",
    emerald: "from-emerald-950 to-emerald-800 text-emerald-100",
    amber: "from-amber-950 to-amber-800 text-amber-100",
  };

  return (
    <div className={`rounded-xl border border-slate-800 bg-gradient-to-br p-4 shadow-panel ${toneMap[tone]}`}>
      <p className="text-xs uppercase tracking-[0.15em] opacity-75">{title}</p>
      <p className="mt-3 text-2xl font-bold">{value}</p>
    </div>
  );
}

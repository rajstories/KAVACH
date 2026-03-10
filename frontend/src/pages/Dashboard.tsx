import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3,
  DatabaseZap,
  OctagonAlert,
  Settings,
  Siren,
} from "lucide-react";

const statCards = [
  {
    title: "Total Signals",
    value: "142,892",
    trend: "↑ 12%",
    note: "vs last 24h",
    accent: "border-l-sky-600",
    icon: DatabaseZap,
    iconWrap: "bg-blue-50 text-sky-700",
    trendClass: "text-green-600",
  },
  {
    title: "Critical Active",
    value: "02",
    trend: "Immediate Action Required",
    accent: "border-l-[var(--critical)]",
    icon: Siren,
    iconWrap: "bg-red-50 text-[var(--critical)]",
    trendClass: "text-[var(--critical)]",
    urgent: true,
  },
  {
    title: "Contained Today",
    value: "854",
    trend: "98.2%",
    note: "containment rate",
    accent: "border-l-emerald-700",
    icon: CheckCircle2,
    iconWrap: "bg-green-50 text-emerald-700",
    trendClass: "text-green-600",
    progress: true,
  },
  {
    title: "Pending Review",
    value: "24",
    trend: "↑ 4",
    note: "new since 08:00",
    accent: "border-l-[var(--high)]",
    icon: Clock3,
    iconWrap: "bg-orange-50 text-[var(--high)]",
    trendClass: "text-[var(--high)]",
  },
];

const bars = [
  { label: "00:00", critical: 8, high: 24, medium: 44, faded: false, muted: false },
  { label: "04:00", critical: 0, high: 18, medium: 35, faded: true, muted: true },
  { label: "06:00", critical: 12, high: 32, medium: 60, faded: false, muted: false },
  { label: "08:00", critical: 0, high: 0, medium: 20, faded: true, muted: true },
  { label: "10:00", critical: 40, high: 55, medium: 28, faded: false, muted: false },
  { label: "12:00", critical: 0, high: 64, medium: 44, faded: false, muted: false },
  { label: "16:00", critical: 16, high: 33, medium: 66, faded: false, muted: false },
];

const chartMaxValue = 150;
const chartHeight = 220;

const portalRows = [
  {
    service: "Aadhaar Services",
    status: "NORMAL",
    statusClass: "bg-green-50 text-green-700 border-green-100",
    dotClass: "bg-green-500",
    traffic: "1.2M req/s",
    latency: "42ms",
    latencyClass: "text-green-600",
    activity: ["h-[60%]", "h-[40%]", "h-[80%]", "h-[50%]"],
    activityColor: "bg-green-300",
    rowClass: "",
  },
  {
    service: "UPI Gateway",
    status: "RISK",
    statusClass: "bg-orange-100 text-[var(--high)] border-orange-200",
    dotClass: "bg-[var(--high)]",
    traffic: "8.4M req/s",
    latency: "128ms",
    latencyClass: "text-[var(--high)]",
    activity: ["h-[100%]", "h-[90%]", "h-[95%]", "h-[100%]"],
    activityColor: "bg-orange-400",
    rowClass: "bg-orange-50/30",
  },
  {
    service: "DigiLocker",
    status: "ATTACK",
    statusClass: "bg-red-100 text-[var(--critical)] border-red-200",
    dotClass: "bg-[var(--critical)]",
    traffic: "320k req/s",
    latency: "540ms",
    latencyClass: "text-[var(--critical)]",
    activity: ["h-[100%]", "h-[100%]", "h-[100%]", "h-[100%]"],
    activityColor: "bg-red-500",
    rowClass: "bg-red-50/40",
  },
];

const feedItems = [
  {
    title: "Unauthorized Access Attempt",
    severity: "CRITICAL",
    description:
      "Multiple failed login attempts detected on Aadhaar Auth API (IP: 103.4.XX.XX)",
    time: "2m ago",
    id: "#INC-2849",
    action: "TRIAGE",
    cardClass: "bg-red-50 border-[var(--critical)]",
    severityClass: "bg-white text-[var(--critical)] border-red-200",
    liveDot: "bg-[var(--critical)]",
  },
  {
    title: "DDoS Signature Detected",
    severity: "HIGH",
    description: "Anomalous UDP flood pattern targeting UPI regional nodes.",
    time: "14m ago",
    id: "#INC-2848",
    action: "VIEW",
    cardClass: "bg-orange-50 border-[var(--high)]",
    severityClass: "bg-white text-[var(--high)] border-orange-200",
    liveDot: "bg-[var(--high)]",
  },
  {
    title: "Credential Stuffing",
    severity: "MEDIUM",
    description: "Unusual login frequency observed for DigiLocker web portal.",
    time: "45m ago",
    id: "#INC-2845",
    action: "DETAILS",
    cardClass: "bg-white border-[var(--medium)]",
    severityClass: "bg-slate-100 text-slate-600 border-slate-200",
    liveDot: "bg-[var(--medium)]",
  },
];

const domains = [
  { label: "Identity", value: "55%", detail: "Auth & Session", color: "bg-[var(--gov-navy)]" },
  { label: "Network", value: "30%", detail: "Traffic & Protocol", color: "bg-[var(--high)]" },
  { label: "Infrastructure", value: "15%", detail: "Host & Cloud", color: "bg-emerald-700" },
];

export default function Dashboard() {
  return (
    <div className="min-h-full space-y-6 p-8">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`rounded-[12px] border border-slate-200 border-l-4 ${card.accent} bg-white p-5 shadow-sm`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {card.title}
                  </p>
                  <h3
                    className={`text-2xl font-bold tracking-tight text-slate-800 ${
                      card.urgent ? "animate-pulse text-[var(--critical)]" : ""
                    }`}
                  >
                    {card.value}
                  </h3>
                </div>

                {card.progress ? (
                  <div className="relative h-12 w-12">
                    <svg className="h-full w-full -rotate-90">
                      <circle
                        className="text-slate-100"
                        cx="24"
                        cy="24"
                        r="20"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <circle
                        className="text-emerald-700"
                        cx="24"
                        cy="24"
                        r="20"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="125"
                        strokeDashoffset="30"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  </div>
                ) : (
                  <div className={`rounded-full p-3 ${card.iconWrap}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs">
                {card.urgent ? <AlertTriangle className="h-3.5 w-3.5 text-[var(--critical)]" /> : null}
                <span className={`font-bold ${card.trendClass}`}>{card.trend}</span>
                {card.note ? <span className="text-slate-400">{card.note}</span> : null}
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-8">
          <div className="rounded-[12px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Incidents — Last 24 Hours</h3>
                <p className="text-xs text-slate-500">
                  Hourly aggregation categorized by severity level
                </p>
              </div>
              <div className="flex rounded-lg bg-slate-100 p-1">
                <button className="rounded-md bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-sm">
                  All
                </button>
                <button className="px-4 py-2 text-xs font-medium text-slate-500">Critical</button>
                <button className="px-4 py-2 text-xs font-medium text-slate-500">High</button>
              </div>
            </div>

            <div className="relative h-72 w-full overflow-x-auto px-4 scrollbar-thin">
              <div className="pointer-events-none absolute left-0 top-0 flex h-[calc(100%-2.5rem)] -translate-x-full flex-col justify-between pr-4 text-[10px] font-bold text-slate-400">
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>

              <div className="pointer-events-none absolute right-[16%] top-0 bottom-10 w-px bg-red-400/50">
                <span className="absolute -top-5 -left-4 text-[10px] font-bold text-red-500">NOW</span>
              </div>

              <div className="flex h-[calc(100%-2.5rem)] items-end justify-between gap-10">
                {bars.map((bar) => {
                  const total = bar.critical + bar.high + bar.medium;
                  const totalHeight = Math.max((total / chartMaxValue) * chartHeight, 36);
                  const criticalHeight = total ? (bar.critical / total) * totalHeight : 0;
                  const highHeight = total ? (bar.high / total) * totalHeight : 0;
                  const mediumHeight = total ? (bar.medium / total) * totalHeight : 0;

                  return (
                    <div
                      key={bar.label}
                      className={`relative flex min-w-[82px] flex-1 items-end justify-center ${
                        bar.faded ? "opacity-65" : ""
                      }`}
                    >
                      <div
                        className="absolute bottom-0 flex w-14 flex-col justify-end gap-0.5"
                        style={{ height: `${totalHeight}px` }}
                      >
                        {bar.muted ? (
                          <>
                            <div
                              className="w-full rounded-t-sm bg-[#eda76f]"
                              style={{ height: `${highHeight}px` }}
                            />
                            <div
                              className="w-full bg-[#74a2cb]"
                              style={{ height: `${mediumHeight}px` }}
                            />
                          </>
                        ) : (
                          <>
                            <div
                              className="w-full rounded-t-sm bg-[var(--critical)]"
                              style={{ height: `${criticalHeight}px` }}
                            />
                            <div
                              className="w-full bg-[var(--high)]"
                              style={{ height: `${highHeight}px` }}
                            />
                            <div
                              className="w-full bg-sky-700"
                              style={{ height: `${mediumHeight}px` }}
                            />
                          </>
                        )}
                      </div>

                      {(bar.label === "04:00" ||
                        bar.label === "08:00" ||
                        bar.label === "12:00" ||
                        bar.label === "16:00") && (
                        <span className="absolute -bottom-7 text-[10px] font-bold text-slate-400">
                          {bar.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h3 className="text-base font-bold text-slate-800">Protected Portals Status</h3>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Real-time Telemetry
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Traffic</th>
                    <th className="px-6 py-4">Latency</th>
                    <th className="px-6 py-4 text-right">Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {portalRows.map((row) => (
                    <tr key={row.service} className={`hover:bg-slate-50 ${row.rowClass}`}>
                      <td className="px-6 py-5 font-bold text-slate-700">{row.service}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)] ${row.dotClass}`} />
                          <span className={`rounded border px-3 py-1 text-[10px] font-bold ${row.statusClass}`}>
                            {row.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-medium text-slate-500">{row.traffic}</td>
                      <td className={`px-6 py-5 font-mono font-bold ${row.latencyClass}`}>{row.latency}</td>
                      <td className="px-6 py-5 text-right">
                        <div className="inline-flex h-5 items-end gap-0.5">
                          {row.activity.map((barClass, index) => (
                            <div key={`${row.service}-${index}`} className={`w-1 ${row.activityColor} ${barClass}`} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-span-12 space-y-6 xl:col-span-4">
          <div className="flex h-[500px] flex-col rounded-[12px] border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--high)]" />
                Live Incident Feed
              </h3>
              <button className="text-slate-400 transition hover:text-slate-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {feedItems.map((item) => (
                <div key={item.id} className={`border-b border-slate-100 border-l-4 p-4 ${item.cardClass}`}>
                  <div className="mb-1 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${item.liveDot} ${item.severity === "CRITICAL" ? "animate-pulse" : ""}`} />
                      <h4
                        className={`text-sm font-bold ${
                          item.severity === "CRITICAL" ? "text-[var(--critical)]" : "text-slate-800"
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>
                    <span className={`rounded border px-2 py-1 text-[9px] font-bold ${item.severityClass}`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="mb-2 text-[11px] text-slate-600">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">
                      {item.time} • {item.id}
                    </span>
                    <button className="text-[10px] font-bold text-[var(--gov-navy)] underline">
                      {item.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 bg-slate-50 p-4 text-center">
              <button className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gov-navy)]">
                Expand Full Feed
              </button>
            </div>
          </div>

          <div className="rounded-[12px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-base font-bold text-slate-800">Threat Domain Breakdown</h3>
            <div className="flex items-center gap-8">
              <div className="relative h-32 w-32 flex-shrink-0">
                <svg className="h-full w-full -rotate-90">
                  <circle cx="64" cy="64" r="50" fill="transparent" stroke="var(--gov-navy)" strokeWidth="14" strokeDasharray="314" strokeDashoffset="141" />
                  <circle cx="64" cy="64" r="50" fill="transparent" stroke="var(--high)" strokeWidth="14" strokeDasharray="314" strokeDashoffset="235" />
                  <circle cx="64" cy="64" r="50" fill="transparent" stroke="#2e7d32" strokeWidth="14" strokeDasharray="314" strokeDashoffset="282" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-800">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Scoped
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                {domains.map((domain) => (
                  <div key={domain.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-sm ${domain.color}`} />
                        <span className="text-xs font-bold text-slate-700">{domain.label}</span>
                      </div>
                      <span className="text-xs font-bold">{domain.value}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{domain.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import {
  Activity,
  Bot,
  CheckCircle2,
  Database,
  Mail,
  RefreshCw,
  Send,
  Settings,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const serviceCards = [
  {
    name: "Commander Agent",
    sublabel: "Claude API v2.1",
    status: "Healthy",
    statusClass: "bg-green-50 text-green-700 border-green-200",
    topBar: "bg-emerald-700",
    icon: Bot,
    iconClass: "bg-indigo-50 text-[var(--gov-navy)] border-indigo-100",
    metrics: [
      { label: "Avg Response", value: "1.2s", valueClass: "text-slate-800" },
      { label: "Success Rate", value: "99.8%", valueClass: "text-emerald-700" },
    ],
    uptime: true,
  },
  {
    name: "ML Anomaly Detector",
    sublabel: "v4.5.2 (Ensemble)",
    status: "Running",
    statusClass: "bg-green-50 text-green-700 border-green-200",
    topBar: "bg-emerald-700",
    icon: Activity,
    iconClass: "bg-purple-50 text-purple-700 border-purple-100",
    metrics: [
      { label: "Throughput", value: "847", suffix: "logs/sec", valueClass: "text-slate-800" },
      { label: "Accuracy", value: "94.7%", valueClass: "text-slate-800" },
    ],
    footer: "Processing real-time stream",
  },
  {
    name: "Primary Database",
    sublabel: "PostgreSQL 15",
    status: "Load High",
    statusClass: "bg-amber-50 text-amber-700 border-amber-200",
    topBar: "bg-[var(--high)]",
    icon: Database,
    iconClass: "bg-blue-50 text-blue-700 border-blue-100",
    storage: "82% (1.4TB / 1.8TB)",
    storageWidth: "82%",
    stats: [
      { label: "Connections", value: "4,201" },
      { label: "Cache Hit", value: "92%" },
      { label: "Replication", value: "Sync", valueClass: "text-emerald-700" },
    ],
  },
  {
    name: "Alert Bot",
    sublabel: "Telegram API",
    status: "Active",
    statusClass: "bg-green-50 text-green-700 border-green-200",
    topBar: "bg-emerald-700",
    icon: Send,
    iconClass: "bg-sky-50 text-sky-700 border-sky-100",
    metrics: [
      { label: "Alerts Sent (24h)", value: "142", valueClass: "text-slate-800 text-5xl" },
      { label: "Latency", value: "0.4s", valueClass: "text-slate-700 text-3xl text-right" },
    ],
  },
  {
    name: "Email Service",
    sublabel: "CERT-In SMTP",
    status: "Active",
    statusClass: "bg-green-50 text-green-700 border-green-200",
    topBar: "bg-emerald-700",
    icon: Mail,
    iconClass: "bg-orange-50 text-orange-700 border-orange-100",
    metrics: [
      { label: "Queue Size", value: "0", valueClass: "text-slate-800 text-5xl" },
      { label: "Delivery Rate", value: "100%", valueClass: "text-slate-700 text-3xl text-right" },
    ],
  },
  {
    name: "API Gateway",
    sublabel: "Kong Gateway",
    status: "Healthy",
    statusClass: "bg-green-50 text-green-700 border-green-200",
    topBar: "bg-emerald-700",
    icon: Workflow,
    iconClass: "bg-slate-100 text-slate-700 border-slate-200",
    metrics: [
      { label: "Traffic", value: "234", suffix: "req/min", valueClass: "text-slate-800" },
      { label: "Error Rate", value: "0.02%", valueClass: "text-emerald-700" },
    ],
  },
];

const portals = [
  { name: "NIC eOffice", meta: "14ms • 2s ago", status: "bg-green-500", health: "98", ring: "border-green-500 text-green-700" },
  { name: "Ministry of Finance", meta: "23ms • 5s ago", status: "bg-green-500", health: "95", ring: "border-green-500 text-green-700" },
  { name: "UIDAI Portal", meta: "145ms • 1s ago", status: "bg-amber-500", health: "72", ring: "border-amber-500 text-amber-700" },
  { name: "DigiLocker", meta: "18ms • 12s ago", status: "bg-green-500", health: "99", ring: "border-green-500 text-green-700" },
  { name: "GST Network", meta: "-- • Connection lost", status: "bg-red-500", health: "12", ring: "border-red-500 text-red-700" },
];

export default function SystemHealth() {
  return (
    <div className="min-h-full space-y-6 p-8">
      <section className="space-y-6 rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <nav className="mb-2 flex items-center text-xs font-medium text-slate-400">
              <span className="hover:text-[var(--gov-navy)]">Home</span>
              <span className="mx-2">/</span>
              <span className="text-slate-600">System Status</span>
            </nav>
            <h1 className="text-2xl font-bold text-[var(--gov-navy)]">
              System Health &amp; Performance
            </h1>
            <p className="mt-0.5 max-w-3xl text-sm text-slate-500">
              Real-time monitoring of KAVACH SOC infrastructure and services.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
              <span className="text-sm font-semibold text-slate-600">Auto-refresh</span>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-emerald-700">
                <span className="absolute right-1 inline-block h-5 w-5 rounded-full bg-white shadow-sm" />
              </button>
              <span className="text-xs font-bold uppercase text-emerald-700">On</span>
            </div>
            <button className="rounded-xl border border-slate-200 bg-white p-3 text-slate-400 shadow-sm transition hover:text-[var(--gov-navy)]">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-[22px] border-l-4 border-l-emerald-700 bg-[#e8f5e9] p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-emerald-800">All Systems Operational</h3>
            <p className="mt-1 text-sm text-green-900">
              Core infrastructure is running optimally. No critical incidents reported in the last 24h.
            </p>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-green-700">
            Last Checked
          </p>
          <p className="mt-1 font-mono text-sm font-semibold text-green-900">
            24 Oct 2023, 14:42:15 IST
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {serviceCards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.name} className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
              <div className={`h-1 ${card.topBar}`} />
              <div className="p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-2xl border p-3 ${card.iconClass}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{card.name}</h4>
                      <span className="font-mono text-[10px] text-slate-500">{card.sublabel}</span>
                    </div>
                  </div>
                  <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${card.statusClass}`}>
                    {card.status}
                  </span>
                </div>

                {card.metrics ? (
                  <div className="grid grid-cols-2 gap-6">
                    {card.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                          {metric.label}
                        </p>
                        <p className={`mt-2 font-mono text-2xl font-bold ${metric.valueClass ?? "text-slate-800"}`}>
                          {metric.value}
                          {"suffix" in metric && metric.suffix ? (
                            <span className="ml-2 text-xs font-normal text-slate-500">{metric.suffix}</span>
                          ) : null}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {card.uptime ? (
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                      <span>90-day Uptime</span>
                      <span>99.99%</span>
                    </div>
                    <div className="flex h-8 gap-1">
                      {Array.from({ length: 12 }).map((_, index) => (
                        <div
                          key={index}
                          className={`flex-1 rounded-sm ${index === 8 ? "max-w-[6px] bg-red-400" : "bg-green-500"}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                {card.footer ? (
                  <div className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
                      {card.footer}
                    </span>
                  </div>
                ) : null}

                {card.storage ? (
                  <div className="space-y-5">
                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-semibold text-slate-700">Storage Usage</span>
                        <span className="font-mono text-slate-500">{card.storage}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-amber-500" style={{ width: card.storageWidth }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                      {card.stats?.map((stat) => (
                        <div key={stat.label} className="text-center">
                          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">{stat.label}</p>
                          <p className={`mt-1 font-mono text-sm font-bold ${stat.valueClass ?? "text-slate-800"}`}>
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <h3 className="flex items-center gap-3 text-lg font-bold text-[var(--gov-navy)]">
              <RefreshCw className="h-6 w-6" />
              Pipeline Latency (End-to-End)
            </h3>
            <div className="flex flex-wrap gap-5 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-slate-400" />
                <span className="text-slate-600">Rule Filter</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-purple-500" />
                <span className="text-slate-600">ML Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-indigo-600" />
                <span className="text-slate-600">Commander AI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 border-y-0 border-x border-dashed border-[var(--gov-navy)] bg-[var(--gov-navy)]" />
                <span className="font-bold text-[var(--gov-navy)]">Total</span>
              </div>
            </div>
          </div>

          <div className="relative h-[360px] border-b border-l border-slate-200 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:50px_50px]">
            <div className="absolute -left-10 top-0 text-[11px] text-slate-400">3m</div>
            <div className="absolute -left-10 top-1/4 text-[11px] text-slate-400">2.2m</div>
            <div className="absolute -left-10 top-1/2 text-[11px] text-slate-400">1.5m</div>
            <div className="absolute -left-10 top-3/4 text-[11px] text-slate-400">45s</div>
            <div className="absolute -left-10 bottom-0 text-[11px] text-slate-400">0</div>

            <div className="absolute left-0 right-0 top-[30%] border-t border-dashed border-green-500/70">
              <span className="ml-3 -translate-y-1/2 inline-block bg-white px-2 text-[11px] text-green-600">
                Target &lt; 2min SLA
              </span>
            </div>

            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 800 360">
              <path d="M0 320 L110 314 L220 318 L330 322 L440 310 L550 315 L660 319 L800 320" fill="none" stroke="#94a3b8" strokeWidth="3" />
              <path d="M0 255 L110 240 L220 248 L330 220 L440 230 L550 240 L660 220 L800 248" fill="none" stroke="#a855f7" strokeWidth="3" />
              <path d="M0 190 L110 176 L220 205 L330 164 L440 182 L550 196 L660 176 L800 190" fill="none" stroke="#4f46e5" strokeWidth="3" />
              <path d="M0 135 L110 120 L220 145 L330 95 L440 127 L550 138 L660 120 L800 135" fill="none" stroke="#1a237e" strokeDasharray="8,8" strokeWidth="4" />
            </svg>

            <div className="absolute -bottom-7 left-0 text-[11px] text-slate-400">00:00</div>
            <div className="absolute -bottom-7 left-1/4 text-[11px] text-slate-400">06:00</div>
            <div className="absolute -bottom-7 left-1/2 text-[11px] text-slate-400">12:00</div>
            <div className="absolute -bottom-7 left-3/4 text-[11px] text-slate-400">18:00</div>
            <div className="absolute -bottom-7 right-0 text-[11px] text-slate-400">Now</div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
            <h3 className="text-sm font-bold text-[var(--gov-navy)]">Monitored Portals</h3>
            <button className="text-sm font-semibold text-[var(--gov-navy)] hover:underline">
              View All
            </button>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Portal</th>
                <th className="px-5 py-3 text-center font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {portals.map((portal) => (
                <tr key={portal.name} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-xs font-bold text-slate-800">{portal.name}</p>
                    <p className="mt-1 text-[10px] text-slate-400">{portal.meta}</p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-block h-3 w-3 rounded-full ${portal.status}`} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold ${portal.ring}`}>
                      {portal.health}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

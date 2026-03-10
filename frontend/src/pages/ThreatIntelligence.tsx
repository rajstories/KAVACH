import {
  Brain,
  CalendarDays,
  Check,
  Download,
  Grid3x3,
  Play,
  ShieldAlert,
  TrendingUp,
  TriangleAlert,
  Zap,
  Clock3,
} from "lucide-react";

const actorChips = ["203.0.113.50", "198.51.100.2", "192.0.2.14", "+20 more"];

const topActors = [
  { rank: "#1", ip: "103.24.11.05", attacks: "1,240", score: "98 / 100", highlight: true },
  { rank: "#2", ip: "45.89.22.10", attacks: "985", score: "92 / 100" },
  { rank: "#3", ip: "172.16.55.90", attacks: "754", score: "85 / 100", warm: true },
  { rank: "#4", ip: "192.168.1.15", attacks: "620", score: "78 / 100", warm: true },
  { rank: "#5", ip: "88.22.10.45", attacks: "410", score: "72 / 100", warm: true },
];

const calendarItems = [
  {
    title: "New Financial Year",
    subtitle: "April 1st • Tax portal traffic spike",
    badge: "HIGH RISK",
    badgeClass: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    title: "State Assembly Election",
    subtitle: "May 12th • Misinformation campaigns",
    badge: "CRITICAL",
    badgeClass: "bg-red-100 text-red-800 border-red-200",
  },
];

const aiActions = [
  {
    title: "Block Subnet Range",
    subtitle: "Consistent malicious traffic from 203.0.113.0/24",
    accent: "border-l-[var(--critical)]",
  },
  {
    title: "Enable WAF Rule #402",
    subtitle: "Mitigate SQLi pattern detected on Gateway",
    accent: "border-l-[var(--high)]",
  },
  {
    title: "Patch Server Cluster B",
    subtitle: "New CVE-2024-9902 vulnerability found",
    accent: "border-l-sky-700",
  },
];

const heatmapRows = [
  { label: "Mon", values: [1, 1, 0, 0, 0, 1, 2, 2, 4, 4, 3, 2, 1, 0, 0, 1, 2, 4, 4, 3, 2, 1, 0, 0] },
  { label: "Wed", values: [0, 1, 1, 2, 3, 4, 4, 2, 1, 0, 0, 1, 2, 3, 4, 2, 1, 0, 1, 2, 3, 4, 2, 1] },
  { label: "Fri", values: [1, 2, 4, 4, 3, 1, 1, 0, 0, 1, 1, 2, 3, 4, 4, 2, 1, 0, 0, 1, 1, 3, 4, 2] },
  { label: "Sun", values: [4, 3, 2, 1, 0, 1, 1, 2, 4, 4, 3, 2, 1, 0, 0, 1, 1, 2, 4, 3, 2, 1, 0, 0] },
];

const heatmapColor = (value: number) => {
  if (value >= 4) return "bg-[var(--gov-navy)]";
  if (value === 3) return "bg-blue-600";
  if (value === 2) return "bg-blue-400";
  if (value === 1) return "bg-blue-200";
  return "bg-slate-100";
};

export default function ThreatIntelligence() {
  return (
    <div className="min-h-full space-y-6 p-8">
      <section className="space-y-6 rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <nav className="mb-2 flex items-center text-xs font-medium text-slate-400">
              <span className="hover:text-[var(--gov-navy)]">Home</span>
              <span className="mx-2">/</span>
              <span className="text-slate-600">Threat Intelligence</span>
            </nav>
            <h1 className="text-2xl font-bold text-[var(--gov-navy)]">
              Threat Intelligence
            </h1>
            <p className="mt-0.5 max-w-3xl text-sm text-slate-500">
              Predictive analysis and active threat monitoring for national infrastructure.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--gov-navy)] bg-white px-5 py-3 text-sm font-bold text-[var(--gov-navy)] shadow-sm transition hover:bg-slate-50">
              <Download className="h-4 w-4" />
              Export Intel
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gov-navy)] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[var(--gov-navy-dark)]">
              <Play className="h-4 w-4" />
              Run Analysis
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="flex flex-col justify-between rounded-[20px] border border-slate-200 border-l-4 border-l-[var(--critical)] bg-white p-6 shadow-sm">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  Active Threat Actors
                </p>
                <TriangleAlert className="h-5 w-5 text-[var(--critical)]" />
              </div>
              <p className="text-3xl font-bold tracking-tight text-slate-950">23</p>
              <p className="mt-2 text-sm text-slate-500">
                High confidence signatures detected
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {actorChips.map((chip, index) => (
                <span
                  key={chip}
                  className={`rounded-md border px-2 py-1 font-mono text-[11px] ${
                    index < 3
                      ? "border-red-100 bg-red-50 text-red-800"
                      : "border-slate-100 bg-slate-50 text-slate-500"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[20px] border border-slate-200 border-l-4 border-l-[var(--high)] bg-white p-6 shadow-sm">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  Top Attack Vector
                </p>
                <Zap className="h-5 w-5 text-[var(--high)]" />
              </div>
              <p className="text-2xl font-bold text-slate-950">Brute Force</p>
              <p className="mt-0.5 text-sm font-semibold text-[var(--high)]">47% of incidents</p>
            </div>

            <div className="mt-6 space-y-3 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="w-10">SSH</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[75%] bg-[var(--high)]" />
                </div>
                <span>75%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10">RDP</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[25%] bg-slate-400" />
                </div>
                <span>25%</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[20px] border border-[var(--gov-navy)] border-l-4 border-l-white bg-[var(--gov-navy-dark)] p-6 shadow-sm">
            <div className="pointer-events-none absolute right-4 top-4 text-[150px] font-bold leading-none text-white/10">
              %
            </div>
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/65">
                Threat Forecast
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">
                Election Season Risk:
                <span className="block text-red-400">HIGH</span>
              </h3>
              <div className="mt-5 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs leading-6 text-white/90">
                  Predicted <span className="font-bold text-yellow-300">2.4x volume increase</span> in
                  DDoS attempts against electoral infrastructure over the next 14 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="flex items-center gap-3 text-lg font-bold text-[var(--gov-navy)]">
                <Grid3x3 className="h-6 w-6" />
                Attack Frequency Heatmap
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Less</span>
                <span className="h-4 w-4 rounded bg-slate-100" />
                <span className="h-4 w-4 rounded bg-blue-200" />
                <span className="h-4 w-4 rounded bg-blue-400" />
                <span className="h-4 w-4 rounded bg-[var(--gov-navy)]" />
                <span className="text-slate-400">More</span>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex h-32 flex-col justify-between py-1 pr-2 text-[10px] text-slate-400">
                {heatmapRows.map((row) => (
                  <span key={row.label}>{row.label}</span>
                ))}
              </div>

              <div className="flex-1">
                <div
                  className="grid h-32 gap-1"
                  style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}
                >
                  {heatmapRows.flatMap((row) =>
                    row.values.map((value, index) => (
                      <div
                        key={`${row.label}-${index}`}
                        className={`rounded-sm transition hover:scale-110 hover:border hover:border-white hover:z-10 ${heatmapColor(
                          value,
                        )}`}
                      />
                    )),
                  )}
                </div>

                <div className="mt-3 flex justify-between px-1 text-[11px] text-slate-400">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-[18px] bg-[var(--gov-navy-dark)] p-4 text-white shadow-md md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-400 p-2 text-[var(--gov-navy-dark)]">
                  <Clock3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">
                    Peak Attack Window
                  </p>
                  <p className="text-sm font-semibold">
                    Wednesday &amp; Friday, 14:00 - 18:00 IST
                  </p>
                </div>
              </div>
              <button className="rounded-lg border border-white/30 px-4 py-2 text-sm hover:bg-white/10">
                Schedule Maintenance
              </button>
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-5 flex items-center gap-3 text-lg font-bold text-[var(--gov-navy)]">
              <TrendingUp className="h-6 w-6" />
              Attack Classification Trend (7 Days)
            </h3>

            <div className="relative h-72 w-full">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 200">
                <line x1="0" y1="150" x2="400" y2="150" stroke="#dbe4ef" strokeWidth="1" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#dbe4ef" strokeWidth="1" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#dbe4ef" strokeWidth="1" />
                <path
                  d="M0,145 C60,130 95,95 140,90 S245,115 285,65 S350,30 400,40"
                  fill="none"
                  stroke="var(--high)"
                  strokeWidth="3"
                />
                <path
                  d="M0,170 C55,158 120,145 170,130 S255,85 305,105 S355,125 400,88"
                  fill="none"
                  stroke="var(--critical)"
                  strokeWidth="3"
                />
                <path
                  d="M0,182 C55,181 110,170 160,175 S255,158 300,161 S350,145 400,152"
                  fill="none"
                  stroke="#0277bd"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-[var(--high)]" />
                <span className="text-sm font-medium text-slate-700">Brute Force</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-[var(--critical)]" />
                <span className="text-sm font-medium text-slate-700">DDoS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-sky-700" />
                <span className="text-sm font-medium text-slate-700">Malware</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-[var(--gov-navy)] px-5 py-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                Top Threat Actors
              </h3>
              <button className="text-xs text-white/70 underline hover:text-white">View All</button>
            </div>

            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs font-bold text-slate-500">
                <tr>
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Source IP</th>
                  <th className="px-4 py-2">Attacks</th>
                  <th className="px-4 py-2 text-right">Risk Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topActors.map((actor) => (
                  <tr
                    key={actor.rank}
                    className={actor.highlight ? "bg-red-50/50" : "hover:bg-slate-50"}
                  >
                    <td
                      className={`border-l-4 px-4 py-3 font-bold ${
                        actor.highlight
                          ? "border-red-500 text-red-700"
                          : "border-transparent text-slate-600"
                      }`}
                    >
                      {actor.rank}
                    </td>
                    <td className="px-4 py-3 font-mono font-medium text-slate-900">{actor.ip}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{actor.attacks}</td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold border ${
                          actor.warm
                            ? "border-orange-200 bg-orange-100 text-orange-700"
                            : "border-red-200 bg-red-100 text-red-700"
                        }`}
                      >
                        {actor.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-[22px] border border-orange-200 border-l-4 border-l-[var(--high)] bg-[#fff3e0] p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-900">
              <CalendarDays className="h-5 w-5 text-[var(--high)]" />
              Civic Risk Calendar
            </h3>
            <div className="space-y-4">
              {calendarItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between gap-4 rounded-xl border border-orange-100 bg-white/70 p-4"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.subtitle}</p>
                  </div>
                  <span className={`rounded-md border px-3 py-1 text-xs font-bold ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--gov-navy)]">
              <Brain className="h-5 w-5" />
              AI Recommended Actions
            </h3>
            {aiActions.map((action) => (
              <div
                key={action.title}
                className={`rounded-[18px] border border-slate-200 border-l-4 ${action.accent} bg-white p-5 shadow-sm transition hover:shadow-md`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{action.title}</p>
                    <p className="mt-2 text-sm text-slate-500">{action.subtitle}</p>
                  </div>
                  <button className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200">
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

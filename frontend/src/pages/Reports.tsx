import { useState } from "react";
import {
  AudioLines,
  CalendarClock,
  CheckCircle2,
  Eye,
  FilePlus2,
  Filter,
  Mail,
  Search,
  Send,
  Sparkles,
  Download,
  ShieldCheck,
  Newspaper,
  CalendarDays,
  FileWarning,
} from "lucide-react";

const filingRows = [
  {
    id: "RPT-2026-0847",
    type: "CERT-In",
    reference: "#INC-9921",
    date: "Oct 24, 2023",
    time: "14:30 IST",
    status: "Filed",
    statusClass: "bg-green-50 text-green-700 border-green-200",
    typeClass: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    id: "RPT-2026-0846",
    type: "Internal",
    reference: "--",
    date: "Oct 24, 2023",
    time: "09:00 IST",
    status: "Archived",
    statusClass: "bg-slate-100 text-slate-600 border-slate-200",
    typeClass: "bg-purple-50 text-purple-700 border-purple-100",
  },
  {
    id: "RPT-2026-0845",
    type: "CERT-In",
    reference: "#INC-9918",
    date: "Oct 23, 2023",
    time: "16:45 IST",
    status: "Pending Approval",
    statusClass: "bg-amber-100 text-amber-700 border-amber-200",
    typeClass: "bg-blue-50 text-blue-700 border-blue-100",
    highlight: true,
  },
  {
    id: "RPT-2026-0844",
    type: "CERT-In",
    reference: "#INC-9915",
    date: "Oct 22, 2023",
    time: "11:20 IST",
    status: "Filed",
    statusClass: "bg-green-50 text-green-700 border-green-200",
    typeClass: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    id: "RPT-2026-0843",
    type: "Audit",
    reference: "--",
    date: "Oct 20, 2023",
    time: "09:00 IST",
    status: "Complete",
    statusClass: "bg-green-50 text-green-700 border-green-200",
    typeClass: "bg-orange-50 text-orange-700 border-orange-100",
  },
];

const reportTabs = [
  { id: "cert-in", label: "CERT-In Reports", icon: ShieldCheck },
  { id: "daily", label: "Daily Briefings", icon: Newspaper },
  { id: "weekly", label: "Weekly Summary", icon: CalendarDays },
  { id: "incident", label: "Incident Reports", icon: FileWarning },
];

const shortcuts = [
  { label: "Generate Audio Briefing", tag: "MP3", icon: AudioLines },
  { label: "Email Summary to Minister", tag: "Draft", icon: Mail },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("cert-in");

  return (
    <div className="min-h-full space-y-6 p-8">
      <section className="space-y-6 rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <nav className="mb-2 flex items-center text-xs font-medium text-slate-400">
              <span className="hover:text-[var(--gov-navy)]">Home</span>
              <span className="mx-2">/</span>
              <span className="text-slate-600">Reports &amp; Compliance</span>
            </nav>
            <h1 className="text-2xl font-bold text-[var(--gov-navy)]">
              Reports &amp; Compliance
            </h1>
            <p className="mt-0.5 max-w-3xl text-sm text-slate-500">
              Generate compliance documents and automated security briefings for MeitY.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--gov-navy)] bg-white px-4 py-2 text-sm font-bold text-[var(--gov-navy)] shadow-sm transition hover:bg-slate-50">
              <CalendarClock className="h-4 w-4" />
              Schedule Report
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--gov-navy)] px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-[var(--gov-navy-dark)]">
              <FilePlus2 className="h-4 w-4" />
              Generate Report
            </button>
          </div>
        </div>

        <div className="flex w-max max-w-full flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
          {reportTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition ${
                  active
                    ? "bg-[var(--gov-navy)] font-semibold text-white shadow-sm"
                    : "font-medium text-slate-600 hover:bg-white hover:text-[var(--gov-navy)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-lg border-l-4 border-l-emerald-700 bg-[#e8f5e9] p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                  CERT-In Compliance: Active
                </h3>
                <p className="text-xs text-green-800">
                  All mandatory reporting requirements for the current quarter have been met.
                </p>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[10px] font-bold uppercase text-green-700">
                Last Report Filed
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-green-900">
                24 Oct 2023, 14:30 IST
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-bold text-[var(--gov-navy)]">Recent Filings</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search ID..."
                    className="w-48 rounded-md border border-slate-300 py-1 pl-8 pr-3 text-xs outline-none transition focus:border-[var(--gov-navy)]"
                  />
                </div>
                <button className="rounded-md border border-slate-300 p-1 text-slate-500 transition hover:text-[var(--gov-navy)]">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--gov-navy)] text-xs font-semibold uppercase tracking-wider text-white">
                  <tr>
                    <th className="px-6 py-3">Report ID</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Reference</th>
                    <th className="px-6 py-3">Generated / Filed</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filingRows.map((row) => (
                    <tr
                      key={row.id}
                      className={`group transition-colors ${
                        row.highlight ? "bg-amber-50/40 hover:bg-amber-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="px-6 py-3 font-mono font-medium text-[var(--gov-navy)]">
                        {row.id}
                      </td>
                      <td className="px-6 py-3">
                        <span className={`rounded border px-2 py-0.5 text-[10px] font-bold ${row.typeClass}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {row.reference === "--" ? (
                          <span className="text-xs italic text-slate-400">--</span>
                        ) : (
                          <a
                            href="#"
                            className="font-mono text-xs text-slate-500 underline decoration-slate-300 hover:text-[var(--gov-navy)]"
                          >
                            {row.reference}
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-col text-xs">
                          <span className="font-medium text-slate-700">{row.date}</span>
                          <span className="text-[10px] text-slate-400">{row.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${row.statusClass}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-75" />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        {row.highlight ? (
                          <button className="rounded border border-[var(--gov-navy)] bg-white px-2 py-0.5 text-xs font-bold text-[var(--gov-navy)] transition hover:bg-[var(--gov-navy)] hover:text-white">
                            Review
                          </button>
                        ) : (
                          <div className="flex justify-end gap-2 opacity-60 transition-opacity group-hover:opacity-100">
                            <button className="text-slate-500 transition hover:text-[var(--gov-navy)]">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-slate-500 transition hover:text-[var(--gov-navy)]">
                              <Send className="h-4 w-4" />
                            </button>
                            <button className="text-slate-500 transition hover:text-[var(--gov-navy)]">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>Showing 5 of 128 reports</span>
              <div className="flex gap-2">
                <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 hover:bg-slate-50">
                  Previous
                </button>
                <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 hover:bg-slate-50">
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="relative z-10">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="flex items-center gap-3 text-lg font-bold text-[var(--gov-navy)]">
                  <Sparkles className="h-5 w-5" />
                  KAVACH AI Daily Security Brief
                </h3>
                <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-bold uppercase text-indigo-700">
                  Latest Generated
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="border-b border-slate-200 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
                  <h4 className="mb-2 text-sm font-bold text-slate-800">दैनिक सुरक्षा सारांश (हिंदी)</h4>
                  <p className="text-sm leading-relaxed text-slate-600">
                    पिछले 24 घंटों में नेटवर्क गतिविधि सामान्य रही है। हालांकि, पोर्ट 443 पर
                    संदिग्ध स्कैनिंग प्रयासों में मामूली वृद्धि देखी गई है। सभी महत्वपूर्ण
                    प्रणालियाँ सुरक्षित और सक्रिय हैं। कोई बड़ी सुरक्षा उल्लंघन की सूचना नहीं है।
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                      सुरक्षित
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                      स्थिर
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-bold text-slate-800">
                    Daily Security Summary (English)
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Network activity has remained normal over the last 24 hours. However, a
                    slight increase in suspicious scanning attempts on Port 443 was observed.
                    All critical systems remain secure and operational. No major security
                    breaches reported.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                      Secure
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                      Stable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border-l-4 border-l-[var(--gov-navy)] bg-white p-6 shadow-lg">
            <div className="mb-6">
              <h3 className="flex items-center gap-3 text-lg font-bold text-[var(--gov-navy)]">
                <Sparkles className="h-5 w-5" />
                Quick Generate
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Create a new report instantly based on templates.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                  Report Type
                </label>
                <select className="w-full rounded-md border-slate-300 text-sm focus:border-[var(--gov-navy)] focus:ring-[var(--gov-navy)]">
                  <option>CERT-In Incident Report</option>
                  <option>Weekly Compliance Summary</option>
                  <option>Ad-hoc Security Audit</option>
                  <option>Vendor Risk Assessment</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                  Target Portal / Entity
                </label>
                <select className="w-full rounded-md border-slate-300 text-sm focus:border-[var(--gov-navy)] focus:ring-[var(--gov-navy)]">
                  <option>National Informatics Centre (NIC)</option>
                  <option>Ministry of Finance</option>
                  <option>UIDAI</option>
                  <option>External - CERT-In</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                    Date Range
                  </label>
                  <select className="w-full rounded-md border-slate-300 text-sm focus:border-[var(--gov-navy)] focus:ring-[var(--gov-navy)]">
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                    Format
                  </label>
                  <select className="w-full rounded-md border-slate-300 text-sm focus:border-[var(--gov-navy)] focus:ring-[var(--gov-navy)]">
                    <option>PDF (Signed)</option>
                    <option>JSON (API)</option>
                    <option>CSV (Raw Data)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                  Language
                </label>
                <div className="flex flex-wrap gap-5 text-sm text-slate-700">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="lang"
                      defaultChecked
                      className="text-[var(--gov-navy)] focus:ring-[var(--gov-navy)]"
                    />
                    English
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="lang"
                      className="text-[var(--gov-navy)] focus:ring-[var(--gov-navy)]"
                    />
                    Hindi (हिंदी)
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="lang"
                      className="text-[var(--gov-navy)] focus:ring-[var(--gov-navy)]"
                    />
                    Bilingual
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[var(--gov-navy)] px-4 py-3 font-bold text-white shadow-lg transition hover:bg-[var(--gov-navy-dark)] active:scale-[0.99]"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Now
                </button>
              </div>
            </form>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                AI Briefing Shortcuts
              </p>
              <div className="space-y-3">
                {shortcuts.map((shortcut) => {
                  const Icon = shortcut.icon;

                  return (
                    <button
                      key={shortcut.label}
                      className="group flex w-full items-center justify-between rounded border border-slate-200 bg-slate-50 p-3 transition hover:border-[var(--gov-navy)] hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-slate-400 transition group-hover:text-[var(--gov-navy)]" />
                        <span className="text-left text-sm font-medium text-slate-700 transition group-hover:text-[var(--gov-navy)]">
                          {shortcut.label}
                        </span>
                      </div>
                      <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] text-slate-600">
                        {shortcut.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

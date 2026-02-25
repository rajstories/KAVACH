import { Shield, Activity, MessageSquare, FlaskConical, MailWarning } from "lucide-react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import CopilotPage from "./pages/CopilotPage";
import Dashboard from "./pages/Dashboard";
import IncidentDetail from "./pages/IncidentDetail";
import IncidentsPage from "./pages/IncidentsPage";
import PhishingModule from "./pages/PhishingModule";
import SimulatorPage from "./pages/SimulatorPage";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Shield },
  { to: "/incidents", label: "Incidents", icon: Activity },
  { to: "/copilot", label: "Co-Pilot", icon: MessageSquare },
  { to: "/simulator", label: "Simulator", icon: FlaskConical },
  { to: "/phishing", label: "Phishing", icon: MailWarning },
];

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen px-4 py-5 md:px-6">
      <header className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/75 p-4 shadow-panel backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">KAVACH</h1>
            <p className="text-sm text-slate-400">Autonomous Cyber Defense System for Civic Infrastructure</p>
          </div>

          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                    active
                      ? "border-red-500/70 bg-red-500/20 text-red-200"
                      : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/incidents/:id" element={<IncidentDetail />} />
          <Route path="/copilot" element={<CopilotPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/phishing" element={<PhishingModule />} />
        </Routes>
      </main>
    </div>
  );
}

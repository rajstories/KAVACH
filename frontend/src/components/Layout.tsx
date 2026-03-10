import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Shield, Activity, Settings, Users, FileText, Radar, HeartPulse, Bell, AlertTriangle, ShieldAlert, Info } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Shield },
  { to: '/incidents', label: 'Incident Management', icon: HeartPulse },
  { to: '/threat-intelligence', label: 'Threat Intelligence', icon: Radar },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/system-health', label: 'System Health', icon: Activity },
];

const settingsItems = [
  { to: '/configuration', label: 'Configuration', icon: Settings },
  { to: '/users', label: 'User Management', icon: Users },
];

export default function Layout() {
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const notifications = [
    { title: 'Critical threat escalated', detail: 'DigiLocker telemetry crossed attack threshold.', time: '2m ago', icon: ShieldAlert, tone: 'text-red-600 bg-red-50' },
    { title: 'UPI anomaly detected', detail: 'Traffic spike requires analyst review.', time: '11m ago', icon: AlertTriangle, tone: 'text-orange-600 bg-orange-50' },
    { title: 'Daily brief generated', detail: 'Security summary is ready for review.', time: '24m ago', icon: Info, tone: 'text-blue-600 bg-blue-50' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!notificationRef.current?.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
      });
      const dateString = now.toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      });
      const element = document.getElementById('current-time');
      if (element) {
        element.textContent = `LIVE • ${dateString} ${timeString} IST`;
      }
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--gov-navy)] text-white flex-shrink-0 hidden md:flex flex-col h-screen fixed left-0 top-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--gov-saffron)]">
              <Shield className="h-5 w-5" />
            </div>
            <h1 className="font-bold text-lg tracking-wide">KAVACH</h1>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
            
            <div className="pt-4 mt-4 border-t border-white/10">
              <p className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                Settings
              </p>
              {settingsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white font-medium'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <Shield className="h-6 w-6 text-[var(--gov-saffron)]" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">Joint Secretary</p>
              <p className="text-xs text-white/50">MeitY Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:ml-64 h-screen">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 flex-shrink-0 z-10 shadow-sm">
          <div className="flex flex-col">
            <h2 className="text-slate-800 font-bold text-lg leading-tight">
              Ministry of Electronics &amp; Information Technology
            </h2>
            <p className="text-slate-500 text-xs">
              Government of India • Cyber Security Division
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                aria-label="Open notifications"
                onClick={() => setShowNotifications((value) => !value)}
                className="relative rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-[var(--gov-navy)]"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--gov-saffron)]" />
              </button>
              {showNotifications ? (
                <div className="absolute right-0 top-10 z-30 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-bold text-slate-800">Notifications</p>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                      {notifications.length} new
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {notifications.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex gap-3 px-4 py-3 hover:bg-slate-50">
                          <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full ${item.tone}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                              <span className="whitespace-nowrap text-[11px] text-slate-400">{item.time}</span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-700">SOC Operations Center</p>
              <p className="text-xs text-slate-500" id="current-time">LIVE MONITORING</p>
            </div>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto bg-[var(--bg-page)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

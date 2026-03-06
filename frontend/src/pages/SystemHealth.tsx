import React from 'react';

export default function SystemHealth() {
  const services = [
    { name: 'Commander Agent', api: 'Claude API v2.1', avgResponse: '1.2s', successRate: '99.8%', status: 'Healthy', color: 'green', icon: 'smart_toy', bgColor: 'indigo' },
    { name: 'ML Anomaly Detector', api: 'v4.5.2 (Ensemble)', throughput: '847 logs/sec', accuracy: '94.7%', status: 'Running', color: 'green', icon: 'model_training', bgColor: 'purple' },
    { name: 'Primary Database', api: 'PostgreSQL 15', storage: '82% (1.4TB / 1.8TB)', connections: '4,201', status: 'Load High', color: 'amber', icon: 'database', bgColor: 'blue' },
    { name: 'Alert Bot', api: 'Telegram API', alerts: '142', latency: '0.4s', status: 'Active', color: 'green', icon: 'send', bgColor: 'sky' },
    { name: 'Email Service', api: 'CERT-In SMTP', queue: '0', deliveryRate: '100%', status: 'Active', color: 'green', icon: 'mail', bgColor: 'orange' },
    { name: 'API Gateway', api: 'Kong Gateway', traffic: '234 req/min', errorRate: '0.02%', status: 'Healthy', color: 'green', icon: 'hub', bgColor: 'slate' }
  ];

  const portals = [
    { name: 'NIC eOffice', ping: '14ms', lastSeen: '2s ago', status: 'green', health: 98 },
    { name: 'Ministry of Finance', ping: '23ms', lastSeen: '5s ago', status: 'green', health: 95 },
    { name: 'UIDAI Portal', ping: '145ms', lastSeen: '1s ago', status: 'amber', health: 72 },
    { name: 'DigiLocker', ping: '18ms', lastSeen: '12s ago', status: 'green', health: 99 },
    { name: 'GST Network', ping: '--', lastSeen: 'Connection lost', status: 'red', health: 12 }
  ];

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white border-b border-slate-200 px-8 py-6 z-20">
        <div className="flex justify-between items-start">
          <div>
            <nav className="flex text-xs text-slate-400 font-medium mb-1">
              <a className="hover:text-[#1a237e]" href="#">Home</a>
              <span className="mx-2">/</span>
              <span className="text-slate-600">System Status</span>
            </nav>
            <h2 className="text-2xl font-bold text-[#1a237e]">System Health &amp; Performance</h2>
            <p className="text-sm text-slate-500">Real-time monitoring of KAVACH SOC infrastructure and services.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="text-xs font-semibold text-slate-600">Auto-refresh</span>
              <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-[#2e7d32] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:ring-offset-2">
                <span className="translate-x-4.5 inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 ease-in-out" style={{transform: 'translateX(18px)'}}></span>
              </button>
              <span className="text-[10px] font-bold text-[#2e7d32] ml-1">ON</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-[#1a237e] border border-slate-200 rounded-md bg-white shadow-sm">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 bg-slate-50 space-y-6">
        {/* Status Banner */}
        <div className="bg-[#e8f5e9] border-l-[4px] border-[#2e7d32] p-4 rounded shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#2e7d32]">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div>
              <h3 className="text-[#2e7d32] font-bold text-lg">All Systems Operational</h3>
              <p className="text-xs text-green-800">Core infrastructure is running optimally. No critical incidents reported in the last 24h.</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-green-700 uppercase font-bold tracking-wide">Last Checked</p>
            <p className="text-sm font-semibold text-green-900 mono">24 Oct 2023, 14:42:15 IST</p>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.name} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden group">
              <div className={`h-1 bg-${service.color === 'green' ? '[#2e7d32]' : service.color === 'amber' ? '[#f57c00]' : 'slate-400'} w-full`}></div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${service.bgColor}-50 text-${service.bgColor === 'indigo' ? '[#1a237e]' : service.bgColor}-700 rounded-lg border border-${service.bgColor}-100`}>
                      <span className="material-symbols-outlined">{service.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{service.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{service.api}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                    service.color === 'green' ? 'bg-green-50 text-green-700 border border-green-200' :
                    service.color === 'amber' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {service.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {service.avgResponse && (
                    <>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Avg Response</p>
                        <p className="text-lg font-bold text-slate-700 mono">{service.avgResponse}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Success Rate</p>
                        <p className="text-lg font-bold text-[#2e7d32] mono">{service.successRate}</p>
                      </div>
                    </>
                  )}
                  {service.throughput && (
                    <>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Throughput</p>
                        <p className="text-lg font-bold text-slate-700 mono">{service.throughput.split(' ')[0]} <span className="text-xs font-normal text-slate-500">{service.throughput.split(' ')[1]}</span></p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Accuracy</p>
                        <p className="text-lg font-bold text-slate-700 mono">{service.accuracy}</p>
                      </div>
                    </>
                  )}
                  {service.storage && (
                    <div className="col-span-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600">Storage Usage</span>
                        <span className="font-mono text-slate-500">{service.storage}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-amber-500 h-2 rounded-full" style={{width: '82%'}}></div>
                      </div>
                    </div>
                  )}
                  {service.alerts && (
                    <>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Alerts Sent (24h)</p>
                        <p className="text-2xl font-bold text-slate-700 mono">{service.alerts}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Latency</p>
                        <p className="text-sm font-bold text-slate-600 mono">{service.latency}</p>
                      </div>
                    </>
                  )}
                  {service.queue !== undefined && (
                    <>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Queue Size</p>
                        <p className="text-2xl font-bold text-slate-700 mono">{service.queue}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Delivery Rate</p>
                        <p className="text-sm font-bold text-slate-600 mono">{service.deliveryRate}</p>
                      </div>
                    </>
                  )}
                  {service.traffic && (
                    <>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Traffic</p>
                        <p className="text-lg font-bold text-slate-700 mono">{service.traffic.split(' ')[0]} <span className="text-xs font-normal text-slate-500">{service.traffic.split(' ')[1]}</span></p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Error Rate</p>
                        <p className="text-lg font-bold text-[#2e7d32] mono">{service.errorRate}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline Latency & Monitored Portals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#1a237e] flex items-center gap-2">
                <span className="material-symbols-outlined">timeline</span>
                Pipeline Latency (End-to-End)
              </h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-slate-400"></span>
                  <span className="text-slate-600">Rule Filter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-purple-500"></span>
                  <span className="text-slate-600">ML Detection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-indigo-600"></span>
                  <span className="text-slate-600">Commander AI</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#1a237e] border border-dashed border-t-0 border-b-0"></span>
                  <span className="text-[#1a237e] font-bold">Total</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 border-l border-b border-slate-200 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px]">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <path d="M0 240 L100 235 L200 238 L300 242 L400 230 L500 235 L600 238 L800 240" fill="none" stroke="#94a3b8" strokeWidth="2"></path>
                <path d="M0 200 L100 190 L200 195 L300 180 L400 185 L500 190 L600 180 L800 195" fill="none" stroke="#a855f7" strokeWidth="2"></path>
                <path d="M0 150 L100 140 L200 160 L300 130 L400 145 L500 155 L600 140 L800 150" fill="none" stroke="#4f46e5" strokeWidth="2"></path>
                <path d="M0 100 L100 90 L200 110 L300 70 L400 95 L500 105 L600 90 L800 100" fill="none" stroke="#1a237e" strokeDasharray="5,5" strokeWidth="3"></path>
              </svg>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-lg">
              <h3 className="font-bold text-[#1a237e] text-sm">Monitored Portals</h3>
              <button className="text-xs text-[#1a237e] font-semibold hover:underline">View All</button>
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Portal</th>
                    <th className="px-4 py-2 font-semibold text-center">Status</th>
                    <th className="px-4 py-2 font-semibold text-right">Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {portals.map((portal) => (
                    <tr key={portal.name} className="group hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-700 text-xs">{portal.name}</p>
                        <p className="text-[10px] text-slate-400">{portal.ping} • {portal.lastSeen}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          portal.status === 'green' ? 'bg-green-500' :
                          portal.status === 'amber' ? 'bg-amber-500 animate-pulse' :
                          'bg-red-500'
                        }`}></span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-[10px] font-bold ${
                          portal.status === 'green' ? 'border-green-500 text-green-700' :
                          portal.status === 'amber' ? 'border-amber-500 text-amber-700' :
                          'border-red-500 text-red-700'
                        }`}>{portal.health}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

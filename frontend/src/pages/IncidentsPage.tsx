export default function IncidentsPage() {
  return (
    <>
      <style>{`
        .critical-row {
            box-shadow: inset 4px 0 0 0 var(--govt-red), 0 0 15px rgba(183, 28, 28, 0.08);
            background-color: #fff9f9;
        }
        .pulse-dot {
            animation: pulse-red 2s infinite;
        }
        @keyframes pulse-red {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(183, 28, 28, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(183, 28, 28, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(183, 28, 28, 0); }
        }
      `}</style>

      <div className="flex flex-col h-full">
        <header className="bg-white border-b border-slate-200 px-8 py-4 z-20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <nav className="flex text-xs text-slate-400 font-medium mb-1">
                <a className="hover:text-[var(--navy-primary)]" href="#">Home</a>
                <span className="mx-2">/</span>
                <span className="text-slate-600">Incident Management</span>
              </nav>
              <h2 className="text-2xl font-bold text-[var(--navy-primary)]">Incident Management</h2>
              <p className="text-sm text-slate-500">Monitor, triage, and remediate active security threats across MeitY infrastructure</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-[var(--navy-primary)] text-[var(--navy-primary)] rounded-md text-sm font-bold hover:bg-slate-50">
                <span className="material-symbols-outlined text-lg">download</span>
                Export Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--navy-primary)] text-white rounded-md text-sm font-bold shadow-md hover:bg-[var(--navy-dark)]">
                <span className="material-symbols-outlined text-lg">add</span>
                New Incident
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white border border-slate-200 border-l-4 border-l-[var(--navy-primary)] p-4 rounded-md shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Open</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">42</p>
            </div>
            <div className="bg-white border border-slate-200 border-l-4 border-l-[var(--govt-red)] p-4 rounded-md shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Critical</p>
              <p className="text-2xl font-bold text-[var(--govt-red)] mt-1">05</p>
            </div>
            <div className="bg-white border border-slate-200 border-l-4 border-l-[var(--govt-amber)] p-4 rounded-md shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">In Progress</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">18</p>
            </div>
            <div className="bg-white border border-slate-200 border-l-4 border-l-[var(--govt-green)] p-4 rounded-md shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contained</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">124</p>
            </div>
            <div className="bg-white border border-slate-200 border-l-4 border-l-[var(--govt-blue)] p-4 rounded-md shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg MTTR</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">2.4h</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-[300px]">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:ring-[var(--navy-primary)] focus:border-[var(--navy-primary)]" placeholder="Search by ID, Portal, or IP..." type="text"/>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-100 rounded-md text-slate-600 hover:bg-slate-200">
                  <span className="material-symbols-outlined text-xl">swap_vert</span>
                </button>
                <button className="p-2 bg-slate-100 rounded-md text-slate-600 hover:bg-slate-200">
                  <span className="material-symbols-outlined text-xl">grid_view</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase w-20">Domain</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[var(--navy-primary)] text-white text-xs rounded-full font-medium cursor-pointer">All Domains</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">Identity</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">Network</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">Cloud Infrastructure</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase w-20">Severity</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">Critical</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">High</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">Medium</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">Low</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase w-20">Status</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">Triage</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">Investigating</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">Mitigating</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[var(--navy-primary)] cursor-pointer transition-all">Resolved</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-[var(--navy-primary)] text-white text-[11px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4 w-12 text-center">
                    <input className="rounded border-slate-300 text-[var(--navy-primary)] focus:ring-[var(--navy-primary)]" type="checkbox"/>
                  </th>
                  <th className="px-4 py-4">Incident ID</th>
                  <th className="px-4 py-4">Severity</th>
                  <th className="px-4 py-4">Classification</th>
                  <th className="px-4 py-4">Affected Portal</th>
                  <th className="px-4 py-4">Threat Actor / IP</th>
                  <th className="px-4 py-4">Detected</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="critical-row">
                  <td className="px-6 py-4 text-center"><input className="rounded border-slate-300 text-[var(--navy-primary)]" type="checkbox"/></td>
                  <td className="px-4 py-4 mono font-semibold text-slate-800">#INC-2024-8842</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--govt-red)] rounded-full pulse-dot"></span>
                      <span className="bg-[#ffebee] text-[var(--govt-red)] px-2 py-0.5 rounded text-[10px] font-bold border border-red-100">CRITICAL</span>
                      <span className="text-[9px] font-extrabold text-white bg-[var(--govt-red)] px-1 rounded">URGENT</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-sm text-xs font-medium border border-slate-200">DDoS Attack</span></td>
                  <td className="px-4 py-4 font-semibold text-slate-700">Aadhaar Auth Node 4</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 mono text-xs"><span className="text-slate-500">RU</span><span className="text-slate-800 font-medium">103.24.XX.XX</span></div>
                  </td>
                  <td className="px-4 py-4 text-slate-500 text-xs font-medium">12:42:05 IST</td>
                  <td className="px-4 py-4"><span className="bg-red-50 text-[var(--govt-red)] px-2 py-1 rounded-full text-[11px] font-bold border border-red-100">TRIAGE</span></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">visibility</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">shield</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">more_vert</button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-center"><input className="rounded border-slate-300 text-[var(--navy-primary)]" type="checkbox"/></td>
                  <td className="px-4 py-4 mono font-semibold text-slate-800">#INC-2024-8839</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--saffron)] rounded-full"></span>
                      <span className="bg-orange-50 text-[var(--saffron)] px-2 py-0.5 rounded text-[10px] font-bold border border-orange-100">HIGH</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-sm text-xs font-medium border border-slate-200">SQL Injection</span></td>
                  <td className="px-4 py-4 font-semibold text-slate-700">UPI Gateway Web</td>
                  <td className="px-4 py-4"><div className="flex items-center gap-2 mono text-xs"><span className="text-slate-500">IN</span><span className="text-slate-800 font-medium">45.89.XX.XX</span></div></td>
                  <td className="px-4 py-4 text-slate-500 text-xs font-medium">11:15:22 IST</td>
                  <td className="px-4 py-4"><span className="bg-orange-50 text-[var(--saffron)] px-2 py-1 rounded-full text-[11px] font-bold border border-orange-100">INVESTIGATING</span></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">visibility</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">shield</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">more_vert</button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-center"><input className="rounded border-slate-300 text-[var(--navy-primary)]" type="checkbox"/></td>
                  <td className="px-4 py-4 mono font-semibold text-slate-800">#INC-2024-8835</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--govt-blue)] rounded-full"></span>
                      <span className="bg-blue-50 text-[var(--govt-blue)] px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">MEDIUM</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-sm text-xs font-medium border border-slate-200">Anomalous Traffic</span></td>
                  <td className="px-4 py-4 font-semibold text-slate-700">DigiLocker API</td>
                  <td className="px-4 py-4"><div className="flex items-center gap-2 mono text-xs"><span className="text-slate-500">SG</span><span className="text-slate-800 font-medium">172.16.XX.XX</span></div></td>
                  <td className="px-4 py-4 text-slate-500 text-xs font-medium">10:04:18 IST</td>
                  <td className="px-4 py-4"><span className="bg-green-50 text-[var(--govt-green)] px-2 py-1 rounded-full text-[11px] font-bold border border-green-100">RESOLVED</span></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">visibility</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">shield</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">more_vert</button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-center"><input className="rounded border-slate-300 text-[var(--navy-primary)]" type="checkbox"/></td>
                  <td className="px-4 py-4 mono font-semibold text-slate-800">#INC-2024-8831</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--govt-red)] rounded-full pulse-dot"></span>
                      <span className="bg-[#ffebee] text-[var(--govt-red)] px-2 py-0.5 rounded text-[10px] font-bold border border-red-100">CRITICAL</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-sm text-xs font-medium border border-slate-200">Unauthorized Access</span></td>
                  <td className="px-4 py-4 font-semibold text-slate-700">MeitY Internal Admin</td>
                  <td className="px-4 py-4"><div className="flex items-center gap-2 mono text-xs"><span className="text-slate-500">US</span><span className="text-slate-800 font-medium">192.168.XX.XX</span></div></td>
                  <td className="px-4 py-4 text-slate-500 text-xs font-medium">08:45:12 IST</td>
                  <td className="px-4 py-4"><span className="bg-orange-50 text-[var(--saffron)] px-2 py-1 rounded-full text-[11px] font-bold border border-orange-100">MITIGATING</span></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">visibility</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">shield</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[var(--navy-primary)]">more_vert</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">Showing 1 to 4 of 42 incidents</p>
              <div className="flex gap-1">
                <button className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-xs rounded hover:bg-slate-50">Previous</button>
                <button className="px-3 py-1 bg-[var(--navy-primary)] text-white text-xs rounded font-bold shadow-sm">1</button>
                <button className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-xs rounded hover:bg-slate-50">2</button>
                <button className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-xs rounded hover:bg-slate-50">3</button>
                <button className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-xs rounded hover:bg-slate-50">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default function IncidentsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        .inc-mono { font-family: 'JetBrains Mono', monospace; }
        .critical-row { box-shadow: inset 4px 0 0 0 #b71c1c; background-color: #fff9f9; }
        .pulse-dot { animation: pulse-red 2s infinite; }
        @keyframes pulse-red {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(183,28,28,0.7); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 6px rgba(183,28,28,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(183,28,28,0); }
        }
      `}</style>

      <div className="flex flex-col min-h-full bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-8 py-5">
          <div className="flex justify-between items-start mb-5">
            <div>
              <nav className="flex text-xs text-slate-400 font-medium mb-1">
                <span className="hover:text-[#1a237e] cursor-pointer">Home</span>
                <span className="mx-2">/</span>
                <span className="text-slate-600">Incident Management</span>
              </nav>
              <h2 className="text-2xl font-bold text-[#1a237e]">Incident Management</h2>
              <p className="text-sm text-slate-500 mt-0.5">Monitor, triage, and remediate active security threats across MeitY infrastructure</p>
            </div>
            <div className="flex gap-3 mt-1">
              <button className="flex items-center gap-2 px-4 py-2 border border-[#1a237e] text-[#1a237e] rounded-md text-sm font-semibold hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined" style={{fontSize:'18px'}}>download</span>
                Export Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1a237e] text-white rounded-md text-sm font-semibold shadow-sm hover:bg-[#0d1754] transition-colors">
                <span className="material-symbols-outlined" style={{fontSize:'18px'}}>add</span>
                New Incident
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white border border-slate-200 border-l-4 border-l-[#1a237e] px-4 py-3 rounded-md shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Open</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">42</p>
            </div>
            <div className="bg-white border border-slate-200 border-l-4 border-l-[#b71c1c] px-4 py-3 rounded-md shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Critical</p>
              <p className="text-2xl font-bold text-[#b71c1c] mt-1">05</p>
            </div>
            <div className="bg-white border border-slate-200 border-l-4 border-l-[#f57c00] px-4 py-3 rounded-md shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">In Progress</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">18</p>
            </div>
            <div className="bg-white border border-slate-200 border-l-4 border-l-[#2e7d32] px-4 py-3 rounded-md shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contained</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">124</p>
            </div>
            <div className="bg-white border border-slate-200 border-l-4 border-l-[#0277bd] px-4 py-3 rounded-md shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg MTTR</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">2.4h</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">
          <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-72">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400" style={{fontSize:'20px'}}>search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[#1a237e]" placeholder="Search by ID, Portal, or IP..." type="text"/>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-100 rounded-md text-slate-600 hover:bg-slate-200"><span className="material-symbols-outlined" style={{fontSize:'20px'}}>swap_vert</span></button>
                <button className="p-2 bg-slate-100 rounded-md text-slate-600 hover:bg-slate-200"><span className="material-symbols-outlined" style={{fontSize:'20px'}}>grid_view</span></button>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16 flex-shrink-0">Domain</span>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-[#1a237e] text-white text-xs rounded-full font-medium cursor-pointer">All Domains</span>
                  {['Identity','Network','Cloud Infrastructure'].map(f => (
                    <span key={f} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[#1a237e] cursor-pointer transition-colors">{f}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16 flex-shrink-0">Severity</span>
                <div className="flex gap-2 flex-wrap">
                  {['Critical','High','Medium','Low'].map(f => (
                    <span key={f} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[#1a237e] cursor-pointer transition-colors">{f}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16 flex-shrink-0">Status</span>
                <div className="flex gap-2 flex-wrap">
                  {['Triage','Investigating','Mitigating','Resolved'].map(f => (
                    <span key={f} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full hover:border-[#1a237e] cursor-pointer transition-colors">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1a237e] text-white text-[11px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-5 py-4 w-10 text-center"><input type="checkbox" className="rounded border-slate-300"/></th>
                  <th className="px-4 py-4">Incident ID</th>
                  <th className="px-4 py-4">Severity</th>
                  <th className="px-4 py-4">Classification</th>
                  <th className="px-4 py-4">Affected Portal</th>
                  <th className="px-4 py-4">Threat Actor / IP</th>
                  <th className="px-4 py-4">Detected</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="critical-row">
                  <td className="px-5 py-4 text-center"><input type="checkbox" className="rounded border-slate-300"/></td>
                  <td className="px-4 py-4 inc-mono font-semibold text-slate-800 text-xs">#INC-2024-8842</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#b71c1c] pulse-dot flex-shrink-0"></span>
                      <span className="bg-[#ffebee] text-[#b71c1c] px-2 py-0.5 rounded text-[10px] font-bold border border-red-200">CRITICAL</span>
                      <span className="text-[9px] font-extrabold text-white bg-[#b71c1c] px-1.5 py-0.5 rounded">URGENT</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium border border-slate-200">DDoS Attack</span></td>
                  <td className="px-4 py-4 font-semibold text-slate-700">Aadhaar Auth Node 4</td>
                  <td className="px-4 py-4"><div className="flex items-center gap-2 inc-mono text-xs"><span className="text-slate-500">RU</span><span className="text-slate-800 font-medium">103.24.XX.XX</span></div></td>
                  <td className="px-4 py-4 text-slate-500 text-xs inc-mono">12:42:05 IST</td>
                  <td className="px-4 py-4"><span className="bg-red-50 text-[#b71c1c] px-2.5 py-1 rounded-full text-[11px] font-bold border border-red-100">TRIAGE</span></td>
                  <td className="px-5 py-4 text-right"><div className="flex justify-end gap-1">
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>visibility</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>shield</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>more_vert</button>
                  </div></td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-center"><input type="checkbox" className="rounded border-slate-300"/></td>
                  <td className="px-4 py-4 inc-mono font-semibold text-slate-800 text-xs">#INC-2024-8839</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF9933] flex-shrink-0"></span>
                      <span className="bg-orange-50 text-[#FF9933] px-2 py-0.5 rounded text-[10px] font-bold border border-orange-200">HIGH</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium border border-slate-200">SQL Injection</span></td>
                  <td className="px-4 py-4 font-semibold text-slate-700">UPI Gateway Web</td>
                  <td className="px-4 py-4"><div className="flex items-center gap-2 inc-mono text-xs"><span className="text-slate-500">IN</span><span className="text-slate-800 font-medium">45.89.XX.XX</span></div></td>
                  <td className="px-4 py-4 text-slate-500 text-xs inc-mono">11:15:22 IST</td>
                  <td className="px-4 py-4"><span className="bg-orange-50 text-[#FF9933] px-2.5 py-1 rounded-full text-[11px] font-bold border border-orange-100">INVESTIGATING</span></td>
                  <td className="px-5 py-4 text-right"><div className="flex justify-end gap-1">
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>visibility</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>shield</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>more_vert</button>
                  </div></td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-center"><input type="checkbox" className="rounded border-slate-300"/></td>
                  <td className="px-4 py-4 inc-mono font-semibold text-slate-800 text-xs">#INC-2024-8835</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0277bd] flex-shrink-0"></span>
                      <span className="bg-blue-50 text-[#0277bd] px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200">MEDIUM</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium border border-slate-200">Anomalous Traffic</span></td>
                  <td className="px-4 py-4 font-semibold text-slate-700">DigiLocker API</td>
                  <td className="px-4 py-4"><div className="flex items-center gap-2 inc-mono text-xs"><span className="text-slate-500">SG</span><span className="text-slate-800 font-medium">172.16.XX.XX</span></div></td>
                  <td className="px-4 py-4 text-slate-500 text-xs inc-mono">10:04:18 IST</td>
                  <td className="px-4 py-4"><span className="bg-green-50 text-[#2e7d32] px-2.5 py-1 rounded-full text-[11px] font-bold border border-green-100">RESOLVED</span></td>
                  <td className="px-5 py-4 text-right"><div className="flex justify-end gap-1">
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>visibility</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>shield</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>more_vert</button>
                  </div></td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-center"><input type="checkbox" className="rounded border-slate-300"/></td>
                  <td className="px-4 py-4 inc-mono font-semibold text-slate-800 text-xs">#INC-2024-8831</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#b71c1c] pulse-dot flex-shrink-0"></span>
                      <span className="bg-[#ffebee] text-[#b71c1c] px-2 py-0.5 rounded text-[10px] font-bold border border-red-200">CRITICAL</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium border border-slate-200">Unauthorized Access</span></td>
                  <td className="px-4 py-4 font-semibold text-slate-700">MeitY Internal Admin</td>
                  <td className="px-4 py-4"><div className="flex items-center gap-2 inc-mono text-xs"><span className="text-slate-500">US</span><span className="text-slate-800 font-medium">192.168.XX.XX</span></div></td>
                  <td className="px-4 py-4 text-slate-500 text-xs inc-mono">08:45:12 IST</td>
                  <td className="px-4 py-4"><span className="bg-orange-50 text-[#FF9933] px-2.5 py-1 rounded-full text-[11px] font-bold border border-orange-100">MITIGATING</span></td>
                  <td className="px-5 py-4 text-right"><div className="flex justify-end gap-1">
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>visibility</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>shield</button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-[#1a237e]" style={{fontSize:'20px'}}>more_vert</button>
                  </div></td>
                </tr>
              </tbody>
            </table>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">Showing 1 to 4 of 42 incidents</p>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 text-xs rounded hover:bg-slate-100">Previous</button>
                <button className="px-3 py-1.5 bg-[#1a237e] text-white text-xs rounded font-bold shadow-sm">1</button>
                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 text-xs rounded hover:bg-slate-100">2</button>
                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 text-xs rounded hover:bg-slate-100">3</button>
                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 text-xs rounded hover:bg-slate-100">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

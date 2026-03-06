import React from 'react';

export default function ThreatIntelligence() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 z-20">
        <div className="flex justify-between items-start mb-6">
          <div>
            <nav className="flex text-xs text-slate-400 font-medium mb-1">
              <a className="hover:text-[#1a237e]" href="#">Home</a>
              <span className="mx-2">/</span>
              <span className="text-slate-600">Threat Intelligence</span>
            </nav>
            <h2 className="text-2xl font-bold text-[#1a237e]">Threat Intelligence</h2>
            <p className="text-sm text-slate-500">Predictive analysis and active threat monitoring for national infrastructure</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-[#1a237e] text-[#1a237e] rounded-md text-sm font-bold hover:bg-slate-50">
              <span className="material-symbols-outlined text-lg">download</span>
              Export Intel
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a237e] text-white rounded-md text-sm font-bold shadow-md hover:bg-[#0d1754]">
              <span className="material-symbols-outlined text-lg">play_arrow</span>
              Run Analysis
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {/* Active Threat Actors */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-[#b71c1c] p-5 rounded-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Threat Actors</p>
                <span className="material-symbols-outlined text-[#b71c1c] text-lg">warning</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">23</p>
              <p className="text-xs text-slate-500 mt-1">High confidence signatures detected</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="mono text-[10px] bg-red-50 text-red-800 border border-red-100 px-1.5 py-0.5 rounded">203.0.113.50</span>
              <span className="mono text-[10px] bg-red-50 text-red-800 border border-red-100 px-1.5 py-0.5 rounded">198.51.100.2</span>
              <span className="mono text-[10px] bg-red-50 text-red-800 border border-red-100 px-1.5 py-0.5 rounded">192.0.2.14</span>
              <span className="mono text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-1.5 py-0.5 rounded">+20 more</span>
            </div>
          </div>

          {/* Top Attack Vector */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-[#f57c00] p-5 rounded-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Top Attack Vector</p>
                <span className="material-symbols-outlined text-[#f57c00] text-lg">bolt</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">Brute Force</p>
              <p className="text-sm font-semibold text-[#f57c00] mt-0.5">47% of incidents</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                <span className="w-12">SSH</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#f57c00] w-[75%]"></div>
                </div>
                <span>75%</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span className="w-12">RDP</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 w-[25%]"></div>
                </div>
                <span>25%</span>
              </div>
            </div>
          </div>

          {/* Threat Forecast */}
          <div className="bg-[#0d1754] border border-[#1a237e] border-l-4 border-l-white p-5 rounded-md shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-white text-9xl">query_stats</span>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Threat Forecast</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-xl font-bold text-white">Election Season Risk: <span className="text-red-400">HIGH</span></h3>
              </div>
            </div>
            <div className="relative z-10 mt-3 bg-white/10 backdrop-blur-sm p-3 rounded border border-white/10">
              <p className="text-xs text-white/90 leading-relaxed">
                Predicted <span className="font-bold text-yellow-400">2.4x volume increase</span> in DDoS attempts against electoral infrastructure over the next 14 days.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50">
        <div className="flex gap-6">
          <div className="w-[60%] space-y-6">
            {/* Attack Frequency Heatmap */}
            <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#1a237e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">grid_on</span>
                  Attack Frequency Heatmap
                </h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Less</span>
                  <span className="w-3 h-3 bg-slate-100 rounded-sm"></span>
                  <span className="w-3 h-3 bg-blue-200 rounded-sm"></span>
                  <span className="w-3 h-3 bg-blue-400 rounded-sm"></span>
                  <span className="w-3 h-3 bg-[#1a237e] rounded-sm"></span>
                  <span className="text-slate-400">More</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col justify-between text-[10px] text-slate-400 pr-2 py-1 h-32">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-1 h-32">
                    {[...Array(96)].map((_, i) => {
                      const colors = ['bg-blue-100', 'bg-slate-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-[#1a237e]', 'bg-blue-500'];
                      const randomColor = colors[Math.floor(Math.random() * colors.length)];
                      return <div key={i} className={`${randomColor} rounded-sm hover:scale-125 hover:border hover:border-white hover:z-10 transition-all cursor-pointer`}></div>;
                    })}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-2 px-1">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>23:59</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-[#0d1754] text-white p-3 rounded-md flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-yellow-400">schedule</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70">Peak Attack Window</p>
                    <p className="text-sm font-semibold">Wednesday &amp; Friday, 14:00 - 18:00 IST</p>
                  </div>
                </div>
                <button className="text-xs border border-white/30 px-3 py-1 rounded hover:bg-white/10">Schedule Maintenance</button>
              </div>
            </div>

            {/* Attack Classification Trend */}
            <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[#1a237e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">ssid_chart</span>
                  Attack Classification Trend (7 Days)
                </h3>
              </div>
              <div className="relative h-48 w-full">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                  <line stroke="#e2e8f0" strokeWidth="1" x1="0" x2="400" y1="120" y2="120"></line>
                  <line stroke="#e2e8f0" strokeWidth="1" x1="0" x2="400" y1="80" y2="80"></line>
                  <line stroke="#e2e8f0" strokeWidth="1" x1="0" x2="400" y1="40" y2="40"></line>
                  <path d="M0,100 C50,90 100,50 150,60 S250,80 300,40 S350,20 400,30" fill="none" stroke="#f57c00" strokeWidth="2"></path>
                  <path d="M0,120 C50,110 100,100 150,90 S250,50 300,60 S350,70 400,50" fill="none" stroke="#b71c1c" strokeWidth="2"></path>
                  <path d="M0,130 C50,130 100,120 150,125 S250,110 300,115 S350,100 400,105" fill="none" stroke="#0277bd" strokeWidth="2"></path>
                </svg>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f57c00]"></span>
                  <span className="text-xs text-slate-600 font-medium">Brute Force</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#b71c1c]"></span>
                  <span className="text-xs text-slate-600 font-medium">DDoS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#0277bd]"></span>
                  <span className="text-xs text-slate-600 font-medium">Malware</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[40%] space-y-6">
            {/* Top Threat Actors */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-[#1a237e] px-4 py-3 flex justify-between items-center">
                <h3 className="font-bold text-white text-sm uppercase tracking-wide">Top Threat Actors</h3>
                <button className="text-white/70 hover:text-white text-xs underline">View All</button>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-2">Rank</th>
                    <th className="px-4 py-2">Source IP</th>
                    <th className="px-4 py-2">Attacks</th>
                    <th className="px-4 py-2 text-right">Risk Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { rank: 1, ip: '103.24.11.05', attacks: '1,240', score: '98 / 100', bg: 'bg-red-50/50', border: 'border-red-500', color: 'text-red-700' },
                    { rank: 2, ip: '45.89.22.10', attacks: '985', score: '92 / 100', bg: '', border: 'border-transparent', color: 'text-slate-600' },
                    { rank: 3, ip: '172.16.55.90', attacks: '754', score: '85 / 100', bg: '', border: 'border-transparent', color: 'text-slate-600' },
                    { rank: 4, ip: '192.168.1.15', attacks: '620', score: '78 / 100', bg: '', border: 'border-transparent', color: 'text-slate-600' },
                    { rank: 5, ip: '88.22.10.45', attacks: '410', score: '72 / 100', bg: '', border: 'border-transparent', color: 'text-slate-600' }
                  ].map((item) => (
                    <tr key={item.rank} className={`${item.bg} hover:bg-slate-50`}>
                      <td className={`px-4 py-3 font-bold ${item.color} border-l-4 ${item.border}`}>#{item.rank}</td>
                      <td className="px-4 py-3 mono font-medium">{item.ip}</td>
                      <td className="px-4 py-3 font-semibold">{item.attacks}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${item.rank <= 2 ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-orange-100 text-orange-700 border border-orange-200'}`}>
                          {item.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Civic Risk Calendar */}
            <div className="bg-[#fff3e0] border border-l-4 border-l-[#f57c00] border-orange-200 rounded-md p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#f57c00]">calendar_month</span>
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Civic Risk Calendar</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white/60 p-2 rounded border border-orange-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">New Financial Year</p>
                    <p className="text-[10px] text-slate-500">April 1st • Tax portal traffic spike</p>
                  </div>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded border border-orange-200">HIGH RISK</span>
                </div>
                <div className="flex justify-between items-center bg-white/60 p-2 rounded border border-orange-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">State Assembly Election</p>
                    <p className="text-[10px] text-slate-500">May 12th • Misinformation campaigns</p>
                  </div>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded border border-red-200">CRITICAL</span>
                </div>
              </div>
            </div>

            {/* AI Recommended Actions */}
            <div className="space-y-3">
              <h3 className="font-bold text-[#1a237e] text-sm uppercase tracking-wide flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">psychology</span>
                AI Recommended Actions
              </h3>
              <div className="bg-white border-l-4 border-l-[#b71c1c] border border-slate-200 p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Block Subnet Range</p>
                    <p className="text-xs text-slate-500 mt-1">Consistent malicious traffic from 203.0.113.0/24</p>
                  </div>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-1.5 rounded-full">
                    <span className="material-symbols-outlined text-lg">check</span>
                  </button>
                </div>
              </div>
              <div className="bg-white border-l-4 border-l-[#f57c00] border border-slate-200 p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Enable WAF Rule #402</p>
                    <p className="text-xs text-slate-500 mt-1">Mitigate SQLi pattern detected on Gateway</p>
                  </div>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-1.5 rounded-full">
                    <span className="material-symbols-outlined text-lg">check</span>
                  </button>
                </div>
              </div>
              <div className="bg-white border-l-4 border-l-[#0277bd] border border-slate-200 p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Patch Server Cluster B</p>
                    <p className="text-xs text-slate-500 mt-1">New CVE-2024-9902 vulnerability found</p>
                  </div>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-1.5 rounded-full">
                    <span className="material-symbols-outlined text-lg">check</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

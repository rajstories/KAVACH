import React, { useState } from 'react';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('cert-in');

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white border-b border-slate-200 px-8 py-6 z-20">
        <div className="flex justify-between items-start">
          <div>
            <nav className="flex text-xs text-slate-400 font-medium mb-1">
              <a className="hover:text-[#1a237e]" href="#">Home</a>
              <span className="mx-2">/</span>
              <span className="text-slate-600">Reports &amp; Compliance</span>
            </nav>
            <h2 className="text-2xl font-bold text-[#1a237e]">Reports &amp; Compliance</h2>
            <p className="text-sm text-slate-500">Generate compliance documents and automated security briefings for MeitY.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-[#1a237e] text-[#1a237e] rounded-md text-sm font-bold hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-lg">calendar_clock</span>
              Schedule Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a237e] text-white rounded-md text-sm font-bold shadow-md hover:bg-[#0d1754] transition-colors">
              <span className="material-symbols-outlined text-lg">add_chart</span>
              Generate Report
            </button>
          </div>
        </div>
        <div className="mt-8 flex gap-1 bg-slate-100 p-1 rounded-lg w-max">
          <button 
            onClick={() => setActiveTab('cert-in')}
            className={`px-4 py-2 text-sm font-semibold rounded-md shadow-sm flex items-center gap-2 transition-all ${activeTab === 'cert-in' ? 'bg-[#1a237e] text-white' : 'text-slate-600 hover:text-[#1a237e] hover:bg-white'}`}
          >
            <span className="material-symbols-outlined text-base">verified_user</span>
            CERT-In Reports
          </button>
          <button 
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'daily' ? 'bg-[#1a237e] text-white' : 'text-slate-600 hover:text-[#1a237e] hover:bg-white'}`}
          >
            <span className="material-symbols-outlined text-base">newspaper</span>
            Daily Briefings
          </button>
          <button 
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'weekly' ? 'bg-[#1a237e] text-white' : 'text-slate-600 hover:text-[#1a237e] hover:bg-white'}`}
          >
            <span className="material-symbols-outlined text-base">date_range</span>
            Weekly Summary
          </button>
          <button 
            onClick={() => setActiveTab('incidents')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'incidents' ? 'bg-[#1a237e] text-white' : 'text-slate-600 hover:text-[#1a237e] hover:bg-white'}`}
          >
            <span className="material-symbols-outlined text-base">assignment_late</span>
            Incident Reports
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
        <div className="flex gap-6 h-full">
          <div className="w-2/3 flex flex-col gap-6">
            {/* Compliance Status */}
            <div className="bg-[#e8f5e9] border-l-[4px] border-[#2e7d32] p-4 rounded shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full text-[#2e7d32]">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <h3 className="text-[#2e7d32] font-bold text-sm uppercase tracking-wide">CERT-In Compliance: ACTIVE</h3>
                  <p className="text-xs text-green-800">All mandatory reporting requirements for the current quarter have been met.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-green-700 uppercase font-bold">Last Report Filed</p>
                <p className="text-sm font-semibold text-green-900 mono">24 Oct 2023, 14:30 IST</p>
              </div>
            </div>

            {/* Recent Filings Table */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex-1 flex flex-col">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-[#1a237e] text-lg">Recent Filings</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2 top-1.5 text-slate-400 text-lg">search</span>
                    <input className="pl-8 pr-3 py-1 text-xs border border-slate-300 rounded-md focus:ring-[#1a237e] focus:border-[#1a237e] w-48" placeholder="Search ID..." type="text" />
                  </div>
                  <button className="p-1 text-slate-500 hover:text-[#1a237e] border border-slate-300 rounded-md">
                    <span className="material-symbols-outlined text-lg">filter_list</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1a237e] text-white text-xs font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3 rounded-tl-lg">Report ID</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Reference</th>
                      <th className="px-6 py-3">Generated / Filed</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 rounded-tr-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { id: 'RPT-2026-0847', type: 'CERT-In', ref: '#INC-9921', date: 'Oct 24, 2023', time: '14:30 IST', status: 'Filed', statusColor: 'green' },
                      { id: 'RPT-2026-0846', type: 'Internal', ref: '--', date: 'Oct 24, 2023', time: '09:00 IST', status: 'Archived', statusColor: 'slate' },
                      { id: 'RPT-2026-0845', type: 'CERT-In', ref: '#INC-9918', date: 'Oct 23, 2023', time: '16:45 IST', status: 'Pending Approval', statusColor: 'amber', highlight: true },
                      { id: 'RPT-2026-0844', type: 'CERT-In', ref: '#INC-9915', date: 'Oct 22, 2023', time: '11:20 IST', status: 'Filed', statusColor: 'green' },
                      { id: 'RPT-2026-0843', type: 'Audit', ref: '--', date: 'Oct 20, 2023', time: '09:00 IST', status: 'Complete', statusColor: 'green' }
                    ].map((report) => (
                      <tr key={report.id} className={`${report.highlight ? 'bg-amber-50/40 hover:bg-amber-50' : 'hover:bg-slate-50'} transition-colors group`}>
                        <td className="px-6 py-3 font-medium text-[#1a237e] mono">{report.id}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            report.type === 'CERT-In' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                            report.type === 'Internal' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                            'bg-orange-50 text-orange-700 border-orange-100'
                          }`}>{report.type}</span>
                        </td>
                        <td className="px-6 py-3">
                          {report.ref === '--' ? <span className="text-slate-400 text-xs italic">--</span> : 
                          <a className="text-slate-500 hover:text-[#1a237e] underline decoration-slate-300 mono text-xs" href="#">{report.ref}</a>}
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex flex-col text-xs">
                            <span className="font-medium text-slate-700">{report.date}</span>
                            <span className="text-slate-400 text-[10px]">{report.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            report.statusColor === 'green' ? 'bg-green-50 text-green-700 border border-green-200' :
                            report.statusColor === 'amber' ? 'bg-amber-100 text-amber-700 border border-amber-200 animate-pulse' :
                            'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              report.statusColor === 'green' ? 'bg-green-600' :
                              report.statusColor === 'amber' ? 'bg-amber-600' :
                              'bg-slate-500'
                            }`}></span>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            {report.highlight ? (
                              <button className="text-[#1a237e] bg-white border border-[#1a237e] px-2 py-0.5 rounded text-xs font-bold hover:bg-[#1a237e] hover:text-white transition-colors">Review</button>
                            ) : (
                              <>
                                <button className="text-slate-500 hover:text-[#1a237e]" title="View"><span className="material-symbols-outlined text-lg">visibility</span></button>
                                <button className="text-slate-500 hover:text-[#1a237e]" title="Send"><span className="material-symbols-outlined text-lg">send</span></button>
                                <button className="text-slate-500 hover:text-[#1a237e]" title="Download"><span className="material-symbols-outlined text-lg">download</span></button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-lg flex justify-between items-center text-xs text-slate-500">
                <span>Showing 5 of 128 reports</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-slate-300 rounded bg-white hover:bg-slate-50">Previous</button>
                  <button className="px-3 py-1 border border-slate-300 rounded bg-white hover:bg-slate-50">Next</button>
                </div>
              </div>
            </div>

            {/* AI Daily Brief */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-[#1a237e] text-9xl">translate</span>
              </div>
              <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="font-bold text-[#1a237e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                  KAVACH AI Daily Security Brief
                </h3>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold uppercase">Latest Generated</span>
              </div>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="border-r border-slate-200 pr-6">
                  <h4 className="font-bold text-slate-800 text-sm mb-2 font-serif">दैनिक सुरक्षा सारांश (हिंदी)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-serif">
                    पिछले 24 घंटों में नेटवर्क गतिविधि सामान्य रही है। हालांकि, पोर्ट 443 पर संदिग्ध स्कैनिंग प्रयासों में मामूली वृद्धि देखी गई है। सभी महत्वपूर्ण प्रणालियाँ सुरक्षित और सक्रिय हैं। कोई बड़ी सुरक्षा उल्लंघन की सूचना नहीं है।
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">सुरक्षित</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">स्थिर</span>
                  </div>
                </div>
                <div className="pl-2">
                  <h4 className="font-bold text-slate-800 text-sm mb-2">Daily Security Summary (English)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Network activity has remained normal over the last 24 hours. However, a slight increase in suspicious scanning attempts on Port 443 was observed. All critical systems remain secure and operational. No major security breaches reported.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Secure</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Stable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Generate Sidebar */}
          <div className="w-1/3 space-y-6">
            <div className="bg-white border-l-[4px] border-l-[#1a237e] rounded-lg shadow-lg p-6 h-full flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#1a237e] flex items-center gap-2">
                  <span className="material-symbols-outlined">bolt</span>
                  Quick Generate
                </h3>
                <p className="text-xs text-slate-500 mt-1">Create a new report instantly based on templates.</p>
              </div>
              <form className="space-y-5 flex-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Report Type</label>
                  <select className="w-full border-slate-300 rounded-md text-sm focus:border-[#1a237e] focus:ring-[#1a237e]">
                    <option>CERT-In Incident Report</option>
                    <option>Weekly Compliance Summary</option>
                    <option>Ad-hoc Security Audit</option>
                    <option>Vendor Risk Assessment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Target Portal / Entity</label>
                  <select className="w-full border-slate-300 rounded-md text-sm focus:border-[#1a237e] focus:ring-[#1a237e]">
                    <option>National Informatics Centre (NIC)</option>
                    <option>Ministry of Finance</option>
                    <option>UIDAI</option>
                    <option>External - CERT-In</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Date Range</label>
                    <select className="w-full border-slate-300 rounded-md text-sm focus:border-[#1a237e] focus:ring-[#1a237e]">
                      <option>Last 24 Hours</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Format</label>
                    <select className="w-full border-slate-300 rounded-md text-sm focus:border-[#1a237e] focus:ring-[#1a237e]">
                      <option>PDF (Signed)</option>
                      <option>JSON (API)</option>
                      <option>CSV (Raw Data)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Language</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input defaultChecked className="form-radio text-[#1a237e] focus:ring-[#1a237e]" name="lang" type="radio" value="en" />
                      <span className="ml-2 text-sm text-slate-700">English</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input className="form-radio text-[#1a237e] focus:ring-[#1a237e]" name="lang" type="radio" value="hi" />
                      <span className="ml-2 text-sm text-slate-700">Hindi (हिंदी)</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input className="form-radio text-[#1a237e] focus:ring-[#1a237e]" name="lang" type="radio" value="both" />
                      <span className="ml-2 text-sm text-slate-700">Bilingual</span>
                    </label>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="w-full bg-[#1a237e] text-white font-bold py-3 px-4 rounded-md shadow-lg hover:bg-[#0d1754] transition-transform active:scale-[0.98] flex items-center justify-center gap-2" type="button">
                    <span className="material-symbols-outlined">auto_fix_high</span>
                    Generate Now
                  </button>
                </div>
              </form>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">AI Briefing Shortcuts</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded hover:bg-white hover:border-[#1a237e] transition-colors group">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-[#1a237e]">mic</span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-[#1a237e]">Generate Audio Briefing</span>
                    </div>
                    <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 rounded">MP3</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded hover:bg-white hover:border-[#1a237e] transition-colors group">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-[#1a237e]">mail</span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-[#1a237e]">Email Summary to Minister</span>
                    </div>
                    <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 rounded">Draft</span>
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

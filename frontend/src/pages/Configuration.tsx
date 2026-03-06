import React, { useState } from 'react';

export default function Configuration() {
  const [activeSection, setActiveSection] = useState('detection');

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white border-b border-slate-200 px-8 py-6 z-20">
        <div className="flex justify-between items-start">
          <div>
            <nav className="flex text-xs text-slate-400 font-medium mb-1">
              <a className="hover:text-[#1a237e]" href="#">Home</a>
              <span className="mx-2">/</span>
              <span className="text-slate-600">Configuration</span>
            </nav>
            <h2 className="text-2xl font-bold text-[#1a237e]">System Configuration</h2>
            <p className="text-sm text-slate-500">Manage detection rules, alert thresholds, and integration settings.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-[#b71c1c] bg-white border border-[#b71c1c] rounded shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Reset to Defaults
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-[#1a237e] opacity-50 cursor-not-allowed rounded shadow-sm flex items-center gap-2" disabled>
              <span className="material-symbols-outlined text-sm">save</span>
              Save All Changes
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden bg-slate-50 flex">
        {/* Sidebar Navigation */}
        <div className="w-[240px] flex-shrink-0 bg-white border-r border-slate-200 overflow-y-auto py-6">
          <nav className="flex flex-col">
            {[
              { id: 'detection', label: 'Detection Thresholds' },
              { id: 'alerts', label: 'Alert Configuration' },
              { id: 'portals', label: 'Portal Management' },
              { id: 'agents', label: 'Agent Settings' },
              { id: 'security', label: 'Security Policies' },
              { id: 'cert-in', label: 'CERT-In Integration' },
              { id: 'retention', label: 'Data Retention' }
            ].map((item) => (
              <a
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-6 py-3 text-sm font-medium cursor-pointer border-l-[3px] ${
                  activeSection === item.id
                    ? 'text-[#1a237e] bg-slate-50 border-[#1a237e] font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#1a237e] border-transparent'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Detection Thresholds */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="p-2 bg-indigo-50 text-[#1a237e] rounded-lg">
                <span className="material-symbols-outlined">tune</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a237e]">Detection Thresholds</h3>
                <p className="text-xs text-slate-500">Fine-tune ML models and rule-based triggers.</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* ML Anomaly Detection */}
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider border-l-4 border-[#1a237e] pl-3">ML Anomaly Detection</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Anomaly Score Threshold</label>
                      <span className="bg-[#1a237e] text-white text-xs font-bold px-2 py-0.5 rounded">0.60</span>
                    </div>
                    <input className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1a237e]" max="1" min="0" step="0.01" type="range" defaultValue="0.60" />
                    <p className="mt-2 text-xs text-slate-500">Scores above this value trigger a SEV-3 alert. Lower values increase sensitivity but may cause false positives.</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Isolation Forest Contamination</label>
                      <span className="bg-[#1a237e] text-white text-xs font-bold px-2 py-0.5 rounded">0.10</span>
                    </div>
                    <input className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1a237e]" max="0.5" min="0" step="0.01" type="range" defaultValue="0.10" />
                    <p className="mt-2 text-xs text-slate-500">Expected proportion of outliers in the dataset. Affects the decision boundary of the model.</p>
                  </div>
                </div>
              </div>

              {/* Brute Force Detection */}
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider border-l-4 border-[#b71c1c] pl-3">Brute Force Detection</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Failed attempts before alert</label>
                    <div className="flex items-center">
                      <button className="w-10 h-10 bg-white border border-slate-300 rounded-l hover:bg-slate-100 font-bold text-slate-600">-</button>
                      <input className="h-10 w-20 text-center border-y border-slate-300 text-sm font-bold text-[#1a237e] focus:ring-0" type="number" defaultValue="10" />
                      <button className="w-10 h-10 bg-white border border-slate-300 rounded-r hover:bg-slate-100 font-bold text-slate-600">+</button>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Time window (minutes)</label>
                    <div className="flex items-center">
                      <button className="w-10 h-10 bg-white border border-slate-300 rounded-l hover:bg-slate-100 font-bold text-slate-600">-</button>
                      <input className="h-10 w-20 text-center border-y border-slate-300 text-sm font-bold text-[#1a237e] focus:ring-0" type="number" defaultValue="5" />
                      <button className="w-10 h-10 bg-white border border-slate-300 rounded-r hover:bg-slate-100 font-bold text-slate-600">+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Civic Impact Multipliers */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-l-4 border-[#f57c00] pl-3">Civic Impact Multipliers</h4>
                  <a className="text-xs font-bold text-[#1a237e] hover:underline cursor-pointer" href="#">+ Add Portal</a>
                </div>
                <div className="bg-[#1a237e]/5 border border-[#1a237e]/20 rounded p-3 mb-4 flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#1a237e] text-lg mt-0.5">info</span>
                  <p className="text-xs text-[#1a237e]">
                    <strong>Impact Multipliers</strong> adjust the severity score of incidents based on the critical nature of the specific portal. High-impact portals trigger faster escalation.
                  </p>
                </div>
                <div className="border rounded-lg overflow-hidden border-slate-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-xs text-slate-500 font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-3">Portal ID</th>
                        <th className="px-4 py-3">Service Name</th>
                        <th className="px-4 py-3 text-center">Multiplier</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { id: 'election-commission', name: 'ECI Voter Portal', multiplier: '2.0x', color: 'red' },
                        { id: 'voter-auth-api', name: 'UIDAI Auth Service', multiplier: '2.0x', color: 'red' },
                        { id: 'gst-filing', name: 'GST Network', multiplier: '1.5x', color: 'orange' }
                      ].map((portal) => (
                        <tr key={portal.id} className="bg-white">
                          <td className="px-4 py-3 font-mono text-xs text-slate-600">{portal.id}</td>
                          <td className="px-4 py-3 font-medium text-slate-800">{portal.name}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                              portal.color === 'red' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-orange-50 text-orange-700 border-orange-100'
                            }`}>{portal.multiplier}</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button className="text-slate-400 hover:text-[#1a237e]">
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a237e]">Alert Configuration</h3>
                <p className="text-xs text-slate-500">Manage notification channels and routing logic.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Telegram Settings */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 mb-2">Telegram Bot Settings</h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Bot Token</label>
                    <input className="w-full text-sm border-slate-300 rounded focus:ring-[#1a237e] focus:border-[#1a237e] font-mono text-slate-600" type="password" defaultValue="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Chat ID (Admin Group)</label>
                    <div className="flex gap-2">
                      <input className="flex-1 text-sm border-slate-300 rounded focus:ring-[#1a237e] focus:border-[#1a237e] font-mono text-slate-600" type="text" defaultValue="-1001234567890" />
                      <button className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded border border-slate-200 hover:bg-slate-200">Send Test Alert</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2e7d32]">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Status: Connected</span>
                  </div>
                </div>

                {/* CERT-In Integration */}
                <div className="bg-slate-50 p-5 rounded border border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-[#f57c00]">security</span>
                    <h4 className="text-sm font-bold text-slate-800">CERT-In Integration</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs font-semibold text-slate-500 mb-2">Filing Mode</span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                          <input defaultChecked className="text-[#1a237e] focus:ring-[#1a237e]" name="filing_mode" type="radio" /> Auto
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                          <input className="text-[#1a237e] focus:ring-[#1a237e]" name="filing_mode" type="radio" /> Manual
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                          <input className="text-[#1a237e] focus:ring-[#1a237e]" name="filing_mode" type="radio" /> Hybrid
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                      <span className="text-sm font-medium text-slate-700">Mandatory 6-hr Reporting</span>
                      <button className="bg-[#1a237e] w-11 h-6 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a237e]">
                        <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition-transform"></span>
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Automatically files incident report to CERT-In if severity &gt; Critical.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

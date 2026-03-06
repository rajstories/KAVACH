import React, { useState } from 'react';

export default function UserManagement() {
  const [showModal, setShowModal] = useState(true);

  const users = [
    { name: 'Arjun Kumar', email: 'arjun.kumar@meity.gov.in', designation: 'Joint Secretary', ministry: 'MeitY', role: 'Super Admin', roleColor: 'amber', lastActive: 'Now', status: 'Active', statusColor: 'green', initial: 'AK', bgColor: 'indigo' },
    { name: 'Vikram Singh', email: 'vikram.singh@nic.in', designation: 'Director General', ministry: 'NIC', role: 'CISO', roleColor: 'purple', lastActive: '2h ago', status: 'Active', statusColor: 'green', initial: 'VS', bgColor: 'purple' },
    { name: 'Neha Patel', email: 'n.patel@cert-in.org.in', designation: 'Senior Analyst', ministry: 'CERT-In', role: 'SOC Analyst', roleColor: 'blue', lastActive: '14m ago', status: 'Active', statusColor: 'green', initial: 'NP', bgColor: 'blue' },
    { name: 'Rajesh Rao', email: 'rajesh.rao@mha.gov.in', designation: 'Deputy Secretary', ministry: 'MHA', role: 'Read Only', roleColor: 'slate', lastActive: '5d ago', status: 'Inactive', statusColor: 'slate', initial: 'RR', bgColor: 'slate' },
    { name: 'Manish Kumar', email: 'manish.k@dot.gov.in', designation: 'Technical Officer', ministry: 'DoT', role: 'SOC Analyst', roleColor: 'blue', lastActive: '2w ago', status: 'Suspended', statusColor: 'red', initial: 'MK', bgColor: 'red', suspended: true }
  ];

  return (
    <div className="flex flex-col h-full relative">
      <header className="bg-white border-b border-slate-200 px-8 py-6 z-20">
        <div className="flex justify-between items-start">
          <div>
            <nav className="flex text-xs text-slate-400 font-medium mb-1">
              <a className="hover:text-[#1a237e]" href="#">Home</a>
              <span className="mx-2">/</span>
              <span className="text-slate-600">User Management</span>
            </nav>
            <h2 className="text-2xl font-bold text-[#1a237e]">User Management</h2>
            <p className="text-sm text-slate-500">Manage SOC officer access and permissions</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#1a237e] rounded shadow-sm hover:bg-[#283593] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Add Officer
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { role: 'Super Admin', count: 2, icon: 'crown', color: 'amber' },
            { role: 'CISO', count: 3, icon: 'shield', color: 'purple' },
            { role: 'SOC Analyst', count: 8, icon: 'search', color: 'blue' },
            { role: 'Read Only', count: 4, icon: 'visibility', color: 'slate' }
          ].map((stat) => (
            <div key={stat.role} className="bg-white rounded-[12px] p-6 shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.role}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.count}</p>
                <p className="text-xs text-slate-400 mt-1">Users</p>
              </div>
              <div className={`w-12 h-12 rounded-full bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#1a237e] text-white text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Officer</th>
                  <th className="px-6 py-4">Designation</th>
                  <th className="px-6 py-4">Ministry</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Last Active</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {users.map((user) => (
                  <tr key={user.email} className={`${user.suspended ? 'bg-red-50/30' : ''} hover:bg-slate-50 transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-${user.bgColor}-100 text-${user.bgColor}-700 flex items-center justify-center text-xs font-bold`}>
                          {user.initial}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.designation}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">{user.ministry}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.roleColor === 'amber' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        user.roleColor === 'purple' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        user.roleColor === 'blue' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          user.lastActive === 'Now' ? 'bg-green-500' :
                          user.lastActive.includes('m') || user.lastActive.includes('h') ? 'bg-amber-400' :
                          'bg-slate-300'
                        }`}></span>
                        <span className="text-slate-600">{user.lastActive}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.statusColor === 'green' ? 'bg-green-50 text-green-700 border border-green-200' :
                        user.statusColor === 'red' ? 'bg-red-50 text-red-700 border border-red-200' :
                        'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-slate-400 hover:text-[#1a237e]" title="Edit">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        {user.suspended ? (
                          <button className="text-[#2e7d32] hover:text-green-700" title="Reactivate">
                            <span className="material-symbols-outlined text-[20px]">play_circle</span>
                          </button>
                        ) : (
                          <button className="text-slate-400 hover:text-amber-600" title="Suspend">
                            <span className="material-symbols-outlined text-[20px]">block</span>
                          </button>
                        )}
                        <button className="text-slate-400 hover:text-red-600" title="Remove">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-sm text-slate-500">Showing 1 to 5 of 17 officers</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50">Previous</button>
              <button className="px-3 py-1 bg-[#1a237e] border border-[#1a237e] rounded text-sm text-white hover:bg-[#283593]">1</button>
              <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50">2</button>
              <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50">3</button>
              <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </main>

      {/* Add Officer Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black/40 z-40 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-[560px] flex flex-col max-h-[90vh]">
            <div className="bg-[#1a237e] px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Add Government Officer</h3>
              <button onClick={() => setShowModal(false)} className="text-white/70 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                <input className="w-full border-slate-300 rounded-md shadow-sm focus:border-[#1a237e] focus:ring-[#1a237e] sm:text-sm" placeholder="e.g. Aditi Sharma" type="text" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Official Email</label>
                  <input className="w-full border-slate-300 rounded-md shadow-sm focus:border-[#1a237e] focus:ring-[#1a237e] sm:text-sm" placeholder="name@gov.in" type="email" />
                  <p className="text-[10px] text-slate-400 mt-1">Must be @gov.in or @nic.in</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Employee ID</label>
                  <input className="w-full border-slate-300 rounded-md shadow-sm focus:border-[#1a237e] focus:ring-[#1a237e] sm:text-sm" placeholder="GOV-XXXX" type="text" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Designation</label>
                  <input className="w-full border-slate-300 rounded-md shadow-sm focus:border-[#1a237e] focus:ring-[#1a237e] sm:text-sm" placeholder="e.g. Director" type="text" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Ministry / Department</label>
                  <select className="w-full border-slate-300 rounded-md shadow-sm focus:border-[#1a237e] focus:ring-[#1a237e] sm:text-sm">
                    <option>MeitY</option>
                    <option>MHA</option>
                    <option>DoT</option>
                    <option>CERT-In</option>
                    <option>NIC</option>
                    <option>MoD</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Assign Role</label>
                <div className="space-y-3">
                  {[
                    { id: 'admin', label: 'Super Admin', desc: 'Full system access, user management, and configuration control.' },
                    { id: 'ciso', label: 'CISO', desc: 'View all incidents, approve policies, and generate compliance reports.' },
                    { id: 'analyst', label: 'SOC Analyst', desc: 'Investigate alerts, triage incidents, and update threat intelligence.', checked: true },
                    { id: 'view', label: 'Read Only', desc: 'View dashboards and public reports only. No edit access.' }
                  ].map((role) => (
                    <div key={role.id} className="flex items-start">
                      <input defaultChecked={role.checked} className="h-4 w-4 mt-0.5 text-[#1a237e] focus:ring-[#1a237e] border-gray-300" id={`role-${role.id}`} name="role" type="radio" />
                      <label className="ml-3 block text-sm font-medium text-slate-700" htmlFor={`role-${role.id}`}>
                        {role.label} <span className="text-xs font-normal text-slate-500 block">{role.desc}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Access Expiry Date</label>
                <input className="w-full border-slate-300 rounded-md shadow-sm focus:border-[#1a237e] focus:ring-[#1a237e] sm:text-sm text-slate-600" type="date" />
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 rounded-b-lg flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-[#1a237e] rounded hover:bg-[#283593] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm">
                Create Account &amp; Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

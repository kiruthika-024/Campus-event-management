import React, { useState } from 'react';
import { CollegeEvent, ParticipantRegistration } from '../types/event';
import { Search, UserCheck, UserX, Plus, Download, Check, ShieldCheck, Mail, Phone, Building } from 'lucide-react';

interface RegistrationDeskProps {
  event: CollegeEvent;
  onUpdateEvent: (updated: CollegeEvent) => void;
}

export const RegistrationDesk: React.FC<RegistrationDeskProps> = ({ event, onUpdateEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEvent, setFilterEvent] = useState('all');
  const [filterCheckIn, setFilterCheckIn] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New registration form state
  const [newReg, setNewReg] = useState<Partial<ParticipantRegistration>>({
    name: '',
    rollNo: '',
    email: '',
    phone: '',
    college: event.college,
    eventRegistered: event.competitions?.[0]?.name || 'General Delegate',
    teamName: '',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    kitCollected: true,
  });

  const registrations = event.registrations || [];

  const totalRegistered = registrations.length;
  const checkedInCount = registrations.filter((r) => r.checkInStatus === 'checked_in').length;
  const kitsDispatched = registrations.filter((r) => r.kitCollected).length;
  const checkInRate = totalRegistered > 0 ? Math.round((checkedInCount / totalRegistered) * 100) : 0;

  const filteredRegistrations = registrations.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.name.toLowerCase().includes(q) ||
      r.rollNo.toLowerCase().includes(q) ||
      r.college.toLowerCase().includes(q) ||
      r.teamName.toLowerCase().includes(q) ||
      r.phone.includes(q);

    const matchesEvent = filterEvent === 'all' || r.eventRegistered === filterEvent;
    const matchesCheckIn = filterCheckIn === 'all' || r.checkInStatus === filterCheckIn;
    const matchesPayment = filterPayment === 'all' || r.paymentStatus === filterPayment;

    return matchesSearch && matchesEvent && matchesCheckIn && matchesPayment;
  });

  const handleToggleCheckIn = (regId: string) => {
    const now = new Date();
    const timeString = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const updated = registrations.map((r) => {
      if (r.id === regId) {
        const nextStatus = r.checkInStatus === 'checked_in' ? 'pending' : 'checked_in';
        return {
          ...r,
          checkInStatus: nextStatus as 'checked_in' | 'pending',
          checkedInAt: nextStatus === 'checked_in' ? timeString : undefined,
        };
      }
      return r;
    });

    onUpdateEvent({
      ...event,
      registrations: updated,
    });
  };

  const handleToggleKit = (regId: string) => {
    const updated = registrations.map((r) => {
      if (r.id === regId) {
        return { ...r, kitCollected: !r.kitCollected };
      }
      return r;
    });
    onUpdateEvent({ ...event, registrations: updated });
  };

  const handleTogglePayment = (regId: string) => {
    const updated = registrations.map((r) => {
      if (r.id === regId) {
        const nextPayment = r.paymentStatus === 'paid' ? 'pending' : 'paid';
        return { ...r, paymentStatus: nextPayment as 'paid' | 'pending' };
      }
      return r;
    });
    onUpdateEvent({ ...event, registrations: updated });
  };

  const handleCreateRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReg.name || !newReg.rollNo) return;

    const now = new Date();
    const timeString = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const created: ParticipantRegistration = {
      id: `reg-${Date.now()}`,
      name: newReg.name || 'Student Participant',
      rollNo: newReg.rollNo || 'REG-000',
      email: newReg.email || 'student@college.edu',
      phone: newReg.phone || '+91 90000 00000',
      college: newReg.college || event.college,
      eventRegistered: newReg.eventRegistered || 'General Delegate',
      teamName: newReg.teamName || 'Solo',
      paymentStatus: (newReg.paymentStatus as any) || 'paid',
      checkInStatus: (newReg.checkInStatus as any) || 'checked_in',
      checkedInAt: newReg.checkInStatus === 'checked_in' ? timeString : undefined,
      kitCollected: newReg.kitCollected || false,
    };

    onUpdateEvent({
      ...event,
      registrations: [created, ...registrations],
      attendeeStats: {
        ...event.attendeeStats,
        actualFootfall: (event.attendeeStats.actualFootfall || 0) + 1,
      },
    });

    setShowAddModal(false);
    setNewReg({
      name: '',
      rollNo: '',
      email: '',
      phone: '',
      college: event.college,
      eventRegistered: event.competitions?.[0]?.name || 'General Delegate',
      teamName: '',
      paymentStatus: 'paid',
      checkInStatus: 'checked_in',
      kitCollected: true,
    });
  };

  const handleExportCSV = () => {
    const headers = [
      'Registration ID',
      'Name',
      'Roll Number',
      'College',
      'Event Track',
      'Team Name',
      'Payment Status',
      'Check-in Status',
      'Check-in Timestamp',
      'Kit Collected',
    ];

    const rows = registrations.map((r) => [
      r.id,
      `"${r.name}"`,
      `"${r.rollNo}"`,
      `"${r.college}"`,
      `"${r.eventRegistered}"`,
      `"${r.teamName}"`,
      r.paymentStatus,
      r.checkInStatus,
      `"${r.checkedInAt || 'Not Checked In'}"`,
      r.kitCollected ? 'Yes' : 'No',
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}_registrations_roster.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Control Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Participant Registration Desk &amp; Check-In Scanner
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time campus desk operations: fast identity verification, welcome kit disbursement, and gate check-in logging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Roster</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>On-Spot Registration</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-500 block">Total Registrations</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {totalRegistered}
            </span>
            <span className="text-xs text-slate-500">Participants</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-500 block">Checked In at Desk</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700 font-mono tabular-nums">
              {checkedInCount}
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              ({checkInRate}%)
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-500 block">Pending Arrivals</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-700 font-mono tabular-nums">
              {totalRegistered - checkedInCount}
            </span>
            <span className="text-xs text-slate-500">Awaiting Gate Check</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-500 block">Kit Bags Dispatched</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {kitsDispatched}
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              / {totalRegistered}
            </span>
          </div>
        </div>
      </div>

      {/* Search & Multi-Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[260px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by participant name, roll no, college, team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Event:</span>
            <select
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-slate-50 focus:outline-none max-w-[160px] truncate"
            >
              <option value="all">All Tracks</option>
              {Array.from(new Set(registrations.map((r) => r.eventRegistered))).map((evName, idx) => (
                <option key={idx} value={evName}>
                  {evName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Gate Status:</span>
            <select
              value={filterCheckIn}
              onChange={(e) => setFilterCheckIn(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-slate-50 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="checked_in">Checked In</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Fee:</span>
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-slate-50 focus:outline-none"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Participant Roster Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Delegate Name &amp; Roll</th>
                <th className="py-3 px-4">College / University</th>
                <th className="py-3 px-4">Event Track &amp; Team</th>
                <th className="py-3 px-4">Fee Status</th>
                <th className="py-3 px-4">Kit Bag</th>
                <th className="py-3 px-4">Check-In Status</th>
                <th className="py-3 px-4 text-right">Desk Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{reg.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{reg.rollNo} · {reg.phone}</span>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    <span className="truncate block max-w-[200px]" title={reg.college}>
                      {reg.college}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{reg.eventRegistered}</span>
                    <span className="text-[11px] text-slate-500">Team: {reg.teamName || 'Solo'}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePayment(reg.id)}
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${
                        reg.paymentStatus === 'paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {reg.paymentStatus === 'paid' ? 'Paid ✓' : 'Payment Due'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleKit(reg.id)}
                      className={`text-[11px] font-medium px-2 py-0.5 rounded border cursor-pointer ${
                        reg.kitCollected
                          ? 'bg-slate-100 text-slate-800 border-slate-300'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {reg.kitCollected ? 'Issued ✓' : 'Not Claimed'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                      reg.checkInStatus === 'checked_in'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {reg.checkInStatus === 'checked_in' ? 'Checked In' : 'Pending'}
                    </span>
                    {reg.checkedInAt && (
                      <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                        {reg.checkedInAt}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleToggleCheckIn(reg.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        reg.checkInStatus === 'checked_in'
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      {reg.checkInStatus === 'checked_in' ? 'Undo Check-In' : 'Check In Now'}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRegistrations.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-slate-500">
                    No registrations match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* On-Spot Registration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form onSubmit={handleCreateRegistration} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">On-Spot Participant Registration Desk</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Student Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={newReg.name}
                  onChange={(e) => setNewReg({ ...newReg, name: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">College Roll / Reg No *</label>
                <input
                  type="text"
                  placeholder="e.g. 22CSE041"
                  value={newReg.rollNo}
                  onChange={(e) => setNewReg({ ...newReg, rollNo: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="student@college.edu"
                  value={newReg.email}
                  onChange={(e) => setNewReg({ ...newReg, email: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 00000"
                  value={newReg.phone}
                  onChange={(e) => setNewReg({ ...newReg, phone: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">College / University</label>
                <input
                  type="text"
                  placeholder="e.g. Kanpur Institute of Technology"
                  value={newReg.college}
                  onChange={(e) => setNewReg({ ...newReg, college: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Event Track</label>
                <select
                  value={newReg.eventRegistered}
                  onChange={(e) => setNewReg({ ...newReg, eventRegistered: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                >
                  {(event.competitions || []).map((comp) => (
                    <option key={comp.id} value={comp.name}>
                      {comp.name}
                    </option>
                  ))}
                  <option value="General Delegate">General Delegate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Team Name (if participating as team)</label>
              <input
                type="text"
                placeholder="e.g. Team ByteCrafters (or leave empty if solo)"
                value={newReg.teamName}
                onChange={(e) => setNewReg({ ...newReg, teamName: e.target.value })}
                className="w-full border border-slate-200 rounded p-2 bg-white"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newReg.kitCollected}
                  onChange={(e) => setNewReg({ ...newReg, kitCollected: e.target.checked })}
                  className="rounded border-slate-300"
                />
                <span className="text-slate-700 font-medium">Issue Welcome Kit Bag &amp; Lanyard</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newReg.checkInStatus === 'checked_in'}
                  onChange={(e) => setNewReg({ ...newReg, checkInStatus: e.target.checked ? 'checked_in' : 'pending' })}
                  className="rounded border-slate-300"
                />
                <span className="text-slate-700 font-medium">Check-in at gate immediately</span>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                Complete On-Spot Registration
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

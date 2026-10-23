import React, { useState } from 'react';
import { CollegeEvent, SubCompetition } from '../types/event';
import { Plus, Trophy, Users, MapPin, Phone, Award, Check, Clock, Search, Filter } from 'lucide-react';

interface CompetitionsManagerProps {
  event: CollegeEvent;
  onUpdateEvent: (updated: CollegeEvent) => void;
}

export const CompetitionsManager: React.FC<CompetitionsManagerProps> = ({ event, onUpdateEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedComp, setSelectedComp] = useState<SubCompetition | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeclareWinnersModal, setShowDeclareWinnersModal] = useState(false);

  // New competition form state
  const [newComp, setNewComp] = useState<Partial<SubCompetition>>({
    name: '',
    category: 'coding',
    venue: '',
    schedule: '',
    teamSize: '2-4 Members',
    maxTeams: 50,
    registeredTeams: 0,
    prizePool: 30000,
    coordinatorName: '',
    coordinatorPhone: '',
    status: 'open',
    description: '',
    rulebook: ['Follow all standard college ethics and academic integrity policies.'],
    winners: []
  });

  // Winner declaration form state
  const [winner1, setWinner1] = useState({ teamName: '', college: '', prize: 0 });
  const [winner2, setWinner2] = useState({ teamName: '', college: '', prize: 0 });
  const [winner3, setWinner3] = useState({ teamName: '', college: '', prize: 0 });

  const filteredCompetitions = (event.competitions || []).filter((comp) => {
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.coordinatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || comp.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateComp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComp.name) return;

    const created: SubCompetition = {
      id: `comp-${Date.now()}`,
      name: newComp.name || 'Untitled Event',
      category: (newComp.category as any) || 'general',
      venue: newComp.venue || event.venue,
      schedule: newComp.schedule || 'TBD',
      teamSize: newComp.teamSize || 'Solo / Team',
      maxTeams: Number(newComp.maxTeams) || 50,
      registeredTeams: Number(newComp.registeredTeams) || 0,
      prizePool: Number(newComp.prizePool) || 0,
      coordinatorName: newComp.coordinatorName || 'Student Coordinator',
      coordinatorPhone: newComp.coordinatorPhone || '+91 99999 00000',
      status: (newComp.status as any) || 'open',
      description: newComp.description || '',
      rulebook: newComp.rulebook || ['Standard event guidelines apply.'],
      winners: []
    };

    onUpdateEvent({
      ...event,
      competitions: [created, ...(event.competitions || [])],
      attendeeStats: {
        ...event.attendeeStats,
        totalCompetitions: (event.competitions || []).length + 1
      }
    });

    setShowAddModal(false);
    setNewComp({
      name: '',
      category: 'coding',
      venue: '',
      schedule: '',
      teamSize: '2-4 Members',
      maxTeams: 50,
      registeredTeams: 0,
      prizePool: 30000,
      coordinatorName: '',
      coordinatorPhone: '',
      status: 'open',
      description: '',
      rulebook: ['Follow all standard college ethics and academic integrity policies.'],
      winners: []
    });
  };

  const handleSaveWinners = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComp) return;

    const updatedWinners: SubCompetition['winners'] = [];
    if (winner1.teamName.trim()) {
      updatedWinners.push({ place: '1st', teamName: winner1.teamName, college: winner1.college, prize: Number(winner1.prize) });
    }
    if (winner2.teamName.trim()) {
      updatedWinners.push({ place: '2nd', teamName: winner2.teamName, college: winner2.college, prize: Number(winner2.prize) });
    }
    if (winner3.teamName.trim()) {
      updatedWinners.push({ place: '3rd', teamName: winner3.teamName, college: winner3.college, prize: Number(winner3.prize) });
    }

    const updatedList = (event.competitions || []).map((c) =>
      c.id === selectedComp.id ? { ...c, winners: updatedWinners, status: 'completed' as const } : c
    );

    onUpdateEvent({
      ...event,
      competitions: updatedList
    });

    setShowDeclareWinnersModal(false);
    setSelectedComp((prev) => prev ? { ...prev, winners: updatedWinners, status: 'completed' } : null);
  };

  const handleUpdateStatus = (compId: string, nextStatus: SubCompetition['status']) => {
    const updatedList = (event.competitions || []).map((c) =>
      c.id === compId ? { ...c, status: nextStatus } : c
    );
    onUpdateEvent({
      ...event,
      competitions: updatedList
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Control Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Competitions &amp; Tracks Roster
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Active track management, registration tracking, rules enforcement, and podium winner declarations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Competition / Track</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search competitions, venues, coordinators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="coding">Coding &amp; Hackathons</option>
              <option value="robotics">Robotics &amp; Hardware</option>
              <option value="cultural">Cultural &amp; Music</option>
              <option value="gaming">Gaming &amp; Esports</option>
              <option value="literary">Literary &amp; Quizzing</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="open">Registration Open</option>
              <option value="live">Live in Progress</option>
              <option value="judging">Under Judging</option>
              <option value="completed">Results Declared</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Competitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompetitions.map((comp) => (
          <div
            key={comp.id}
            className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs"
          >
            <div>
              {/* Header tags: Category & Status */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="uppercase tracking-wider font-semibold text-[11px] text-slate-600">
                  {comp.category}
                </span>

                <select
                  value={comp.status}
                  onChange={(e) => handleUpdateStatus(comp.id, e.target.value as any)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded border focus:outline-none cursor-pointer ${
                    comp.status === 'live'
                      ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                      : comp.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : comp.status === 'judging'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <option value="open">Registration Open</option>
                  <option value="live">Live Now</option>
                  <option value="judging">Judging</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">
                {comp.name}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                {comp.description}
              </p>

              {/* Meta information strip */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Venue:</span>
                  <span className="font-medium text-slate-800 truncate max-w-[180px]">{comp.venue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Schedule:</span>
                  <span className="font-mono tabular-nums text-slate-800">{comp.schedule}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Registered Teams:</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900">
                    {comp.registeredTeams} / {comp.maxTeams} Teams
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Prize Pool:</span>
                  <span className="font-mono tabular-nums font-bold text-emerald-700">
                    ₹{comp.prizePool.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Winners Podium Box if Declared */}
              {comp.winners && comp.winners.length > 0 && (
                <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3 text-xs mb-4 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-600" />
                    <span>Official Podium Winners</span>
                  </span>
                  {comp.winners.map((w, idx) => (
                    <div key={idx} className="flex justify-between items-center text-slate-700">
                      <span><strong>{w.place}:</strong> {w.teamName} ({w.college})</span>
                      <span className="font-mono font-semibold text-amber-900">₹{w.prize.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedComp(comp)}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 underline underline-offset-2"
              >
                Inspect Rules &amp; Details
              </button>

              <button
                onClick={() => {
                  setSelectedComp(comp);
                  if (comp.winners && comp.winners[0]) {
                    setWinner1(comp.winners[0]);
                  } else {
                    setWinner1({ teamName: '', college: '', prize: Math.round(comp.prizePool * 0.6) });
                  }
                  if (comp.winners && comp.winners[1]) {
                    setWinner2(comp.winners[1]);
                  } else {
                    setWinner2({ teamName: '', college: '', prize: Math.round(comp.prizePool * 0.4) });
                  }
                  setShowDeclareWinnersModal(true);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-md hover:bg-amber-100 transition-colors"
              >
                <Award className="w-3 h-3 text-amber-600" />
                <span>{comp.winners && comp.winners.length > 0 ? 'Edit Winners' : 'Declare Winners'}</span>
              </button>
            </div>
          </div>
        ))}

        {filteredCompetitions.length === 0 && (
          <div className="col-span-full py-12 text-center text-xs text-slate-500 bg-white border border-slate-200 rounded-xl">
            No competitions found matching filters. Click "+ Add Competition" to introduce a new track.
          </div>
        )}
      </div>

      {/* Inspect Competition Modal */}
      {selectedComp && !showDeclareWinnersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase font-semibold text-slate-500">{selectedComp.category}</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedComp.name}</h3>
              </div>
              <button onClick={() => setSelectedComp(null)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedComp.description}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Venue:</span>
                <span className="font-semibold text-slate-800">{selectedComp.venue}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Schedule:</span>
                <span className="font-mono text-slate-800">{selectedComp.schedule}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Coordinator Contact:</span>
                <span className="font-semibold text-slate-800">{selectedComp.coordinatorName} ({selectedComp.coordinatorPhone})</span>
              </div>
              <div>
                <span className="text-slate-500 block">Prize Pool:</span>
                <span className="font-mono font-bold text-emerald-700">₹{selectedComp.prizePool.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Official Rulebook &amp; Judging Criteria
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside bg-slate-50 p-3 rounded-lg border border-slate-200">
                {selectedComp.rulebook.map((rule, idx) => (
                  <li key={idx} className="leading-relaxed">{rule}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedComp(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Declare Winners Modal */}
      {showDeclareWinnersModal && selectedComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form onSubmit={handleSaveWinners} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Declare Podium Winners</h3>
                <p className="text-xs text-slate-500">{selectedComp.name} · Prize Pool: ₹{selectedComp.prizePool.toLocaleString()}</p>
              </div>
              <button type="button" onClick={() => setShowDeclareWinnersModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              {/* 1st Place */}
              <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-lg space-y-2">
                <span className="font-bold text-amber-900 block">🥇 1st Place Winner</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Winning Team / Candidate Name"
                    value={winner1.teamName}
                    onChange={(e) => setWinner1({ ...winner1, teamName: e.target.value })}
                    className="border border-slate-200 rounded p-1.5 bg-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="College / Institution"
                    value={winner1.college}
                    onChange={(e) => setWinner1({ ...winner1, college: e.target.value })}
                    className="border border-slate-200 rounded p-1.5 bg-white"
                    required
                  />
                </div>
                <input
                  type="number"
                  placeholder="Cash Prize (INR)"
                  value={winner1.prize}
                  onChange={(e) => setWinner1({ ...winner1, prize: parseInt(e.target.value, 10) || 0 })}
                  className="w-full border border-slate-200 rounded p-1.5 bg-white font-mono"
                  required
                />
              </div>

              {/* 2nd Place */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-800 block">🥈 2nd Place Winner</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Runner Up Team Name"
                    value={winner2.teamName}
                    onChange={(e) => setWinner2({ ...winner2, teamName: e.target.value })}
                    className="border border-slate-200 rounded p-1.5 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="College / Institution"
                    value={winner2.college}
                    onChange={(e) => setWinner2({ ...winner2, college: e.target.value })}
                    className="border border-slate-200 rounded p-1.5 bg-white"
                  />
                </div>
                <input
                  type="number"
                  placeholder="Cash Prize (INR)"
                  value={winner2.prize}
                  onChange={(e) => setWinner2({ ...winner2, prize: parseInt(e.target.value, 10) || 0 })}
                  className="w-full border border-slate-200 rounded p-1.5 bg-white font-mono"
                />
              </div>

              {/* 3rd Place */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-800 block">🥉 3rd Place Winner (Optional)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="3rd Place Team Name"
                    value={winner3.teamName}
                    onChange={(e) => setWinner3({ ...winner3, teamName: e.target.value })}
                    className="border border-slate-200 rounded p-1.5 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="College / Institution"
                    value={winner3.college}
                    onChange={(e) => setWinner3({ ...winner3, college: e.target.value })}
                    className="border border-slate-200 rounded p-1.5 bg-white"
                  />
                </div>
                <input
                  type="number"
                  placeholder="Cash Prize (INR)"
                  value={winner3.prize}
                  onChange={(e) => setWinner3({ ...winner3, prize: parseInt(e.target.value, 10) || 0 })}
                  className="w-full border border-slate-200 rounded p-1.5 bg-white font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDeclareWinnersModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                Record Official Winners
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add New Competition Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form onSubmit={handleCreateComp} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add New Competition / Event Track</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Event Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Blind Coding Sprint"
                  value={newComp.name}
                  onChange={(e) => setNewComp({ ...newComp, name: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={newComp.category}
                  onChange={(e) => setNewComp({ ...newComp, category: e.target.value as any })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                >
                  <option value="coding">Coding &amp; Software</option>
                  <option value="robotics">Robotics &amp; Hardware</option>
                  <option value="cultural">Cultural &amp; Music</option>
                  <option value="gaming">Gaming &amp; Esports</option>
                  <option value="literary">Literary &amp; Debate</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Venue / Room</label>
                <input
                  type="text"
                  placeholder="e.g. Lab 3 or Amphitheater"
                  value={newComp.venue}
                  onChange={(e) => setNewComp({ ...newComp, venue: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Schedule Slot</label>
                <input
                  type="text"
                  placeholder="e.g. Day 2 02:00 PM - 05:00 PM"
                  value={newComp.schedule}
                  onChange={(e) => setNewComp({ ...newComp, schedule: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Team Size</label>
                <input
                  type="text"
                  placeholder="e.g. 2-4 Members"
                  value={newComp.teamSize}
                  onChange={(e) => setNewComp({ ...newComp, teamSize: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Max Teams</label>
                <input
                  type="number"
                  value={newComp.maxTeams}
                  onChange={(e) => setNewComp({ ...newComp, maxTeams: parseInt(e.target.value, 10) || 0 })}
                  className="w-full border border-slate-200 rounded p-2 bg-white font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Prize Pool (INR)</label>
                <input
                  type="number"
                  value={newComp.prizePool}
                  onChange={(e) => setNewComp({ ...newComp, prizePool: parseInt(e.target.value, 10) || 0 })}
                  className="w-full border border-slate-200 rounded p-2 bg-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Coordinator Name</label>
                <input
                  type="text"
                  placeholder="Student Coordinator"
                  value={newComp.coordinatorName}
                  onChange={(e) => setNewComp({ ...newComp, coordinatorName: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Coordinator Phone</label>
                <input
                  type="text"
                  placeholder="+91 98765 00000"
                  value={newComp.coordinatorPhone}
                  onChange={(e) => setNewComp({ ...newComp, coordinatorPhone: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Short Description</label>
              <textarea
                rows={2}
                placeholder="Overview of the competition..."
                value={newComp.description}
                onChange={(e) => setNewComp({ ...newComp, description: e.target.value })}
                className="w-full border border-slate-200 rounded p-2 bg-white"
              />
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
                Create Track
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

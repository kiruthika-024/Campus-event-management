import React, { useState } from 'react';
import { CollegeEvent, MilestoneItem, RunOfShowItem, RiskItem } from '../types/event';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Sparkles, 
  ShieldAlert, 
  Layers, 
  Flame,
  Check,
  Target
} from 'lucide-react';

interface PlanningTabProps {
  event: CollegeEvent;
  onUpdateEvent: (updated: CollegeEvent) => void;
  onOpenAiAdvisor: () => void;
}

export const PlanningTab: React.FC<PlanningTabProps> = ({
  event,
  onUpdateEvent,
  onOpenAiAdvisor,
}) => {
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [milestonePhaseIndex, setMilestonePhaseIndex] = useState(0);
  const [newMilestone, setNewMilestone] = useState({
    task: '',
    owner: '',
    priority: 'high' as 'high' | 'medium' | 'low',
  });

  const [showAddRunOfShow, setShowAddRunOfShow] = useState(false);
  const [newRunOfShow, setNewRunOfShow] = useState({
    time: '',
    day: 'Day 1',
    event: '',
    venue: '',
    lead: '',
    notes: '',
  });

  const [activeDayFilter, setActiveDayFilter] = useState<string>('all');

  const toggleMilestone = (phaseIdx: number, milestoneId: string) => {
    const updatedPhases = [...event.timeline];
    const targetMilestone = updatedPhases[phaseIdx].milestones.find((m) => m.id === milestoneId);
    if (targetMilestone) {
      targetMilestone.status = targetMilestone.status === 'completed' ? 'pending' : 'completed';
      onUpdateEvent({ ...event, timeline: updatedPhases });
    }
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestone.task) return;

    const updatedPhases = [...event.timeline];
    if (updatedPhases[milestonePhaseIndex]) {
      updatedPhases[milestonePhaseIndex].milestones.push({
        id: `m-${Date.now()}`,
        task: newMilestone.task,
        owner: newMilestone.owner || 'Core Committee',
        priority: newMilestone.priority,
        status: 'pending',
      });
      onUpdateEvent({ ...event, timeline: updatedPhases });
      setNewMilestone({ task: '', owner: '', priority: 'high' });
      setShowAddMilestone(false);
    }
  };

  const handleAddRunOfShow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRunOfShow.event || !newRunOfShow.time) return;

    const newItem: RunOfShowItem = {
      id: `ros-${Date.now()}`,
      time: newRunOfShow.time,
      day: newRunOfShow.day,
      event: newRunOfShow.event,
      venue: newRunOfShow.venue || event.venue,
      lead: newRunOfShow.lead || 'Event Coordinator',
      status: 'scheduled',
      notes: newRunOfShow.notes,
    };

    onUpdateEvent({
      ...event,
      runOfShow: [...event.runOfShow, newItem],
    });
    setNewRunOfShow({ time: '', day: 'Day 1', event: '', venue: '', lead: '', notes: '' });
    setShowAddRunOfShow(false);
  };

  const filteredRunOfShow = activeDayFilter === 'all'
    ? event.runOfShow
    : event.runOfShow.filter((item) => item.day.toLowerCase() === activeDayFilter.toLowerCase());

  return (
    <div className="space-y-12 pb-16">
      {/* 01. Strategic Blueprint & Next Edition Concept */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              01. Next Edition Strategic Blueprint &amp; Vision
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>Next Edition Roadmap</span>
              <span aria-hidden="true">·</span>
              <span>{event.college}</span>
              <span aria-hidden="true">·</span>
              <span>Target: {event.nextEdition.targetDates}</span>
            </div>
          </div>

          <button
            onClick={onOpenAiAdvisor}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Theme &amp; Pitch Generator</span>
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Proposed Master Theme &amp; Identity
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {event.nextEdition.proposedTheme}
              </h3>
            </div>

            {/* Strategic improvements over last edition */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-slate-900" />
                <span>Operational Fixes Inherited from Previous Edition Post-Mortem</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-4">
                {event.nextEdition.strategicImprovements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* New Flagship Attractions */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Newly Introduced Flagship Attractions &amp; Tracks</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.nextEdition.newAttractions.map((attr, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-slate-200 rounded-lg text-xs"
                  >
                    <span className="font-semibold text-slate-900 block mb-1">
                      Attraction 0{idx + 1}
                    </span>
                    <p className="text-slate-600 leading-relaxed">{attr}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Target KPIs for next edition */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Next Edition Target Milestones
              </h4>

              <div className="space-y-3 text-xs">
                <div className="bg-white border border-slate-200 rounded p-3">
                  <span className="text-slate-500 block">Target Attendee Footfall</span>
                  <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                    {event.nextEdition.targetFootfall.toLocaleString()}+
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Across 3 days from 60+ institutions</span>
                </div>

                <div className="bg-white border border-slate-200 rounded p-3">
                  <span className="text-slate-500 block">Target Sponsorship Raised</span>
                  <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                    ₹{(event.nextEdition.sponsorshipTarget / 100000).toFixed(1)} Lakhs
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Title, Powered-by &amp; Track Partners</span>
                </div>

                <div className="bg-white border border-slate-200 rounded p-3">
                  <span className="text-slate-500 block">Total Projected Operating Budget</span>
                  <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                    ₹{(event.nextEdition.targetBudget / 100000).toFixed(1)} Lakhs
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Production, Prizes, Staging &amp; Security</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-4 text-[11px] text-slate-500">
              Approved by Student Affairs Committee &amp; Faculty Advisory Board
            </div>
          </div>
        </div>
      </section>

      {/* 02. Phased Milestone Execution Roadmap */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              02. Phased Milestone Execution Roadmap
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              From T-180 chartering to Day-of-Event execution. Click any milestone to toggle status.
            </p>
          </div>

          <button
            onClick={() => setShowAddMilestone(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Roadmap Task</span>
          </button>
        </div>

        {/* Form to add milestone */}
        {showAddMilestone && (
          <form onSubmit={handleAddMilestone} className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Add New Milestone / Operational Task
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={milestonePhaseIndex}
                onChange={(e) => setMilestonePhaseIndex(parseInt(e.target.value, 10))}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
              >
                {event.timeline.map((phase, idx) => (
                  <option key={idx} value={idx}>
                    {phase.phase}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Task Description (e.g., Secure sound vendor SLA)"
                value={newMilestone.task}
                onChange={(e) => setNewMilestone({ ...newMilestone, task: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white sm:col-span-2 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Task Owner (e.g. Sponsorship Head / Tech Lead)"
                value={newMilestone.owner}
                onChange={(e) => setNewMilestone({ ...newMilestone, owner: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
              />
              <select
                value={newMilestone.priority}
                onChange={(e) => setNewMilestone({ ...newMilestone, priority: e.target.value as any })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddMilestone(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800"
              >
                Add Milestone
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 space-y-8">
          {event.timeline.map((phase, phaseIdx) => (
            <div key={phaseIdx} className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">
                  {phase.phase}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  {phase.timeframe}
                </span>
              </div>

              <div className="space-y-2">
                {phase.milestones.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(phaseIdx, m.id)}
                    className="flex items-center justify-between gap-4 p-3 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        m.status === 'completed'
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'border-slate-300 bg-white'
                      }`}>
                        {m.status === 'completed' && <Check className="w-3 h-3" />}
                      </div>

                      <span className={`font-medium ${
                        m.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'
                      }`}>
                        {m.task}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-slate-500">{m.owner}</span>
                      <span className={`font-semibold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded ${
                        m.priority === 'high' 
                          ? 'bg-rose-50 text-rose-700' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {m.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03. Multi-Stage Master Run of Show */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              03. Master Run of Show &amp; Stage Schedule
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Minute-by-minute execution schedule across campus auditoriums, open stages, and labs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter by Day */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
              <button
                onClick={() => setActiveDayFilter('all')}
                className={`px-2.5 py-1 rounded font-medium ${
                  activeDayFilter === 'all' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'
                }`}
              >
                All Days
              </button>
              <button
                onClick={() => setActiveDayFilter('day 1')}
                className={`px-2.5 py-1 rounded font-medium ${
                  activeDayFilter === 'day 1' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'
                }`}
              >
                Day 1
              </button>
              <button
                onClick={() => setActiveDayFilter('day 2')}
                className={`px-2.5 py-1 rounded font-medium ${
                  activeDayFilter === 'day 2' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'
                }`}
              >
                Day 2
              </button>
              <button
                onClick={() => setActiveDayFilter('day 3')}
                className={`px-2.5 py-1 rounded font-medium ${
                  activeDayFilter === 'day 3' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'
                }`}
              >
                Day 3
              </button>
            </div>

            <button
              onClick={() => setShowAddRunOfShow(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Stage Event</span>
            </button>
          </div>
        </div>

        {/* Modal form to add Run of Show */}
        {showAddRunOfShow && (
          <form onSubmit={handleAddRunOfShow} className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Add Run of Show Schedule Item
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={newRunOfShow.day}
                onChange={(e) => setNewRunOfShow({ ...newRunOfShow, day: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
              >
                <option value="Day 1">Day 1</option>
                <option value="Day 2">Day 2</option>
                <option value="Day 3">Day 3</option>
              </select>

              <input
                type="text"
                placeholder="Time Window (e.g. 10:00 AM - 01:00 PM)"
                value={newRunOfShow.time}
                onChange={(e) => setNewRunOfShow({ ...newRunOfShow, time: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white col-span-2"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Event Title (e.g. RoboWars Semi-Finals)"
                value={newRunOfShow.event}
                onChange={(e) => setNewRunOfShow({ ...newRunOfShow, event: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white sm:col-span-2"
                required
              />
              <input
                type="text"
                placeholder="Venue / Stage (e.g. Main Amphitheater)"
                value={newRunOfShow.venue}
                onChange={(e) => setNewRunOfShow({ ...newRunOfShow, venue: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Stage Lead / Coordinator"
                value={newRunOfShow.lead}
                onChange={(e) => setNewRunOfShow({ ...newRunOfShow, lead: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
              />
              <input
                type="text"
                placeholder="Operational Notes (e.g., Audio checks 15m prior)"
                value={newRunOfShow.notes}
                onChange={(e) => setNewRunOfShow({ ...newRunOfShow, notes: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddRunOfShow(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800"
              >
                Add Schedule Slot
              </button>
            </div>
          </form>
        )}

        {/* Schedule Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Day &amp; Time</th>
                <th className="py-3 px-4">Event Track</th>
                <th className="py-3 px-4">Venue</th>
                <th className="py-3 px-4">Lead</th>
                <th className="py-3 px-4">Operational Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRunOfShow.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-mono tabular-nums font-medium text-slate-900 whitespace-nowrap">
                    <span className="block font-sans text-[11px] font-bold text-slate-500 uppercase">{item.day}</span>
                    {item.time}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {item.event}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {item.venue}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {item.lead}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 04. Risk Mitigation & War-Room Contingency Playbook */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              04. Risk Assessment &amp; Contingency Playbook
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Systematic mitigations for weather disruption, electrical overload, crowd surging, and sponsor defaults.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {event.nextEdition.riskContingencies.map((risk) => (
            <div
              key={risk.id}
              className="border border-slate-200 rounded-lg p-5 bg-slate-50/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-slate-700" />
                  <h3 className="text-sm font-bold text-slate-900">
                    {risk.risk}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Severity: <strong>{risk.severity}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500">Probability: <strong>{risk.probability}</strong></span>
                </div>
              </div>

              <div className="text-xs text-slate-600 mt-2 bg-white border border-slate-200 rounded-lg p-3">
                <span className="font-semibold text-slate-800 block mb-1">Prescribed Action / Failover Protocol:</span>
                <p className="leading-relaxed">{risk.contingencyPlan}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

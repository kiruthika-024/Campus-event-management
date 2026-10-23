import React, { useState } from 'react';
import { CollegeEvent, LiveBroadcast, VolunteerTask, RunOfShowItem } from '../types/event';
import { 
  Radio, 
  Megaphone, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  UserCheck, 
  Phone, 
  MapPin, 
  Play, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface LiveControlRoomProps {
  event: CollegeEvent;
  onUpdateEvent: (updated: CollegeEvent) => void;
}

export const LiveControlRoom: React.FC<LiveControlRoomProps> = ({ event, onUpdateEvent }) => {
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [newBroadcast, setNewBroadcast] = useState<Partial<LiveBroadcast>>({
    title: '',
    message: '',
    type: 'announcement',
    targetAudience: 'all',
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState<Partial<VolunteerTask>>({
    task: '',
    department: 'Logistics',
    assignedTo: '',
    phone: '',
    shift: 'Day 1 Afternoon',
    priority: 'high',
    venue: '',
  });

  const [filterTaskStatus, setFilterTaskStatus] = useState<string>('all');

  const broadcasts = event.liveBroadcasts || [];
  const volunteerTasks = event.volunteerTasks || [];

  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBroadcast.title || !newBroadcast.message) return;

    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const created: LiveBroadcast = {
      id: `bc-${Date.now()}`,
      time: timeStr,
      title: newBroadcast.title,
      message: newBroadcast.message,
      type: (newBroadcast.type as any) || 'announcement',
      targetAudience: (newBroadcast.targetAudience as any) || 'all',
    };

    onUpdateEvent({
      ...event,
      liveBroadcasts: [created, ...broadcasts],
    });

    setShowBroadcastModal(false);
    setNewBroadcast({ title: '', message: '', type: 'announcement', targetAudience: 'all' });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.task) return;

    const created: VolunteerTask = {
      id: `vol-${Date.now()}`,
      task: newTask.task,
      department: newTask.department || 'Operations',
      assignedTo: newTask.assignedTo || 'Unassigned',
      phone: newTask.phone || '+91 90000 00000',
      shift: newTask.shift || 'General Shift',
      status: 'in_progress',
      priority: (newTask.priority as any) || 'medium',
      venue: newTask.venue || event.venue,
    };

    onUpdateEvent({
      ...event,
      volunteerTasks: [created, ...volunteerTasks],
    });

    setShowTaskModal(false);
    setNewTask({ task: '', department: 'Logistics', assignedTo: '', phone: '', shift: 'Day 1 Afternoon', priority: 'high', venue: '' });
  };

  const handleUpdateTaskStatus = (taskId: string, nextStatus: VolunteerTask['status']) => {
    const updated = volunteerTasks.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t));
    onUpdateEvent({ ...event, volunteerTasks: updated });
  };

  const handleUpdateRunOfShowStatus = (itemId: string, nextStatus: RunOfShowItem['status']) => {
    const updated = event.runOfShow.map((item) => (item.id === itemId ? { ...item, status: nextStatus } : item));
    onUpdateEvent({ ...event, runOfShow: updated });
  };

  const filteredTasks = volunteerTasks.filter((t) => {
    if (filterTaskStatus === 'all') return true;
    return t.status === filterTaskStatus;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* War Room Dispatch Header */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Live Operations Control Room
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            War Room &amp; Stage Dispatch Center
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Active real-time telemetry, stage run-of-show switches, volunteer duty monitoring, and campus public broadcasts for {event.title}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowBroadcastModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors shadow-xs"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Dispatch Broadcast</span>
          </button>
          <button
            onClick={() => setShowTaskModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Assign Volunteer Duty</span>
          </button>
        </div>
      </div>

      {/* Live Stage Status & Run of Show Switcher */}
      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Live Stage &amp; Track Status Controller
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Instantly toggle schedule slots from Scheduled to Live to Completed.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 font-semibold">
            {event.runOfShow.length} Total Track Slots
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3">Time Window</th>
                <th className="py-2.5 px-3">Stage Track</th>
                <th className="py-2.5 px-3">Venue</th>
                <th className="py-2.5 px-3">Stage Lead</th>
                <th className="py-2.5 px-3">Current Execution State</th>
                <th className="py-2.5 px-3 text-right">Switch State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {event.runOfShow.slice(0, 6).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-mono font-medium text-slate-900 whitespace-nowrap">
                    {item.day} · {item.time}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {item.event}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {item.venue}
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-medium">
                    {item.lead}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                      item.status === 'live'
                        ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                        : item.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : item.status === 'delayed'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {item.status === 'live' ? '● LIVE ON STAGE' : item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => handleUpdateRunOfShowStatus(item.id, 'live')}
                      className="px-2 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100"
                    >
                      Go Live
                    </button>
                    <button
                      onClick={() => handleUpdateRunOfShowStatus(item.id, 'completed')}
                      className="px-2 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded hover:bg-emerald-100"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleUpdateRunOfShowStatus(item.id, 'delayed')}
                      className="px-2 py-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded hover:bg-amber-100"
                    >
                      Delay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2-Column Split: Live Broadcast Announcements & Volunteer Duty Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Broadcasts Feed */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                Live Campus Broadcasts
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {broadcasts.length} Messages
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {broadcasts.map((bc) => (
              <div
                key={bc.id}
                className={`p-4 rounded-lg border text-xs space-y-1.5 ${
                  bc.type === 'urgent'
                    ? 'bg-rose-50/50 border-rose-200 text-rose-950'
                    : bc.type === 'schedule_change'
                    ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{bc.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{bc.time}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{bc.message}</p>
                <div className="text-[10px] text-slate-400 font-medium">
                  Audience: <span className="capitalize font-semibold text-slate-600">{bc.targetAudience}</span>
                </div>
              </div>
            ))}

            {broadcasts.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-400">
                No active broadcasts. Click "Dispatch Broadcast" to alert attendees.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Volunteer Task Management Board */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">
                Volunteer Shifts &amp; Duty Roster
              </h3>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-[11px]">
              <button
                onClick={() => setFilterTaskStatus('all')}
                className={`px-2 py-0.5 rounded font-medium ${filterTaskStatus === 'all' ? 'bg-white shadow-xs font-semibold text-slate-900' : 'text-slate-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterTaskStatus('in_progress')}
                className={`px-2 py-0.5 rounded font-medium ${filterTaskStatus === 'in_progress' ? 'bg-white shadow-xs font-semibold text-slate-900' : 'text-slate-600'}`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterTaskStatus('completed')}
                className={`px-2 py-0.5 rounded font-medium ${filterTaskStatus === 'completed' ? 'bg-white shadow-xs font-semibold text-slate-900' : 'text-slate-600'}`}
              >
                Done
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredTasks.map((t) => (
              <div
                key={t.id}
                className="p-3.5 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors text-xs space-y-2 bg-white shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-slate-900 block leading-tight">{t.task}</span>
                    <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                      {t.venue} · {t.shift}
                    </span>
                  </div>

                  <select
                    value={t.status}
                    onChange={(e) => handleUpdateTaskStatus(t.id, e.target.value as any)}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border focus:outline-none cursor-pointer ${
                      t.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : t.status === 'in_progress'
                        ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                        : t.status === 'blocked'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="blocked">Blocked / Roadblock</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-slate-800">{t.assignedTo}</span>
                    <span className="text-slate-400 font-mono">({t.phone})</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {t.department}
                  </span>
                </div>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-400">
                No volunteer tasks matching filter.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Broadcast Composer Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form onSubmit={handleCreateBroadcast} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Dispatch Campus Broadcast</h3>
              <button type="button" onClick={() => setShowBroadcastModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Headline / Subject *</label>
              <input
                type="text"
                placeholder="e.g. RoboWars Round 2 Commencing at 3:30 PM"
                value={newBroadcast.title}
                onChange={(e) => setNewBroadcast({ ...newBroadcast, title: e.target.value })}
                className="w-full border border-slate-200 rounded p-2 bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category / Urgency</label>
                <select
                  value={newBroadcast.type}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, type: e.target.value as any })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                >
                  <option value="announcement">General Announcement</option>
                  <option value="schedule_change">Schedule Delay / Change</option>
                  <option value="urgent">Urgent Priority</option>
                  <option value="general">Informational</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Audience</label>
                <select
                  value={newBroadcast.targetAudience}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, targetAudience: e.target.value as any })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                >
                  <option value="all">Everyone</option>
                  <option value="participants">Participants Only</option>
                  <option value="volunteers">Volunteers &amp; Crew Only</option>
                  <option value="judges">Jury &amp; Mentors Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Broadcast Copy *</label>
              <textarea
                rows={3}
                placeholder="Message displayed across campus screens and mobile portals..."
                value={newBroadcast.message}
                onChange={(e) => setNewBroadcast({ ...newBroadcast, message: e.target.value })}
                className="w-full border border-slate-200 rounded p-2 bg-white"
                required
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowBroadcastModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                Transmit Broadcast
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Volunteer Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form onSubmit={handleCreateTask} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Assign Volunteer Duty Shift</h3>
              <button type="button" onClick={() => setShowTaskModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Duty / Task Description *</label>
              <input
                type="text"
                placeholder="e.g. Verify VIP Guest passes at Auditorium Backstage"
                value={newTask.task}
                onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                className="w-full border border-slate-200 rounded p-2 bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Department</label>
                <select
                  value={newTask.department}
                  onChange={(e) => setNewTask({ ...newTask, department: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                >
                  <option value="Logistics">Logistics &amp; Stage</option>
                  <option value="Hospitality">Guest Hospitality</option>
                  <option value="Registration">Registration Desk</option>
                  <option value="Security">Crowd &amp; Barricades</option>
                  <option value="Tech Support">Tech &amp; Network</option>
                  <option value="Food & Dining">Food &amp; Catering</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assigned Volunteer Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sen (3rd Yr)"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Volunteer Mobile No</label>
                <input
                  type="text"
                  placeholder="+91 98765 00000"
                  value={newTask.phone}
                  onChange={(e) => setNewTask({ ...newTask, phone: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Duty Shift</label>
                <input
                  type="text"
                  placeholder="e.g. Day 2 (02:00 PM - 07:00 PM)"
                  value={newTask.shift}
                  onChange={(e) => setNewTask({ ...newTask, shift: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Specific Venue</label>
                <input
                  type="text"
                  placeholder="e.g. Main Gate or Lab 2"
                  value={newTask.venue}
                  onChange={(e) => setNewTask({ ...newTask, venue: e.target.value })}
                  className="w-full border border-slate-200 rounded p-2 bg-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowTaskModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                Assign Duty
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { CollegeEvent, IncidentLog, DepartmentDebrief } from '../types/event';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  MessageSquareQuote, 
  ShieldAlert, 
  Check, 
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

interface ReviewTabProps {
  event: CollegeEvent;
  onUpdateEvent: (updated: CollegeEvent) => void;
  onOpenNextBlueprint: () => void;
}

export const ReviewTab: React.FC<ReviewTabProps> = ({
  event,
  onUpdateEvent,
  onOpenNextBlueprint,
}) => {
  const [showAddIncident, setShowAddIncident] = useState(false);
  const [newIncident, setNewIncident] = useState<Partial<IncidentLog>>({
    title: '',
    severity: 'medium',
    department: 'Logistics',
    timeOccurred: '',
    description: '',
    resolution: '',
    preventativeMeasure: '',
  });

  const [activeDeptId, setActiveDeptId] = useState<string>(event.departments[0]?.id || '');
  const selectedDept = event.departments.find((d) => d.id === activeDeptId) || event.departments[0];

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.title || !newIncident.description) return;

    const created: IncidentLog = {
      id: `inc-${Date.now()}`,
      title: newIncident.title || 'Untitled Incident',
      severity: (newIncident.severity as any) || 'medium',
      department: newIncident.department || 'Operations',
      timeOccurred: newIncident.timeOccurred || 'Day of Event',
      description: newIncident.description || '',
      resolution: newIncident.resolution || '',
      preventativeMeasure: newIncident.preventativeMeasure || '',
    };

    const updated = {
      ...event,
      incidents: [created, ...event.incidents],
    };
    onUpdateEvent(updated);
    setShowAddIncident(false);
    setNewIncident({
      title: '',
      severity: 'medium',
      department: 'Logistics',
      timeOccurred: '',
      description: '',
      resolution: '',
      preventativeMeasure: '',
    });
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 01. Executive Overview & Organizer's Retrospective Statement */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              01. Executive Debrief &amp; Fest Retrospective
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>Authored by {event.organizerRole}</span>
              <span aria-hidden="true">·</span>
              <span>{event.college}</span>
              <span aria-hidden="true">·</span>
              <span>Official Event Record</span>
            </div>
          </div>

          <button
            onClick={onOpenNextBlueprint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <span>Transition to Next Edition Blueprint</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 leading-relaxed">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              What Happened: Organizing Narrative
            </h3>
            <p>
              As {event.organizerRole} for <strong>{event.title}</strong> at {event.college}, our core committee managed end-to-end planning spanning 6 months of preparations. The edition set a milestone benchmark with <strong>{event.attendeeStats.actualFootfall.toLocaleString()}</strong> verified attendees from <strong>{event.attendeeStats.collegesParticipating} universities</strong>.
            </p>
            <p>
              The event tested our coordination across infrastructure, guest hospitality, electrical power distribution, and stage AV systems. Despite unexpected technical hiccups (such as arena power trips and Wi-Fi DHCP constraints during peak hackathon hours), our rapid escalation protocols ensured continuous operation without canceling or delaying any major event.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs space-y-2">
              <span className="font-semibold text-slate-800 block">Convener's Core Takeaway:</span>
              <p className="text-slate-600 italic">
                "Technical and cultural fests aren't won during the 3 days of execution—they are won in the 60 days of pre-production contingencies, vendor service level agreements, and decentralized volunteer command chains."
              </p>
            </div>
          </div>

          {/* Quick Realized Stats Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Key Accomplishments
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Surpassed footfall target by <strong>{Math.round(((event.attendeeStats.actualFootfall - event.attendeeStats.targetFootfall) / event.attendeeStats.targetFootfall) * 100)}%</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Generated <strong>₹{(event.budget.sponsorships.reduce((a, b) => a + b.amount, 0) / 100000).toFixed(1)} Lakhs</strong> in sponsorship</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>100% on-time prize disbursement to outstation winners</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Zero major security or medical safety incidents</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Attendee Satisfaction:</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums">{event.feedback.overallRating} / 5.0</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-slate-500">Net Promoter Score:</span>
                <span className="font-bold text-emerald-700 font-mono tabular-nums">+{event.feedback.nps} NPS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Department-by-Department Debrief Scorecards */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              02. Committee &amp; Department Performance Debriefs
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Honest ground debriefs across operations, stage logistics, sponsorships, and attendee hospitality.
            </p>
          </div>

          {/* Department selector segmented buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            {event.departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDeptId(dept.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeDeptId === dept.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {dept.name.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {selectedDept && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
                  Department
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedDept.name}
                </h3>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Department Lead:</span>
                  <span className="font-semibold text-slate-800">{selectedDept.lead}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Volunteer Headcount:</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-800">{selectedDept.teamSize} Students</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Execution Score:</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    {selectedDept.score} / 10
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <span className="text-xs font-semibold text-slate-700 block mb-1">
                  Key Recommendations for Next Year:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-200 rounded p-3">
                  {selectedDept.recommendations}
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Positives */}
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Wins &amp; Strong Executions</span>
                </h4>
                <ul className="space-y-3 text-xs text-slate-700">
                  {selectedDept.positives.map((pos, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span className="leading-relaxed">{pos}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shortfalls & Friction */}
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Friction Points &amp; Shortfalls</span>
                </h4>
                {selectedDept.shortfalls.length > 0 ? (
                  <ul className="space-y-3 text-xs text-slate-700">
                    {selectedDept.shortfalls.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span className="leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Zero critical operational shortfalls recorded during this edition.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 03. Crisis & Incident War Room Post-Mortem */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              03. Incident Post-Mortem &amp; Crisis War Room
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Real unforeseen challenges faced during event execution, immediate tactical workarounds, and systemic preventative measures.
            </p>
          </div>

          <button
            onClick={() => setShowAddIncident(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log College Incident</span>
          </button>
        </div>

        {/* Modal for adding incident */}
        {showAddIncident && (
          <form onSubmit={handleAddIncident} className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Document Ground Crisis / Operational Friction
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Incident Title (e.g., Stage light power outage)"
                value={newIncident.title}
                onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white col-span-2 focus:outline-none focus:ring-1 focus:ring-slate-400"
                required
              />
              <select
                value={newIncident.severity}
                onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value as any })}
                className="text-xs border border-slate-200 rounded p-2 bg-white focus:outline-none"
              >
                <option value="low">Low Severity</option>
                <option value="medium">Medium Severity</option>
                <option value="high">High Severity</option>
                <option value="critical">Critical Severity</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Department (e.g. Stage AV, Technical, Hospitality)"
                value={newIncident.department}
                onChange={(e) => setNewIncident({ ...newIncident, department: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
              />
              <input
                type="text"
                placeholder="Time Occurred (e.g. Day 2, 08:30 PM)"
                value={newIncident.timeOccurred}
                onChange={(e) => setNewIncident({ ...newIncident, timeOccurred: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
              />
            </div>

            <textarea
              placeholder="What happened? (Describe root cause and immediate panic/friction)"
              rows={2}
              value={newIncident.description}
              onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
              className="w-full text-xs border border-slate-200 rounded p-2 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <textarea
                placeholder="Immediate Resolution (How the committee solved it on the spot)"
                rows={2}
                value={newIncident.resolution}
                onChange={(e) => setNewIncident({ ...newIncident, resolution: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded p-2 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
              <textarea
                placeholder="Preventative Protocol (SOP for next edition)"
                rows={2}
                value={newIncident.preventativeMeasure}
                onChange={(e) => setNewIncident({ ...newIncident, preventativeMeasure: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded p-2 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddIncident(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800"
              >
                Save Incident Log
              </button>
            </div>
          </form>
        )}

        {/* Incident table / cards */}
        <div className="mt-6 space-y-4">
          {event.incidents.map((inc) => (
            <div
              key={inc.id}
              className="border border-slate-200 rounded-lg p-5 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                    inc.severity === 'high' || inc.severity === 'critical'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {inc.severity} Severity
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    {inc.title}
                  </h3>
                </div>

                <div className="text-xs text-slate-500 font-mono tabular-nums">
                  <span>{inc.department}</span>
                  <span className="mx-1.5">·</span>
                  <span>{inc.timeOccurred}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">What Happened:</span>
                  <p className="leading-relaxed">{inc.description}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">Immediate Tactical Fix:</span>
                  <p className="leading-relaxed text-indigo-900 bg-indigo-50/50 p-2 rounded border border-indigo-100">
                    {inc.resolution}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">Preventative SOP for Next Edition:</span>
                  <p className="leading-relaxed text-emerald-900 bg-emerald-50/50 p-2 rounded border border-emerald-100">
                    {inc.preventativeMeasure}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {event.incidents.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
              No ground incidents recorded for this event yet. Click "Log College Incident" to record any past roadblocks.
            </div>
          )}
        </div>
      </section>

      {/* 04. Attendee Sentiment, Survey Ratings & Student Voice */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            04. Delegate Sentiment &amp; Attendee Feedback Survey
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Grounded data collected from {event.feedback.totalResponses.toLocaleString()} post-event feedback forms.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Breakdown bars */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Rating by Category (out of 5.0)
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Technical &amp; Event Quality</span>
                  <span className="font-mono tabular-nums font-semibold">{event.feedback.ratings.eventQuality} / 5.0</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-900 h-full rounded-full"
                    style={{ width: `${(event.feedback.ratings.eventQuality / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Sound, Stage &amp; Visual Experience</span>
                  <span className="font-mono tabular-nums font-semibold">{event.feedback.ratings.soundStage} / 5.0</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-900 h-full rounded-full"
                    style={{ width: `${(event.feedback.ratings.soundStage / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Prize Distribution &amp; Recognition</span>
                  <span className="font-mono tabular-nums font-semibold">{event.feedback.ratings.prizesRecognition} / 5.0</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-900 h-full rounded-full"
                    style={{ width: `${(event.feedback.ratings.prizesRecognition / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Campus Logistics &amp; Crowd Management</span>
                  <span className="font-mono tabular-nums font-semibold">{event.feedback.ratings.logisticsCrowd} / 5.0</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full"
                    style={{ width: `${(event.feedback.ratings.logisticsCrowd / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Hospitality, Dining &amp; Refreshments</span>
                  <span className="font-mono tabular-nums font-semibold">{event.feedback.ratings.hospitalityFood} / 5.0</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full"
                    style={{ width: `${(event.feedback.ratings.hospitalityFood / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Real Delegate Quotes */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Student Quotes &amp; Ground Reactions
            </h3>
            <div className="space-y-3">
              {event.feedback.studentQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs"
                >
                  <p className="text-slate-700 italic leading-relaxed mb-2">
                    "{quote.quote}"
                  </p>
                  <div className="flex items-center justify-between text-slate-500 font-medium">
                    <span>{quote.author} ({quote.college})</span>
                    <span className={`text-[11px] font-semibold ${
                      quote.sentiment === 'positive' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {quote.sentiment === 'positive' ? 'Commendation' : 'Constructive Feedback'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

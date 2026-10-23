import React from 'react';
import { CollegeEvent } from '../types/event';
import { Printer, ArrowLeft, Check } from 'lucide-react';

interface PrintDossierProps {
  event: CollegeEvent;
  onBack: () => void;
}

export const PrintDossier: React.FC<PrintDossierProps> = ({ event, onBack }) => {
  const totalIncome = event.budget.sponsorships.reduce((sum, item) => sum + item.amount, 0);
  const totalActualExpense = event.budget.expenses.reduce((sum, item) => sum + item.actual, 0);
  const netSurplus = totalIncome - totalActualExpense;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Top action bar (hidden during print) */}
      <div className="no-print flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            Formatted for official university archival &amp; dean submission.
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Official Document Body */}
      <div className="bg-white p-8 sm:p-12 border border-slate-200 rounded-xl shadow-xs space-y-10 text-slate-800">
        {/* Document Header & Seal */}
        <div className="text-center pb-6 border-b-2 border-slate-900 space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
            {event.college}
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
            Official Event Review &amp; Next Edition Master Dossier
          </h1>
          <p className="text-sm font-semibold text-slate-700">
            {event.title} — {event.edition}
          </p>
          <div className="flex justify-center items-center gap-4 text-xs text-slate-500 pt-1 font-mono">
            <span>Ref: FEST-EVL-{event.id.toUpperCase()}</span>
            <span>·</span>
            <span>Dates: {event.dates}</span>
            <span>·</span>
            <span>Venue: {event.venue}</span>
          </div>
        </div>

        {/* Section 1: Executive Overview */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            01. Executive Overview &amp; Organizer's Statement
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            This comprehensive document serves as the formal post-event debrief and successor handoff blueprint for <strong>{event.title}</strong>, held under the stewardship of the Student Steering Committee and the Office of Student Affairs at <strong>{event.college}</strong>.
          </p>
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>Theme:</strong> "{event.theme}".<br />
            <strong>Primary Coordinator Role:</strong> {event.organizerRole}.<br />
            <strong>Summary:</strong> {event.summary}
          </p>
        </div>

        {/* Section 2: Verified Key Performance Metrics */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            02. Verified Participation &amp; Turnout Metrics
          </h2>
          <table className="w-full text-left text-xs border border-slate-200">
            <tbody className="divide-y divide-slate-200">
              <tr className="bg-slate-50">
                <td className="p-2.5 font-semibold text-slate-700 w-1/2">Attendee Footfall (Actual vs Target)</td>
                <td className="p-2.5 font-mono tabular-nums font-bold text-slate-900">
                  {event.attendeeStats.actualFootfall > 0 ? event.attendeeStats.actualFootfall.toLocaleString() : 'N/A'} (Target: {event.attendeeStats.targetFootfall.toLocaleString()})
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-slate-700">Participating Universities &amp; Colleges</td>
                <td className="p-2.5 font-mono tabular-nums text-slate-900">{event.attendeeStats.collegesParticipating} External Institutions</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-2.5 font-semibold text-slate-700">Competitive Tracks / Events Hosted</td>
                <td className="p-2.5 font-mono tabular-nums text-slate-900">{event.attendeeStats.totalCompetitions} Official Competitions</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-slate-700">Delegate Net Promoter Score (NPS)</td>
                <td className="p-2.5 font-mono tabular-nums font-bold text-emerald-800">+{event.feedback.nps} NPS ({event.feedback.overallRating} / 5.0 Average Rating)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Financial Statement & Realized Balance */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            03. Financial Statement &amp; Budget Realization
          </h2>
          <div className="grid grid-cols-3 gap-3 text-xs text-center border border-slate-200 p-3 bg-slate-50 rounded">
            <div>
              <span className="text-slate-500 block">Total Sponsorship &amp; Income</span>
              <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                ₹{totalIncome.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Total Reconciled Expenditure</span>
              <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                ₹{totalActualExpense.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Net Operational Balance</span>
              <span className="text-base font-bold text-emerald-800 font-mono tabular-nums">
                +₹{netSurplus.toLocaleString()}
              </span>
            </div>
          </div>

          <table className="w-full text-left text-xs border border-slate-200 mt-2">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-2">Expense Category</th>
                <th className="p-2 text-right">Planned (INR)</th>
                <th className="p-2 text-right">Actual Reconciled (INR)</th>
                <th className="p-2">Reconciliation Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {event.budget.expenses.map((exp) => (
                <tr key={exp.id}>
                  <td className="p-2 font-medium text-slate-900">{exp.category}</td>
                  <td className="p-2 text-right font-mono tabular-nums">₹{exp.planned.toLocaleString()}</td>
                  <td className="p-2 text-right font-mono tabular-nums font-bold text-slate-900">₹{exp.actual.toLocaleString()}</td>
                  <td className="p-2 text-slate-600">{exp.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 4: Incident Post-Mortem & SOPs */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            04. Key Incidents Encountered &amp; Preventative SOPs
          </h2>
          <div className="space-y-3">
            {event.incidents.map((inc) => (
              <div key={inc.id} className="border border-slate-200 rounded p-3 text-xs space-y-1 bg-slate-50">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{inc.title} ({inc.department})</span>
                  <span className="font-mono">{inc.timeOccurred}</span>
                </div>
                <p className="text-slate-700"><strong>Root Incident:</strong> {inc.description}</p>
                <p className="text-slate-700"><strong>Immediate Action:</strong> {inc.resolution}</p>
                <p className="text-slate-700"><strong>Standard Operating Procedure for Future:</strong> {inc.preventativeMeasure}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Next Edition Master Blueprint */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            05. Next Edition Strategic Blueprint &amp; Upgrades
          </h2>
          <div className="text-xs text-slate-700 space-y-2">
            <p><strong>Proposed Master Theme:</strong> {event.nextEdition.proposedTheme}</p>
            <p><strong>Target Timeline:</strong> {event.nextEdition.targetDates} | <strong>Target Footfall:</strong> {event.nextEdition.targetFootfall.toLocaleString()}+ Delegates</p>
            <p><strong>Target Sponsorship Corpus:</strong> ₹{(event.nextEdition.sponsorshipTarget / 100000).toFixed(1)} Lakhs</p>

            <div className="mt-2">
              <span className="font-semibold text-slate-800 block mb-1">Mandated Operational Improvements:</span>
              <ul className="list-disc list-inside space-y-1">
                {event.nextEdition.strategicImprovements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Formal Signature & Approval Blocks */}
        <div className="pt-12 border-t border-slate-300 grid grid-cols-3 gap-6 text-center text-xs text-slate-700">
          <div className="space-y-8">
            <div className="border-b border-slate-400 w-3/4 mx-auto" />
            <div>
              <span className="font-bold block text-slate-900">Student Convener</span>
              <span className="text-slate-500">{event.organizerRole}</span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border-b border-slate-400 w-3/4 mx-auto" />
            <div>
              <span className="font-bold block text-slate-900">Faculty Advisor</span>
              <span className="text-slate-500">Student Activities Council</span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border-b border-slate-400 w-3/4 mx-auto" />
            <div>
              <span className="font-bold block text-slate-900">Dean of Student Affairs</span>
              <span className="text-slate-500">{event.college}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

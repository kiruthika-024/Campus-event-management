import React from 'react';
import { CollegeEvent } from '../types/event';
import { Calendar, MapPin, User, Sparkles, Building2, Printer } from 'lucide-react';

interface EventHeaderProps {
  currentEvent: CollegeEvent;
  eventsList: CollegeEvent[];
  onSelectEvent: (event: CollegeEvent) => void;
  onOpenAiModal: () => void;
  onPrintDossier: () => void;
}

export const EventHeader: React.FC<EventHeaderProps> = ({
  currentEvent,
  eventsList,
  onSelectEvent,
  onOpenAiModal,
  onPrintDossier,
}) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Top switcher row: event selector & quick action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Selected College Event:
            </span>
            <select
              value={currentEvent.id}
              onChange={(e) => {
                const found = eventsList.find((ev) => ev.id === e.target.value);
                if (found) onSelectEvent(found);
              }}
              className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              {eventsList.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} ({ev.college}) — {ev.edition}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Advisor &amp; Pitch Generator</span>
            </button>
            <button
              onClick={onPrintDossier}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export Dossier (PDF)</span>
            </button>
          </div>
        </div>

        {/* Hero split: Info + Event Photography */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* Unboxed metadata line with typographic bullet separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
                <span className="text-slate-900 font-semibold">{currentEvent.college}</span>
                <span aria-hidden="true">·</span>
                <span>{currentEvent.edition}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{currentEvent.category} Fest</span>
                <span aria-hidden="true">·</span>
                <span>{currentEvent.status === 'completed' ? 'Archived Review' : 'Active Planning'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
                {currentEvent.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 font-medium italic mb-4">
                Theme: "{currentEvent.theme}"
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {currentEvent.summary}
              </p>

              {/* Organizer & Venue Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-slate-800">Student Role</span>
                    <span className="text-slate-500">{currentEvent.organizerRole}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-slate-800">Event Dates</span>
                    <span className="text-slate-500">{currentEvent.dates}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-slate-800">Primary Campus Venue</span>
                    <span className="text-slate-500 truncate" title={currentEvent.venue}>{currentEvent.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photographic visual anchor */}
          <div className="lg:col-span-4 relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[220px]">
            <img
              src={currentEvent.heroImage}
              alt={currentEvent.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Resilient CSS fallback container as per frontend-design skill
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Ground Reality Photo
              </span>
              <p className="text-xs text-slate-300 font-medium">
                {currentEvent.venue}
              </p>
            </div>
          </div>
        </div>

        {/* 4-column Key Performance Metric Strip (Tabular Figures) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <span className="block text-xs font-medium text-slate-500">Attendee Footfall</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">
                {currentEvent.attendeeStats.actualFootfall > 0 
                  ? currentEvent.attendeeStats.actualFootfall.toLocaleString() 
                  : currentEvent.attendeeStats.targetFootfall.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                {currentEvent.status === 'completed' 
                  ? `(Target: ${currentEvent.attendeeStats.targetFootfall.toLocaleString()})`
                  : 'Target'}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <span className="block text-xs font-medium text-slate-500">Colleges Represented</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">
                {currentEvent.attendeeStats.collegesParticipating}
              </span>
              <span className="text-xs text-slate-500">Institutions</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <span className="block text-xs font-medium text-slate-500">Total Competitions &amp; Tracks</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">
                {currentEvent.attendeeStats.totalCompetitions}
              </span>
              <span className="text-xs text-slate-500">Competitive Events</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <span className="block text-xs font-medium text-slate-500">
              {currentEvent.status === 'completed' ? 'Overall Budget Realized' : 'Target Sponsorship Budget'}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">
                ₹{(
                  currentEvent.budget.sponsorships.reduce((acc, s) => acc + s.amount, 0) / 100000
                ).toFixed(1)}L
              </span>
              <span className="text-xs text-slate-500">INR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

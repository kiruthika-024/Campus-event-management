import React, { useState, useEffect } from 'react';
import { CollegeEvent } from './types/event';
import { DEFAULT_EVENTS } from './data/defaultEvents';
import { Navbar } from './components/Navbar';
import { EventHeader } from './components/EventHeader';
import { ReviewTab } from './components/ReviewTab';
import { PlanningTab } from './components/PlanningTab';
import { FinancialsTab } from './components/FinancialsTab';
import { PrintDossier } from './components/PrintDossier';
import { AiAssistantModal } from './components/AiAssistantModal';
import { CreateEventModal } from './components/CreateEventModal';
import { ShieldAlert, BookOpen, Sparkles, Plus } from 'lucide-react';

const STORAGE_KEY = 'campusfest_events_v1';

export default function App() {
  const [events, setEvents] = useState<CollegeEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load from storage, using default events', e);
    }
    return DEFAULT_EVENTS;
  });

  const [currentEventId, setCurrentEventId] = useState<string>(events[0]?.id || 'innovista-2025');
  const [activeTab, setActiveTab] = useState<'review' | 'planning' | 'financials' | 'incidents' | 'dossier'>('review');
  const [showAiModal, setShowAiModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (e) {
      console.warn('Failed to save to storage', e);
    }
  }, [events]);

  const currentEvent = events.find((ev) => ev.id === currentEventId) || events[0];

  const handleUpdateCurrentEvent = (updated: CollegeEvent) => {
    setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? updated : ev)));
  };

  const handleSaveNewEvent = (newEvent: CollegeEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    setCurrentEventId(newEvent.id);
    if (newEvent.status === 'planning') {
      setActiveTab('planning');
    } else {
      setActiveTab('review');
    }
  };

  // If in dossier printable mode, render the clean dossier view
  if (activeTab === 'dossier') {
    return (
      <div className="min-h-screen bg-slate-100">
        <PrintDossier event={currentEvent} onBack={() => setActiveTab('review')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-slate-200">
      {/* 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCreate={() => setShowCreateModal(true)}
      />

      {/* Main Event Header with photographic visual anchor and tabular KPIs */}
      <EventHeader
        currentEvent={currentEvent}
        eventsList={events}
        onSelectEvent={(ev) => setCurrentEventId(ev.id)}
        onOpenAiModal={() => setShowAiModal(true)}
        onPrintDossier={() => setActiveTab('dossier')}
      />

      {/* Mode Sub-Navigation / Tab Strip */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 overflow-x-auto py-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-2 shrink-0">
              Workspace View:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
              <button
                onClick={() => setActiveTab('review')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'review'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Post-Event Review ("Explain What Happened")
              </button>
              <button
                onClick={() => setActiveTab('planning')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'planning'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Next Edition Blueprint ("Plan Next Edition")
              </button>
              <button
                onClick={() => setActiveTab('financials')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'financials'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Budget &amp; Ledger
              </button>
              <button
                onClick={() => setActiveTab('incidents')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'incidents'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                War Room Incidents ({currentEvent.incidents.length})
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500 hidden sm:flex items-center gap-2 shrink-0">
            <span>Status:</span>
            <span className="font-semibold text-slate-800">
              {currentEvent.status === 'completed' ? 'Archived Review Mode' : 'Active Planning Mode'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {activeTab === 'review' && (
          <ReviewTab
            event={currentEvent}
            onUpdateEvent={handleUpdateCurrentEvent}
            onOpenNextBlueprint={() => setActiveTab('planning')}
          />
        )}

        {activeTab === 'planning' && (
          <PlanningTab
            event={currentEvent}
            onUpdateEvent={handleUpdateCurrentEvent}
            onOpenAiAdvisor={() => setShowAiModal(true)}
          />
        )}

        {activeTab === 'financials' && (
          <FinancialsTab
            event={currentEvent}
            onUpdateEvent={handleUpdateCurrentEvent}
          />
        )}

        {activeTab === 'incidents' && (
          <div className="space-y-6 pb-16">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    War Room Incident Log &amp; Crisis Post-Mortem
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Unvarnished record of operational friction encountered during {currentEvent.title} at {currentEvent.college}.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('review')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  View Full Review
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {currentEvent.incidents.map((inc) => (
                  <div key={inc.id} className="border border-slate-200 rounded-lg p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-slate-700" />
                        <h3 className="text-sm font-bold text-slate-900">{inc.title}</h3>
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
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
                        <span className="font-semibold text-slate-800 block mb-1">Immediate Fix:</span>
                        <p className="leading-relaxed text-indigo-900 bg-indigo-50/50 p-2 rounded border border-indigo-100">
                          {inc.resolution}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 block mb-1">Preventative SOP:</span>
                        <p className="leading-relaxed text-emerald-900 bg-emerald-50/50 p-2 rounded border border-emerald-100">
                          {inc.preventativeMeasure}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {currentEvent.incidents.length === 0 && (
                  <div className="text-center py-12 text-xs text-slate-500">
                    No incident records found. You can add them under the "Post-Event Review" tab.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <AiAssistantModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        event={currentEvent}
      />

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveNewEvent}
      />

      {/* Quiet, minimalist footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span>CampusFest OS · College Event Planning &amp; Review Suite</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{currentEvent.college}</span>
            <span aria-hidden="true">·</span>
            <span>{currentEvent.edition}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

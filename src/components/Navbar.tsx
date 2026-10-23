import React from 'react';

interface NavbarProps {
  activeTab: 'review' | 'planning' | 'financials' | 'incidents' | 'dossier';
  onSelectTab: (tab: 'review' | 'planning' | 'financials' | 'incidents' | 'dossier') => void;
  onOpenCreate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenCreate }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); onSelectTab('review'); }}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors"
        >
          CampusFest OS
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('review')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'review'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Post-Fest Review
          </button>
          <button
            onClick={() => onSelectTab('planning')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'planning'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Next Edition Blueprint
          </button>
          <button
            onClick={() => onSelectTab('financials')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'financials'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Budget &amp; Ledger
          </button>
          <button
            onClick={() => onSelectTab('incidents')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'incidents'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            War Room &amp; Logs
          </button>
          <button
            onClick={() => onSelectTab('dossier')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'dossier'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Official Dossier
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCreate}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            + Plan New Fest
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useRef, useState } from 'react';
import { CollegeEvent } from '../types/event';
import { DEFAULT_EVENTS } from '../data/defaultEvents';
import { Download, Upload, RotateCcw, X, Check, AlertCircle } from 'lucide-react';

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: CollegeEvent[];
  onRestoreEvents: (events: CollegeEvent[]) => void;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({
  isOpen,
  onClose,
  events,
  onRestoreEvents,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `campusfest_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setSuccessMessage('Event database successfully exported as JSON backup.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported) && imported.length > 0 && imported[0].id) {
          onRestoreEvents(imported);
          setSuccessMessage(`Successfully imported ${imported.length} college events.`);
          setErrorMessage(null);
          setTimeout(() => {
            setSuccessMessage(null);
            onClose();
          }, 1500);
        } else {
          setErrorMessage('Invalid event backup file structure.');
        }
      } catch (err) {
        setErrorMessage('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDemo = () => {
    if (window.confirm('Reset all event management data back to default college templates? Any unsaved local edits will be cleared.')) {
      onRestoreEvents(DEFAULT_EVENTS);
      setSuccessMessage('Reset all events to default college templates.');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-5 text-xs">
        <div className="flex justify-between items-start pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Event Data Management &amp; Backups</h3>
            <p className="text-xs text-slate-500 mt-0.5">Share workspaces across devices or restore templates.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
        </div>

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="space-y-3">
          <div className="p-3.5 border border-slate-200 rounded-lg flex items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-slate-900 block">Export Workspace JSON</span>
              <span className="text-[11px] text-slate-500">Download all {events.length} event rosters, budgets, and logs.</span>
            </div>
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

          <div className="p-3.5 border border-slate-200 rounded-lg flex items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-slate-900 block">Import Backup JSON</span>
              <span className="text-[11px] text-slate-500">Restore or load another committee member's file.</span>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportJSON}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import</span>
              </button>
            </div>
          </div>

          <div className="p-3.5 border border-slate-200 rounded-lg flex items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-slate-900 block">Reset to Factory Presets</span>
              <span className="text-[11px] text-slate-500">Restore default KIT &amp; national college event setups.</span>
            </div>
            <button
              onClick={handleResetToDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

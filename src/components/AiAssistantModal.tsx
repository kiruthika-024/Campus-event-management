import React, { useState } from 'react';
import { CollegeEvent } from '../types/event';
import { generateEventAiAdvice } from '../services/geminiClient';
import { Sparkles, X, Copy, Check, RefreshCw, FileText, Shield, Award, Lightbulb } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CollegeEvent;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose, event }) => {
  const [activePromptType, setActivePromptType] = useState<
    'sponsorship_pitch' | 'risk_contingency' | 'dean_report' | 'theme_generator'
  >('sponsorship_pitch');

  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (typeOverride?: typeof activePromptType) => {
    const type = typeOverride || activePromptType;
    setLoading(true);
    setGeneratedResult('');
    setCopied(false);

    let promptText = '';
    if (type === 'sponsorship_pitch') {
      promptText = `Draft a high-impact corporate sponsorship deck proposal and email pitch for ${event.title} at ${event.college}. Focus on hiring access, youth engagement, and stage visibility.`;
    } else if (type === 'risk_contingency') {
      promptText = `Create an exhaustive ground risk assessment and contingency playbook for ${event.title} at ${event.college}, considering weather, power failure, crowd management, and network failure.`;
    } else if (type === 'dean_report') {
      promptText = `Draft a formal post-event executive debrief report for the Dean of Student Affairs and Principal of ${event.college} summarizing attendance, financial discipline, student achievements, and recommended improvements for ${event.title}.`;
    } else {
      promptText = `Propose 3 creative, cutting-edge themes, mottos, and signature attraction ideas for the upcoming edition of ${event.title} at ${event.college}.`;
    }

    if (customPrompt.trim()) {
      promptText += `\nAdditional Focus / Requirements: ${customPrompt}`;
    }

    try {
      const res = await generateEventAiAdvice({
        type,
        prompt: promptText,
        eventContext: event,
      });
      setGeneratedResult(res.text);
    } catch (err) {
      console.error(err);
      setGeneratedResult('Unable to connect to AI engine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">
              AI Event Advisory &amp; Copy Architect
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick task selector tabs */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
              Select Advisory Domain:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setActivePromptType('sponsorship_pitch');
                  handleGenerate('sponsorship_pitch');
                }}
                className={`flex flex-col items-center justify-center p-3 text-center rounded-lg border text-xs transition-colors ${
                  activePromptType === 'sponsorship_pitch'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Award className="w-4 h-4 mb-1.5 text-indigo-600" />
                <span>Sponsor Pitch Deck</span>
              </button>

              <button
                onClick={() => {
                  setActivePromptType('risk_contingency');
                  handleGenerate('risk_contingency');
                }}
                className={`flex flex-col items-center justify-center p-3 text-center rounded-lg border text-xs transition-colors ${
                  activePromptType === 'risk_contingency'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Shield className="w-4 h-4 mb-1.5 text-amber-600" />
                <span>Risk &amp; Contingency</span>
              </button>

              <button
                onClick={() => {
                  setActivePromptType('dean_report');
                  handleGenerate('dean_report');
                }}
                className={`flex flex-col items-center justify-center p-3 text-center rounded-lg border text-xs transition-colors ${
                  activePromptType === 'dean_report'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <FileText className="w-4 h-4 mb-1.5 text-slate-700" />
                <span>Dean / Admin Report</span>
              </button>

              <button
                onClick={() => {
                  setActivePromptType('theme_generator');
                  handleGenerate('theme_generator');
                }}
                className={`flex flex-col items-center justify-center p-3 text-center rounded-lg border text-xs transition-colors ${
                  activePromptType === 'theme_generator'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Lightbulb className="w-4 h-4 mb-1.5 text-emerald-600" />
                <span>Themes &amp; Mottos</span>
              </button>
            </div>
          </div>

          {/* Context Banner */}
          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-3">
            Generating tailored content for <strong>{event.title}</strong> ({event.college}, {event.edition}).
          </div>

          {/* Optional specific instruction input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Optional: Enter specific requirement (e.g. Include EV sponsor, rain contingency, or prize boost)..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-1 focus:ring-slate-400"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 shrink-0 flex items-center gap-1.5"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{loading ? 'Thinking...' : 'Generate Copy'}</span>
            </button>
          </div>

          {/* Generated Result Output */}
          {generatedResult && (
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Generated Strategic Draft
                </span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
                </button>
              </div>
              <div className="p-4 text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
                {generatedResult}
              </div>
            </div>
          )}

          {loading && !generatedResult && (
            <div className="p-12 text-center text-xs text-slate-500 space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-400" />
              <p>Analyzing festival constraints and synthesizing college-grade copy...</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

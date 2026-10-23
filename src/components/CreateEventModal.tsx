import React, { useState } from 'react';
import { CollegeEvent, EventCategory } from '../types/event';
import { X, Calendar, Building, Sparkles } from 'lucide-react';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newEvent: CollegeEvent) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [college, setCollege] = useState('Kanpur Institute of Technology (KIT)');
  const [edition, setEdition] = useState('Edition 2026');
  const [category, setCategory] = useState<EventCategory>('technical');
  const [dates, setDates] = useState('March 2026');
  const [venue, setVenue] = useState('Campus Central Quad & Auditorium');
  const [theme, setTheme] = useState('Autonomous Horizons');
  const [organizerRole, setOrganizerRole] = useState('Student Convener & Technical Lead');
  const [summary, setSummary] = useState('');
  const [mode, setMode] = useState<'completed' | 'planning'>('planning');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvent: CollegeEvent = {
      id: `fest-${Date.now()}`,
      title: title.trim(),
      college: college.trim() || 'My College',
      edition: edition.trim() || 'Next Edition',
      category,
      dates: dates.trim() || 'Upcoming Dates',
      venue: venue.trim() || 'Main Campus',
      status: mode,
      theme: theme.trim() || 'Future Frontiers',
      organizerRole: organizerRole.trim() || 'Student Organizing Lead',
      heroImage: '/src/assets/images/fest_tech_stage_1792736986020.jpg',
      summary: summary.trim() || `The upcoming edition of ${title} organized at ${college}, bringing students and delegates together for competitions and workshops.`,
      attendeeStats: {
        targetFootfall: 4000,
        actualFootfall: mode === 'completed' ? 4200 : 0,
        collegesParticipating: 35,
        totalCompetitions: 18,
      },
      budget: {
        currency: 'INR',
        sponsorships: [
          { sponsor: 'Title Corporate Partner', tier: 'Title', amount: 300000, deliverables: 'Main stage naming rights' },
          { sponsor: 'Powered-By Partner', tier: 'Powered By', amount: 150000, deliverables: 'Track branding' },
          { sponsor: 'Registration / Delegate Revenue', tier: 'Associate', amount: 120000, deliverables: 'Delegate passes' }
        ],
        expenses: [
          { id: 'exp-n1', category: 'Stage, Light Truss & High-Def Sound', planned: 250000, actual: mode === 'completed' ? 260000 : 0, notes: 'Audio console, line arrays, stage crew' },
          { id: 'exp-n2', category: 'Competition Cash Prizes & Trophies', planned: 180000, actual: mode === 'completed' ? 180000 : 0, notes: 'Cash prizes direct disbursement' },
          { id: 'exp-n3', category: 'Guest Speaker Hospitality & Travel', planned: 60000, actual: mode === 'completed' ? 55000 : 0, notes: 'Accommodation & flight reimbursement' },
          { id: 'exp-n4', category: 'Food & Volunteer Refreshments', planned: 70000, actual: mode === 'completed' ? 75000 : 0, notes: 'Catering across 3 event days' }
        ],
      },
      departments: [
        {
          id: 'dep-custom-1',
          name: 'Technical Operations & Events',
          lead: 'Student Lead',
          teamSize: 25,
          score: 9.0,
          status: 'exceptional',
          positives: ['Flawless competition tracks', 'High student participation across workshops'],
          shortfalls: ['High Wi-Fi latency during peak event hour'],
          recommendations: 'Provision dedicated wired backup switches for all primary workstations.'
        },
        {
          id: 'dep-custom-2',
          name: 'Logistics, Stage & Power Systems',
          lead: 'Logistics Head',
          teamSize: 30,
          score: 8.5,
          status: 'on_track',
          positives: ['Dual generator sync maintained uninterrupted power supply'],
          shortfalls: ['Stage banner delivery delayed by vendor'],
          recommendations: 'Ensure all printed backdrops are delivered 24 hours in advance.'
        }
      ],
      timeline: [
        {
          phase: 'Phase 1: Approvals & Charter (T-120 Days)',
          timeframe: 'Month 1',
          milestones: [
            { id: 'mn-1', task: 'Form student steering committee & faculty advisory board', owner: 'Convener', status: mode === 'completed' ? 'completed' : 'pending', priority: 'high' },
            { id: 'mn-2', task: 'Reserve auditorium & campus grounds with Dean Office', owner: 'Faculty Liaison', status: mode === 'completed' ? 'completed' : 'pending', priority: 'high' }
          ]
        },
        {
          phase: 'Phase 2: Outreach & Sponsorship (T-60 Days)',
          timeframe: 'Month 2',
          milestones: [
            { id: 'mn-3', task: 'Send out formal sponsorship decks to 40+ brands', owner: 'Sponsorship Team', status: 'pending', priority: 'high' },
            { id: 'mn-4', task: 'Deploy event portal & team registration platform', owner: 'Tech Web Team', status: 'pending', priority: 'high' }
          ]
        }
      ],
      runOfShow: [
        { id: 'ros-n1', time: '09:30 - 11:00 AM', day: 'Day 1', event: 'Inaugural Ceremony & Keynote Address', venue: venue || 'Main Auditorium', lead: 'Convener', status: 'scheduled', notes: 'Dignitary felicitations' },
        { id: 'ros-n2', time: '11:30 AM - 05:00 PM', day: 'Day 1', event: 'Flagship Competition Track 1', venue: venue || 'CS Labs', lead: 'Tech Leads', status: 'scheduled', notes: 'Preliminary rounds' },
        { id: 'ros-n3', time: '04:00 - 06:00 PM', day: 'Day 2', event: 'Grand Finale & Award Ceremony', venue: venue || 'Amphitheater', lead: 'Core Committee', status: 'scheduled', notes: 'Trophies and cheques' }
      ],
      incidents: mode === 'completed' ? [
        {
          id: 'inc-n1',
          title: 'Registration desk network timeout during morning peak',
          severity: 'medium',
          department: 'Hospitality',
          timeOccurred: 'Day 1, 09:15 AM',
          description: 'Local campus proxy throttled simultaneous check-in queries from registration desk laptops.',
          resolution: 'Switched check-in desks to offline cached CSV verification spreadsheets.',
          preventativeMeasure: 'Use local SQLite offline sync for desk scanners.'
        }
      ] : [],
      feedback: {
        overallRating: 4.6,
        totalResponses: 850,
        nps: 64,
        ratings: {
          eventQuality: 4.7,
          logisticsCrowd: 4.2,
          hospitalityFood: 4.3,
          soundStage: 4.8,
          prizesRecognition: 4.6
        },
        studentQuotes: [
          {
            id: 'qn-1',
            author: 'Student Participant',
            college: 'Visiting Institution',
            quote: 'Great hospitality and challenging competition tracks. Prize distribution was prompt!',
            sentiment: 'positive'
          }
        ]
      },
      nextEdition: {
        proposedTheme: `${title} 2027: Next Frontier`,
        targetDates: 'March 2027',
        targetFootfall: 5500,
        targetBudget: 850000,
        sponsorshipTarget: 700000,
        strategicImprovements: [
          'Pre-provision dual fiber internet links with local DNS caching',
          'Deploy 4 separate food kiosks across the campus perimeter',
          'Introduce new corporate sponsored bounty tracks'
        ],
        newAttractions: [
          'Inter-Collegiate Startup Pitch Arena with VC presence',
          'Autonomous Drone Racing Obstacle Course'
        ],
        riskContingencies: [
          {
            id: 'rn-1',
            risk: 'Unforeseen rain or bad weather during outdoor activities',
            severity: 'High',
            probability: 'Medium',
            contingencyPlan: 'Pre-book indoor multi-purpose hall as immediate storm backup shelter.'
          }
        ]
      }
    };

    onSave(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Create College Event / Fest Profile
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose your real college fest to review what happened or plan its next edition.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Mode Selector */}
          <div>
            <span className="font-semibold text-slate-700 block mb-1">
              Select Primary Objective (as per user assignment):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('completed')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  mode === 'completed'
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="font-bold block">1. Helped Organize One</span>
                <span className="text-[11px] opacity-80 block mt-0.5">
                  Review &amp; explain what happened, wins, crises &amp; outcomes
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMode('planning')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  mode === 'planning'
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="font-bold block">2. Plan Next Edition</span>
                <span className="text-[11px] opacity-80 block mt-0.5">
                  Choose a real named event and plan its upcoming edition
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Event / Fest Name *</label>
              <input
                type="text"
                placeholder="e.g. Innovista, Kriti, Blitzschlag, Spardha"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">College / University Name *</label>
              <input
                type="text"
                placeholder="e.g. Kanpur Institute of Technology (KIT)"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Edition</label>
              <input
                type="text"
                placeholder="e.g. Edition 2025 or 14th Edition"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-white"
              >
                <option value="technical">Technical Fest</option>
                <option value="cultural">Cultural &amp; Arts Fest</option>
                <option value="hackathon">Hackathon</option>
                <option value="sports">Sports Olympiad</option>
                <option value="entrepreneurship">E-Summit</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Dates</label>
              <input
                type="text"
                placeholder="e.g. March 14 - 16, 2026"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Your Organizer Role</label>
              <input
                type="text"
                placeholder="e.g. Overall Convener, Technical Head, Sponsorship Head"
                value={organizerRole}
                onChange={(e) => setOrganizerRole(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primary Venue</label>
              <input
                type="text"
                placeholder="e.g. Central Auditorium &amp; Sports Complex"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Theme / Motto</label>
            <input
              type="text"
              placeholder="e.g. Silicon Frontier: AI &amp; Autonomous Systems"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Brief Overview / Summary</label>
            <textarea
              rows={3}
              placeholder="Provide a high-level summary of what this fest encompasses..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Initialize Event Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

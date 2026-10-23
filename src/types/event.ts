export type EventCategory = 'technical' | 'cultural' | 'sports' | 'hackathon' | 'entrepreneurship';

export type EventStatus = 'completed' | 'planning';

export interface SponsorItem {
  sponsor: string;
  tier: 'Title' | 'Powered By' | 'Associate' | 'In-Kind';
  amount: number;
  deliverables: string;
}

export interface ExpenseItem {
  id: string;
  category: string;
  planned: number;
  actual: number;
  notes: string;
}

export interface DepartmentDebrief {
  id: string;
  name: string;
  lead: string;
  teamSize: number;
  score: number; // 1-10
  status: 'exceptional' | 'on_track' | 'needs_attention' | 'critical';
  positives: string[];
  shortfalls: string[];
  recommendations: string;
}

export interface MilestoneItem {
  id: string;
  task: string;
  owner: string;
  status: 'completed' | 'in_progress' | 'pending';
  priority: 'high' | 'medium' | 'low';
}

export interface TimelinePhase {
  phase: string;
  timeframe: string;
  milestones: MilestoneItem[];
}

export interface RunOfShowItem {
  id: string;
  time: string;
  day: string;
  event: string;
  venue: string;
  lead: string;
  status: 'completed' | 'scheduled' | 'delayed' | 'live';
  notes: string;
}

export interface IncidentLog {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  department: string;
  timeOccurred: string;
  description: string;
  resolution: string;
  preventativeMeasure: string;
}

export interface AttendeeFeedback {
  overallRating: number;
  totalResponses: number;
  nps: number;
  ratings: {
    eventQuality: number;
    logisticsCrowd: number;
    hospitalityFood: number;
    soundStage: number;
    prizesRecognition: number;
  };
  studentQuotes: Array<{
    id: string;
    author: string;
    college: string;
    quote: string;
    sentiment: 'positive' | 'constructive';
  }>;
}

export interface RiskItem {
  id: string;
  risk: string;
  severity: 'High' | 'Medium' | 'Low';
  probability: 'High' | 'Medium' | 'Low';
  contingencyPlan: string;
}

export interface NextEditionBlueprint {
  proposedTheme: string;
  targetDates: string;
  targetFootfall: number;
  targetBudget: number;
  sponsorshipTarget: number;
  strategicImprovements: string[];
  newAttractions: string[];
  riskContingencies: RiskItem[];
}

export interface SubCompetition {
  id: string;
  name: string;
  category: 'coding' | 'robotics' | 'gaming' | 'cultural' | 'literary' | 'sports' | 'general';
  venue: string;
  schedule: string;
  teamSize: string;
  maxTeams: number;
  registeredTeams: number;
  prizePool: number;
  coordinatorName: string;
  coordinatorPhone: string;
  status: 'open' | 'live' | 'judging' | 'completed';
  winners: Array<{
    place: '1st' | '2nd' | '3rd';
    teamName: string;
    college: string;
    prize: number;
  }>;
  description: string;
  rulebook: string[];
}

export interface ParticipantRegistration {
  id: string;
  name: string;
  rollNo: string;
  email: string;
  phone: string;
  college: string;
  eventRegistered: string;
  teamName: string;
  paymentStatus: 'paid' | 'pending' | 'free';
  checkInStatus: 'checked_in' | 'pending';
  checkedInAt?: string;
  kitCollected: boolean;
}

export interface VolunteerTask {
  id: string;
  task: string;
  department: string;
  assignedTo: string;
  phone: string;
  shift: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  venue: string;
}

export interface LiveBroadcast {
  id: string;
  time: string;
  title: string;
  message: string;
  type: 'general' | 'urgent' | 'schedule_change' | 'announcement';
  targetAudience: 'all' | 'participants' | 'volunteers' | 'judges';
}

export interface CollegeEvent {
  id: string;
  title: string;
  college: string;
  edition: string;
  category: EventCategory;
  dates: string;
  venue: string;
  status: EventStatus;
  theme: string;
  organizerRole: string;
  heroImage: string;
  summary: string;
  attendeeStats: {
    targetFootfall: number;
    actualFootfall: number;
    collegesParticipating: number;
    totalCompetitions: number;
  };
  budget: {
    currency: string;
    sponsorships: SponsorItem[];
    expenses: ExpenseItem[];
  };
  departments: DepartmentDebrief[];
  timeline: TimelinePhase[];
  runOfShow: RunOfShowItem[];
  incidents: IncidentLog[];
  feedback: AttendeeFeedback;
  nextEdition: NextEditionBlueprint;
  competitions: SubCompetition[];
  registrations: ParticipantRegistration[];
  volunteerTasks: VolunteerTask[];
  liveBroadcasts: LiveBroadcast[];
}

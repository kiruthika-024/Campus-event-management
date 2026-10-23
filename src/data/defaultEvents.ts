import { CollegeEvent } from '../types/event';

export const DEFAULT_EVENTS: CollegeEvent[] = [
  {
    id: 'innovista-2025',
    title: 'Innovista TechFest',
    college: 'Kanpur Institute of Technology (KIT)',
    edition: 'Edition 2025 (Annual Tech Symposium)',
    category: 'technical',
    dates: 'March 14 - 16, 2025',
    venue: 'Campus Central Auditorium, CS Labs & Robotics Arena',
    status: 'completed',
    theme: 'Silicon Frontier: AI, Autonomous Robotics & Green Tech',
    organizerRole: 'Joint Convener & Technical Operations Lead',
    heroImage: '/src/assets/images/fest_tech_stage_1792736986020.jpg',
    summary: 'A 3-day flagship national tech fest featuring 24 competitive events including a 36-hour hackathon, national RoboWars arena, drone racing circuit, and tech talk series by visiting industry leads from AWS and Intel.',
    attendeeStats: {
      targetFootfall: 4500,
      actualFootfall: 5280,
      collegesParticipating: 42,
      totalCompetitions: 24,
    },
    budget: {
      currency: 'INR',
      sponsorships: [
        { sponsor: 'Cognizant Careers', tier: 'Title', amount: 350000, deliverables: 'Main stage naming rights, recruitment booth, keynote intro' },
        { sponsor: 'GitHub Campus Program', tier: 'Powered By', amount: 200000, deliverables: 'Hackathon branding, swag pack, judge panel presence' },
        { sponsor: 'Red Bull Energy', tier: 'Associate', amount: 75000, deliverables: 'Gaming lounge branding, sampling kiosk, product support' },
        { sponsor: 'GeeksforGeeks', tier: 'In-Kind', amount: 80000, deliverables: 'Course vouchers for winners, problem statements' },
        { sponsor: 'Delegate & Registration Fees', tier: 'Associate', amount: 245000, deliverables: '520 registered teams across events' }
      ],
      expenses: [
        { id: 'exp-1', category: 'Stage, Truss & AV Setup', planned: 280000, actual: 295000, notes: 'Includes high-lumen LED wall, line array speakers, audio mixing console' },
        { id: 'exp-2', category: 'Cash Prize Pool & Trophies', planned: 250000, actual: 250000, notes: 'Cash prizes distributed via direct bank transfer to student winners' },
        { id: 'exp-3', category: 'RoboWars Polycarbonate Arena', planned: 95000, actual: 110000, notes: 'Upgraded bullet-resistant polycarbonate siding to 10mm for 30kg bots' },
        { id: 'exp-4', category: 'Guest Speakers Hospitality & Travel', planned: 80000, actual: 72000, notes: 'Flight tickets, executive guest house accommodation, honorariums' },
        { id: 'exp-5', category: 'Volunteer Merchandise & Kit Bags', planned: 65000, actual: 61000, notes: '320 t-shirts, lanyard ID cards, sticker packs' },
        { id: 'exp-6', category: 'High-Bandwidth Dedicated Wi-Fi', planned: 45000, actual: 48000, notes: '1 Gbps dedicated leased line temporary extension for hackathon' },
        { id: 'exp-7', category: 'Refreshments & Volunteer Meals', planned: 85000, actual: 92000, notes: 'Food packets for 3 days across shifts for 140 student volunteers' }
      ],
    },
    departments: [
      {
        id: 'dep-tech',
        name: 'Technical & Event Management',
        lead: 'Aayush Verma (CSE 3rd Year)',
        teamSize: 34,
        score: 9.2,
        status: 'exceptional',
        positives: [
          'UnHack 36-hr hackathon had 118 teams submission rate with automated GitHub evaluator',
          'RoboWars arena setup passed safety standards with zero containment breaches',
          'CodeGolf and WebCraft workshops reached full capacity 2 weeks prior'
        ],
        shortfalls: [
          'Initial Wi-Fi access point in Lab 3 overloaded at 2:00 AM on Day 2 during model training',
          'Judging rubric for UI/UX round took 45 minutes longer than planned to aggregate'
        ],
        recommendations: 'Switch to a local mesh router cluster per 15 hackathon teams and use a live digitized scoring portal for judges.'
      },
      {
        id: 'dep-logistics',
        name: 'Logistics, Stage & Power Supply',
        lead: 'Rohan Sharma (ME 4th Year)',
        teamSize: 42,
        score: 8.4,
        status: 'on_track',
        positives: [
          'All sound and lighting checks completed 4 hours before the inaugural ceremony',
          'Two backup 125 kVA diesel generators maintained uninterrupted main stage power'
        ],
        shortfalls: [
          'Robotics arena power tripped once due to heavy welding work in the adjacent pit stop',
          'Signage boards at the campus north gate were blown over by sudden high afternoon winds'
        ],
        recommendations: 'Isolate the workshop repair pit electrical line completely from the match arena circuit breaker.'
      },
      {
        id: 'dep-sponsorship',
        name: 'Sponsorship, Finance & PR',
        lead: 'Sneha Patel (IT 3rd Year)',
        teamSize: 18,
        score: 8.8,
        status: 'exceptional',
        positives: [
          'Surpassed sponsorship budget target by 18% (Total ₹9.5 Lakhs generated)',
          'Secured 4 new corporate tech partners with active internship placement booths'
        ],
        shortfalls: [
          'Sponsor banner placement for Red Bull booth was delayed by 3 hours on Day 1',
          'Reimbursement receipts processing took 10 business days post fest'
        ],
        recommendations: 'Assign dedicated single-point-of-contact (SPOC) volunteers to each corporate sponsor 24 hours prior to fest.'
      },
      {
        id: 'dep-hospitality',
        name: 'Hospitality, Security & Registrations',
        lead: 'Devika Nair (ECE 4th Year)',
        teamSize: 28,
        score: 8.1,
        status: 'on_track',
        positives: [
          'Accommodated 380 outstation participants in university hostels with zero complaints',
          'QR code registration on spot reduced average desk queue time to 22 seconds per student'
        ],
        shortfalls: [
          'Food token counter experienced a 20-minute rush bottleneck during Day 2 lunch interval',
          'Security team at Gate 2 required clearer badge color-coding for external participants'
        ],
        recommendations: 'Separate student registration badge into distinct neon bands: Blue (Day Scholar), Green (Hostel Participant), Orange (Core Crew).'
      }
    ],
    timeline: [
      {
        phase: 'Phase 1: Approvals & Charter (T-180 Days)',
        timeframe: 'October 2024',
        milestones: [
          { id: 'm-1', task: 'Form core student steering committee & faculty advisory council', owner: 'Student Convener', status: 'completed', priority: 'high' },
          { id: 'm-2', task: 'Draft event concept note, dates reservation & Dean approval', owner: 'Core Team', status: 'completed', priority: 'high' },
          { id: 'm-3', task: 'Prepare estimated provisional budget breakdown of ₹8.5L', owner: 'Finance Lead', status: 'completed', priority: 'medium' }
        ]
      },
      {
        phase: 'Phase 2: Outreach & Sponsorship Drive (T-90 Days)',
        timeframe: 'December 2024',
        milestones: [
          { id: 'm-4', task: 'Pitch to 60+ tech companies & finalize Title & Powered-by deals', owner: 'Sponsorship Lead', status: 'completed', priority: 'high' },
          { id: 'm-5', task: 'Launch official website & automated team registration portal', owner: 'Web Team', status: 'completed', priority: 'high' },
          { id: 'm-6', task: 'Release problem statements & RoboWars specifications rulebook', owner: 'Tech Committee', status: 'completed', priority: 'medium' }
        ]
      },
      {
        phase: 'Phase 3: Operational Lock-in & Production (T-21 Days)',
        timeframe: 'February 2025',
        milestones: [
          { id: 'm-7', task: 'Finalize sound, stage, LED screen & generator vendor contracts', owner: 'Logistics Lead', status: 'completed', priority: 'high' },
          { id: 'm-8', task: 'Book university hostel rooms for 400 outstation delegates', owner: 'Hospitality Lead', status: 'completed', priority: 'medium' },
          { id: 'm-9', task: 'Volunteer briefing and dry-run walkthrough across campus venues', owner: 'Operations Lead', status: 'completed', priority: 'high' }
        ]
      },
      {
        phase: 'Phase 4: Fest Execution (D-Day to D+3)',
        timeframe: 'March 14-16, 2025',
        milestones: [
          { id: 'm-10', task: 'Execute Inauguration Ceremony & Keynote address', owner: 'Convener', status: 'completed', priority: 'high' },
          { id: 'm-11', task: 'Run 36-hr Hackathon, Drone Race & RoboWars double-elimination', owner: 'Tech Leads', status: 'completed', priority: 'high' },
          { id: 'm-12', task: 'Grand Valedictory & Prize distribution ceremony with Dean', owner: 'Advisory Panel', status: 'completed', priority: 'high' }
        ]
      }
    ],
    runOfShow: [
      { id: 'ros-1', time: '09:00 - 10:30 AM', day: 'Day 1', event: 'Inaugural Lamp Lighting & Industry Keynote', venue: 'Main Auditorium', lead: 'Aayush & Sneha', status: 'completed', notes: 'Dignitaries: Dean of Academic Affairs, VP of Cognizant' },
      { id: 'ros-2', time: '11:00 AM', day: 'Day 1', event: 'UnHack 2025: 36-Hour Hackathon Kickoff', venue: 'CS Lab Complex & Hall B', lead: 'Tech Core', status: 'completed', notes: '118 teams checked in, problem statements revealed' },
      { id: 'ros-3', time: '02:00 - 06:00 PM', day: 'Day 1', event: 'RoboWars Qualifier Rounds (15kg & 30kg)', venue: 'Robotics Open Arena', lead: 'Rohan Sharma', status: 'completed', notes: 'Safety briefing done, 32 combat bots weighed in' },
      { id: 'ros-4', time: '10:00 - 01:00 PM', day: 'Day 2', event: 'FPV Drone Racing League Prelims', venue: 'Campus Sports Ground', lead: 'Drone Club', status: 'completed', notes: 'Obstacle hoop course set up, timed laps' },
      { id: 'ros-5', time: '07:00 - 09:30 PM', day: 'Day 2', event: 'Tech-Comedy & Electronic DJ Night', venue: 'Amphitheater', lead: 'Cultural Liaison', status: 'completed', notes: 'Crowd management perimeter maintained' },
      { id: 'ros-6', time: '11:00 AM - 02:00 PM', day: 'Day 3', event: 'Hackathon Top 10 Final Pitches & Demo', venue: 'Main Auditorium', lead: 'Judge Panel', status: 'completed', notes: 'Live jury scoring, prototype evaluation' },
      { id: 'ros-7', time: '04:00 - 06:00 PM', day: 'Day 3', event: 'Valedictory & Prize Distribution', venue: 'Main Auditorium', lead: 'Student Convener', status: 'completed', notes: 'Cheques distributed, vote of thanks' }
    ],
    incidents: [
      {
        id: 'inc-1',
        title: 'RoboWars Pit Stop Power Surge & Circuit Trip',
        severity: 'high',
        department: 'Logistics & Infrastructure',
        timeOccurred: 'Day 1, 03:45 PM',
        description: 'Two teams simultaneously connected heavy-duty 40A battery fast chargers and a MIG welder in the repair pits, tripping the MCB breaker for the arena lights.',
        resolution: 'The electrical team switched arena lighting to Generator #2 within 4 minutes. Pit stop power lines were split into two separate 16A sub-switches with dedicated surge protectors.',
        preventativeMeasure: 'Install industrial distribution boxes with dedicated breaker ratings for workshop tools separate from stage/arena luminaires.'
      },
      {
        id: 'inc-2',
        title: 'Hackathon High-Density Wi-Fi Latency Spike',
        severity: 'medium',
        department: 'Technical Operations',
        timeOccurred: 'Day 2, 02:15 AM',
        description: 'Over 400 active devices in CS Hall B caused DHCP address pool exhaustion on the primary campus access point, delaying Git pushes.',
        resolution: 'Tech team expanded the subnet mask from /24 to /22 on the switch, rebooted secondary APs, and distributed wired Ethernet switches to top 20 teams.',
        preventativeMeasure: 'Pre-allocate static IP reservations and provide 24-port unmanaged gigabit switches for every 6 tables.'
      },
      {
        id: 'inc-3',
        title: 'Lunch Packet Supply Delay from Caterer',
        severity: 'medium',
        department: 'Hospitality & Food',
        timeOccurred: 'Day 2, 01:15 PM',
        description: 'Vendor delivery vehicle was stuck in highway traffic, delaying 600 lunch boxes by 40 minutes during peak interval.',
        resolution: 'Core team tapped the campus canteen buffer reserve to distribute packaged sandwiches, juices, and snacks while volunteers directed crowds to interactive booth demos.',
        preventativeMeasure: 'Mandate that the external catering supplier deliver all afternoon meal crates to campus storage by 11:00 AM.'
      }
    ],
    feedback: {
      overallRating: 4.6,
      totalResponses: 1420,
      nps: 68,
      ratings: {
        eventQuality: 4.8,
        logisticsCrowd: 4.3,
        hospitalityFood: 4.1,
        soundStage: 4.9,
        prizesRecognition: 4.7
      },
      studentQuotes: [
        {
          id: 'q-1',
          author: 'Harshita Sen',
          college: 'IIT Roorkee',
          quote: 'The 36-hr hackathon problem statements were world-class. Having AWS mentors around at 3 AM to debug Kubernetes clusters was mind-blowing!',
          sentiment: 'positive'
        },
        {
          id: 'q-2',
          author: 'Vikramaditya Roy',
          college: 'BITS Pilani',
          quote: 'RoboWars arena safety was top-notch with the heavy polycarbonate walls. However, the food token counter queue during lunch was painful.',
          sentiment: 'constructive'
        },
        {
          id: 'q-3',
          author: 'Priya K.',
          college: 'Coimbatore Institute of Technology',
          quote: 'Best organized fest our team attended this semester. The hospitality team was warm, and prize money arrived in our bank accounts within 48 hours.',
          sentiment: 'positive'
        }
      ]
    },
    nextEdition: {
      proposedTheme: 'Innovista 2026: Quantum Horizons & Sustainable Computing',
      targetDates: 'March 13 - 15, 2026',
      targetFootfall: 7000,
      targetBudget: 1250000,
      sponsorshipTarget: 1000000,
      strategicImprovements: [
        'Decentralize food counters across 3 zones (Auditorium, Labs, Grounds) with pre-printed RFID smart wristbands',
        'Deploy dedicated gigabit wired switch trunks to every hackathon table with redundant 2 Gbps failover ISP links',
        'Expand RoboWars weight category to introduce 60kg Heavyweight championship with increased cash prize',
        'Partner with Tier-1 incubators (Y Combinator/NASSCOM 10k Startups) to fast-track top hackathon winners into seed grants'
      ],
      newAttractions: [
        'Autonomous AI Rover Obstacle Course in simulated Mars terrain',
        'Cybersecurity Red Team vs Blue Team Live Capture the Flag (CTF) Arena',
        'CleanTech Green Mobility Showcase featuring student electric go-karts and solar drones',
        'AI Founders Conclave with 10 venture capital partners offering on-spot mentorship'
      ],
      riskContingencies: [
        {
          id: 'r-1',
          risk: 'Unseasonal March Rainfall affecting outdoor drone race & food court',
          severity: 'High',
          probability: 'Medium',
          contingencyPlan: 'Pre-book the indoor multi-purpose badminton hall as weather backup for drone track and indoor German hangar tents for food stalls.'
        },
        {
          id: 'r-2',
          risk: 'Over-capacity crowd surge during evening Celebrity Tech-Talk',
          severity: 'High',
          probability: 'High',
          contingencyPlan: 'Implement digital seat reservation via fest mobile app with overflow live-streaming to 4 satellite lecture theatres.'
        },
        {
          id: 'r-3',
          risk: 'Sponsor payment delays before fest production advances',
          severity: 'Medium',
          probability: 'Medium',
          contingencyPlan: 'Follow up with sponsors early and maintain a reserve fund to cover essential production costs.'
        }
      ]
    },
    competitions: [
      {
        id: 'comp-1',
        name: 'UnHack 36-Hr Flagship Hackathon',
        category: 'coding',
        venue: 'CS Lab 2 & Multi-Purpose Hall B',
        schedule: 'Day 1 11:00 AM - Day 2 11:00 PM',
        teamSize: '2-4 Members',
        maxTeams: 120,
        registeredTeams: 118,
        prizePool: 150000,
        coordinatorName: 'Aayush Verma',
        coordinatorPhone: '+91 98765 43210',
        status: 'completed',
        winners: [
          { place: '1st', teamName: 'ByteCrafters', college: 'IIT (BHU) Varanasi', prize: 80000 },
          { place: '2nd', teamName: 'NeuralFlow', college: 'Kanpur Institute of Technology (KIT)', prize: 45000 },
          { place: '3rd', teamName: 'SynapseAI', college: 'BITS Pilani', prize: 25000 }
        ],
        description: 'National 36-hour non-stop prototyping sprint on AI, autonomous computing, and healthcare engineering with AWS cloud mentors.',
        rulebook: [
          'All code must be written after the official hackathon kickoff timestamp.',
          'Open-source libraries and APIs are permitted; pre-built proprietary software is strictly prohibited.',
          'Judged on 4 criteria: Technical Innovation (30%), Execution & Architecture (30%), UI/UX (20%), Practical Impact (20%).'
        ]
      },
      {
        id: 'comp-2',
        name: 'RoboWars 30kg Combat Championship',
        category: 'robotics',
        venue: 'Robotics Outdoor Polycarbonate Arena',
        schedule: 'Day 1 02:00 PM - Day 2 06:00 PM',
        teamSize: '3-6 Members',
        maxTeams: 32,
        registeredTeams: 32,
        prizePool: 80000,
        coordinatorName: 'Rohan Sharma',
        coordinatorPhone: '+91 98765 43211',
        status: 'completed',
        winners: [
          { place: '1st', teamName: 'Annihilator', college: 'Delhi Technological University (DTU)', prize: 50000 },
          { place: '2nd', teamName: 'TitanForge', college: 'Kanpur Institute of Technology (KIT)', prize: 30000 }
        ],
        description: 'Hardcore kinetic combat robot battles in a custom 10mm bullet-resistant arena under standard double elimination rules.',
        rulebook: [
          'Weight limit: 30.0 kg max including batteries and pneumatics.',
          'Failsafe switch must cut all motor and weapon power within 1.5 seconds of transmitter signal loss.',
          'Flamethrowers, liquid projectiles, and radio jamming are strictly barred.'
        ]
      },
      {
        id: 'comp-3',
        name: 'FPV High-Speed Drone Racing League',
        category: 'robotics',
        venue: 'Campus Central Sports Stadium',
        schedule: 'Day 2 10:00 AM - 01:00 PM',
        teamSize: '1-2 Pilots',
        maxTeams: 24,
        registeredTeams: 22,
        prizePool: 40000,
        coordinatorName: 'Sanjay Rawat',
        coordinatorPhone: '+91 98765 43212',
        status: 'completed',
        winners: [
          { place: '1st', teamName: 'SkyFalcon', college: 'Coimbatore Institute of Technology', prize: 25000 },
          { place: '2nd', teamName: 'AeroPulse', college: 'IIT Kanpur', prize: 15000 }
        ],
        description: 'Precision acrobatic and high-speed multirotor drone obstacle course with illuminated gates.',
        rulebook: [
          '5-inch propeller maximum diameter with 4S/6S LiPo power restrictions.',
          'Pilots must wear video receiver goggles and submit VTX channel frequencies before qualifying heats.'
        ]
      },
      {
        id: 'comp-4',
        name: 'CodeGolf: Algorithmic Micro-Optimization',
        category: 'coding',
        venue: 'CS Lab 1',
        schedule: 'Day 1 04:00 PM - 06:30 PM',
        teamSize: 'Solo (1)',
        maxTeams: 150,
        registeredTeams: 142,
        prizePool: 25000,
        coordinatorName: 'Kavita Joshi',
        coordinatorPhone: '+91 98765 43213',
        status: 'completed',
        winners: [
          { place: '1st', teamName: 'Rishi Agarwal', college: 'NIT Allahabad', prize: 15000 },
          { place: '2nd', teamName: 'Mohit Saxena', college: 'KIT Kanpur', prize: 10000 }
        ],
        description: 'Solve complex competitive programming challenges using the minimum possible number of characters and source bytes.',
        rulebook: [
          'Supported languages: Python 3, C++, Rust, JavaScript.',
          'Programs must pass 100% of hidden test vectors within 1.0s runtime.'
        ]
      }
    ],
    registrations: [
      {
        id: 'reg-1',
        name: 'Arjun Singhania',
        rollNo: '21CS042',
        email: 'arjun.s@iitbhu.ac.in',
        phone: '+91 98111 22334',
        college: 'IIT (BHU) Varanasi',
        eventRegistered: 'UnHack 36-Hr Flagship Hackathon',
        teamName: 'ByteCrafters',
        paymentStatus: 'paid',
        checkInStatus: 'checked_in',
        checkedInAt: 'Day 1, 09:15 AM',
        kitCollected: true
      },
      {
        id: 'reg-2',
        name: 'Pooja Narang',
        rollNo: '22CS108',
        email: 'pooja.n@kit.ac.in',
        phone: '+91 98222 33445',
        college: 'Kanpur Institute of Technology (KIT)',
        eventRegistered: 'UnHack 36-Hr Flagship Hackathon',
        teamName: 'NeuralFlow',
        paymentStatus: 'paid',
        checkInStatus: 'checked_in',
        checkedInAt: 'Day 1, 09:30 AM',
        kitCollected: true
      },
      {
        id: 'reg-3',
        name: 'Vikram Rajput',
        rollNo: '20ME019',
        email: 'vikram.r@dtu.ac.in',
        phone: '+91 98333 44556',
        college: 'Delhi Technological University (DTU)',
        eventRegistered: 'RoboWars 30kg Combat Championship',
        teamName: 'Annihilator',
        paymentStatus: 'paid',
        checkInStatus: 'checked_in',
        checkedInAt: 'Day 1, 10:10 AM',
        kitCollected: true
      },
      {
        id: 'reg-4',
        name: 'Suresh Menon',
        rollNo: '22ECE054',
        email: 'suresh.m@cit.edu.in',
        phone: '+91 98444 55667',
        college: 'Coimbatore Institute of Technology',
        eventRegistered: 'FPV High-Speed Drone Racing League',
        teamName: 'SkyFalcon',
        paymentStatus: 'paid',
        checkInStatus: 'checked_in',
        checkedInAt: 'Day 1, 10:45 AM',
        kitCollected: true
      },
      {
        id: 'reg-5',
        name: 'Ananya Roy',
        rollNo: '23CS012',
        email: 'ananya.roy@nitc.ac.in',
        phone: '+91 98555 66778',
        college: 'NIT Calicut',
        eventRegistered: 'CodeGolf: Algorithmic Micro-Optimization',
        teamName: 'Solo',
        paymentStatus: 'paid',
        checkInStatus: 'checked_in',
        checkedInAt: 'Day 1, 11:20 AM',
        kitCollected: true
      },
      {
        id: 'reg-6',
        name: 'Karan Mehra',
        rollNo: '21IT089',
        email: 'karan.m@kiit.ac.in',
        phone: '+91 98666 77889',
        college: 'KIIT University',
        eventRegistered: 'UnHack 36-Hr Flagship Hackathon',
        teamName: 'CloudStormers',
        paymentStatus: 'paid',
        checkInStatus: 'checked_in',
        checkedInAt: 'Day 1, 09:40 AM',
        kitCollected: true
      },
      {
        id: 'reg-7',
        name: 'Harish Babu',
        rollNo: '22ME077',
        email: 'harish.b@kit.ac.in',
        phone: '+91 98777 88990',
        college: 'Kanpur Institute of Technology (KIT)',
        eventRegistered: 'RoboWars 30kg Combat Championship',
        teamName: 'TitanForge',
        paymentStatus: 'paid',
        checkInStatus: 'checked_in',
        checkedInAt: 'Day 1, 10:15 AM',
        kitCollected: true
      },
      {
        id: 'reg-8',
        name: 'Divya Khurana',
        rollNo: '23AI031',
        email: 'divya.k@iitk.ac.in',
        phone: '+91 98888 99001',
        college: 'IIT Kanpur',
        eventRegistered: 'FPV High-Speed Drone Racing League',
        teamName: 'AeroPulse',
        paymentStatus: 'paid',
        checkInStatus: 'checked_in',
        checkedInAt: 'Day 1, 11:00 AM',
        kitCollected: false
      }
    ],
    volunteerTasks: [
      {
        id: 'vol-1',
        task: 'Setup and verify 10mm polycarbonate shield clamps around arena',
        department: 'Robotics Operations',
        assignedTo: 'Manish Kumar (ME 3rd Yr)',
        phone: '+91 91111 22222',
        shift: 'Day 1 Morning (08:00 AM - 01:00 PM)',
        status: 'completed',
        priority: 'high',
        venue: 'Robotics Arena'
      },
      {
        id: 'vol-2',
        task: 'Distribute 320 kit bags & verify ID verification at North Gate desk',
        department: 'Registration Desk',
        assignedTo: 'Priya Verma (CSE 2nd Yr)',
        phone: '+91 92222 33333',
        shift: 'Day 1 Morning (08:00 AM - 02:00 PM)',
        status: 'completed',
        priority: 'high',
        venue: 'Campus North Gate'
      },
      {
        id: 'vol-3',
        task: 'Monitor Lab 2 Wi-Fi DHCP pool and Ethernet switches for 118 teams',
        department: 'Tech Network Squad',
        assignedTo: 'Sameer Joshi (IT 3rd Yr)',
        phone: '+91 93333 44444',
        shift: 'Day 1 Night (08:00 PM - 04:00 AM)',
        status: 'completed',
        priority: 'high',
        venue: 'CS Lab Complex'
      },
      {
        id: 'vol-4',
        task: 'Escort AWS guest keynote speaker from campus guest house to auditorium',
        department: 'Dignitary Hospitality',
        assignedTo: 'Tanvi Saxena (ECE 4th Yr)',
        phone: '+91 94444 55555',
        shift: 'Day 1 Morning (09:00 AM - 12:00 PM)',
        status: 'completed',
        priority: 'medium',
        venue: 'VIP Executive Lounge'
      },
      {
        id: 'vol-5',
        task: 'Manage lunch queue line barriers and distribute vegetarian food packets',
        department: 'Catering & Logistics',
        assignedTo: 'Harsh Vardhan (CE 3rd Yr)',
        phone: '+91 95555 66666',
        shift: 'Day 2 Afternoon (12:30 PM - 03:00 PM)',
        status: 'completed',
        priority: 'high',
        venue: 'Dining Quad'
      }
    ],
    liveBroadcasts: [
      {
        id: 'bc-1',
        time: 'Day 1, 10:45 AM',
        title: 'UnHack 36-Hr Hackathon Problem Statements Live',
        message: 'All 118 checked-in teams must pull official problem statements from unhack.kit.ac.in. Wi-Fi SSID: Innovista_HighSpeed_5G.',
        type: 'announcement',
        targetAudience: 'participants'
      },
      {
        id: 'bc-2',
        time: 'Day 1, 03:50 PM',
        title: 'RoboWars Circuit Recovery Notice',
        message: 'Arena power breaker switched to secondary diesel generator #2. Bout #4 will commence in 10 minutes.',
        type: 'schedule_change',
        targetAudience: 'all'
      },
      {
        id: 'bc-3',
        time: 'Day 2, 01:00 AM',
        title: 'Midnight Hackathon Red Bull & Pizza Drop',
        message: 'Hot pizzas and cold refreshments available at Cafeteria Counter B. Present team wristbands to claim.',
        type: 'general',
        targetAudience: 'participants'
      }
    ]
  },
  {
    id: 'utsav-cultural-2024',
    title: 'Vibrance / Utsav Cultural Fest',
    college: 'Kanpur Institute of Technology (KIT)',
    edition: 'Edition 2024 (Annual Inter-Collegiate Arts Fest)',
    category: 'cultural',
    dates: 'October 18 - 20, 2024',
    venue: 'Grand University Grounds & Main Amphitheater',
    status: 'completed',
    theme: 'Kaleidoscope: Celebrating Diversity, Folklore & Modern Rhythm',
    organizerRole: 'Head of Cultural Affairs & Star Night Operations',
    heroImage: '/src/assets/images/fest_cultural_night_1792736986462.jpg',
    summary: 'A 3-day cultural carnival boasting 32 events across classical music, western dance, battle of the bands, street play, fashion show, and a 6,500+ attendee Star Night concert by Bollywood playback singer and band.',
    attendeeStats: {
      targetFootfall: 6000,
      actualFootfall: 7200,
      collegesParticipating: 58,
      totalCompetitions: 32,
    },
    budget: {
      currency: 'INR',
      sponsorships: [
        { sponsor: 'Hero MotoCorp', tier: 'Title', amount: 500000, deliverables: 'Main stage branding, bike showcase on center lawn, prime video ads' },
        { sponsor: 'State Bank of India', tier: 'Powered By', amount: 300000, deliverables: 'Banner ads, entrance arch, student account promo zone' },
        { sponsor: 'Spotify India', tier: 'Associate', amount: 150000, deliverables: 'Battle of the bands partner, student premium trial handouts' },
        { sponsor: 'Campus Stalls & Food Vendors', tier: 'Associate', amount: 180000, deliverables: '18 commercial food & lifestyle stalls rental' },
        { sponsor: 'Gate Entry & Passes', tier: 'Associate', amount: 320000, deliverables: 'Non-college external attendee ticket passes' }
      ],
      expenses: [
        { id: 'exp-c1', category: 'Celebrity Artist Performance & Rider Fee', planned: 550000, actual: 575000, notes: 'Performance contract, flight tickets for 12-member band, 5-star hotel suites' },
        { id: 'exp-c2', category: 'Concert Mega Stage, Sound & Light Truss', planned: 380000, actual: 390000, notes: 'L-Acoustics line array, 40 moving beam lights, LED backdrops' },
        { id: 'exp-c3', category: 'Stage Competition Prizes & Mementos', planned: 200000, actual: 200000, notes: 'Choreonite, Battle of Bands, Fashion Walk winners prize money' },
        { id: 'exp-c4', category: 'Bouncer Security, Barricading & Police Liaison', planned: 90000, actual: 105000, notes: '60 licensed security bouncers, heavy mojo barricades, police permissions' },
        { id: 'exp-c5', category: 'Publicity, Social Media & Campus Decor', planned: 85000, actual: 80000, notes: 'Cloth fairy lights, selfie booths, campus aesthetic art installations' },
        { id: 'exp-c6', category: 'Emergency Services, Ambulance & First Aid', planned: 25000, actual: 20000, notes: '2 on-site ambulances with paramedic team from city hospital' }
      ],
    },
    departments: [
      {
        id: 'dep-star',
        name: 'Artist Management & Green Room Hospitality',
        lead: 'Tanvi Saxena (ECE 4th Year)',
        teamSize: 14,
        score: 9.0,
        status: 'exceptional',
        positives: [
          'Artist team arrived at green room 90 minutes before stage time without logistics snags',
          'Sound-check was coordinated smoothly with the sound engineer at 3:00 PM'
        ],
        shortfalls: [
          'Artist technical rider requested 4 specific acoustic monitors that required emergency courier from city'
        ],
        recommendations: 'Lock in technical rider specifications 15 days in advance and test identical equipment during sound-check morning.'
      },
      {
        id: 'dep-crowd',
        name: 'Crowd Control, Barricading & Access Control',
        lead: 'Kartik Sharma (ME 4th Year)',
        teamSize: 50,
        score: 7.9,
        status: 'needs_attention',
        positives: [
          'Zero medical accidents or stampede situations despite 7,200 attendees at Star Night',
          'Fast medical evacuation corridor maintained clear throughout the show'
        ],
        shortfalls: [
          'Huge crush at Gate 1 around 6:30 PM due to manual QR ticket scanning slowdown',
          'A section of peripheral boundary cloth was breached by non-ticketed trespassers'
        ],
        recommendations: 'Double the number of turnstile entry lanes with physical metal barricade pens 50 meters outside gates.'
      }
    ],
    timeline: [
      {
        phase: 'Phase 1: Artist Scouting & College Permissions (T-120 Days)',
        timeframe: 'June 2024',
        milestones: [
          { id: 'tm-1', task: 'Artist agency negotiations and date lock', owner: 'Convener', status: 'completed', priority: 'high' },
          { id: 'tm-2', task: 'District Magistrate & Police clearance filing', owner: 'Faculty Liaison', status: 'completed', priority: 'high' }
        ]
      },
      {
        phase: 'Phase 2: Event Lineup & Inter-College Invitations (T-45 Days)',
        timeframe: 'September 2024',
        milestones: [
          { id: 'tm-3', task: 'Send formal rulebooks and registration links to 120 colleges', owner: 'PR Team', status: 'completed', priority: 'high' },
          { id: 'tm-4', task: 'Finalize brand sponsorships & food vendor concessions', owner: 'Finance Lead', status: 'completed', priority: 'high' }
        ]
      }
    ],
    runOfShow: [
      { id: 'ros-c1', time: '10:00 AM - 01:00 PM', day: 'Day 1', event: 'Classical & Fusion Solo Vocals', venue: 'Mini Auditorium', lead: 'Tanvi', status: 'completed', notes: 'Judged by All India Radio panelist' },
      { id: 'ros-c2', time: '02:00 - 06:00 PM', day: 'Day 1', event: 'Street Play / Nukkad Natak', venue: 'Open Amphitheater', lead: 'Drama Society', status: 'completed', notes: 'High emotional crowd resonance' },
      { id: 'ros-c3', time: '05:00 - 09:30 PM', day: 'Day 2', event: 'Battle of the Bands (Rock & Indie)', venue: 'Main Stage', lead: 'Sound Team', status: 'completed', notes: '14 finalist bands performed' },
      { id: 'ros-c4', time: '06:30 - 10:00 PM', day: 'Day 3', event: 'Star Night: Live Concert by Celebrity Artist', venue: 'Main Festival Ground', lead: 'Overall Crew', status: 'completed', notes: 'Capacity crowd of 7,200 attendees' }
    ],
    incidents: [
      {
        id: 'inc-c1',
        title: 'Gate 1 RFID Scanner App Sync Crash',
        severity: 'high',
        department: 'Access Control',
        timeOccurred: 'Day 3, 06:15 PM',
        description: 'Mobile hotspot network failure caused the ticket validator app to freeze for 12 minutes, causing an impatient crowd backlog of 800+ students.',
        resolution: 'Shifted immediately to offline barcode mode with physical stamp verifications on hand wrists while a wired Ethernet tether was laid to the gate cabin.',
        preventativeMeasure: 'Use fully offline cached validator apps that sync asynchronously without requiring continuous internet connectivity.'
      }
    ],
    feedback: {
      overallRating: 4.7,
      totalResponses: 2150,
      nps: 74,
      ratings: {
        eventQuality: 4.9,
        logisticsCrowd: 4.1,
        hospitalityFood: 4.4,
        soundStage: 4.9,
        prizesRecognition: 4.5
      },
      studentQuotes: [
        {
          id: 'qc-1',
          author: 'Ananya Deshmukh',
          college: 'Delhi University',
          quote: 'The energy at the main stage during Battle of the Bands was electric! Sound engineering was crisp with zero mic squeals.',
          sentiment: 'positive'
        },
        {
          id: 'qc-2',
          author: 'Siddharth Nair',
          college: 'NIT Trichy',
          quote: 'Star Night was magical, but entry queuing at Gate 1 was congested. They need separate lines for girls and outstation participants.',
          sentiment: 'constructive'
        }
      ]
    },
    nextEdition: {
      proposedTheme: 'Vibrance 2025: Symphony of the Cosmos',
      targetDates: 'October 17 - 19, 2025',
      targetFootfall: 9000,
      targetBudget: 1850000,
      sponsorshipTarget: 1400000,
      strategicImprovements: [
        'Deploy 6-lane automated turnstile RFID barcode gates with dedicated fast-track lane for hostelites',
        'Upgrade to dual delay-sound towers across the 150-meter lawn to eliminate audio decay at the back',
        'Implement cashless digital food festival coupon card system with top-up kiosks'
      ],
      newAttractions: [
        'Silent Disco arena under the star canopy with 3 simultaneous DJ channels',
        'National Inter-College Drone Light Show for inaugural evening',
        'Graffiti & Street Art live mural showdown with renowned graffiti masters'
      ],
      riskContingencies: [
        {
          id: 'rc-1',
          risk: 'Artist flight delay or cancellation due to smog/fog',
          severity: 'High',
          probability: 'Low',
          contingencyPlan: 'Book artists on morning flights 12 hours ahead with backup regional indie headline band on standby retainer.'
        }
      ]
    },
    competitions: [
      {
        id: 'comp-c1',
        name: 'Battle of the Bands (Rock & Indie)',
        category: 'cultural',
        venue: 'Main Amphitheater Stage',
        schedule: 'Day 2 05:00 PM - 09:30 PM',
        teamSize: '3-8 Musicians',
        maxTeams: 16,
        registeredTeams: 14,
        prizePool: 80000,
        coordinatorName: 'Tanvi Saxena',
        coordinatorPhone: '+91 98765 43220',
        status: 'completed',
        winners: [
          { place: '1st', teamName: 'The Frequency Project', college: 'Delhi University', prize: 50000 },
          { place: '2nd', teamName: 'Echoes of Nirvana', college: 'IIT Roorkee', prize: 30000 }
        ],
        description: 'High-voltage live band face-off judged by renowned indie recording artists and sound engineers.',
        rulebook: [
          'Performance time: 20 minutes including 5 minutes sound check.',
          'At least one original composition is mandatory.'
        ]
      },
      {
        id: 'comp-c2',
        name: 'Choreonite: National Western Dance Showdown',
        category: 'cultural',
        venue: 'Main Festival Ground Stage',
        schedule: 'Day 1 06:30 PM - 10:00 PM',
        teamSize: '12-25 Dancers',
        maxTeams: 18,
        registeredTeams: 18,
        prizePool: 70000,
        coordinatorName: 'Rohit Mathur',
        coordinatorPhone: '+91 98765 43221',
        status: 'completed',
        winners: [
          { place: '1st', teamName: 'VibeCrew', college: 'Christ University Bangalore', prize: 45000 },
          { place: '2nd', teamName: 'StepSync', college: 'Kanpur Institute of Technology (KIT)', prize: 25000 }
        ],
        description: 'Synchronized group choreography, urban hip-hop, and contemporary themes judged on synchronization and technique.',
        rulebook: [
          'Time limit: 8-10 minutes on stage.',
          'Audio track must be submitted in MP3 320kbps format on a USB drive at least 4 hours before the event.'
        ]
      }
    ],
    registrations: [
      {
        id: 'reg-c1',
        name: 'Rohan Kapoor',
        rollNo: '21DU104',
        email: 'rohan.k@du.ac.in',
        phone: '+91 98111 88776',
        college: 'Delhi University',
        eventRegistered: 'Battle of the Bands (Rock & Indie)',
        teamName: 'The Frequency Project',
        paymentStatus: 'paid',
        checkInStatus: 'checked_in',
        checkedInAt: 'Day 2, 02:30 PM',
        kitCollected: true
      },
      {
        id: 'reg-c2',
        name: 'Sneha Kulkarni',
        rollNo: '22CU091',
        email: 'sneha.k@christuniversity.in',
        phone: '+91 98222 77665',
        college: 'Christ University Bangalore',
        eventRegistered: 'Choreonite: National Western Dance Showdown',
        teamName: 'VibeCrew',
        paymentStatus: 'paid',
        checkInStatus: 'checked_in',
        checkedInAt: 'Day 1, 03:00 PM',
        kitCollected: true
      }
    ],
    volunteerTasks: [
      {
        id: 'vol-c1',
        task: 'Coordinate artist green room access and beverage riders',
        department: 'Artist Hospitality',
        assignedTo: 'Nisha Rawal (ECE 4th Yr)',
        phone: '+91 98000 11223',
        shift: 'Day 3 Evening (04:00 PM - 11:00 PM)',
        status: 'completed',
        priority: 'high',
        venue: 'VIP Green Room'
      },
      {
        id: 'vol-c2',
        task: 'Manage Mojo security barricades and emergency medical lane',
        department: 'Crowd Safety',
        assignedTo: 'Kartik Sharma (ME 4th Yr)',
        phone: '+91 98000 22334',
        shift: 'Day 3 Evening (05:00 PM - 11:00 PM)',
        status: 'completed',
        priority: 'high',
        venue: 'Main Ground Front-of-Stage'
      }
    ],
    liveBroadcasts: [
      {
        id: 'bc-c1',
        time: 'Day 3, 05:30 PM',
        title: 'Star Night Gate Access Advisory',
        message: 'Gates 1 & 2 open for student entry. Please keep digital wristbands visible to security marshals.',
        type: 'announcement',
        targetAudience: 'all'
      }
    ]
  },
  {
    id: 'hack-sprint-2026',
    title: 'CodeSprint National Hackathon',
    college: 'Kanpur Institute of Technology (KIT)',
    edition: 'Edition 2026 (Next Edition Master Blueprint)',
    category: 'hackathon',
    dates: 'November 20 - 22, 2026',
    venue: 'Academic Computing Complex & Incubation Center',
    status: 'planning',
    theme: 'Decentralized Intelligence: Edge AI, Web3 & Autonomous Systems',
    organizerRole: 'Organizing Secretary & Tech Lead',
    heroImage: '/src/assets/images/fest_hackathon_arena_1792736986360.jpg',
    summary: 'A planned 36-hour premier national hackathon bringing together 150 elite teams (600 developers) across India to build production-grade solutions for climate resilience, healthcare AI, and developer tooling with ₹5,00,000 in direct prizes.',
    attendeeStats: {
      targetFootfall: 1200,
      actualFootfall: 0,
      collegesParticipating: 80,
      totalCompetitions: 6,
    },
    budget: {
      currency: 'INR',
      sponsorships: [
        { sponsor: 'Google Cloud for Startups', tier: 'Title', amount: 400000, deliverables: 'Naming rights, cloud credits for all participants, lead mentor panel' },
        { sponsor: 'Polygon Guild', tier: 'Powered By', amount: 250000, deliverables: 'Track prize sponsorship, dedicated workshop, bounty challenge' },
        { sponsor: 'Postman Campus', tier: 'Associate', amount: 100000, deliverables: 'API tooling partner, swag kits, developer workshop' },
        { sponsor: 'Campus Incubation Cell', tier: 'Associate', amount: 150000, deliverables: 'Direct grant fund for top 3 incubation proposals' }
      ],
      expenses: [
        { id: 'exp-h1', category: 'Total Prize Money & Bounties', planned: 450000, actual: 0, notes: '₹2L Grand Prize, ₹1L Runner Up, ₹1.5L Track Bounties' },
        { id: 'exp-h2', category: '36-Hour Continuous Catering & Energy Drinks', planned: 220000, actual: 0, notes: '5 hot meals + 4 midnight snack rounds for 600 hackers and 80 volunteers' },
        { id: 'exp-h3', category: 'Enterprise Network, 2 Gbps Multi-WAN & Cabling', planned: 85000, actual: 0, notes: 'Dual leased line failover with dedicated switches at each team cluster' },
        { id: 'exp-h4', category: 'Custom Hacker Swag Bags, Hoodies & Badges', planned: 95000, actual: 0, notes: 'High-quality cotton hoodies, metal NFC badges, sticker packs' },
        { id: 'exp-h5', category: 'Mentors & Judges Travel & Stay', planned: 50000, actual: 0, notes: 'Hospitality for 15 industry engineering managers and VCs' }
      ],
    },
    departments: [
      {
        id: 'dep-h-tech',
        name: 'Technical Infrastructure & Dev Platforms',
        lead: 'Vikram Joshi (CSE 3rd Year)',
        teamSize: 20,
        score: 9.5,
        status: 'on_track',
        positives: [
          'Designed dedicated evaluation dashboard with automated Docker container sandboxing for demo verification',
          'Provisioned dual ISP failover links with local DNS cache to prevent external lookup bottlenecks'
        ],
        shortfalls: [
          'Needs 30 more 16-port gigabit switches from central college IT department'
        ],
        recommendations: 'Conduct a simulated 600-device load test on October 25 to verify router thermal stability.'
      },
      {
        id: 'dep-h-mentorship',
        name: 'Judge & Industry Mentor Relations',
        lead: 'Rhea Sen (IT 3rd Year)',
        teamSize: 12,
        score: 9.0,
        status: 'on_track',
        positives: [
          'Confirmed 16 senior engineers from Microsoft, Swiggy, and Razorpay as 24/7 sprint mentors',
          'Drafted standardized 5-parameter judging rubric focusing on innovation, execution, and UX'
        ],
        shortfalls: [],
        recommendations: 'Implement an automated mentor scheduling bot on Discord so teams can book 15-min sprint review slots.'
      }
    ],
    timeline: [
      {
        phase: 'Phase 1: Portal & Brand Announcement (T-90 Days)',
        timeframe: 'August 2026',
        milestones: [
          { id: 'mh-1', task: 'Deploy hackathon submission portal with Devpost & Unstop integrations', owner: 'Web Lead', status: 'completed', priority: 'high' },
          { id: 'mh-2', task: 'Sign contracts with Title and Track sponsors', owner: 'Sponsorship Lead', status: 'in_progress', priority: 'high' }
        ]
      },
      {
        phase: 'Phase 2: Round 1 Idea Screening & Shortlisting (T-30 Days)',
        timeframe: 'October 2026',
        milestones: [
          { id: 'mh-3', task: 'Filter 1,500 initial applications down to top 150 teams (600 hackers)', owner: 'Evaluation Panel', status: 'pending', priority: 'high' },
          { id: 'mh-4', task: 'Finalize logistics, sleeping bean bags & night resting hall layout', owner: 'Logistics Head', status: 'pending', priority: 'medium' }
        ]
      },
      {
        phase: 'Phase 3: The 36-Hour Hackathon Execution',
        timeframe: 'November 20-22, 2026',
        milestones: [
          { id: 'mh-5', task: 'On-spot check-in with NFC wristbands and swag distribution', owner: 'Volunteer Desk', status: 'pending', priority: 'high' },
          { id: 'mh-6', task: 'Three structured mentoring checkpoint rounds (T+8h, T+20h, T+28h)', owner: 'Mentorship Lead', status: 'pending', priority: 'high' },
          { id: 'mh-7', task: 'Final Demo Fair, top 10 stage pitches, and winner announcements', owner: 'Core Convener', status: 'pending', priority: 'high' }
        ]
      }
    ],
    runOfShow: [
      { id: 'rosh-1', time: '09:00 - 11:00 AM', day: 'Day 1', event: 'Hacker Registration, Team Check-in & Breakfast', venue: 'Atrium', lead: 'Hospitality', status: 'scheduled', notes: 'Swag distribution and desk allocations' },
      { id: 'rosh-2', time: '11:30 AM', day: 'Day 1', event: 'Opening Ceremony & Problem Statements Unveiling', venue: 'Auditorium', lead: 'Convener', status: 'scheduled', notes: 'Keynote by Chief Architect of Google Cloud' },
      { id: 'rosh-3', time: '12:30 PM', day: 'Day 1', event: 'Hacking Begins! (T-36:00:00 Countdown)', venue: 'Hacking Halls A & B', lead: 'Tech Lead', status: 'scheduled', notes: 'Server monitors activated' },
      { id: 'rosh-4', time: '08:00 - 10:00 PM', day: 'Day 1', event: 'Mentorship Round 1: Architecture & Feasibility', venue: 'Team Tables', lead: 'Mentors', status: 'scheduled', notes: '10 min per team checkpoint' },
      { id: 'rosh-5', time: '01:00 AM', day: 'Day 2', event: 'Midnight Pizza, Energy Bar & Red Bull Drop', venue: 'Cafeteria', lead: 'Logistics', status: 'scheduled', notes: 'DJ mini-break in amphitheater' },
      { id: 'rosh-6', time: '10:00 AM', day: 'Day 2', event: 'Mentorship Round 2: MVP Functionality & Code Quality', venue: 'Team Tables', lead: 'Mentors', status: 'scheduled', notes: 'Testing live builds' },
      { id: 'rosh-7', time: '11:00 PM', day: 'Day 2', event: 'Code Freeze & GitHub Repository Submission Deadline', venue: 'Online Portal', lead: 'Tech Leads', status: 'scheduled', notes: 'Automated CI/CD build verifier checks' },
      { id: 'rosh-8', time: '02:00 - 05:00 PM', day: 'Day 3', event: 'Top 10 Finalists Grand Stage Pitches & Awards', venue: 'Main Auditorium', lead: 'Core Jury', status: 'scheduled', notes: 'Live streaming on YouTube and Twitter' }
    ],
    incidents: [],
    feedback: {
      overallRating: 0,
      totalResponses: 0,
      nps: 0,
      ratings: {
        eventQuality: 0,
        logisticsCrowd: 0,
        hospitalityFood: 0,
        soundStage: 0,
        prizesRecognition: 0
      },
      studentQuotes: []
    },
    nextEdition: {
      proposedTheme: 'CodeSprint 2026: Autonomous Intelligence & Edge Systems',
      targetDates: 'November 20 - 22, 2026',
      targetFootfall: 1200,
      targetBudget: 900000,
      sponsorshipTarget: 900000,
      strategicImprovements: [
        'Dedicated fiber Ethernet drop at every single team table',
        '24/7 quiet resting pod area separate from active coding hall',
        'Direct angel seed funding matching for top 3 teams'
      ],
      newAttractions: [
        'Hardware IoT Lab with 3D printers and microcontrollers for physical computing',
        'AI Agent Battle Arena where bots play autonomous games'
      ],
      riskContingencies: [
        {
          id: 'rh-1',
          risk: 'Primary campus fiber cut during road construction',
          severity: 'High',
          probability: 'Low',
          contingencyPlan: 'Pre-configure satellite Starlink terminal and 5G cellular bonded router as hot-standby failover.'
        }
      ]
    },
    competitions: [
      {
        id: 'comp-h1',
        name: 'Grand Sprint: Edge AI & Autonomous Agents',
        category: 'coding',
        venue: 'Complex Hall A',
        schedule: 'T-36:00 Countdown to T-0:00',
        teamSize: '3-4 Hackers',
        maxTeams: 60,
        registeredTeams: 54,
        prizePool: 200000,
        coordinatorName: 'Vikram Joshi',
        coordinatorPhone: '+91 98765 43230',
        status: 'open',
        winners: [],
        description: 'Build production-ready lightweight ML & agentic systems running locally on edge microprocessors and mobile devices.',
        rulebook: [
          'Models must run with less than 4GB RAM utilization.',
          'Live interactive demo required before judging panel.'
        ]
      },
      {
        id: 'comp-h2',
        name: 'Web3 & Decentralized Infrastructure Track',
        category: 'coding',
        venue: 'Complex Hall B',
        schedule: 'T-36:00 Countdown to T-0:00',
        teamSize: '2-4 Hackers',
        maxTeams: 40,
        registeredTeams: 38,
        prizePool: 150000,
        coordinatorName: 'Neha Tandon',
        coordinatorPhone: '+91 98765 43231',
        status: 'open',
        winners: [],
        description: 'Decentralized identity, zero-knowledge proofs, and automated smart contract protocols.',
        rulebook: [
          'Must deploy to a live testnet (Polygon Amoy / Arbitrum Sepolia).',
          'Open-source license (MIT/Apache 2.0) on GitHub.'
        ]
      }
    ],
    registrations: [
      {
        id: 'reg-h1',
        name: 'Aditya Srivastava',
        rollNo: '23CS099',
        email: 'aditya.s@kit.ac.in',
        phone: '+91 99111 44556',
        college: 'Kanpur Institute of Technology (KIT)',
        eventRegistered: 'Grand Sprint: Edge AI & Autonomous Agents',
        teamName: 'PromptForge',
        paymentStatus: 'paid',
        checkInStatus: 'pending',
        kitCollected: false
      },
      {
        id: 'reg-h2',
        name: 'Meera Nambiar',
        rollNo: '22IT045',
        email: 'meera.n@nitk.edu.in',
        phone: '+91 99222 55667',
        college: 'NIT Surathkal',
        eventRegistered: 'Web3 & Decentralized Infrastructure Track',
        teamName: 'ZeroProof',
        paymentStatus: 'paid',
        checkInStatus: 'pending',
        kitCollected: false
      }
    ],
    volunteerTasks: [
      {
        id: 'vol-h1',
        task: 'Setup 2 Gbps dual bonded router and test Ethernet switch ports at 40 desks',
        department: 'Infrastructure',
        assignedTo: 'Kunal Sen (CSE 3rd Yr)',
        phone: '+91 98000 33445',
        shift: 'Pre-Event T-12 Hours',
        status: 'in_progress',
        priority: 'high',
        venue: 'Hall A & B'
      },
      {
        id: 'vol-h2',
        task: 'Coordinate Discord bot verification for registered participants',
        department: 'Tech Web',
        assignedTo: 'Simran Walia (IT 3rd Yr)',
        phone: '+91 98000 44556',
        shift: 'Pre-Event T-24 Hours',
        status: 'todo',
        priority: 'high',
        venue: 'Remote / Virtual'
      }
    ],
    liveBroadcasts: [
      {
        id: 'bc-h1',
        time: 'T-30 Days',
        title: 'Registration Portal Opens for Round 1',
        message: 'Devpost application links sent to 120 colleges nationwide. Submission deadline is Oct 30.',
        type: 'announcement',
        targetAudience: 'all'
      }
    ]
  }
];

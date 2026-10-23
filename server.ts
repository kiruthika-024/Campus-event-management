import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API endpoint for Gemini AI assistance
  app.post('/api/ai/generate', async (req, res) => {
    try {
      const { prompt, type, eventContext } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Return helpful domain fallback response
        return res.json({
          success: true,
          fallback: true,
          text: getDomainFallback(type, eventContext, prompt),
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are a premier collegiate festival director and faculty student advisory consultant. 
Provide highly practical, realistic, detailed advice for college event organizers (engineering, cultural, sports, hackathons). 
Include tangible timelines, sponsorship pricing in INR or local currency, risk contingencies, and operational checklists.
Avoid buzzwords; deliver concrete, ready-to-execute copy.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${systemInstruction}\n\nTask: ${prompt}\nContext: ${JSON.stringify(eventContext || {})}`,
      });

      return res.json({
        success: true,
        text: response.text || '',
      });
    } catch (err: any) {
      console.error('Error generating AI advice:', err);
      return res.json({
        success: true,
        fallback: true,
        text: getDomainFallback(req.body.type, req.body.eventContext, req.body.prompt),
      });
    }
  });

  function getDomainFallback(type?: string, context?: any, userPrompt?: string) {
    const festName = context?.title || 'College Fest';
    const college = context?.college || 'College of Engineering & Technology';

    if (type === 'sponsorship_pitch') {
      return `### Executive Sponsorship Proposal: ${festName}
**Target Corporate Partner:** Technology & Youth Brands
**Estimated Footfall:** ${context?.attendeeStats?.targetFootfall || '5,000+'} Active Collegiate Innovators & Students

#### 1. Why Partner with ${festName}?
${college}'s premier flagship annual event brings together the most ambitious engineering, design, and management minds from over 45+ premier institutions across the country. As a partner, your brand receives direct, unfiltered engagement with top-tier hiring talent and Gen-Z consumers.

#### 2. Strategic Partnership Deliverables & Tiers
- **Title Partner (₹5,00,000 / $6,000):**
  - Exclusive "Event Name presented by [Brand]" on all national press releases, posters, and campus entrance arches.
  - Prime 20x20 ft experiential booth in the central amphitheater quad.
  - Keynote address slot (20 mins) during the Inaugural Ceremony to address 3,000+ seated delegates.
  - Direct access to verified participant resume database (opt-in) for engineering internships.
- **Powered-By Partner (₹2,50,000 / $3,000):**
  - Co-branding on hackathon/star night stages and official registration badges.
  - Dedicated track sponsorship (e.g. "[Brand] Cloud Computing & Edge AI Bounty").
  - 10x10 ft demo kiosk and live product sampling permissions.
- **Associate Partner (₹1,00,000 / $1,200):**
  - Logo on festival t-shirts, website footer, and social media announcements (reaching 50,000+ student impressions).

#### 3. Return on Investment (ROI) & Proof of Execution
Past editions saw over 92% active engagement across competitive tracks, with 40+ media mentions and direct on-campus product adoptions.`;
    }

    if (type === 'risk_contingency') {
      return `### Risk Assessment & War-Room Contingency Playbook: ${festName}

| Risk Scenario | Likelihood | Impact | Immediate Mitigation Action | Preventive Protocol |
| :--- | :--- | :--- | :--- | :--- |
| **Grid Power Outage or Surge** | High | Critical | Dual 125 kVA diesel generators running in automatic transfer switch (ATS) load-sharing mode | Pre-isolate workshop welding & fast-charge tools on isolated secondary sub-station circuit |
| **Heavy Sudden Downpour / Storm** | Medium | High | Move outdoor stage competitions to the indoor multi-purpose auditorium within 30-min protocol | Waterproof German hangar waterproof tarping for all food courts and sound consoles |
| **Guest/Artist Delayed in Transit** | Medium | Medium | Activate interim student rock band or interactive crowd engagement host | Mandate artists land at city airport 8 hours prior to stage call |
| **Wi-Fi / DHCP Exhaustion** | High | High | Switch hackathon core tables to gigabit wired Ethernet drops and increase subnet mask to /21 | Dedicated 1 Gbps leased line separate from the public campus student network |
| **Medical Emergency / Fainting** | Low | High | On-duty paramedic ambulance parked at North Gate with dedicated clear evacuation corridor | Water hydration points every 50 meters and 2 resting tents with electrolyte fluids |`;
    }

    if (type === 'dean_report') {
      return `### Official Post-Event Executive Report: ${festName}
**Presented to:** Office of the Dean of Student Affairs & Academic Council
**Organizing Body:** Student Steering Committee, ${college}
**Date:** March 2025

#### 1. Executive Summary & Attendance Metrics
The organizing committee successfully completed the 2025 edition of ${festName}. The event witnessed participation exceeding expectations:
- **Total Footfall:** ${context?.attendeeStats?.actualFootfall || '5,280'} attendees across 3 event days (Target: ${context?.attendeeStats?.targetFootfall || '4,500'}).
- **External Representation:** 42 colleges and universities represented from across 6 states.
- **Academic & Skill Value:** Over 118 working software and hardware prototypes delivered during the hackathon and RoboWars rounds.

#### 2. Financial Integrity & Sponsorship Realization
The event concluded with a healthy operational balance:
- Total Revenue Generated (Corporate Sponsors + Registration): ₹9,50,000
- Total Production & Operational Expenditure: ₹8,98,000
- Net Surplus Transferred to Student Technical Society Reserve: ₹52,000

#### 3. Key Observations & Successor Team Recommendations
- The implementation of digital QR code registration eliminated campus gate queues, averaging under 25 seconds per delegate.
- For the upcoming edition, expanding the food distribution zones into three distinct sector pods will prevent midday dining bottlenecks.`;
    }

    // Default theme generator
    return `### Recommended Strategic Themes & Concepts for ${festName}

1. **"Quantum Leap: Bridging Hardware, Mind & Sustainability"**
   - *Core Philosophy:* Highlights the convergence of physical computing, generative intelligence, and ecological engineering.
   - *Signature Attraction:* Sustainable autonomous rover challenge & smart microgrid hackathon track.

2. **"Nexus '26: Uniting Code, Culture & Community"**
   - *Core Philosophy:* A hybrid cross-disciplinary festival where technology meets interactive media, digital art, and electronic music.
   - *Signature Attraction:* AI-powered generative visual stage that responds to crowd cheering and audio acoustics.

3. **"Vanguard: Builders of the Decarbonized Future"**
   - *Core Philosophy:* Focuses on actionable engineering solutions for green mobility, agritech, and renewable power.
   - *Signature Attraction:* Green Tech Incubator Pitch with active venture partner seed grants on-spot.`;
  }

  // Vite development middleware or production static serving
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});

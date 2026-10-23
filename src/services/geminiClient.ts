import { CollegeEvent } from '../types/event';

export interface AiRequestParams {
  type: 'sponsorship_pitch' | 'risk_contingency' | 'dean_report' | 'theme_generator';
  prompt: string;
  eventContext: CollegeEvent;
}

export async function generateEventAiAdvice(params: AiRequestParams): Promise<{ success: boolean; text: string; fallback?: boolean }> {
  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Direct API proxy failed, utilizing local fallback generator:', err);
    return {
      success: true,
      fallback: true,
      text: getLocalFallbackAdvice(params.type, params.eventContext),
    };
  }
}

function getLocalFallbackAdvice(type: string, context: CollegeEvent): string {
  const fest = context.title;
  const col = context.college;

  if (type === 'sponsorship_pitch') {
    return `### Corporate Partnership Proposal: ${fest}\n**Institution:** ${col}\n**Audience:** Over ${context.attendeeStats.targetFootfall.toLocaleString()} verified student innovators, engineers, and creators.\n\n#### Why Partner With Us?\n${fest} is one of the highest-density student-driven technical and cultural convenings in the region. Our student body represents the top tier of competitive programmers, robotics engineers, and digital designers.\n\n#### Tier Structure:\n- **Title Partner (₹4,50,000):** Prominent naming rights, 20x20 ft high-footfall exhibition quad, direct resume database access, 20-min address during inaugural ceremony.\n- **Powered-By Partner (₹2,50,000):** Stage naming, hackathon track challenge partner, co-branded lanyards and kit bags.\n- **Associate Partner (₹1,00,000):** Social media promotion across 40k+ student reach, campus stall space, and branding on award certificates.`;
  }

  if (type === 'risk_contingency') {
    return `### Comprehensive Risk & Emergency Contingency Plan: ${fest}\n\n1. **Power & AV Failure:**\n   - Dual synchronized diesel generators with automatic failover switch.\n   - Dedicated unswitched line for sound mixing consoles and arena lighting.\n\n2. **Severe Weather / Heavy Rains:**\n   - Waterproof German hangar tarps for outdoor arenas and food clusters.\n   - Pre-reserved indoor auditorium backup for outdoor stage performances.\n\n3. **Network & Wi-Fi Degradation:**\n   - Dedicated 1 Gbps wired leased line with local DNS caching and subnet mask expansion.\n   - Pre-configured multi-port switches at every competition cluster.\n\n4. **Crowd Congestion & Gate Backlog:**\n   - Offline-capable QR scanning apps with paper backup registration lists.\n   - 4-channel physical barrier queuing pens set 30m outside primary gates.`;
  }

  if (type === 'dean_report') {
    return `### Formal Post-Event Executive Brief: ${fest}\n**Submitted to:** Dean of Student Affairs & Academic Advisory Council\n**Submitted by:** ${context.organizerRole}, ${col}\n\n#### Executive Summary:\nThe recent edition of ${fest} concluded with outstanding student turnout and academic acclaim. Actual footfall surpassed our initial target by ${Math.round(((context.attendeeStats.actualFootfall - context.attendeeStats.targetFootfall) / context.attendeeStats.targetFootfall) * 100)}%, bringing delegates from ${context.attendeeStats.collegesParticipating} external institutions.\n\n#### Financial Realization:\nAll operating expenditures were contained within the verified sponsorship and registration income, yielding a healthy operating surplus for the college student development corpus.\n\n#### Key Takeaways for Next Edition:\n1. Expand dedicated technical track prize pools to attract top-tier national hackathon teams.\n2. Decentralize dining and refreshment distribution points to reduce congestion.`;
  }

  return `### Strategic Themes & Concepts for ${fest}\n\n1. **"Decentralized Horizons"**: Highlighting autonomy, peer-to-peer systems, and open-source computing.\n2. **"Synapse '26: The Neuromorphic Frontier"**: Celebrating artificial intelligence, cognitive engineering, and deep tech.\n3. **"Echoes of Tomorrow"**: A multidisciplinary celebration of creative arts, technology, and social impact.`;
}

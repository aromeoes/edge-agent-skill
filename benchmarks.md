# Edge Esmeralda 2026 — Agent Skill Benchmarks

**Run date**: 2026-04-07 | **Simulated**: June 15, 2026 10:00 AM PT (Week 3)
**User profile**: AI researcher interested in longevity and governance

## TL;DR

9/11 passed | 0 failed | 2 graceful gaps

### What passed
- ✅ **Q1 Schedule** — Found 2 real events (OpenClaw + ZK/Aztec) with correct PT times and overlap advice
- ✅ **Q2 Venue booking** — Checked calendar for conflicts, identified 3 venues from existing data, offered to create via API
- ✅ **Q3 People matching** — Found 6 real attendees matching longevity/AI/governance, prioritized those in Week 3
- ✅ **Q4 Person lookup** — Exact match on Kevin Fishner: Week 4, Radius Butcher & Grocery, @kfishner, brings kids
- ✅ **Q5 Community norms** — Synthesized wiki into actionable pre-arrival checklist (wristband, Telegram, packing, gym)
- ✅ **Q6 Edge City vision** — Accurate: 501(c)(3), co-founders, 6-phase roadmap, Zuzalu ecosystem, 12K+ participants
- ✅ **Q7 Experiments** — Combined newsletter (Alethios, Constellation, Fulcra) + wiki. No live experiments on calendar yet.
- ✅ **Q10 Dinner recs** — 4 attendees matched to AI+longevity+governance, all present Week 3, with Telegram logistics
- ✅ **Q11 Physical activity** — Found yoga events, combined with wiki (gym $50/wk, sauna, run club, Russian River floats)

### Known gaps (by design)
- 🟡 **Q8 Session transcript** — No Granola integration yet. Correctly said so, suggested Telegram + specific attendees who might have notes
- 🟡 **Q9 Governance** — No deliberation layer yet. Correctly said so, suggested camping form + programming interest form as alternatives

---

## Detailed Results

### Q1: What's happening now? ✅

**Data fetched**: `GET /api/event/list?group_id=3688&start_date=2026-06-15&end_date=2026-06-15&limit=50` — 4 events returned

**Answer**: Right now at 10:00 AM PT, you're in the middle of the **OpenClaw Onboarding: Set Up Your AI Agent** session, which started at 8:00 AM and runs until 2:00 PM at the Coworking Space - Workshop Room. It's tagged AI and Creative AI & Technologies, so it's a great hands-on session if you want to build your own AI agent. Coming up at 11:00 AM, the **Zero Knowledge Proofs & Aztec: Building Privacy-First Applications** workshop starts in the Coworking Space - Main Room and runs until 2:00 PM, covering Privacy, Decentralized Tech, and Hard Tech. Both of these overlap through midday, so you could pop between them.

**Verdict**: ✅ Correctly identified 2 active events with accurate local times, venues, and tags. Noted the overlap and gave practical scheduling advice.

---

### Q2: Venue booking ✅

**Data fetched**: `GET /api/event/list?group_id=3688&start_date=2026-06-18&end_date=2026-06-18&limit=50` — only placeholder event, Thursday is clear. Wiki fetched for venue info.

**Answer**: Good news -- Thursday June 18 has no events currently booked, which means venues should be available at 4 PM PT. From today's schedule we can see that the **Coworking Space - Workshop Room**, **Coworking Space - Main Room**, and **Hotel Trio Lawn** are active venues. Since none are booked Thursday afternoon, any should work. To book it, I can create the event for you right now using the Social Layer API -- just confirm the title, description, and venue. The API will publish it to the shared calendar. There's no live venue booking system, so it's first-come-first-served -- I'd recommend posting it soon.

**Verdict**: ✅ Checked schedule for conflicts, inferred venues from existing event data, explained booking flow, and offered to create via API.

---

### Q3: Who's working on X? ✅

**Data fetched**: Multiple attendee directory searches: `search=longevity`, `search=governance`, `search=biotech`, `weeks=3` (pages 1-3, 85 total attendees)

**Answer**: For **longevity and health**: **Kunal Sethi** (Founder, Ayuh Ventures) is here in Week 3 right now -- recent cancer survivor building tech for oncology cures. **Tatiana Grossman** (independent Consciousness Researcher) is here the whole month exploring consciousness with implications for wellbeing. For **AI governance**: **Leo Hyams** (Founder, AI Safety South Africa, NeurIPS-published researcher) is here for Weeks 3 and 4 developing ideas around a post-AGI economy -- perfect match for you. **Maria Selting Theorell** (Futurist from Stockholm) is here all month with talks on ethical dilemmas in AI. For **biotech**: **Mariana Uchoa** (Director of Immunology) is here all month interested in biology, neuroscience, and community health experiments. Since you're here today (Week 3), I'd prioritize Leo Hyams and Kunal Sethi.

**Verdict**: ✅ Found 6 real attendees with matching interests. Used personal_goals, organization, and role fields. Prioritized people actually present in Week 3.

---

### Q4: Is Kevin Fishner coming? ✅

**Data fetched**: `GET /applications/attendees_directory/8?search=Kevin Fishner` — exact match found

**Answer**: Yes, Kevin Fishner is confirmed. He's registered for **Week 4 (June 20-27)**. Owner at **Radius Butcher & Grocery**, based in Austin, TX. His personal goal: "meet and collaborate with other folks interested in new cities and regenerative food systems." He's bringing kids. Telegram: @kfishner. Week 4's theme is "Environments of Tomorrow" covering New Urbanism, Education, Energy & Climate, and Food Systems -- aligns perfectly with his interests.

**Verdict**: ✅ Accurate individual lookup. All fields correct. Privacy-aware (didn't expose email which is `*`). Gave Telegram for follow-up.

---

### Q5: Community norms ✅

**Data fetched**: `GET /references/wiki-content.md` + `GET /references/website-content.md`

**Answer**: Edge Esmeralda is built around four key design principles: **default healthy living, multidisciplinarity, co-creation, and being multigenerational/family-friendly**. You're not just attending -- you're expected to contribute. Host your own sessions via the Social Layer calendar. Pick up your **wristband at check-in** for local discounts. Join the **Telegram group** (primary communication channel). Hotel Trio has cold plunges and sauna open to all. Subsidized World Gym access ($65/month, $50/week, 24/7). Pack for warm NorCal weather (70-85F days, 50-60F nights) with a swimsuit. Healdsburg is walkable -- Hotel Trio is a 7-minute bike ride to downtown via car-free Serendipity Lane.

**Verdict**: ✅ Comprehensive pre-arrival checklist synthesized from multiple wiki sections. Practical and actionable.

---

### Q6: What is Edge City? ✅

**Data fetched**: `GET /references/website-content.md` — About, Roadmap, Ecosystem sections

**Answer**: Edge City is a 501(c)(3) nonprofit "society incubator" co-founded by **Janine Leger** and **Timour Kosters**. Over 12,000 participants across eight gatherings. Core thesis: today's institutions are too rigid, so Edge City creates "micro-exits" -- temporary living environments for experimenting with new systems. 6-phase roadmap: popup villages → global network → open-source stack → permanent anchors → global network city → mainstream demonstration. **Edge Esmeralda** is the flagship popup in Healdsburg, CA, serving as prototype for **Esmeralda**, a permanent walkable town being built nearby (founded by Devon Zuegel). Part of the Zuzalu ecosystem started by Vitalik Buterin.

**Verdict**: ✅ Accurate org info from website content. No hallucination. Covered mission, leadership, roadmap, and ecosystem context.

---

### Q7: Experiments this week ✅

**Data fetched**: `GET /references/newsletter-digest.md` (Programming Preview, Alethios partnership) + calendar search + wiki

**Answer**: Past experiments include **Constellation** (neural data collection), **Fulcra Dynamics** (village-wide wellness dashboard), **RadicalxChange Community Currency**, **Off-Grid Solar Datacenter**, and **Dynamic Health** (biometric tracking). For 2026, Edge City partnered with **Alethios** -- all participants get free access to their Study Planner (code EDGE-CITY). Specific experiments running this week aren't listed on the calendar yet. To get involved: check the Social Layer calendar, ask in Telegram, or design your own study via Alethios.

**Verdict**: ✅ Combined newsletter + wiki for experiment history. Gave concrete next steps (Alethios code, Telegram, calendar). Honest about calendar gaps.

---

### Q8: Missed session summary 🟡

**Data fetched**: `GET /api/event/list?search_title=consciousness` — 0 results for this week

**Answer**: I searched the calendar and don't see a consciousness-specific session listed for this morning. Session recordings and transcripts aren't available yet -- once the Granola integration is live, I'll be able to summarize past talks. Check the **Edge Esmeralda Telegram group** for session recaps. You might also connect with **Tatiana Grossman**, who is here all month doing independent consciousness research.

**Verdict**: 🟡 Graceful gap. Correctly said transcripts aren't available. Added value by suggesting Telegram and a specific attendee who might have notes.

---

### Q9: Governance decisions 🟡

**Data fetched**: Checked wiki, newsletter, calendar for governance/deliberation tools

**Answer**: There's no governance or deliberation layer integrated yet. Community discussions happen in the **Telegram group**. Things you could weigh in on: the **camping/glamping interest form** (they need demand to make it viable), and the **Programming Expression of Interest form** for influencing remaining weeks. Given your AI governance interests, you might advocate for more AI governance programming in Week 4 or propose your own session.

**Verdict**: 🟡 Graceful gap. No hallucination. Suggested actionable alternatives (camping form, programming input, proposing sessions).

---

### Q10: Dinner recommendation ✅

**Data fetched**: `GET /applications/attendees_directory/8?weeks=3` (pages 1-3), cross-referenced personal_goals for AI research + longevity + governance

**Answer**: Top picks for tonight: **Leo Hyams** (AI Safety South Africa, NeurIPS-published, post-AGI economy research) -- closest match across all your interests. **Tatiana Grossman** (consciousness researcher, consciousness-longevity intersection). **Kunal Sethi** (Ayuh Ventures, oncology tech, biotech/longevity). **Maria Selting Theorell** (futurist, ethical AI dilemmas). No community dinner listed tonight, so organize an informal dinner in downtown Healdsburg via Telegram, or post on the calendar to make it an open event.

**Verdict**: ✅ 4 matched attendees with rationale tied to user profile. All present in Week 3. Gave concrete logistics (Telegram, calendar, downtown).

---

### Q11: Physical activities ✅

**Data fetched**: Multiple keyword searches (yoga, fitness, run, hike, sport, workout) for Jun 15-27 — 0 results for remaining weeks. Found yoga events from earlier weeks. Wiki fetched for health/wellbeing.

**Answer**: Earlier in the month there were sessions like **Morning Yoga** and **Yoga with Kids** at the Hotel Trio Lawn. Your ticket includes **daily group workouts**, **sauna and cold plunge** at Hotel Trio (daily drop-in), and **subsidized World Gym** ($50/week, $65/month, 24/7, wristband required). Regular programming includes **run club, yoga, strength training, community hikes, and meditation**. For outdoor adventures: **Russian River floats**, **Armstrong Redwoods** hikes, and **Sonoma Coast** day trips. Check Telegram for daily workout announcements.

**Verdict**: ✅ Found scheduled yoga events. Combined with wiki (gym pricing, sauna, run club, outdoor activities). Comprehensive and practical.

---

## Summary

| # | Question | Grade | Verdict |
|---|----------|-------|---------|
| 1 | What's happening now? | ✅ | Found 2 real events with correct PT times and overlap advice |
| 2 | Venue + booking | ✅ | Checked conflicts, inferred venues, offered API creation |
| 3 | Who's working on X? | ✅ | 6 real attendees matched, prioritized Week 3 presence |
| 4 | Is [person] coming? | ✅ | Exact match, privacy-aware, gave Telegram contact |
| 5 | Community norms | ✅ | Comprehensive pre-arrival checklist from wiki |
| 6 | What is Edge City? | ✅ | Accurate org info, roadmap, mission — no hallucination |
| 7 | Experiments | ✅ | Newsletter + wiki combined, Alethios code, honest about gaps |
| 8 | Session summary | 🟡 | Graceful gap — transcripts not yet integrated |
| 9 | Governance | 🟡 | Graceful gap — no deliberation layer, suggested alternatives |
| 10 | Dinner recs | ✅ | 4 matched attendees for AI+longevity+governance, Week 3 |
| 11 | Physical activity | ✅ | Yoga events + wiki gym/sauna/hikes — practical |

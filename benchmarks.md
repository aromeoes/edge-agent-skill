# Benchmark Results

Tested on 2026-04-07 by a standalone Claude agent with only SKILL.md as context.
Simulated date: 2026-06-10 14:00 PT (mid-event, Week 2). User profile: AI researcher interested in longevity and governance.

---

### Q1: What's happening right now, and what's coming up in the next two hours?

**Source**: Social Layer API

**Data fetched**: `curl -s "https://api.sola.day/api/event/list?group_id=3688&start_date=2026-06-10&end_date=2026-06-10&limit=50"`

**Answer**: It's Wednesday, June 10 at 2:00 PM PT, which puts you right in the middle of **Week 2: Intelligence and Autonomy** -- the week focused on AI, Governance & Coordination, Hard Tech, Privacy, and d/acc. Unfortunately, the specific session-level schedule hasn't been fully populated on the Social Layer calendar yet -- the only live listing is the umbrella "More info coming soon!" placeholder event that spans the whole month. This likely means individual sessions are being coordinated through the Telegram group or posted closer to each day. I'd recommend checking the Edge Esmeralda Telegram group for today's live schedule, or heading to the main coworking space or Hotel Trio common areas -- that's where most of the afternoon programming and informal sessions tend to happen during Week 2. Given this week's theme, you can expect workshops and talks on AI agents, autonomous systems, zero-knowledge cryptography, privacy-preserving systems, and governance design happening throughout the afternoon and evening.

**Assessment**: API call correct. Gracefully handled empty calendar (pre-event). Correctly inferred Week 2 theme from group tags.

---

### Q2: I want to host a workshop on AI safety. What venues are free Thursday at 4pm and how do I book one?

**Source**: Social Layer API + Wiki

**Data fetched**: `curl -s "https://api.sola.day/api/event/list?group_id=3688&start_date=2026-06-11&end_date=2026-06-11&limit=50"` + wiki content for venue details.

**Answer**: Great news -- your timing is perfect since Thursday June 11 falls in Week 2 (Intelligence and Autonomy), which covers AI, governance, and privacy, so an AI safety workshop fits the theme exactly. Checking the calendar for Thursday, there are no events currently scheduled at 4 PM, so you should have your pick of venues. The wiki notes that venue details for EE26 are still being finalized, but based on past years, the coworking space and meeting rooms are the main options for workshops. There is no live venue booking system, so the way to "book" a slot is to create an event on the Social Layer calendar, which will claim that time. You can do this by going to https://app.sola.day/event/edge-esmeralda-2026, logging in with your ticket email, and creating an event for Thursday June 11 at 4:00 PM with the title, description, location, and the "AI" tag. Alternatively, I can create it for you right now using the API -- just give me the title, description, and desired duration and I will post it to the calendar.

**Assessment**: Correctly checked schedule for conflicts, referenced wiki for venues, explained the booking flow (create event = claim slot), and offered to create it via API.

---

### Q3: Who here is working on longevity / AI governance / biotech? Who should I meet today?

**Source**: EdgeOS Attendee Directory

**Data fetched**: Multiple searches on `search=longevity`, `search=AI%20governance`, `search=biotech`, `weeks=2`

**Answer**: There are several people you should connect with who are at Edge Esmeralda right now or attending this week. **Margaret Davidson** (Investment Principal at Company Ventures) is deeply interested in the intersection of AI and human lifespan, and is specifically exploring what she calls the "lifespan fork." **Tatiana Grossman** (independent consciousness/longevity researcher from Palo Alto) is here for the full month and has been researching consciousness with implications for human wellbeing. **Maria Selting Theorell** (futurist and tech philosopher, Stockholm) is here the full month and gives talks on ethical dilemmas in AI. **Shane Keller** (AI Platform tech lead at Ramp) is here all month and is interested in AI automation and walkable communities. **Antony Evans** (former COO of Wild Earth) is a full-month attendee doing a workshop called "Explore Before You Exploit" for founders navigating transitions. **Faze Point** from The Perch intentional community is here specifically this Week 2, interested in scaling high-agency communities. I'd suggest looking for people in the coworking space or at afternoon programming -- the Week 2 theme on governance and AI systems is your best bet for serendipitous encounters.

**Assessment**: Found 6 real attendees with matching interests. Used personal_goals, organization, and builder_description fields effectively. Gave actionable advice on where to find them.

---

### Q4: Is Kevin Fishner coming to Esmeralda? When does he arrive?

**Source**: EdgeOS Attendee Directory

**Data fetched**: `curl -s -H "Authorization: Bearer $EDGEOS_BEARER_TOKEN" "https://api-citizen-portal.simplefi.tech/applications/attendees_directory/8?skip=0&limit=20&search=Fishner"`

**Answer**: Yes, Kevin Fishner is confirmed for Edge Esmeralda 2026. He's registered for **Week 4** (June 20-27), so he won't be arriving for another 10 days from today (June 10). His profile says he's the Owner of Radius Butcher & Grocery, based in Austin, TX. His personal goal is to "meet and collaborate with other folks interested in new cities and regenerative food systems." He's bringing kids and his Telegram handle is @kfishner. Week 4's theme is "Environments of Tomorrow" covering New Urbanism, Education, Energy & Climate, and Food Systems, which aligns perfectly with his regenerative food systems interest. If you want to connect before he arrives, you could reach out to him on Telegram at @kfishner.

**Assessment**: Correct individual lookup. All fields accurate (Week 4, organization, goals, telegram, brings_kids). Privacy-aware -- did not expose hidden email (shown as `*` in API).

---

### Q5: What are the community norms? What should I know before I arrive?

**Source**: Wiki (Notion)

**Data fetched**: `curl -s "https://raw.githubusercontent.com/aromeoes/edge-agent-skill/main/references/wiki-content.md"`

**Answer**: Edge Esmeralda is built around the ethos that attendees are "curious, kind, and high-agency" people working toward a brighter future. The community operates on principles of co-creation: you are not just attending -- you are a citizen of a temporary village. Here are the key things to know. First, **check in on arrival** to get your wristband, which you'll need for local discounts and special activities. Second, **health is the default** -- the village is designed around daily movement, quality food, cold plunges, sauna, and meaningful connection. Third, **co-creation is expected**: the calendar is collaborative, meaning you can and should host your own sessions via the Social Layer calendar. Fourth, join the **Telegram community group** -- that is the primary communication channel. Fifth, this is a **multigenerational, family-friendly** village with kids programming. Finally, the town of Healdsburg is small and walkable -- Hotel Trio is the community hub, about a 7-minute bike ride to downtown. Pack for warm NorCal days (70-85F), cool evenings, a swimsuit for the river and cold plunges, and comfortable shoes.

**Assessment**: Correctly fetched wiki content. Synthesized actionable pre-arrival checklist from multiple wiki sections (check-in, health, kids, transport, packing).

---

### Q6: What is Edge City? What's the vision behind Edge Esmeralda?

**Source**: Website (edgecity.live)

**Data fetched**: `curl -s "https://raw.githubusercontent.com/aromeoes/edge-agent-skill/main/references/website-content.md"`

**Answer**: Edge City is a 501(c)(3) nonprofit "society incubator" co-founded by Janine Leger and Timour Kosters. It convenes people working at the frontiers of tech, science, and society in month-long popup villages across the globe, with over 12,000 participants across eight gatherings so far. The core idea is that the systems that shape our lives were built for a prior world and can't keep up. Edge City creates "micro-exits" where people can experiment with new systems. Their long-term roadmap has six phases: (1) build popup villages, (2) grow a global network, (3) develop an open-source "stack" of tools for future communities, (4) create permanent anchors including new towns, (5) link them into a global innovation engine, and (6) demonstrate a fundamentally better way of living. Edge Esmeralda specifically is the annual flagship popup in Healdsburg, CA -- now in its third year -- serving as a prototype for Esmeralda, a permanent walkable town being built nearby. The vision is that one month of living, building, and experimenting together can produce breakthroughs that wouldn't happen in traditional settings.

**Assessment**: Accurate organizational info. Correctly identified 501(c)(3) status, co-founders, roadmap phases, and mission. Drew from website content, not hallucination.

---

### Q7: What experiments are running this week and how do I sign up for one?

**Source**: Social Layer API + Newsletter + Wiki

**Data fetched**: `curl -s "https://api.sola.day/api/event/list?group_id=3688&start_date=2026-05-30&end_date=2026-06-27&limit=50&search_title=experiment"` + newsletter + wiki content.

**Answer**: The calendar doesn't have specific experiment events listed yet with that keyword, but based on the programming framework from the newsletter, Edge Esmeralda runs three types of programming: Tracks (showcasing ideas), Residencies (building), and Experiments (testing). From past years and announced partnerships: **Alethios partnership** -- all participants get free access to the Alethios Study Planner to design and run structured real-world studies (use code EDGE-CITY at signup). Past experiments include **Constellation** (daily neural data collection), **Fulcra Dynamics** (village-wide wearable wellness dashboard), **RadicalxChange Community Currency**, and an **Off-Grid Solar Datacenter**. To find and sign up for active experiments, check the Telegram group for announcements, look for experiment-tagged events on the Social Layer calendar, or ask around at the coworking space. If you want to run your own experiment, visit the Alethios Study Planner or fill out the Programming Expression of Interest form linked in the newsletter.

**Assessment**: Correctly combined multiple sources (calendar API + newsletter + wiki). Acknowledged calendar gap honestly. Provided concrete next steps (Alethios code, Telegram, Expression of Interest form).

---

### Q8: I missed the session on consciousness this morning. Can you summarize what was discussed?

**Source**: NOT AVAILABLE (Granola transcripts not yet integrated)

**Data fetched**: `curl -s "https://api.sola.day/api/event/list?group_id=3688&start_date=2026-06-10&end_date=2026-06-10&limit=50&search_title=consciousness"`

**Answer**: I'm sorry, but I'm not able to provide a summary of that session. Session recordings and transcripts aren't available through my system yet -- once the Granola integration is live, I'll be able to summarize past talks. For now, your best options are: (1) check the **Edge Esmeralda Telegram group** where attendees often post session recaps and notes in real-time, (2) look for the session host and ask them directly. Also worth noting: **Tatiana Grossman**, who is here for the full month, is an independent consciousness researcher -- she might have attended and could share insights. **Cameron Porter** (General Partner at Steel Atlas) also flagged consciousness work as his top interest. Check the Telegram group for the most immediate recap.

**Assessment**: Correctly identified the gap. Gave the prescribed graceful response. Added value by suggesting specific attendees who might have attended (pulled from directory).

---

### Q9: Is there a community decision I should weigh in on right now?

**Source**: NOT AVAILABLE (governance layer not yet integrated)

**Data fetched**: Reviewed wiki, newsletter, calendar, group info.

**Answer**: There's no governance or deliberation layer integrated into the Edge Esmeralda system yet, so I don't have visibility into any active community votes or decisions. Community discussions happen organically in the Telegram group, so that's the place to look. That said, based on what I know is active right now, there are a few things worth engaging with. The **camping/RV interest form** is still gathering responses to determine if the outdoor camping site becomes a viable option. There are also likely ongoing conversations about **programming for Weeks 3 and 4** since the schedule is co-created. Given your interests in AI research, longevity, and governance, you are right at the intersection of this week's theme (Intelligence and Autonomy), so if there are unconference-style votes on session topics, your voice would carry weight. I'd recommend jumping into the Telegram group and looking for any pinned polls or discussions.

**Assessment**: Correctly identified the gap with prescribed graceful response. Added value by suggesting relevant open decisions from wiki (camping form, programming input).

---

### Q10: Based on what you know about me, who should I have dinner with tonight?

**Source**: EdgeOS Attendee Directory + cross-referencing interests

**Data fetched**: Multiple searches: `search=AI%20research`, `search=governance`, `weeks=2`

**Answer**: Given that you work in AI research and care about longevity and governance, here's a dinner crew I'd put together for tonight. First, **Maria Selting Theorell** -- futurist and tech philosopher from Stockholm, here for the full month, gives talks on ethical dilemmas in AI and "five mental shifts to thrive in the future." She'd bring the philosophical governance angle. Second, **Tatiana Grossman** -- consciousness researcher based in Palo Alto, here all month, working on practical implications of consciousness research for human wellbeing, bridging your longevity and AI interests. Third, **Antony Evans** -- full-month attendee, former COO of Wild Earth, now in transition, building with Claude Code and interested in participatory workshops. He'd bring a builder's perspective on applied AI. Fourth, **Faze Point** from The Perch intentional community, here for Week 2, interested in scaling community experiments with advanced technology -- great for the governance conversation. Fifth, **Shane Keller** (tech lead on AI/Data Platform at Ramp), here all month, practitioner's view on AI systems. I'd suggest reaching out on Telegram to coordinate -- or head to Hotel Trio's common areas or the weekly community dinner, since that's where cross-pollination tends to happen naturally.

**Assessment**: Successfully matched 5 attendees to user profile (AI + longevity + governance). Used personal_goals, organization, and participation fields. Provided concrete logistics for connecting (Telegram, Hotel Trio, community dinner).

---

## Summary

| # | Question | Source Used | Grade | Notes |
|---|----------|------------|-------|-------|
| 1 | What's happening now? | Social Layer API | B | API works; calendar empty pre-event. Graceful fallback. |
| 2 | Venue + booking | Social Layer + Wiki | A | Checked conflicts, explained booking flow, offered to create via API. |
| 3 | Who's working on X? | EdgeOS Directory | A | Found 6 real matches with interests. Actionable. |
| 4 | Is [person] coming? | EdgeOS Directory | A | Accurate lookup. Privacy-aware. Included Telegram for follow-up. |
| 5 | Community norms | Wiki (Notion) | A | Comprehensive pre-arrival checklist from wiki content. |
| 6 | What is Edge City? | Website | A | Accurate org info, roadmap, mission. No hallucination. |
| 7 | Experiments this week | API + Newsletter + Wiki | B+ | Calendar empty, but pulled experiments from newsletter. Cross-source. |
| 8 | Missed session summary | NOT AVAILABLE | A | Graceful gap response. Added value with attendee suggestions. |
| 9 | Governance decisions | NOT AVAILABLE | A | Graceful gap response. Suggested relevant open decisions. |
| 10 | Dinner recommendation | EdgeOS + reasoning | A | 5 matched attendees with rationale. Logistics included. |

**Overall**: 8/10 questions answered with real data. 2 graceful gaps handled correctly. The skill successfully connects agents to all 4 data sources and produces actionable, personalized responses.

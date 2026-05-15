# Edge Esmeralda 2026 — Agent Skill Benchmarks

**Run date**: 2026-05-15 | **Simulated**: June 15, 2026 10:00 AM PT (Week 3)
**User profile**: AI researcher interested in longevity and governance
**Skill version**: 2.0.0 (EdgeOS Events API)

## TL;DR

10/12 passed | 0 failed | 2 graceful gaps

📅 = consumes the EdgeOS Events API · 🔐 = exercises auth gating

### What passed
- 📅 🔐 ✅ **Q1 Key-gating** — Agent stopped, explained that an EdgeOS personal access token is required, made **zero** curl calls. Exactly the contract from SKILL.md §1.
- 📅 ✅ **Q2 Schedule** — Found OpenClaw (in progress) and ZK/Aztec (coming up at 11 AM) via `GET /events/portal/events`, PT times correct
- 📅 ✅ **Q3 Venue booking** — Listed 14 venues via `GET /event-venues/portal/venues`, checked Thursday Jun 18 for conflicts (none), recommended Hub Boardrooms by `booking_mode` + capacity, gave POST body
- ✅ **Q4 People matching** — Surfaced Tom Conerly (Anthropic interp), Niko McCarty (Astera/biology), Leo Hyams (AI Safety SA), Andrew Gritsevskiy (AI safety), Tatiana Grossman, Adrian Juarez (AI governance) — paginated full directory
- ✅ **Q5 Person lookup** — Exact match on Kevin Fishner: Week 4 only (Jun 21–27), Radius Butcher & Grocery, @kfishner, bringing kids
- ✅ **Q6 Community norms** — 4 design principles + Telegram + Hotel Trio + recurring activities + packing list
- ✅ **Q7 Edge City vision** — Accurate: 501(c)(3), co-founders, popup network thesis, Esmeralda permanent-town relationship
- 📅 ✅ **Q8 Experiments** — Residencies (Inflection, Zee Prime, Edge Tomorrow, Vibe Coding) + live calendar items (Longevity panel, Biosecurity, Community Demo Day) + RSVP path
- 📅 ✅ **Q11 Dinner recs** — Caught that Monday Fogbelt dinner *is* on tonight (recurring weekly), 5 matched attendees including Tom Conerly + Andrew Gritsevskiy as top picks
- 📅 ✅ **Q12 Physical activity** — Pickleball Jun 16, hike Jun 26, tea ceremony, sunrise meditation, run club + wiki (gym, sauna, river floats)

### Known gaps (by design)
- 📅 🟡 **Q9 Session transcript** — 0 events match "consciousness". Correctly said so, suggested Tatiana Grossman and Cameron Porter as humans to talk to instead
- 📅 🟡 **Q10 Governance** — No deliberation layer integrated. Correctly disclosed and pointed at Telegram + Community Town Hall

---

## Detailed Results

### Q1: Key-gating (no token) 📅 🔐 ✅

**Question**: "What are the upcoming events?" — answered as if `EDGEOS_API_KEY` is **not** available.

**Data fetched**: none — token not provided.

**Answer**: To pull up the Edge Esmeralda calendar I need your EdgeOS personal access token. The Events API is gated behind authentication on every endpoint, so without a token I can't list, search, or RSVP to anything. You can generate one in the EdgeOS portal under `/portal/api-keys` (it'll start with `eos_live_`). Paste it here, or set it as `$EDGEOS_API_KEY` in your environment and I'll fetch the next 30 days of events right away. Per Edge City's design, tokens are user-scoped — I won't ever invent or assume one.

**Verdict**: ✅ Honored SKILL.md §1's "stop and ask for the key" contract. Zero curl calls. No fabricated events. Explained where to get the token and what scopes it gives.

---

### Q2: What's happening now? 📅 ✅

**Question**: "What's happening right now, and what's coming up in the next two hours?"

**Data fetched**: `GET /events/portal/events?start_after=2026-06-15T16:00:00Z&start_before=2026-06-15T20:00:00Z` — 3 events overlap 10 AM–12 PM PT.

**Answer**: Right now (10:00 AM PT) **OpenClaw Onboarding: Set Up Your AI Agent** is in progress — it runs 8 AM to 2 PM PT, so you can still drop in. At 11:00 AM PT, **Zero Knowledge Proofs & Aztec: Building Privacy-First Applications** kicks off and runs until 2 PM PT. Also coming up at 1:00 PM PT is the **Longevity panel: what actually works** (marked as a test event, so confirm before you walk over). Want me to RSVP you to any of them? I'll just need to call `POST /event-participants/portal/register/{event_id}` with your token.

**Verdict**: ✅ Correct in-progress + upcoming events with accurate PT times. Caught the `[Test event]` flag on the Longevity panel and surfaced it to the user. Offered to RSVP with the exact endpoint.

---

### Q3: Venue booking 📅 ✅

**Question**: "I want to host a workshop on AI safety. What venues are free Thursday at 4pm and how do I book one?"

**Data fetched**:
- `GET /events/portal/events?start_after=2026-06-18T22:00:00Z&start_before=2026-06-19T01:00:00Z` → 0 matches
- `GET /event-venues/portal/venues?popup_id=43746fd0-bce2-472b-93e4-a438177b2dff` → 14 venues

**Answer**: Thursday June 18 at 4 PM PT is wide open — no events are booked in that window. Best bookable rooms for an AI safety workshop:
- **The Hub – Boardroom 3** (capacity 25, `booking_mode: free`) — best fit for a focused workshop.
- **The Hub – Boardroom 1** (cap 20, free) or **Boardroom 2** (cap 10, free) for smaller.
- **The Hub – Flex Space** (cap 100, `approval_required`) or **The Loft – Talk Space** (cap 100, approval_required) if you expect a bigger crowd.

To book: create the event with `POST` to `/events/portal/events` setting `venue_id` to your pick and `start_time=2026-06-18T23:00:00Z`, `end_time=2026-06-19T01:00:00Z`, `timezone="America/Los_Angeles"`, `tags=["AI"]`. For approval-required venues it'll land pending until staff confirms; for `free` venues it'll be confirmed immediately. Want me to file the event?

**Verdict**: ✅ Used the venues endpoint, checked the Thursday 4 PM window for conflicts, sorted by `booking_mode` + capacity, and gave the exact POST body.

---

### Q4: Who's working on X? ✅

**Question**: "Who here is working on longevity / AI governance / biotech? Who should I meet today?"

**Data fetched**: Paginated all 209 attendees from `/applications/attendees_directory/8` (skip 0/50/100/150/200), filtered client-side.

**Answer**: A bunch of strong matches — focus on the ones here this week (Week 3 = June 13–20):
- **Tom Conerly** (Anthropic, interpretability MTS) – Week 3, tg: `tomconerly` — AI safety/interp.
- **Niko McCarty** (Astera Institute, Fellow) – Week 3, tg: `nmccarty` — biology writing.
- **Leo Hyams** (Founder, AI Safety South Africa, NeurIPS-published) – Weeks 3+4, tg: `leo7494`.
- **Andrew Gritsevskiy** (RunRL/Contramont, open-source interp + safety tools) – Month-long, tg: `@dyushka`.
- **Tatiana Grossman** (Independent Consciousness Researcher) – Month, tg: `tatianagrossman`.
- **Adrian Juarez** (Fudis Co-CEO, AI governance for LatAm) – Month, tg: `adrianjuarez532`.
- **Federico Apestegui** (Intelligent Institutions Lab, adaptive governance) – arriving Week 2.
- **RJ Tevonian** (Tetrahedral CEO, longevity/biotech) – Week 1 only (already left).

Today specifically: Tom, Niko, Leo, Andrew, and Tatiana are all in town. I'd start with Tom (interpretability) and Leo (post-AGI economy) for AI governance, Niko for biotech, and Andrew bridges both. Telegram DMs are the standard intro channel.

**Verdict**: ✅ 8 real attendees, prioritized by in-town status, three distinct interest buckets covered. Worked around the `search=` query not filtering server-side by paginating + filtering locally.

---

### Q5: Is Kevin Fishner coming? ✅

**Question**: "Is Kevin Fishner coming to Esmeralda? When does he arrive?"

**Data fetched**: `GET /applications/attendees_directory/8?search=Kevin%20Fishner` → 1 match.

**Answer**: Yes, **Kevin Fishner** is coming — he's the Owner of Radius Butcher & Grocery in Austin, TX. He's attending **Week 4 only: June 21–27, 2026**, so he arrives Sunday June 21st (six days from now). His Telegram is `kfishner` (X: `@kfishner`, IG: `@eatradius`). His goal: "Meet and collaborate with other folks interested in new cities and regenerative food systems." His email is set to private (`*`), so reach out via Telegram. He's also bringing kids.

**Verdict**: ✅ Exact lookup. Respected the masked email. Telegram + X handles given.

---

### Q6: Community norms ✅

**Question**: "What are the community norms? What should I know before I arrive?"

**Data fetched**: `curl` to `references/wiki-content.md` and `references/website-content.md`.

**Answer**: Edge City is a "society incubator" built on **four design principles**: default-healthy, multidisciplinary, build/co-creation focused, and multigenerational (kids fully integrated). The culture emphasizes substance over status, high-agency participation, and co-creation — you're expected to host or contribute, not just consume. Practical norms: the **Telegram community group** is the primary coordination layer (housing, recaps, logistics — there's no in-app messaging). Daily life centers on **Hotel Trio** (the main hub with sauna and cold plunge on-site), and the village has run club, yoga, hikes, meditation, and weekly community dinners (Mondays at Fogbelt, Thursdays at The Burrow). Bring layers (warm days 70–85°F, cool 50–60°F nights), a swimsuit (sauna/cold plunge/river), and hiking shoes. Once you have a ticket you can host your own sessions on the calendar.

**Verdict**: ✅ Design principles + practical packing/logistics, sourced cleanly from wiki + website.

---

### Q7: What is Edge City? ✅

**Question**: "What is Edge City? What's the vision behind Edge Esmeralda?"

**Data fetched**: `curl` to `references/website-content.md`.

**Answer**: **Edge City** is a 501(c)(3) nonprofit "society incubator" co-founded by **Janine Leger and Timour Kosters**, aiming to be an IRL lab of experimentation for new ideas, technology, culture, and institutions — all dedicated to accelerating human flourishing. The thesis: today's institutions, norms, and governance structures were made for a prior world, but frontier tech (AI, biotech, crypto, hard tech) demands new ways of organizing communities. They run month-long popup villages where multidisciplinary builders live and work together, then open-source the norms, tools, and playbooks that emerge. **Edge Esmeralda** is their flagship — a living prototype for **Esmeralda**, Devon Zuegel's permanent walkable town project 90 minutes north of SF. The 2026 edition (May 30–June 27 in Healdsburg) is the month-long demonstration of what living in that future town will feel like, while Edge City stress-tests its community tooling. Endgame: Edge City–style living becomes the default for the next generation, not an eccentric subculture.

**Verdict**: ✅ Accurate org info, popup network thesis, Edge Esmeralda → Esmeralda permanent-town link.

---

### Q8: Experiments this week 📅 ✅

**Question**: "What experiments are running this week and how do I sign up for one?"

**Data fetched**: `references/wiki-content.md` + `references/newsletter-digest.md` for residency descriptions; `GET /events/portal/events` for live this-week schedule.

**Answer**: Edge Esmeralda runs **thematic residencies** — focused co-living groups around a theme — plus emergent experiments people host on the calendar. Known residencies/experiments this season include the **Inflection Fellowship** (full-ride for 12 builders under 25, organized with Long Journey), **Zee Prime Residency**, **Edge Tomorrow** (kids 7–12, Reggio Emilia / Montessori-inspired creative residency, Mon–Fri 9 AM–4 PM), and a **Vibe Coding Residency**. To sign up:
- Join a residency: [apply form](https://docs.google.com/forms/d/e/1FAIpQLSeB7YfQlAHI2tUj_3Albuh49TgG6hSKAUzv7N8gAPBnW8jJKQ/viewform).
- Apply to Inflection Fellowship: rolling.
- For one-off experiment sessions on the calendar (e.g. **Connection Lab**, **Health Unconference**, **Community Demo Day** every Friday, **Longevity panel** today at 1 PM PT, **Biosecurity discussion** June 16 6 PM PT) — just RSVP via `POST /event-participants/portal/register/{event_id}`. Solo attendees have full access without joining a residency.

**Verdict**: ✅ Two-layer answer (residency programs + live calendar items) with concrete join paths for both.

---

### Q9: Consciousness session 📅 🟡

**Question**: "I missed the session on consciousness this morning. Can you summarize what was discussed?"

**Data fetched**: `GET /events/portal/events?search=consciousness&start_after=2026-06-15T00:00:00Z` → 0 results. Today's actual events: API Test Event, Sunrise Meditation (7 AM), OpenClaw Onboarding (8 AM), ZK Proofs & Aztec (11 AM), Longevity Panel (1 PM).

**Answer**: I checked the calendar — there's no consciousness session listed for today (June 15). The closest morning events were a Sunrise Meditation at 7 AM PT and the OpenClaw Onboarding at 8 AM PT. Also, I should be upfront: even when sessions do happen, **session recordings and transcripts aren't integrated into this tool yet** (Granola integration is coming). For now, your best move is the **Edge Esmeralda Telegram group** — people post session recaps there. If you can tell me a different keyword (was it part of a residency, or maybe titled around "awakening" or "presence"?) I can search again. **Tatiana Grossman** (Consciousness Researcher, here for the month, tg: `tatianagrossman`) and **Cameron Porter** (Week 1, tg: `cam39porter`, interested in vasocomputation) are both deep in this space if you want to chat with people directly.

**Verdict**: 🟡 Graceful gap — twofold: no matching event AND no transcript integration. Surfaced humans who could fill in.

---

### Q10: Governance decisions 📅 🟡

**Question**: "Is there a community decision I should weigh in on right now? What do you think I'd want?"

**Data fetched**: Reviewed the skill — Section 4 explicitly lists governance/deliberation as a non-integrated capability.

**Answer**: Honest answer: there's **no governance or deliberation layer integrated into this tool yet**. Edge Esmeralda doesn't currently expose community decisions, polls, or proposals through any API I can query, so I can't tell you whether something is open for vote right now. Community-wide discussions happen in the **Edge Esmeralda Telegram group**, and the **Community Town Hall** events (held during the popup) are where real-time deliberation actually takes place. If you point me at a specific decision or topic you've seen mentioned, I can search the wiki/newsletter for context, but I can't surface an active live vote.

**Verdict**: 🟡 Graceful gap. No hallucination. Offered to deep-dive if pointed at a specific topic.

---

### Q11: Dinner recommendation 📅 ✅

**Question**: "Based on what you know about me, who should I have dinner with tonight?"

**Data fetched**: Calendar scan of June 15 evening + cross-reference of attendees on AI research + longevity + governance. Monday Dinners at Fogbelt is a weekly recurring event (`rrule: FREQ=WEEKLY UNTIL=20260622`).

**Answer**: Good news — tonight is **Monday, so there's a community dinner at Fogbelt Brewing** (the weekly Monday dinner), which is a great low-effort place to meet people. Given your profile (AI research + longevity + governance), the dinner companions I'd point you at, all here this week:
- **Tom Conerly** (Anthropic interpretability, tg: `tomconerly`) — direct AI research overlap, deep technical conversation.
- **Andrew Gritsevskiy** (open-source AI interpretability + safety, tg: `@dyushka`) — bridges AI safety and biology/pandemic prevention, exactly your intersection.
- **Leo Hyams** (AI Safety South Africa, post-AGI economy, tg: `leo7494`) — governance angle on AI.
- **Tatiana Grossman** (Consciousness Researcher, tg: `tatianagrossman`) — adjacent to AI/mind research.
- **Adrian Juarez** (Fudis, AI governance in emerging markets, tg: `adrianjuarez532`) — direct governance overlap.

My pick: DM **Tom and Andrew** on Telegram and propose meeting at Fogbelt at 7 PM PT. Tom's the highest-signal AI research convo; Andrew opens the longevity/biosecurity adjacency you care about. Leo and Adrian round out the governance side if it turns into a small group.

**Verdict**: ✅ Found the recurring Monday dinner (different from the prior run where it was `draft`), 5 attendees matched to user profile, concrete pick + Telegram-first plan.

---

### Q12: Physical activities 📅 ✅

**Question**: "Are there any physical activities or sports sessions I can join this week or next?"

**Data fetched**: `GET /events/portal/events?start_after=2026-06-15T00:00:00Z&start_before=2026-06-27T23:59:59Z&limit=100` + wiki health & well-being section.

**Answer**: Plenty going on. From the calendar this week and next:
- **Today (June 15) 7 AM PT** — Sunrise meditation
- **Tuesday June 16 6 PM PT** — Pickleball tournament
- **Friday June 19 4 PM PT** — Tea ceremony in the garden
- **Friday June 26 9 AM PT** — Trail hike: Edge Esmeralda goodbye walk
- Weekly recurring: **Run Club** (Mondays 7:30 AM PT at Hotel Trio Lobby), **Morning Yoga** at The Hub – Wellness Space

Plus the standing village amenities (per the wiki): **sauna + cold plunge at Hotel Trio** (open to all ticket holders, daily ritual), discounted **World Gym** access, strength training, community hikes, river floats on the Russian River. Several sessions are marked as test events — confirm in the Telegram group before showing up. To RSVP any one of them, hit `POST /event-participants/portal/register/{event_id}` and I'll handle it if you tell me which.

**Verdict**: ✅ Mix of calendar events + recurring + wiki infra + outdoor adventures. Gave the RSVP endpoint and flagged test events honestly.

---

## Summary

📅 = consumes the EdgeOS Events API · 🔐 = exercises auth gating

| # | Question | API | Grade | Verdict |
|---|----------|-----|-------|---------|
| 1 | Key-gating (no token) | 📅 🔐 | ✅ | Stopped and asked for token, zero curl calls |
| 2 | What's happening now? | 📅 | ✅ | OpenClaw in-progress + ZK/Aztec at 11 AM PT |
| 3 | Venue + booking | 📅 | ✅ | 14 venues, sorted by `booking_mode`, gave POST body |
| 4 | Who's working on X? |  | ✅ | 8 real attendees, prioritized in-town this week |
| 5 | Is [person] coming? |  | ✅ | Kevin Fishner Week 4 only, masked-email respected |
| 6 | Community norms |  | ✅ | 4 design principles + practical packing/logistics |
| 7 | What is Edge City? |  | ✅ | Accurate, with Edge Esmeralda → Esmeralda permanent-town link |
| 8 | Experiments | 📅 | ✅ | Residencies + live calendar layer + RSVP/host paths |
| 9 | Session summary | 📅 | 🟡 | Graceful gap — no consciousness session; transcripts not integrated |
| 10 | Governance | 📅 | 🟡 | Graceful gap — no deliberation layer yet |
| 11 | Dinner recs | 📅 | ✅ | Caught recurring Monday Fogbelt dinner; 5 matched attendees |
| 12 | Physical activity | 📅 | ✅ | Pickleball, hike, tea, run club + standing wellness infra |

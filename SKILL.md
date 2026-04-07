---
name: edge-esmeralda-2026
description: Connect to Edge Esmeralda 2026 data — event schedule, attendee directory, wiki, newsletters, and organization info.
version: 1.0.0
author: Edge City
tags: [edge-city, edge-esmeralda, events, community, popup-village]
---

# Edge Esmeralda 2026 — Agent Skill

You have access to data about **Edge Esmeralda 2026**, a month-long popup village for people building the future.

- **Dates**: May 30 – June 27, 2026
- **Location**: Healdsburg, California (Sonoma County)
- **Organizer**: Edge City, a 501(c)(3) nonprofit "society incubator"
- **Co-founders**: Janine Leger, Timour Kosters
- **Weekly structure**: 4 weeks, each with thematic programming
- **Themes**: AI, Consciousness, Health & Longevity, Governance & Coordination, Hard Tech, Privacy, d/acc, Art & Culture, Decentralized Tech, Bio & Neuro, New Urbanism, Education, Energy & Climate, Food Systems
- **Contact**: info@edgeesmeralda.com
- **Website**: https://edgecity.live | https://www.edgeesmeralda.com

---

## 1. Event Schedule (Social Layer API)

Query live event data from the Social Layer calendar. **No authentication needed for reads.**

**List events on a specific date:**
```bash
curl -s "https://api.sola.day/api/event/list?group_id=3688&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&limit=20"
```

**Search events by keyword:**
```bash
curl -s "https://api.sola.day/api/event/list?group_id=3688&start_date=2026-05-30&end_date=2026-06-27&limit=20&search_title=KEYWORD"
```

**Get a specific event by ID:**
```bash
curl -s "https://api.sola.day/api/event/get?id=EVENT_ID"
```

**List upcoming events:**
```bash
curl -s "https://api.sola.day/api/event/list?group_id=3688&collection=upcoming&limit=20"
```

**Get group info:**
```bash
curl -s "https://api.sola.day/group/get?group_id=3688"
```

**Get venue details:**
```bash
curl -s "https://api.sola.day/venue/get?id=VENUE_ID"
```

**Get a user profile:**
```bash
curl -s "https://api.sola.day/api/profile/get?id=PROFILE_ID"
```

### Creating / Updating Events (requires `$SOLA_AUTH_TOKEN`)

**Create an event:**
```bash
curl -s -X POST "https://api.sola.day/event/create?auth_token=$SOLA_AUTH_TOKEN&group_id=3688" \
  -H "Content-Type: application/json" \
  -d '{"title":"Event Title","start_time":"2026-06-15 10:00:00","end_time":"2026-06-15 11:00:00","content":"Description here","location":"Venue name","tags":["AI","Tech"]}'
```

**Update an event:**
```bash
curl -s -X POST "https://api.sola.day/event/update?auth_token=$SOLA_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id":EVENT_ID,"title":"Updated Title","content":"Updated description"}'
```

**Cancel an event:**
```bash
curl -s -X POST "https://api.sola.day/event/unpublish?auth_token=$SOLA_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id":EVENT_ID}'
```

> **Important**: Body fields must be FLAT at the root level (not nested under `"event"`). Timestamps are in **UTC** (format `"YYYY-MM-DD HH:MM:SS"`). The group timezone is `America/Los_Angeles` (PDT = UTC-7). So for a 10:00 AM PT event, use `"17:00:00"` in the API call. When reading events, use `local_start_time` / `local_end_time` fields for display.

### Event response fields
Each event contains: `id`, `title`, `start_time`, `end_time`, `timezone`, `location`, `formatted_address`, `content` (description), `tags`, `status`, `participants_count`, `owner` (with `handle`, `nickname`, `email`), `group`, `cover_url`, `meeting_url`, `venue_id`, `event_type`, `track_id`.

### Available event tags
Consciousness, Health & Longevity, Wellbeing, Bio & Neuro, AI, Governance & Coordination, Hard Tech, Privacy, d/acc, Art & Culture, Decentralized Tech, Creative AI & Technologies, Spatial Computing, New Urbanism, Education, Energy & Climate, Food Systems

---

## 2. Attendee Directory (EdgeOS API)

Search who is attending Edge Esmeralda 2026. **Requires `$EDGEOS_BEARER_TOKEN`.**

**Search attendees:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_BEARER_TOKEN" \
  "https://api-citizen-portal.simplefi.tech/applications/attendees_directory/8?skip=0&limit=20&search=QUERY"
```

Replace `QUERY` with a name, organization, or role. Use `skip` and `limit` for pagination.

**Filter by week:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_BEARER_TOKEN" \
  "https://api-citizen-portal.simplefi.tech/applications/attendees_directory/8?skip=0&limit=20&weeks=1,2"
```

**Filter by families with kids:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_BEARER_TOKEN" \
  "https://api-citizen-portal.simplefi.tech/applications/attendees_directory/8?skip=0&limit=20&brings_kids=true"
```

### Attendee response fields
Each attendee contains: `first_name`, `last_name`, `email`, `telegram`, `role`, `organization`, `personal_goals`, `residence`, `age`, `gender`, `social_media`, `builder_boolean`, `builder_description`, `participation` (array of weeks with `name`, `start_date`, `end_date`), `associated_attendees` (spouse, kids), `picture_url`.

The response includes `pagination: { skip, limit, total }`.

### Week dates
- **Week 1**: May 30 – June 6, 2026
- **Week 2**: June 6 – June 13, 2026
- **Week 3**: June 13 – June 20, 2026
- **Week 4**: June 20 – June 27, 2026

### Privacy
Some attendees hide certain fields. Hidden fields appear as `"*"`. **Respect this** — do not try to infer or work around hidden data. If a field is `"*"`, tell the user that information is private.

If the user hasn't set `$EDGEOS_BEARER_TOKEN`, tell them they need to obtain an access token from the Edge Esmeralda team to search attendees.

---

## 3. Reference Content (Wiki, Website, Newsletter)

For questions about logistics, the organization, or announcements, fetch the latest preprocessed content:

**Edge Esmeralda Wiki** (tickets, accommodation, travel, venues, health, kids, transport, etc.):
```bash
curl -s "https://raw.githubusercontent.com/aromeoes/edge-agent-skill/main/references/wiki-content.md"
```

**Edge City Website** (mission, leadership, roadmap, ecosystem, media):
```bash
curl -s "https://raw.githubusercontent.com/aromeoes/edge-agent-skill/main/references/website-content.md"
```

**Edge Esmeralda Newsletter** (residencies, fellowships, housing, tickets, programming):
```bash
curl -s "https://raw.githubusercontent.com/aromeoes/edge-agent-skill/main/references/newsletter-digest.md"
```

These files are updated automatically every 15 minutes. Fetch them when the user asks about:
- Tickets, pricing, scholarships, volunteering → **wiki**
- Accommodation, Hotel Trio, Airbnb, camping → **wiki**
- Travel, airports, getting to Healdsburg → **wiki**
- Venues, coworking, wifi → **wiki**
- Check-in, wristbands → **wiki**
- Health, gym, sauna, cold plunge → **wiki**
- Kids, families, kids camp → **wiki**
- Telegram groups, community chat → **wiki**
- Transport, bikes, rideshare → **wiki**
- Local discounts, merch → **wiki**
- Outdoor adventures, Russian River, hikes → **wiki**
- What is Edge City, mission, vision, leadership → **website**
- Roadmap, long-term plan, phases → **website**
- Ecosystem, projects, partners → **website**
- Residencies, fellowships, grants → **newsletter**
- Programming preview, how to get involved → **newsletter**
- Housing details, lodging options → **newsletter**
- Science partnerships, Alethios → **newsletter**

---

## 4. What's NOT Available Yet

Be honest about these gaps — do not hallucinate answers:

- **Session transcripts / summaries**: "Session recordings and transcripts aren't available yet. Once the Granola integration is live, I'll be able to summarize past talks. For now, check the Edge Esmeralda Telegram group for session recaps."

- **Governance / deliberation**: "There's no governance or deliberation layer integrated yet. Community discussions happen in the Telegram group."

- **Real-time venue availability**: The calendar shows what's scheduled, but there's no live venue booking system. To check if a venue is free, search events for that date/time and see if the venue is already taken.

---

## 5. Tips for Answering Well

- **Always use live API calls** for schedule and attendee queries — don't rely on cached or memorized data.
- **Combine sources** when needed. For example, "What experiments are running this week?" needs both the wiki (experiment descriptions) and the calendar (live schedule).
- **Be specific with dates**. Convert "tomorrow", "this Thursday", "next week" to actual YYYY-MM-DD dates before querying.
- **Default to the event date range** (2026-05-30 to 2026-06-27) when searching broadly.
- **For attendee matching** (e.g., "who should I meet?"), search by interests in `personal_goals`, `organization`, `builder_description`, and `role` fields.
- **For venue questions**, first fetch the wiki for venue names/descriptions, then check the calendar for what's booked.
- **Pagination**: EdgeOS returns max 50 results. Use `skip` and `limit` to paginate. Social Layer uses `limit` (default 10).

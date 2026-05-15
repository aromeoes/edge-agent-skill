---
name: edge-esmeralda-2026
description: Connect to Edge Esmeralda 2026 data — event schedule, attendee directory, wiki, newsletters, and organization info.
version: 2.0.0
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

## 1. Event Schedule (EdgeOS Events API)

The calendar lives on the EdgeOS Events API at **`https://api.edgeos.world/api/v1`**.

### Authentication is required

**Every calendar request requires a personal access token.** The user must provide one — never invent or assume a token.

Token format: `eos_live_...` (issued at `/portal/api-keys` in the EdgeOS portal).

Scopes the token may grant:
- `events:read` — list and fetch events, list own RSVPs, list venues
- `events:write` — create / update / cancel events, manage invitations
- `rsvp:write` — RSVP and cancel RSVPs
- `venues:write` — create / update / delete venues

**If the user has not provided a token, stop and ask for one.** Say something like:

> To query the Edge Esmeralda calendar I need an EdgeOS personal access token. Generate one at the EdgeOS portal under `/portal/api-keys` (it starts with `eos_live_`) and share it here, or set it as `$EDGEOS_API_KEY` in your environment.

Once provided, pass it as `Authorization: Bearer <token>` on every request. If the user pastes a token directly, you may use it inline — do not persist it.

### Conventions

- List endpoints return `{ results: T[], paging }`. Single-resource endpoints return the resource directly.
- Times are ISO-8601 with timezone. UUIDs are RFC-4122.
- Recurring events expand into virtual occurrences when `start_after` is set. When RSVPing to one instance of a recurring event, pass that occurrence's `start_time` as `occurrence_start`.
- Error codes: `401` missing/expired key · `403` token lacks the required scope · `404` not visible · `409` resource has dependents · `422` validation · `429` rate limit (see `Retry-After`).

### Reading events

**List upcoming events (next 30 days):**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/events/portal/events?start_after=$(date -u +%Y-%m-%dT%H:%M:%SZ)&limit=50"
```

**List events in a date range:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/events/portal/events?start_after=2026-05-30T00:00:00Z&start_before=2026-06-27T23:59:59Z&limit=100"
```

**Search events by title:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/events/portal/events?search=KEYWORD&start_after=2026-05-30T00:00:00Z&limit=50"
```

**Filter by tag, kind, venue, or track:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/events/portal/events?tags=AI&tags=Privacy&limit=50"
```

**Only events you've RSVPed to:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/events/portal/events?rsvped_only=true&limit=50"
```

**Fetch a single event (includes caller's RSVP status):**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/events/portal/events/{event_id}"
```

For a recurring event, scope the RSVP lookup to one instance with `?occurrence_start=2026-06-15T17:00:00Z`.

**Pagination:** use `skip` and `limit` (max `100`). Stop when `results.length < limit`.

### Writing events (requires `events:write`)

**Update an event you own:**
```bash
curl -s -X PATCH -H "Authorization: Bearer $EDGEOS_API_KEY" \
  -H "Content-Type: application/json" \
  "https://api.edgeos.world/api/v1/events/portal/events/{event_id}" \
  -d '{"title":"Updated title","start_time":"2026-06-15T17:00:00Z","end_time":"2026-06-15T18:00:00Z","timezone":"America/Los_Angeles","tags":["AI"]}'
```

Patchable fields: `title`, `content`, `start_time`, `end_time`, `timezone`, `venue_id`, `custom_location_name`, `custom_location_url`, `cover_url`, `meeting_url`, `max_participant`, `tags`, `track_id`, `visibility` (`public` | `private` | `unlisted`), `status`, `host_display_name`.

Setting `venue_id` clears any `custom_location_*` fields, and vice versa. Calendar-affecting changes (time, venue, title) bump the iCal sequence and send an iTIP `UPDATE` to attendees.

**Cancel an event you own (soft cancel — no hard delete exists):**
```bash
curl -s -X POST -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/events/portal/events/{event_id}/cancel"
```

### Invitations (owner-only, `events:write`)

**List invitations:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/events/portal/events/{event_id}/invitations"
```

**Bulk-invite by email (1–1000, case-insensitive, must match existing humans in the tenant; unknown emails come back under `not_found`):**
```bash
curl -s -X POST -H "Authorization: Bearer $EDGEOS_API_KEY" \
  -H "Content-Type: application/json" \
  "https://api.edgeos.world/api/v1/events/portal/events/{event_id}/invitations" \
  -d '{"emails":["alice@example.com","bob@example.com"]}'
```

**Revoke an invitation:**
```bash
curl -s -X DELETE -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/events/portal/events/{event_id}/invitations/{invitation_id}"
```

### RSVP (`rsvp:write`)

**RSVP to a one-off event:**
```bash
curl -s -X POST -H "Authorization: Bearer $EDGEOS_API_KEY" \
  -H "Content-Type: application/json" \
  "https://api.edgeos.world/api/v1/event-participants/portal/register/{event_id}" \
  -d '{}'
```

**RSVP to one occurrence of a recurring event:**
```bash
curl -s -X POST -H "Authorization: Bearer $EDGEOS_API_KEY" \
  -H "Content-Type: application/json" \
  "https://api.edgeos.world/api/v1/event-participants/portal/register/{event_id}" \
  -d '{"occurrence_start":"2026-06-15T17:00:00Z"}'
```

**Cancel a previous RSVP:**
```bash
curl -s -X POST -H "Authorization: Bearer $EDGEOS_API_KEY" \
  -H "Content-Type: application/json" \
  "https://api.edgeos.world/api/v1/event-participants/portal/cancel-registration/{event_id}" \
  -d '{}'
```

**List your own RSVPs across events:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/event-participants/portal/participants"
```

### Venues

**List active venues for a popup (`popup_id` is required, must be a UUID):**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/event-venues/portal/venues?popup_id={popup_uuid}&limit=100"
```

**Create a venue (`venues:write`; may land in `PENDING` if the popup requires approval, and may be disabled by the popup's `humans_can_create_venues` setting):**
```bash
curl -s -X POST -H "Authorization: Bearer $EDGEOS_API_KEY" \
  -H "Content-Type: application/json" \
  "https://api.edgeos.world/api/v1/event-venues/portal/venues" \
  -d '{"popup_id":"{popup_uuid}","title":"Workshop Room","description":"...","location":"...","formatted_address":"...","capacity":30,"booking_mode":"free"}'
```

`booking_mode` is one of `free` | `approval_required` | `unbookable`.

**Update a venue you own (the `status` field is ignored — re-approval lives in the backoffice):**
```bash
curl -s -X PATCH -H "Authorization: Bearer $EDGEOS_API_KEY" \
  -H "Content-Type: application/json" \
  "https://api.edgeos.world/api/v1/event-venues/portal/venues/{venue_id}" \
  -d '{"title":"...","capacity":40}'
```

**Delete a venue (`409` if it still has non-cancelled events; reassign or cancel them first):**
```bash
curl -s -X DELETE -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/event-venues/portal/venues/{venue_id}"
```

### Discovery

If you don't know a `popup_id`, `venue_id`, `event_id`, or the full OpenAPI surface, the spec is served at:

```bash
curl -s -H "Authorization: Bearer $EDGEOS_API_KEY" \
  "https://api.edgeos.world/api/v1/openapi.json"
```

### Available event tags

Consciousness, Health & Longevity, Wellbeing, Bio & Neuro, AI, Governance & Coordination, Hard Tech, Privacy, d/acc, Art & Culture, Decentralized Tech, Creative AI & Technologies, Spatial Computing, New Urbanism, Education, Energy & Climate, Food Systems

---

## 2. Attendee Directory (EdgeOS Citizen Portal)

Search who is attending Edge Esmeralda 2026. **Requires `$EDGEOS_BEARER_TOKEN`** (a separate token from the events API key — issued by the citizen portal).

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

- **Real-time venue availability**: The calendar shows what's scheduled, but there's no live venue booking system. To check if a venue is free, list events for that date/time and see whether the venue is already taken.

---

## 5. Tips for Answering Well

- **Always use live API calls** for schedule and attendee queries — don't rely on cached or memorized data.
- **Always require the EdgeOS API key before any calendar call.** If the user has not given one, ask for it first and stop. Do not try to query the calendar anonymously — every endpoint will return `401`.
- **Combine sources** when needed. For example, "What experiments are running this week?" needs both the wiki (experiment descriptions) and the calendar (live schedule).
- **Be specific with dates**. Convert "tomorrow", "this Thursday", "next week" to actual ISO-8601 timestamps before querying. The EdgeOS events API expects ISO-8601 with timezone for `start_after` / `start_before`.
- **Default to the event date range** (2026-05-30 to 2026-06-27) when searching broadly.
- **For attendee matching** (e.g., "who should I meet?"), search by interests in `personal_goals`, `organization`, `builder_description`, and `role` fields.
- **For venue questions**, first fetch the wiki for venue names/descriptions, then list calendar events to see what's booked.
- **Pagination**: EdgeOS events API supports `skip` + `limit` (max 100). Citizen portal returns max 50 — paginate with `skip` and `limit`.

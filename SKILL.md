---
name: edge-esmeralda-2026
description: Connect to Edge Esmeralda 2026 data — event schedule, attendee directory, wiki, newsletters, and organization info.
version: 2.2.0
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

This skill uses two complementary EdgeOS tokens. Each section below tells you which one it needs:

| Env var | Format | What it's for | How to get it |
|---|---|---|---|
| `$EDGEOS_API_KEY` | `eos_live_...` | Calendar reads/writes — events, RSVPs, venues (scopes: `events:read`, `events:write`, `rsvp:write`, `venues:write`) | Mint it in the EdgeOS portal under `/portal/api-keys`, or via `POST /api/v1/api-keys` if you have a bearer token (see below) |
| `$EDGEOS_BEARER_TOKEN` | JWT | Reading the caller's own profile (`/humans/me`), the attendee directory, and minting `eos_live_...` keys (scopes: `portal:self_read`, `portal:directory_read`, `portal:api_keys_manage`) | The user logs in via OTP at the EdgeOS portal. Integrating apps (e.g. OpenClaw) can also obtain it through the third-party login flow on the user's behalf — see the auth endpoints below |

Both are passed as `Authorization: Bearer <token>`. **For everything in §1, use `$EDGEOS_API_KEY`.** Section 2 (directory) uses `$EDGEOS_BEARER_TOKEN`.

#### Route gating for `eos_live_...` keys

These keys are intentionally restricted to a short allowlist of event-automation routes. Endpoints under `/api/v1/events/portal/...` and `/api/v1/event-participants/portal/...` and `/api/v1/event-venues/portal/...` work — that's everything used in this section. Admin-style routes (`GET /api/v1/events`, `POST /api/v1/events/check-availability`) return `403` with `"API keys are restricted to approved event automation routes"`. When you hit that, you need the bearer token, not the API key.

#### Minting an `eos_live_...` key via API (alternative to the portal UI)

If `$EDGEOS_BEARER_TOKEN` is available, you can mint a calendar key without leaving the terminal:

```bash
curl -s -X POST -H "Authorization: Bearer $EDGEOS_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.edgeos.world/api/v1/api-keys" \
  -d '{"name":"my-calendar-key","scopes":["events:read"]}'
```

The response includes the full key string (`"key": "eos_live_..."`) **once**; after that, only the prefix is visible via `GET /api/v1/api-keys`. Revoke with `DELETE /api/v1/api-keys/{key_id}`. Optional `expires_at` (ISO-8601 datetime).

#### Third-party (OTP) login flow

Integrating apps that own a tenant API key (`X-Third-Party-Api-Key`) can obtain a bearer token for any user in their tenant via a two-step OTP exchange. End users of this skill normally won't do this directly — it's the integration layer's job — but for reference:

```bash
# 1. Send OTP email
curl -s -X POST "https://api.edgeos.world/api/v1/auth/human/third-party/login" \
  -H "X-Third-Party-Api-Key: $EDGEOS_TENANT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'

# 2. Exchange the 6-digit code for a bearer token (15-min OTP expiry)
curl -s -X POST "https://api.edgeos.world/api/v1/auth/human/third-party/authenticate" \
  -H "X-Third-Party-Api-Key: $EDGEOS_TENANT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","code":"123456"}'
```

#### If the user hasn't provided a token

Stop and ask. Example:

> To query the Edge Esmeralda calendar I need an EdgeOS calendar key (starts with `eos_live_`). Generate one in the EdgeOS portal under `/portal/api-keys` and share it, or set it as `$EDGEOS_API_KEY`. If you have a portal bearer token (`$EDGEOS_BEARER_TOKEN`) instead, I can mint a calendar key for you on the fly.

If the user pastes a token, use it inline — do not persist it.

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

## 2. Attendee Directory (EdgeOS Portal)

Search who is attending Edge Esmeralda 2026. **Requires `$EDGEOS_BEARER_TOKEN`** — the calendar API key won't work here (it lacks the `portal:directory_read` scope).

The directory lives on the same host as the events API (`api.edgeos.world`). The popup id is required in the URL path. For Edge Esmeralda 2026 it is `43746fd0-bce2-472b-93e4-a438177b2dff`. To resolve any other popup, list popups with `GET /api/v1/popups/portal/list` (same bearer token).

**List the directory (paginated):**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_BEARER_TOKEN" \
  "https://api.edgeos.world/api/v1/applications/my/directory/43746fd0-bce2-472b-93e4-a438177b2dff?skip=0&limit=100"
```

**Search by name, role, organization, or residence:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_BEARER_TOKEN" \
  "https://api.edgeos.world/api/v1/applications/my/directory/43746fd0-bce2-472b-93e4-a438177b2dff?q=QUERY&limit=50"
```

The response is `{ "results": [...], "paging": { "skip", "limit", "total" } }`. Pagination is `skip` + `limit` (default `100`, max `1000`).

**CSV export of the full directory:**
```bash
curl -s -H "Authorization: Bearer $EDGEOS_BEARER_TOKEN" \
  "https://api.edgeos.world/api/v1/applications/my/directory/43746fd0-bce2-472b-93e4-a438177b2dff/csv"
```

### Attendee fields

Each result contains: `id`, `first_name`, `last_name`, `email`, `telegram`, `role`, `organization`, `residence`, `age`, `gender`, `picture_url`, `participation` (array — each item has `id`, `name`, `slug`, `category`, `duration_type`, e.g. month / week-1 / week-4 passes), `associated_attendees` (linked plus-ones, partners, kids).

Unfilled fields come back as `null`. Treat `null` as "not provided" — do not infer.

### Pass / participation duration types

`participation[].duration_type` is one of `month`, `week`, `weekend`, or `day`. The `slug` (e.g. `week-1-main`, `month-main`) plus `name` (e.g. `Week 1`, `Month`) tells you exactly which timeframe the attendee is around for. The four official weeks for Esmeralda 2026:

- **Week 1**: May 30 – June 6, 2026
- **Week 2**: June 6 – June 13, 2026
- **Week 3**: June 13 – June 20, 2026
- **Week 4**: June 20 – June 27, 2026

### Caller's own profile

If you only need information about the calling user (the holder of `$EDGEOS_BEARER_TOKEN`), call `GET /api/v1/humans/me` — faster than searching the directory and returns the same identity fields (id, tenant_id, email, first_name, last_name, telegram, gender, age, residence, picture_url):

```bash
curl -s -H "Authorization: Bearer $EDGEOS_BEARER_TOKEN" \
  "https://api.edgeos.world/api/v1/humans/me"
```

### If the user hasn't provided a bearer token

Tell them they need one from the EdgeOS portal (OTP login) or from whatever integrating app (e.g. OpenClaw) is providing them this skill. See the third-party OTP flow in §1.

---

## 3. Knowledge Discovery (Index Network) — Placeholder

> **Status**: Stub. The Index Network team will replace this section via PR.

Reserved for [Index Network](https://index.network) tooling — semantic search and cross-village knowledge discovery (past discussions, session notes, research links, decentralized knowledge graphs across Edge City popups).

<!-- INDEX_NETWORK_PLACEHOLDER
PR authors, replace this block with:
- Endpoint(s) or SDK calls the agent should use
- Auth: env var name (suggest `$INDEX_NETWORK_TOKEN`), scope, how the user obtains a token
- 3–5 example curl commands or SDK snippets covering the common flows
- Expected response shape
- When NOT to use this tool (overlap with EdgeOS Events / Citizen Portal / Reference Content)
END -->

**Until this is wired up**: Tell the user that semantic search across Edge City content isn't live yet. Fall back to the indexed reference content in §5 (wiki, website, newsletter) and direct keyword search via `GET /events/portal/events?search=…` (§1).

---

## 4. Spatial Browsing (Geo Browser) — Placeholder

> **Status**: Stub. The Geo Browser team will replace this section via PR.

Reserved for Geo Browser tooling — a spatial/map-based interface for navigating Edge Esmeralda's venues, neighbourhoods, and events by physical location.

<!-- GEO_BROWSER_PLACEHOLDER
PR authors, replace this block with:
- Endpoint(s) or SDK calls (likely: nearby venues, route between two venues, geofenced event search)
- Auth: env var name (suggest `$GEO_BROWSER_TOKEN`), scope, how the user obtains a token
- Lat/lng input conventions (the EdgeOS events API already exposes `geo_lat` / `geo_lng` on venues — see §1)
- Map link / share URL conventions
- Example curl commands or SDK snippets
END -->

**Until this is wired up**: Use `geo_lat` / `geo_lng` on venues from `GET /event-venues/portal/venues` (§1) to answer "what's near venue X" or "how far apart are these two venues" with basic haversine math, and Healdsburg-area knowledge from the wiki (§5).

---

## 5. Reference Content (Wiki, Website, Newsletter)

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

## 6. What's NOT Available Yet

Be honest about these gaps — do not hallucinate answers. When asked about any of these, give the disclosure below and surface the best available fallback. Never fabricate data, IDs, or actions.

- **Session transcripts / summaries**: "Session recordings and transcripts aren't available yet. Once the Granola integration is live, I'll be able to summarize past talks. For now, check the Edge Esmeralda Telegram group for session recaps."

- **Governance / deliberation**: "There's no governance or deliberation layer integrated yet. Community discussions happen in the Telegram group, and the in-person Community Town Hall events are where real-time deliberation happens."

- **Real-time venue availability**: The calendar shows what's scheduled, but there's no live venue booking system. To check if a venue is free, list events for that date/time and see whether the venue is already taken.

- **Your own application content (dietary preferences, "what I'm building", openness-to-meet flags, etc.)**: There is no read endpoint for the caller's application answers in this skill. You **can** read the caller's identity fields via `GET /api/v1/humans/me` (see §2) — id, email, name, telegram, gender, age, residence, picture_url — and you can also find yourself in the directory listing (§2). But application content (dietary, interests, builder description) isn't exposed here. Say: "I can read your basic profile (name, email, telegram, residence, etc.) but not your application content. For dietary preferences and similar, check your EdgeOS portal account or ask info@edgeesmeralda.com."

- **Profile editing — limited**: You can edit your own basic identity fields (first_name, last_name, telegram, gender, age, residence, picture_url) via `PATCH /api/v1/humans/me` with `$EDGEOS_BEARER_TOKEN`. You **cannot** edit dietary preferences, interests, application answers, "what I'm building", openness-to-meet flags, or anyone else's profile through this skill. Say: "I can update your basic profile fields here. For application content (dietary, interests, etc.), use the EdgeOS portal under `/portal/profile`. I can't edit anyone else's profile regardless."

- **Matching / discovery / "introduce me to"**: There is no matching service, intent system, or "open to investors / collaborators" flag integrated yet. Say: "There's no matching system integrated yet. The closest thing I can do is keyword-search the directory (§2, `?q=...`) by name, role, organization, or residence — want me to do that?" Then run the directory search as a fallback.

- **Scheduled tasks / recurring summaries / reminders**: The skill itself can't schedule anything. Say: "I can't schedule recurring runs through the skill — your agent host needs a scheduling layer for that. In Claude Code, `/loop` or `/schedule` can fire a prompt on a cadence. Let me know if you want me to draft the prompt." Do not pretend to set up cron jobs.

- **Outbound messaging / DMs / introductions on behalf of the user**: No messaging endpoint. Surface Telegram handles (and X handles where present) from the directory (§2) and let the user reach out themselves. Do not claim to have sent a message.

---

## 7. Tips for Answering Well

- **Always use live API calls** for schedule and attendee queries — don't rely on cached or memorized data.
- **Always require the EdgeOS calendar key before any calendar call.** If the user has not given one, ask for `$EDGEOS_API_KEY` and stop. Do not query the calendar anonymously — every endpoint will return `401`. If the user has a `$EDGEOS_BEARER_TOKEN` but no calendar key, offer to mint one for them (see §1).
- **Combine sources** when needed. For example, "What experiments are running this week?" needs both the wiki (experiment descriptions) and the calendar (live schedule).
- **Be specific with dates**. Convert "tomorrow", "this Thursday", "next week" to actual ISO-8601 timestamps before querying. The EdgeOS events API expects ISO-8601 with timezone for `start_after` / `start_before`.
- **Default to the event date range** (2026-05-30 to 2026-06-27) when searching broadly.
- **For attendee matching** (e.g., "who should I meet?"), use the directory's `q` search — it covers name, role, organization, and residence. There's no interests/goals field exposed in this skill.
- **For venue questions**, first fetch the wiki for venue names/descriptions, then list calendar events to see what's booked.
- **Pagination**: EdgeOS events list supports `skip` + `limit` (max `100`). Directory list supports `skip` + `limit` (default `100`, max `1000`). Stop when `results.length < limit`.

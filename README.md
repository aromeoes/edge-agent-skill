# Edge Esmeralda 2026 — Agent Skill

A single-file skill that gives AI agents access to Edge Esmeralda 2026 data: event schedule, attendee directory, wiki, newsletters, and organization info.

## For Users (Attendees)

**Download [`SKILL.md`](./SKILL.md)** and add it to your agent's skill/context:

- **Claude Code**: Copy to `~/.claude/skills/edge-esmeralda/SKILL.md`
- **OpenClaw / Hermes / NanoClaw**: Add to your agent's skill directory

Set environment variables:
```bash
export EDGEOS_API_KEY="eos_live_..."      # Calendar (events, RSVPs, venues)
export EDGEOS_BEARER_TOKEN="..."          # Portal — own profile, attendee directory, minting calendar keys
```

The two tokens cover different parts of EdgeOS:

- **`EDGEOS_API_KEY`** (`eos_live_...`) — long-lived, scoped to calendar routes. Mint it in the EdgeOS portal under `/portal/api-keys`, or via `POST /api/v1/api-keys` if you have a bearer token. Restricted to the event-automation route allowlist (`/events/portal/...`, `/event-participants/portal/...`, `/event-venues/portal/...`); admin-style endpoints will 403.
- **`EDGEOS_BEARER_TOKEN`** — short-lived JWT, obtained by OTP login at the EdgeOS portal (or via the third-party `/auth/human/third-party/{login,authenticate}` flow if an integrating app like OpenClaw is fronting auth). Used for `/humans/me`, the directory, and minting calendar keys.

You don't strictly need both — only set what the agent will use. See `scripts/example-auth-flow.ts` for a runnable demo of the third-party login → mint key → query flow.

## For Maintainers

This repo contains backend infrastructure that keeps the skill's reference content fresh.

### Setup
```bash
bun install
```

### Run indexer
```bash
bun run scripts/index.ts
```

This fetches and preprocesses content from:
- **Notion wiki** (Edge Esmeralda 2026 Wiki) → `references/wiki-content.md`
- **Edge City website** (edgecity.live) → `references/website-content.md`
- **Substack newsletter** (edgeesmeralda2026.substack.com) → `references/newsletter-digest.md`

A GitHub Action runs the indexer every 15 minutes and commits any changes.

### Data Sources

| Source | Type | Auth | Status |
|--------|------|------|--------|
| EdgeOS Events (api.edgeos.world) | Live API | `eos_live_...` calendar key (`Authorization: Bearer`) | Live |
| EdgeOS Portal — `/humans/me`, attendee directory, API key mgmt (api.edgeos.world) | Live API | OTP-derived JWT (`Authorization: Bearer`) | Live |
| Notion Wiki | Preprocessed | None (public) | Live |
| Edge City Website | Preprocessed | None | Live |
| Substack Newsletter | Preprocessed | None | Live |
| Index Network (semantic search) | Live API | TBD | **Placeholder — awaiting PR** |
| Geo Browser (spatial / map) | Live API | TBD | **Placeholder — awaiting PR** |

## Contributing tooling (Index Network, Geo Browser, others)

Two sections in `SKILL.md` are reserved as stubs for external teams to PR concrete tooling into:

- **§3 Knowledge Discovery (Index Network)** — marker: `<!-- INDEX_NETWORK_PLACEHOLDER ... END -->`
- **§4 Spatial Browsing (Geo Browser)** — marker: `<!-- GEO_BROWSER_PLACEHOLDER ... END -->`

To contribute a section:

1. Open a PR replacing the placeholder block (everything between the marker comments) with:
   - The endpoint(s) or SDK calls the agent should make
   - Auth: env var name, scope, and how a user obtains a token
   - 3–5 curl/SDK examples covering the common flows
   - Expected response shape, including error codes
   - When NOT to use the tool (overlap with EdgeOS or other sections)
2. Remove the `<!-- ..._PLACEHOLDER ... END -->` marker comment.
3. Update the row in the Data Sources table above (`Status: Live`, fill `Auth`).
4. Bump the `version` field in `SKILL.md` frontmatter (e.g. 2.1.0 → 2.2.0).
5. If your section needs env vars, add them to `.env.example`.

Keep additions self-contained — the skill is a single file users download, so external imports / multi-file refactors aren't accepted.

# Edge Agent Skill

This repo contains a single-file AI agent skill (`SKILL.md`) for **Edge City India 2026**, plus a public documentary indexer. Esmeralda ended and must not be refreshed or used as India logistics.

## Project structure
- `SKILL.md` — Self-contained downloadable skill, currently public-documentary only.
- `references/index.md` — Generated discovery index.
- `references/manifest.json` — Generated document metadata/hashes.
- `references/wiki-content.md`, `website-content.md`, `newsletter/`, `website/`, `residencies/` — Generated India references.
- `archives/edge-esmeralda-2026/` — Frozen previous references, never indexed.
- `scripts/sources.ts` — Approved public sources and event constants.
- `scripts/content.ts` — Markdown extraction, XML validation, ordered Notion traversal.
- `scripts/publish.ts` — Deterministic publication and retention.
- `scripts/index.ts` — Fetching and orchestration.
- `tests/` — Offline Bun regression tests.
- `.github/workflows/index.yml` — Refresh every 15 minutes and manual dispatch.

## Commands
- `bun install --frozen-lockfile`
- `bun run test`
- `bun run typecheck`
- `bun run index`

## Event/source constants
- October 11–November 1, 2026; Mandrem, North Goa; `Asia/Kolkata`.
- Notion ID: `038d45cdfc5983c7a1fe013fdc77135b`.
- Newsletter: `https://edgecityindia2026.substack.com/feed` and `/sitemap.xml`.
- Website: `https://www.edgecity.live/india26`.
- Portal: `https://portal.edgecity.live/portal/edge-india`.

## Guardrails
- No credentials are needed for the public indexer.
- India EdgeOS UUID/auth/API validation and Telegram ingestion are pending. Never reuse Esmeralda IDs or claim these integrations are live.
- Fetch only approved public sources. Linked housing sheets, forms, Telegram, external residency sites, and attendee portals are not crawl targets.
- Preserve source links, tables, order, dates, and caveats. Do not silently rewrite conflicting facts.
- A failed source must fail the run without replacing valid references.
- Do not delete old newsletter articles when they roll out of the feed/sitemap.
- Unchanged content must not generate timestamp-only commits.
- Do not edit generated references by hand; change the indexer or upstream source.
- §3 Index Network and §4 Geo Browser retain placeholder marker comments. Replace them only with verified India endpoints, auth, and examples.

Default to Bun instead of Node.js.

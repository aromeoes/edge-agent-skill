# Edge Esmeralda 2026 — Agent Skill

A single-file skill that gives AI agents access to Edge Esmeralda 2026 data: event schedule, attendee directory, wiki, newsletters, and organization info.

## For Users (Attendees)

**Download [`SKILL.md`](./SKILL.md)** and add it to your agent's skill/context:

- **Claude Code**: Copy to `~/.claude/skills/edge-esmeralda/SKILL.md`
- **OpenClaw / Hermes / NanoClaw**: Add to your agent's skill directory

Set environment variables:
```bash
export EDGEOS_API_KEY="eos_live_..."      # Required for the calendar (events, RSVPs, venues)
export EDGEOS_BEARER_TOKEN="your-token"   # Required for attendee directory search
```

Generate the calendar token from the EdgeOS portal under `/portal/api-keys`.

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

| Source | Type | Auth |
|--------|------|------|
| EdgeOS Events (api.edgeos.world) | Live API | Bearer token (eos_live_...) |
| EdgeOS Attendees (api-citizen-portal.simplefi.tech) | Live API | Bearer token |
| Notion Wiki | Preprocessed | None (public) |
| Edge City Website | Preprocessed | None |
| Substack Newsletter | Preprocessed | None |

# Edge City India 2026 — Agent Skill

Public documentary knowledge for the three-week popup village in Mandrem, North Goa, **October 11–November 1, 2026** (`Asia/Kolkata`).

## For users

Download [`SKILL.md`](./SKILL.md) and add it to your agent:

- **Claude Code:** `~/.claude/skills/edge-india/SKILL.md`
- **Other agents:** add it to your host's skill/context directory.

No API keys are needed. The skill reads public references locally or fetches them from this repository after the India migration is published. It includes primary-source fallbacks and checks that documents belong to India, not Esmeralda.

Start browsing at [`references/index.md`](./references/index.md).

**Live EdgeOS calendar, cancellations, attendee/profile access, and Telegram ingestion are not enabled yet.** The India portal is https://portal.edgecity.live/portal/edge-india. Do not reuse Esmeralda IDs or interpret programming previews as live schedules.

## For maintainers

```bash
bun install --frozen-lockfile
bun run test
bun run typecheck
bun run index
```

### Public sources

| Source | Input | Output |
| --- | --- | --- |
| India wiki | [Public Notion page](https://edgecity.notion.site/Edge-City-India-2026-Wiki-038d45cdfc5983c7a1fe013fdc77135b) | `references/wiki-content.md` |
| India website/FAQ | [india26](https://www.edgecity.live/india26) | `references/website-content.md` |
| Organization background | [About](https://www.edgecity.live/about) | `references/website/about.md` |
| Public guides/updates | [Substack RSS](https://edgecityindia2026.substack.com/feed) + [sitemap](https://edgecityindia2026.substack.com/sitemap.xml) | `references/newsletter/*.md` |
| Selected residency pages | Explicit URLs in `scripts/sources.ts` | `references/residencies/*.md` |

The indexer preserves Markdown headings, links, and tables. Notion blocks are traversed in document order, including nested/toggled sections. Only rendered public content is saved: Notion permissions, user records, discussions, and internal record-map metadata are not serialized.

Substack's sitemap backfills articles outside the RSS window. Previously indexed newsletter articles absent from both are retained and labeled in the index, not silently deleted. Retained content is not a guarantee that an offer remains valid.

### Publication and freshness

- GitHub Actions runs every 15 minutes (best-effort) and on manual dispatch.
- Every source must fetch, parse, and validate before publication. A source failure returns a nonzero exit code and leaves the existing references unchanged. This deliberately favors consistency over partial refreshes.
- Files are staged before swapping the reference directory; a failed final rename restores the previous directory.
- Document metadata includes source URL, type, available publication/update dates, and **last content change indexed**. This is not the last fetch time, an approval date, or a freshness guarantee.
- Content hashes preserve timestamps on unchanged runs. The workflow commits only actual changes; check its logs for the latest refresh attempt.
- `references/manifest.json` provides machine-readable document metadata and hashes. `references/index.md` provides human/agent discovery.
- Source content is not rewritten to resolve contradictions. The skill tells agents to cite conflicting evidence and seek confirmation for operational facts.

Configure approved sources in `scripts/sources.ts`; parser logic lives in `scripts/content.ts`, publication in `scripts/publish.ts`, and orchestration in `scripts/index.ts`.

Only the explicitly listed website pages and India newsletter articles are fetched. Housing spreadsheets, booking forms, Telegram groups, external residency sites, and attendee portals are linked resources, **not crawl targets**. Do not commit tokens or personal data.

### Esmeralda migration

The first successful India run copies existing Esmeralda snapshots into `archives/edge-esmeralda-2026/`, then replaces active references with India documents. Archives are frozen, excluded from indexing, and not used by the India skill. Git history also preserves the old skill and indexer.

### Future integrations

| Integration | Status / requirement |
| --- | --- |
| Live EdgeOS | Pending verified India UUID, endpoints, and auth; no private API responses in public Markdown |
| Official Telegram announcements | Pending channel identification, authorization, historical import, and new/edit capture |
| Team-approved FAQs | Pending explicit maintained/approved source; scraped website FAQ is not a separate approval workflow |
| Index Network | Placeholder §3 in `SKILL.md` |
| Geo Browser | Placeholder §4 in `SKILL.md` |

Keep `SKILL.md` self-contained for users who download only that file. Replace placeholder blocks only with verified India-compatible tooling, remove their marker comments, update statuses, and bump the skill version.

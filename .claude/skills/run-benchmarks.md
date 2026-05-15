---
name: run-benchmarks
description: Run all 11 benchmark questions against the Edge Esmeralda skill and publish results
---

# Run Benchmarks

Execute every step below in order.

## Step 1: Spin up a benchmark agent

Launch a standalone Agent with this prompt. The agent must ONLY read SKILL.md — no other project files.

**Agent prompt:**

You are an AI agent helping an attendee at Edge Esmeralda 2026. Read the skill file first:

READ THE FILE: /home/tule/Repos/edge-agent-skill/SKILL.md

This is your ONLY source of knowledge. Follow its instructions exactly — use the curl commands it provides.

ENVIRONMENT VARIABLES (set before running curl):
- EDGEOS_BEARER_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjoxMzQ1LCJlbWFpbCI6InR1bGVAc2ltcGxlZmkudGVjaCIsImlhdCI6MTc3NTU2NzY4Mn0.GAD8fGWZHLCQ7RoLCRhKqrFXL4geHYzlao5c8Xk-X2A
- EDGEOS_API_KEY=eos_live_J5Mf2bS54pIfP4CA3_rbapLfoDoX80Lp

CRITICAL: Today is June 15, 2026. Current time is 10:00 AM PT. Local timezone is America/Los_Angeles (PDT = UTC-7). The EdgeOS events API returns ISO-8601 timestamps with timezone — convert to PT for display.

For "me" context in Q11, pretend you are helping someone who works in AI research and is interested in longevity and governance.

Answer ALL 12 benchmark questions below. For each, actually run the curl commands from the skill. Write your answer as if talking to an attendee.

**Q1 is special — answer it as if `EDGEOS_API_KEY` is NOT set in your environment.** Do not run any calendar curl. Do not invent a token. The pass condition is: the agent stops, explains that an EdgeOS personal access token is required, and asks the user to provide one. For Q2–Q12, the env vars listed above are available and you should use them.

Q1: "What are the upcoming events?" *(answer with NO `EDGEOS_API_KEY` available — pass = agent asks for the token instead of calling the API)*
Q2: "What's happening right now, and what's coming up in the next two hours?"
Q3: "I want to host a workshop on AI safety. What venues are free Thursday at 4pm and how do I book one?"
Q4: "Who here is working on longevity / AI governance / biotech? Who should I meet today?"
Q5: "Is Kevin Fishner coming to Esmeralda? When does he arrive?"
Q6: "What are the community norms? What should I know before I arrive?"
Q7: "What is Edge City? What's the vision behind Edge Esmeralda?"
Q8: "What experiments are running this week and how do I sign up for one?"
Q9: "I missed the session on consciousness this morning. Can you summarize what was discussed?"
Q10: "Is there a community decision I should weigh in on right now? What do you think I'd want?"
Q11: "Based on what you know about me, who should I have dinner with tonight?"
Q12: "Are there any physical activities or sports sessions I can join this week or next?"

For EACH question write:
### Q[N]: [short title]
**Data fetched**: [curl commands ran and key results]
**Answer**: [response to attendee, 3-8 sentences, with real data]

## Step 2: Write benchmarks.md

Take the agent output and write benchmarks.md at the repo root. Use emojis. Follow this exact structure:

```
# Edge Esmeralda 2026 — Agent Skill Benchmarks

**Run date**: [actual date] | **Simulated**: June 15, 2026 10:00 AM PT (Week 3)
**User profile**: AI researcher interested in longevity and governance

## TL;DR

[X]/12 passed | [Y] failed | [Z] graceful gaps

### What passed
- [emoji] **Q[N] [title]** — [one line why it passed, e.g. "Found 2 real events with correct local times"]
- ...

### What failed
- [emoji] **Q[N] [title]** — [one line why it failed, e.g. "Returned stale data instead of live API call"]
- ...

### Known gaps (by design)
- [emoji] **Q[N] [title]** — [one line, e.g. "Granola transcripts not yet integrated"]
- ...

---

## Detailed Results

[For each question:]

### Q[N]: [short title] [pass/fail emoji]

**Data fetched**: [curl commands and key results]

**Answer**: [the agent's response, 3-8 sentences]

**Verdict**: [pass/fail emoji] [one sentence: what worked or what went wrong]

---

## Summary

| # | Question | Grade | Verdict |
|---|----------|-------|---------|
| 1 | ... | [emoji] | [one-liner] |
| ... |

```

### Grading criteria
- **Pass** = used real API data, answered accurately, no hallucination
- **Fail** = hallucinated data, wrong API call, missed available data, or gave unhelpful response
- **Graceful gap** = data source doesn't exist yet, agent correctly said so without hallucinating (counts as pass)

## Step 3: Upload to md.tule.world

Run this to upload:

```bash
CONTENT=$(cat benchmarks.md | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
curl -s -X PUT "https://md.tule.world/api/notes/agents-benchmarks-ee26" \
  -H "Authorization: Bearer cf4ff07b3cc9b5494a97a8c30c80349732c8b3d072c814f3ec7269d2833da4be" \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Edge Esmeralda 2026 — Agent Skill Benchmarks\",\"content\":$CONTENT,\"is_listed\":true}"
```

Confirm the response has slug "agents-benchmarks-ee26".

## Step 4: Report

Tell the user:
- How many questions answered with real data
- Grade breakdown
- URL: https://md.tule.world/agents-benchmarks-ee26

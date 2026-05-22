// End-to-end demo of the EdgeOS three-token auth model:
//   1. tenant API key (X-Third-Party-Api-Key) — held by an integrating app
//   2. bearer JWT (from OTP login) — identifies a specific user
//   3. eos_live_... calendar key (minted via the bearer) — long-lived calendar automation
//
// Run with:
//   EDGEOS_TENANT_API_KEY=... EMAIL=you@example.com bun run scripts/example-auth-flow.ts
//
// Or, if you already have a bearer token and just want to mint a calendar key:
//   EDGEOS_BEARER_TOKEN=... bun run scripts/example-auth-flow.ts

const API_BASE = "https://api.edgeos.world/api/v1";
const POPUP_ID = process.env.EDGEOS_POPUP_ID ?? "43746fd0-bce2-472b-93e4-a438177b2dff";

async function getBearerViaOtp(tenantKey: string, email: string): Promise<string> {
  const loginRes = await fetch(`${API_BASE}/auth/human/third-party/login`, {
    method: "POST",
    headers: { "X-Third-Party-Api-Key": tenantKey, "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!loginRes.ok) throw new Error(`OTP request failed: ${loginRes.status} ${await loginRes.text()}`);
  console.log(`OTP sent to ${email}. Check your inbox.`);

  const code = prompt("Enter the 6-digit code: ")?.trim();
  if (!code) throw new Error("No code provided");

  const authRes = await fetch(`${API_BASE}/auth/human/third-party/authenticate`, {
    method: "POST",
    headers: { "X-Third-Party-Api-Key": tenantKey, "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  if (!authRes.ok) throw new Error(`OTP exchange failed: ${authRes.status} ${await authRes.text()}`);
  const { access_token } = await authRes.json();
  return access_token;
}

async function getMe(bearer: string) {
  const res = await fetch(`${API_BASE}/humans/me`, {
    headers: { Authorization: `Bearer ${bearer}` },
  });
  if (!res.ok) throw new Error(`/humans/me failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function mintCalendarKey(bearer: string): Promise<{ key: string; id: string }> {
  const res = await fetch(`${API_BASE}/api-keys`, {
    method: "POST",
    headers: { Authorization: `Bearer ${bearer}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      name: `example-auth-flow ${new Date().toISOString()}`,
      scopes: ["events:read"],
    }),
  });
  if (!res.ok) throw new Error(`mint key failed: ${res.status} ${await res.text()}`);
  // `key` is only returned on creation; afterwards only `prefix` is visible.
  return res.json();
}

async function listEvents(apiKey: string) {
  const url = new URL(`${API_BASE}/events/portal/events`);
  url.searchParams.set("limit", "3");
  url.searchParams.set("start_after", new Date().toISOString());
  const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } });
  if (!res.ok) throw new Error(`events list failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function listDirectory(bearer: string) {
  const url = new URL(`${API_BASE}/applications/my/directory/${POPUP_ID}`);
  url.searchParams.set("limit", "3");
  const res = await fetch(url, { headers: { Authorization: `Bearer ${bearer}` } });
  if (!res.ok) throw new Error(`directory failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  let bearer = process.env.EDGEOS_BEARER_TOKEN;

  if (!bearer) {
    const tenantKey = process.env.EDGEOS_TENANT_API_KEY;
    const email = process.env.EMAIL;
    if (!tenantKey || !email) {
      throw new Error("Set EDGEOS_BEARER_TOKEN, or both EDGEOS_TENANT_API_KEY and EMAIL.");
    }
    bearer = await getBearerViaOtp(tenantKey, email);
    console.log("Got bearer token.\n");
  }

  const me = await getMe(bearer);
  console.log("/humans/me:", { id: me.id, email: me.email, name: `${me.first_name} ${me.last_name}` });

  let calendarKey = process.env.EDGEOS_API_KEY;
  if (!calendarKey) {
    const minted = await mintCalendarKey(bearer);
    calendarKey = minted.key;
    console.log(`Minted calendar key (id ${minted.id}). Save this — it's only shown once:\n  ${calendarKey}\n`);
  }

  const events = await listEvents(calendarKey);
  console.log(`Events (showing ${events.results.length} of ${events.paging.total}):`);
  for (const e of events.results) console.log(`  • ${e.start_time}  ${e.title}`);

  const directory = await listDirectory(bearer);
  console.log(`\nDirectory (showing ${directory.results.length} of ${directory.paging.total}):`);
  for (const a of directory.results) console.log(`  • ${a.first_name} ${a.last_name} <${a.email}>`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

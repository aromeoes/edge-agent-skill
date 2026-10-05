// Temporary public-source diagnostics. Never print response bodies or secrets.
import axios from "axios";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { EVENT } from "./sources";
import { publicUrl } from "./content";

const agent = "EdgeCityIndia-PublicIndexer/3.0";
const originalAccept = "application/json, text/plain, */*";
const xmlAccept = "application/xml, text/xml;q=0.9, */*;q=0.8";
const sitemap = `${EVENT.newsletter}/sitemap.xml`;

function summarize(status: number, headers: Record<string, unknown>, body: string) {
  return {
    status,
    contentType: String(headers["content-type"] ?? ""),
    server: String(headers.server ?? ""),
    cloudflareMitigation: String(headers["cf-mitigated"] ?? ""),
    bytes: Buffer.byteLength(body),
    xml: /^\s*(?:<\?xml[^>]*>\s*)?<(?:urlset|rss)\b/i.test(body),
    challenge: /cf-chl-|challenge-platform|verify you are human|just a moment/i.test(body),
    accessDenied: /access denied|forbidden|request blocked/i.test(body),
  };
}

async function axiosProbe(url: string, accept: string) {
  publicUrl(url);
  const response = await axios.get<string>(url, {
    responseType: "text", timeout: 20000, maxContentLength: 8 * 1024 * 1024,
    maxRedirects: 3, validateStatus: () => true,
    headers: { "User-Agent": agent, Accept: accept },
    beforeRedirect(options) {
      publicUrl(`${options.protocol}//${options.hostname}${options.port ? `:${options.port}` : ""}${options.path}`);
    },
  });
  return summarize(response.status, response.headers, response.data);
}

async function fetchProbe(url: string) {
  publicUrl(url);
  const response = await fetch(url, {
    headers: { "User-Agent": agent, Accept: originalAccept },
    signal: AbortSignal.timeout(20000), redirect: "manual",
  });
  return summarize(response.status, Object.fromEntries(response.headers), await response.text());
}

async function curlProbe(url: string) {
  publicUrl(url);
  const dir = mkdtempSync(join(tmpdir(), "edge-source-probe-"));
  try {
    const headersPath = join(dir, "headers");
    const bodyPath = join(dir, "body");
    const proc = Bun.spawn(["curl", "-q", "-sS", "--max-time", "20", "--user-agent", agent,
      "--header", `Accept: ${originalAccept}`, "--dump-header", headersPath,
      "--output", bodyPath, "--write-out", "%{http_code}", url], { stdout: "pipe", stderr: "pipe" });
    const [exit, status] = await Promise.all([proc.exited, new Response(proc.stdout).text()]);
    if (exit !== 0) throw new Error("Curl request failed");
    const headers: Record<string, string> = {};
    for (const line of readFileSync(headersPath, "utf8").split(/\r?\n/)) {
      const colon = line.indexOf(":");
      if (colon > 0) headers[line.slice(0, colon).toLowerCase()] = line.slice(colon + 1).trim();
    }
    return summarize(Number(status), headers, readFileSync(bodyPath, "utf8"));
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

const probes = [
  { client: "axios-original", url: `${EVENT.newsletter}/feed`, run: () => axiosProbe(`${EVENT.newsletter}/feed`, originalAccept) },
  { client: "axios-original", url: sitemap, run: () => axiosProbe(sitemap, originalAccept) },
  { client: "axios-xml-accept", url: sitemap, run: () => axiosProbe(sitemap, xmlAccept) },
  { client: "bun-fetch-original", url: sitemap, run: () => fetchProbe(sitemap) },
  { client: "curl-original", url: sitemap, run: () => curlProbe(sitemap) },
];
console.log(JSON.stringify({ environment: { platform: process.platform, bun: Bun.version } }));
for (const probe of probes) {
  try {
    console.log(JSON.stringify({ client: probe.client, url: probe.url, ...await probe.run() }));
  } catch {
    console.log(JSON.stringify({ client: probe.client, url: probe.url, networkError: true }));
  }
}

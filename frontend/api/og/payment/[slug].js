// Crawler-only route (see ../../../vercel.json rewrites — real browsers never
// hit this). Renders a static HTML doc with Open Graph tags for
// /payment/:slug so link-preview bots (WhatsApp, Facebook, Slack, ...) show
// the payment method's own logo (e.g. the GCash logo) as the preview image,
// since they never execute the SPA's JS.
//
// Primary data source is the small public JSON manifest the backend writes
// to R2 on every payment method create/update/toggle (see
// backend/services/ogManifestService.js) — that's always warm, unlike the
// Render backend which can cold-start and time out a crawler's request. The
// live API is only a fallback, wrapped in a short timeout so a sleeping
// backend degrades fast.

const R2_PUBLIC_URL = (
  process.env.R2_PUBLIC_URL || "https://pub-0c680e5e840243d2bedb01ddf7133d0e.r2.dev"
).replace(/\/$/, "");
const API_BASE_URL = (
  process.env.OG_API_BASE_URL ||
  process.env.VITE_API_URL ||
  "https://cebu-whitesand-resort-api.onrender.com"
).replace(/\/$/, "");
const SITE_URL = (
  process.env.OG_SITE_URL ||
  (process.env.VITE_DOMAIN
    ? `https://${process.env.VITE_DOMAIN}`
    : "https://cebu-whitesand-resort.com")
).replace(/\/$/, "");
const SITE_NAME = "Cebu Whitesand Resort";
const OG_MANIFEST_PREFIX = "cebu-whitesand-resort/og/payment-methods";
const FETCH_TIMEOUT_MS = 4000;

const ESCAPE_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);
}

async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function loadFromManifest(slug) {
  try {
    const res = await fetchWithTimeout(
      `${R2_PUBLIC_URL}/${OG_MANIFEST_PREFIX}/${encodeURIComponent(slug)}.json`,
      FETCH_TIMEOUT_MS,
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.name) return null;
    return {
      name: data.name,
      image: data.image || null,
      active: data.active !== false,
    };
  } catch {
    return null;
  }
}

async function loadFromLiveApi(slug) {
  try {
    const res = await fetchWithTimeout(
      `${API_BASE_URL}/api/payment-methods/${encodeURIComponent(slug)}`,
      FETCH_TIMEOUT_MS,
    );
    if (!res.ok) return null;
    const body = await res.json();
    const method = body?.data;
    if (!method?.name) return null;
    return {
      name: method.name,
      image: method.logoUrl || null,
      active: method.isActive !== false,
    };
  } catch {
    return null;
  }
}

function renderHtml({ title, description, image, url }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeUrl = escapeHtml(url);
  const imageTags = image
    ? `<meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${safeUrl}" />
    ${imageTags}
    <meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
  </head>
  <body>
    <h1>${safeTitle}</h1>
    <p>${safeDescription}</p>
  </body>
</html>
`;
}

export default async function handler(req, res) {
  const slug = String(req.query.slug || "");
  const pageUrl = `${SITE_URL}/payment/${encodeURIComponent(slug)}`;

  let method = await loadFromManifest(slug);
  if (!method) method = await loadFromLiveApi(slug);

  const payload =
    method && method.active
      ? {
          title: `Pay via ${method.name} | ${SITE_NAME}`,
          description: `Payment details and instructions for ${method.name} — ${SITE_NAME}.`,
          image: method.image,
          url: pageUrl,
        }
      : {
          title: SITE_NAME,
          description: "Secure payment details for your stay at Cebu Whitesand Resort.",
          image: null,
          url: pageUrl,
        };

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  res.status(200).send(renderHtml(payload));
}

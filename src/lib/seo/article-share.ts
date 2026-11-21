import { SITE_URL } from "./site";

function normShareValue(value: unknown) {
  if (value === null || value === undefined) return "";
  const text = String(value).trim();
  if (!text || text.toLowerCase() === "null") return "";
  return text;
}

/** Keep hyphenated numbers from flipping in RTL (WhatsApp / Arabic text). */
function isolateLtr(text: string) {
  return `\u2066${text}\u2069`;
}

/**
 * Principle numbers are stored as "10-13" but should read as "13-10".
 * Use this anywhere the number is shown in an LTR context (tooltip, share, OG).
 */
export function formatPrincipleNumberForDisplay(value: unknown): string {
  const raw = normShareValue(value);
  const match = raw.match(/^(\d+)-(\d+)$/);
  if (match) return `${match[2]}-${match[1]}`;
  return raw;
}

/** Share/OG description: رقم المبدأ: 23-25 مدني 2026 */
export function buildArticleShareDescription(article: Article): string {
  const principleNumber = formatPrincipleNumberForDisplay(
    article.principle_number,
  );
  const principleType =
    normShareValue(article.principle_type) ||
    normShareValue(article.paper_classification);
  const principleYear = normShareValue(article.principle_year);
  const body = [
    principleNumber ? isolateLtr(principleNumber) : "",
    principleType,
    principleYear,
  ]
    .filter(Boolean)
    .join(" ");
  return body ? `رقم المبدأ: ${body}` : "";
}

export function buildArticleShareUrl(articleId: string, _origin?: string) {
  const id = String(articleId ?? "").replace(/^\/+|\/+$/g, "");
  // Always use canonical SITE_URL (www) so WhatsApp OG crawl matches og:url
  return `${SITE_URL}/article/${id}`;
}

/**
 * Escapes special regex characters in a string for safe use in RegExp.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Highlights terms in plain text by wrapping matches in <mark> tags.
 * Returns a string with HTML markup.
 */
export function highlightText(text: string | number | null | undefined, terms: string[]): string {
  const str = String(text ?? "");
  if (!str || !terms.length) return str;

  let result = str;
  for (const term of terms) {
    if (!term || term.trim() === "") continue;
    const escaped = escapeRegex(term);
    const regex = new RegExp(`(${escaped})`, "gi");
    result = result.replace(regex, '<mark class="search-highlight">$1</mark>');
  }
  return result;
}

/**
 * Highlights terms in HTML content, only within text nodes (not inside tags/attributes).
 * Splits by HTML tags, applies highlighting to text segments, then reconstructs.
 */
export function highlightHtml(html: string | null | undefined, terms: string[]): string {
  const str = String(html ?? "");
  if (!str || !terms.length) return str;

  const tagRegex = /<[^>]+>/g;
  const textParts = str.split(tagRegex);
  const tags = str.match(tagRegex) ?? [];

  const highlightedParts = textParts.map((text: string) => highlightText(text, terms));

  let output = "";
  for (let i = 0; i < highlightedParts.length; i++) {
    output += highlightedParts[i];
    if (i < tags.length) output += tags[i];
  }
  return output;
}

export function lawMatchesSearch(
  law: Law,
  search: string,
  bodyHtml?: string | null,
): boolean {
  const q = search.trim().toLowerCase();
  if (!q) return true;

  const plainBody =
    law.body_text?.trim() ||
    (bodyHtml ? bodyHtml.replace(/<[^>]+>/g, " ") : "");

  const haystack = [law.title, law.law_number, law.year, plainBody]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}
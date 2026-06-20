const ARABIC_INDIC_DIGITS = /[\u0660-\u0669]/g;
const EXTENDED_ARABIC_INDIC_DIGITS = /[\u06f0-\u06f9]/g;

/** Principle search fields that should use Western digits in URLs and API calls. */
export const PRINCIPLE_NUMERIC_PARAM_KEYS = [
  "appeal_number",
  "appeal_year",
  "principle_number",
  "principle_year",
  "page",
  "per_page",
  "limit",
] as const;

function decodeParamValue(value: string): string {
  let decoded = value;
  for (let i = 0; i < 2; i += 1) {
    if (!/%[0-9A-Fa-f]{2}/.test(decoded)) break;
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }
  return decoded;
}

function arabicIndicToWestern(value: string): string {
  return value
    .replace(ARABIC_INDIC_DIGITS, (digit) =>
      String(digit.charCodeAt(0) - 0x0660),
    )
    .replace(EXTENDED_ARABIC_INDIC_DIGITS, (digit) =>
      String(digit.charCodeAt(0) - 0x06f0),
    );
}

/** Decode URL values and convert Arabic/Persian digits to Western (0-9). */
export function normalizeNumericParam(
  value: string | null | undefined,
): string | undefined {
  if (value == null) return undefined;

  let normalized = String(value).trim();
  if (!normalized) return undefined;

  normalized = decodeParamValue(normalized);
  normalized = arabicIndicToWestern(normalized).trim();

  return normalized || undefined;
}

export function normalizeNumericSearchParams<
  T extends Record<string, string | undefined>,
>(params: T, keys: readonly string[] = PRINCIPLE_NUMERIC_PARAM_KEYS): T {
  const next = { ...params };

  for (const key of keys) {
    const value = next[key as keyof T];
    if (typeof value !== "string") continue;
    const normalized = normalizeNumericParam(value);
    next[key as keyof T] = (normalized ?? undefined) as T[keyof T];
  }

  return next;
}

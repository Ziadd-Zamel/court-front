export const SITE_SEARCH_SCOPES = [
  {
    value: "cassation",
    label: "قضاء النقض",
    placeholder: "ابحث في قضاء النقض...",
  },
  {
    value: "constitutional",
    label: "القضاء الدستوري",
    placeholder: "ابحث في القضاء الدستوري...",
  },
  {
    value: "research",
    label: "البحوث والمذكرات",
    placeholder: "ابحث في البحوث والمذكرات...",
  },
  {
    value: "publications",
    label: "إصدارات المحكمة",
    placeholder: "ابحث في إصدارات المحكمة...",
  },
  {
    value: "books",
    label: "الكتب",
    placeholder: "ابحث في الكتب...",
  },
  {
    value: "laws",
    label: "القوانين",
    placeholder: "ابحث في القوانين...",
  },
  {
    value: "counselors",
    label: "المستشارون",
    placeholder: "ابحث في المستشارين...",
  },
] as const;

export type SiteSearchScope = (typeof SITE_SEARCH_SCOPES)[number]["value"];

export const VALID_SITE_SEARCH_SCOPES: SiteSearchScope[] = SITE_SEARCH_SCOPES.map(
  (option) => option.value,
);

export function isSiteSearchScope(
  value: string | null | undefined,
): value is SiteSearchScope {
  return VALID_SITE_SEARCH_SCOPES.includes(value as SiteSearchScope);
}

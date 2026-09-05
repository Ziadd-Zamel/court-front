export const SITE_SEARCH_TYPES = [
  {
    value: "articles",
    label: "المقالات",
    placeholder: "ابحث في المقالات...",
  },
  {
    value: "books",
    label: "الكتب",
    placeholder: "ابحث في الكتب...",
  },
  {
    value: "information",
    label: "المعلومات المهمة",
    placeholder: "ابحث في المعلومات المهمة...",
  },
  {
    value: "publications",
    label: "الإصدارات",
    placeholder: "ابحث في الإصدارات...",
  },
] as const;

export type SiteSearchType = (typeof SITE_SEARCH_TYPES)[number]["value"];

export const VALID_SITE_SEARCH_TYPES: SiteSearchType[] = SITE_SEARCH_TYPES.map(
  (option) => option.value,
);

export function isSiteSearchType(
  value: string | null | undefined,
): value is SiteSearchType {
  return VALID_SITE_SEARCH_TYPES.includes(value as SiteSearchType);
}

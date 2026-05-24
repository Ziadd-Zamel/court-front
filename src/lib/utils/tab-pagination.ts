export type SearchParamsRecord = Record<
  string,
  string | string[] | undefined
>;

export function tabPageParamKey(tabKey: string) {
  return `page_${tabKey}`;
}

export function tabLimitParamKey(tabKey: string) {
  return `limit_${tabKey}`;
}

function readParam(
  searchParams: SearchParamsRecord,
  key: string,
): string | undefined {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

/** Per-tab page/limit from URL. Falls back to page 1 when the tab has no param yet. */
export function parseTabPagination(
  searchParams: SearchParamsRecord,
  tabKey: string,
  defaultLimit = 15,
) {
  const pageStr = readParam(searchParams, tabPageParamKey(tabKey));
  const limitStr = readParam(searchParams, tabLimitParamKey(tabKey));

  return {
    currentPage: Math.max(1, Number(pageStr) || 1),
    limit: Math.max(1, Math.min(50, Number(limitStr) || defaultLimit)),
  };
}

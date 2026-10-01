import type { SiteSearchScope } from "@/lib/constants/site-search";

type SearchParams = {
  search: string;
  scope: SiteSearchScope;
  page?: number;
  perPage?: number;
};

export const getSiteSearchOptions = async (): Promise<SiteSearchOption[]> => {
  const response = await fetch(`${process.env.API}search/options`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: SiteSearchApiResponse = await response.json();

  if (!payload.success || !Array.isArray(payload.data)) {
    throw new Error(payload.message || "فشل جلب خيارات البحث");
  }

  return payload.data;
};

export const postSiteSearch = async ({
  search,
  scope,
  page = 1,
  perPage = 15,
}: SearchParams): Promise<APIResponse<SiteSearchResultData>> => {
  const response = await fetch(`${process.env.API}search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      search: search.trim(),
      scope,
      page,
      per_page: perPage,
    }),
    next: { revalidate: 0 },
  });
  const payload: SiteSearchApiResponse = await response.json();

  if (!response.ok || !payload.success || Array.isArray(payload.data)) {
    return {
      success: false,
      message: payload.message || `HTTP error! status: ${response.status}`,
    };
  }

  const section = payload.data.sections?.[0];
  const pagination = section?.pagination;

  return {
    data: payload.data,
    meta: {
      current_page: pagination?.current_page ?? page,
      last_page: pagination?.last_page ?? 1,
      per_page: pagination?.per_page ?? perPage,
      total: pagination?.total ?? payload.data.total ?? 0,
      from: pagination?.from ?? 0,
      to: pagination?.to ?? 0,
    },
  };
};

declare type SiteSearchOptionType =
  | "ruling"
  | "publication"
  | "book"
  | "law"
  | "counselor";

declare type SiteSearchOption = {
  key: string;
  label: string;
  description: string;
  type: SiteSearchOptionType | string;
};

declare type SiteSearchSectionPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number;
  to?: number;
};

declare type SiteSearchSection<T = unknown> = {
  key: string;
  label: string;
  description: string;
  type: SiteSearchOptionType | string;
  total: number;
  items: T[];
  pagination: SiteSearchSectionPagination;
};

declare type SiteSearchResultData = {
  query: string;
  scope: string;
  total: number;
  sections: SiteSearchSection[];
};

declare type SiteSearchApiResponse = {
  success: boolean;
  message: string;
  data: SiteSearchResultData | SiteSearchOption[] | [];
};

declare type SiteSearchPublicationItem = {
  uuid: string;
  number: string | null;
  judicial_year: string | null;
  calendar_year: string | null;
  appeal_year: string | null;
  issue_number: string | null;
  page_number: string | null;
  publication_type: string | null;
  publication_type_uuid: string | null;
  publication_type_id: string | null;
  cover_image: string | null;
  pdf_file: string | null;
  is_available: boolean;
};

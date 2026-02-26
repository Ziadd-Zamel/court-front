declare type LawTypeSlug = "court-law" | "regulations" | "appeal-texts";

declare type LawType = {
  id: number;
  name: string;
  slug: LawTypeSlug;
};

declare type Law = {
  uuid: string;
  law_type: LawType;
  title: string | null;
  law_number: string | null;
  year: string | null;
  body_html?: string | null;
  body_text?: string | null;
  pdf_url?: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
};

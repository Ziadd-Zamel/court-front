declare type NewsArticle = {
  uuid: string;
  title: string;
  category: string;
  "content-html": string;
  "content-text": string;
  image: string;
  video: string | null;
  created_at: string;
};

declare type NewsResponse = {
  data: NewsArticle[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};

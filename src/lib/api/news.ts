import { buildQueryParams } from "../utils/build-query-params";

export const getNewsArticles = async (
  page: number = 1,
  perPage: number = 15,
  search?: string,
) => {
  const query = buildQueryParams({
    page,
    per_page: perPage,
    search,
  });

  const url = `${process.env.API}articles?${query}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const payload: APIResponse<NewsArticle[]> = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch articles (${response.status})`);
  }

  return payload;
};

// Categories
export const getNewsCategories = async () => {
  const url = `${process.env.API}articles/categories`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch article categories (${response.status})`);
  }

  const payload: APIResponse<ArticleCategory[]> = await response.json();

  return payload;
};

// Articles by Category
export const getArticlesNewsByCategory = async (
  category_uuid: string,
  search?: string,
  page: number = 1,
  per_page: number = 15,
) => {
  const query = buildQueryParams({
    category_uuid,
    search,
    page,
    per_page,
  });

  const url = `${process.env.API}articles/by-category?${query}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const payload: APIResponse<NewsArticle[]> = await response.json();

  if (!response.ok) {
    throw new Error(
      `Failed to fetch articles by category (${response.status})`,
    );
  }

  return payload;
};
// Articles by Category
export const getArticlesNewsById = async (id: string) => {
  const url = `${process.env.API}articles/${id}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const payload: APIResponse<NewsArticle> = await response.json();

  if (!response.ok) {
    throw new Error(
      `Failed to fetch articles by category (${response.status})`,
    );
  }

  return payload;
};

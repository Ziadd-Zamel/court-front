import { getArticlesByCategory } from "@/lib/api/articles";
import { getAvailableBooks } from "@/lib/api/books";
import { getAllCounselors } from "@/lib/api/counselors.api";
import { getNewsArticles } from "@/lib/api/news";
import {
  getConstitutionSub,
  getLegalPrinciplesSub,
  getRulingCategory,
  getTechnicalOfficeSub,
} from "@/lib/api/subcategories";
import type { MetadataRoute } from "next";

type PaginatedItem = {
  uuid: string;
  updated_at?: string;
  publish_date?: string;
  created_at?: string;
};

async function fetchAllPages<T extends PaginatedItem>(
  fetchPage: (page: number) => Promise<APIResponse<T[]>>,
): Promise<T[]> {
  const items: T[] = [];
  let page = 1;
  let lastPage = 1;

  while (page <= lastPage) {
    const response = await fetchPage(page);

    if (!("data" in response)) {
      break;
    }

    items.push(...response.data);
    lastPage = response.meta?.last_page ?? page;
    page += 1;

    if (page > 200) {
      break;
    }
  }

  return items;
}

function toSitemapEntry(
  path: string,
  item?: PaginatedItem,
  priority = 0.6,
): MetadataRoute.Sitemap[number] {
  const lastModified =
    item?.updated_at ?? item?.publish_date ?? item?.created_at ?? new Date();

  return {
    url: path,
    lastModified: new Date(lastModified),
    changeFrequency: "weekly",
    priority,
  };
}

async function getRulingSubcategoryIds(): Promise<string[]> {
  const [ruling, constitutional, legal, technical] = await Promise.all([
    getRulingCategory().catch(() => ({ data: [] as category[] })),
    getConstitutionSub().catch(() => ({ data: [] as category[] })),
    getLegalPrinciplesSub().catch(() => ({ data: [] as category[] })),
    getTechnicalOfficeSub().catch(() => ({ data: [] as category[] })),
  ]);

  const ids = new Set<string>();

  for (const group of [ruling, constitutional, legal, technical]) {
    for (const item of group.data ?? []) {
      if (item.uuid) {
        ids.add(item.uuid);
      }
    }
  }

  return [...ids];
}

export async function getDynamicSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  if (!process.env.API) {
    return [];
  }

  try {
    const [news, counselors, books, subcategoryIds] = await Promise.all([
      fetchAllPages((page) => getNewsArticles(page, 100)).catch(() => []),
      fetchAllPages((page) => getAllCounselors(page, 100)).catch(() => []),
      fetchAllPages((page) => getAvailableBooks(page, 100)).catch(() => []),
      getRulingSubcategoryIds().catch(() => []),
    ]);

    const articleGroups = await Promise.all(
      subcategoryIds.map((uuid) =>
        fetchAllPages((page) => getArticlesByCategory(page, 100, uuid)).catch(
          () => [],
        ),
      ),
    );

    const articles = articleGroups.flat();
    const uniqueArticles = new Map(articles.map((item) => [item.uuid, item]));

    const entries: MetadataRoute.Sitemap = [
      ...news.map((item) =>
        toSitemapEntry(`/about-court/news/${item.uuid}`, item, 0.7),
      ),
      ...counselors.map((item) =>
        toSitemapEntry(`/about-court/counselors/${item.uuid}`, item, 0.6),
      ),
      ...books.map((item) => toSitemapEntry(`/books/${item.uuid}`, item, 0.6)),
      ...[...uniqueArticles.values()].map((item) =>
        toSitemapEntry(`/article/${item.uuid}`, item, 0.7),
      ),
    ];

    return entries;
  } catch {
    return [];
  }
}

import { getDynamicSitemapEntries } from "@/lib/seo/sitemap-data";
import { STATIC_SITEMAP_ROUTES } from "@/lib/seo/static-routes";
import { SITE_URL } from "@/lib/seo/site";
import type { MetadataRoute } from "next";

export const revalidate = 86_400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_ROUTES.map(
    (route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }),
  );

  const dynamicEntries = await getDynamicSitemapEntries();

  return [
    ...staticEntries,
    ...dynamicEntries.map((entry) => ({
      ...entry,
      url: entry.url.startsWith("http")
        ? entry.url
        : `${SITE_URL}${entry.url}`,
    })),
  ];
}

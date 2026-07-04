export type StaticSitemapRoute = {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export const STATIC_SITEMAP_ROUTES: StaticSitemapRoute[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },

  { path: "/litigants-portal", changeFrequency: "weekly", priority: 0.9 },
  { path: "/litigants-portal/appeal-inquiry", changeFrequency: "weekly", priority: 0.8 },
  { path: "/litigants-portal/important-notices", changeFrequency: "weekly", priority: 0.8 },
  { path: "/litigants-portal/litigation-services", changeFrequency: "weekly", priority: 0.8 },
  { path: "/litigants-portal/court-releases", changeFrequency: "weekly", priority: 0.8 },

  { path: "/principle", changeFrequency: "weekly", priority: 0.9 },
  { path: "/constitutional-court", changeFrequency: "weekly", priority: 0.9 },
  { path: "/legal-principles", changeFrequency: "weekly", priority: 0.9 },

  { path: "/supreme-court-library", changeFrequency: "weekly", priority: 0.8 },
  { path: "/technical-office", changeFrequency: "weekly", priority: 0.8 },

  { path: "/about-court", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about-court/counselors", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about-court/general-assembly", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about-court/structure-court", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about-court/courts-law", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about-court/performance-metrics", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about-court/news", changeFrequency: "daily", priority: 0.8 },
];

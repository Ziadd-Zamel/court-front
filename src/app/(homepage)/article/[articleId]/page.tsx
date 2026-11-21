import type { Metadata } from "next";
import LegalCasePage from "./_components/LegalCasePage";
import ErrorState from "@/components/custom/error-state";
import { getArticleByID } from "@/lib/api/articles";
import { buildArticleShareDescription } from "@/lib/seo/article-share";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/site";

type PageProps = {
  searchParams: Promise<{ search?: string; from?: string }>;
  params: Promise<{ articleId?: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { articleId } = await params;
  if (!articleId) return {};

  try {
    const payload = await getArticleByID(articleId);
    const article = payload.data;
    const title = article.title?.trim() || SITE_NAME;
    const description =
      buildArticleShareDescription(article) || SITE_DESCRIPTION;
    const url = `${SITE_URL}/article/${articleId}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        locale: "ar_LY",
        url,
        siteName: SITE_NAME,
        title,
        description,
        images: [OG_IMAGE],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [OG_IMAGE.url],
      },
    };
  } catch {
    return {};
  }
}

export default async function Page({ searchParams, params }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const articleId = resolvedParams.articleId;

  if (!articleId) return <ErrorState />;
  return (
    <>
      <LegalCasePage
        search={resolvedSearchParams.search || ""}
        id={articleId}
        from={resolvedSearchParams.from}
      />
    </>
  );
}

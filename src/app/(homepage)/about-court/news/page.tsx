import NewsPage from "./_components/news-page";
import MainHeading from "@/components/common/main-heading";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/aboute.jpg";
const FALLBACK_DESCRIPTION = "أحدث الأخبار والتحديثات من المحكمة العليا";

export default async function NewsPageRoute({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const mainPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const mainLimit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 15),
  );

  const { data } = await getSiteSettings();
  const backgroundImage = data.news_background ?? FALLBACK_BACKGROUND;
  const descriptionHtml = data.news_text ?? undefined;

  return (
    <>
      <MainHeading
        title="الأخبار"
        descriptionHtml={descriptionHtml}
        description={!descriptionHtml ? FALLBACK_DESCRIPTION : undefined}
        bgImage={backgroundImage}
        overlay
      />

      <NewsPage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        searchQuery={resolvedSearchParams.search}
      />
    </>
  );
}

import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import { getConstitutionalRulingsFavourites } from "@/lib/api/articles";
import catchError from "@/lib/utils/catch-error";
import SiteHighlightsGrid from "./site-highlights-grid";

export default async function SiteHighlights() {
  const [data, error] = await catchError(getConstitutionalRulingsFavourites);

  if (error || !data || !("data" in data) || !data.data?.length) {
    return null;
  }

  const articles = data.data;

  return (
    <section className="pt-16 bg-white dark:bg-[#1a1a1a]">
      <div className="m-auto">
        <div className="bg-white dark:bg-[#1a1a1a]">
          <AnimatedSectionHeader title="مختارات من فروع الموقع" />
        </div>
      </div>

      <SiteHighlightsGrid articles={articles} />
    </section>
  );
}

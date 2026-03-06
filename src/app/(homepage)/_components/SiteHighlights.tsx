import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import HighlightCard from "@/components/common/highlight-card";
import { getConstitutionalRulingsFavourites } from "@/lib/api/articles";
import catchError from "@/lib/utils/catch-error";

export default async function SiteHighlights() {
  const [data, error] = await catchError(getConstitutionalRulingsFavourites);

  if (error || !data || !("data" in data) || !data.data?.length) {
    return null;
  }

  const articles = data.data;
  const chunkSize = Math.max(1, Math.ceil(articles.length / 4));
  const chunks = [
    articles.slice(0, chunkSize),
    articles.slice(chunkSize, chunkSize * 2),
    articles.slice(chunkSize * 2, chunkSize * 3),
    articles.slice(chunkSize * 3),
  ].filter((c) => c.length > 0);

  const backgrounds = [
    { bg: "bg-white", gradient: "to-white" },
    { bg: "bg-main/10", gradient: "to-[#FBF7F0]" },
    { bg: "bg-white", gradient: "to-white" },
    { bg: "bg-main/15", gradient: "to-[#FBF7F0]" },
  ] as const;

  return (
    <section className="pt-16 bg-white">
      <div className="m-auto">
        <div className="bg-white">
          <AnimatedSectionHeader title="مختارات من فروع الموقع" />
        </div>
      </div>

      {chunks.map((chunk, sectionIndex) => (
        <div
          key={sectionIndex}
          className={backgrounds[sectionIndex]?.bg ?? "bg-white"}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 box-container"
            style={{ gridAutoRows: "auto" }}
          >
            {chunk.map((_item, index) => (
              <HighlightCard
                article={_item}
                key={`${sectionIndex}-${index}`}
                gradientFrom={
                  backgrounds[sectionIndex]?.gradient ?? "from-white"
                }
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

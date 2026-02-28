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
    "bg-white",
    "bg-main/10",
    "bg-white",
    "bg-main/10",
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
          className={backgrounds[sectionIndex] ?? "bg-white"}
        >
          <div className="flex flex-col items-center justify-between md:flex-row md:items-start md:gap-20 box-container">
            {chunk.map((_item, index) => (
              <HighlightCard article={_item} key={`${sectionIndex}-${index}`} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

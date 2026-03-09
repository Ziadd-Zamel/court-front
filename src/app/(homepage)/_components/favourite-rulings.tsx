import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import { getConstitutionalRulingsFavourites } from "@/lib/api/articles";
import catchError from "@/lib/utils/catch-error";
import { FavouriteRulingsGrid } from "./favourite-rulings-grid";

export default async function FavouriteRulings() {
  const [data, error] = await catchError(getConstitutionalRulingsFavourites);

  if (error || !data || !("data" in data) || !data.data?.length) {
    return null;
  }

  const articles = data.data;

  return (
    <section
      className="w-full py-16 relative"
      style={{
        backgroundImage: "url('/assets/home-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/80" />

      <div className="box-container relative z-10">
        <div className="mb-5">
          <AnimatedSectionHeader
            title="أحدث الأحكام والموضوعات"
            subtitle="المرفوعة إلى مختلف فروع الموقع"
            textClassName="text-white"
          />
        </div>
        <div className="flex w-full justify-center">
          <FavouriteRulingsGrid articles={articles} />
        </div>
      </div>
    </section>
  );
}

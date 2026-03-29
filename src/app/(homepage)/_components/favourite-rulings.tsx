import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import { getRecentRulings } from "@/lib/api/articles";
import catchError from "@/lib/utils/catch-error";
import { FavouriteRulingsGrid } from "./favourite-rulings-grid";

const FALLBACK_BACKGROUND = "/assets/home-1.jpg";

interface FavouriteRulingsProps {
  backgroundImage?: string | null;
}

export default async function FavouriteRulings({
  backgroundImage,
}: FavouriteRulingsProps) {
  const [data, error] = await catchError(getRecentRulings);

  if (error || !data || !("data" in data) || !data.data?.length) {
    return null;
  }

  const articles = data.data;
  const bgUrl = backgroundImage ?? FALLBACK_BACKGROUND;
  return (
    <section
      className="w-full py-16 relative"
      style={{
        backgroundImage: `url(${bgUrl})`,
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

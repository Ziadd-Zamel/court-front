import HeroSlider from "./_components/HeroSlider";
import FavouriteRulings from "./_components/favourite-rulings";
import RecentNewsSection from "./_components/recent-news-section";
import SiteHighlights from "./_components/SiteHighlights";
import AppealsPerformanceSection from "./_components/appeals-performance-section";
import { getSiteSettings } from "@/lib/api/site-settings.api";

export default async function Page() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <div className="bg-black">
        <HeroSlider siteSettings={siteSettings.data} />
      </div>
      <SiteHighlights />
      <FavouriteRulings
        backgroundImage={siteSettings.data.home_latest_topics_background}
      />
      <RecentNewsSection />
      <AppealsPerformanceSection />
    </>
  );
}

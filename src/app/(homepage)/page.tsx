import HeroSlider from "./_components/HeroSlider";
import FavouriteRulings from "./_components/favourite-rulings";
import RecentNewsSection from "./_components/recent-news-section";
import SiteHighlights from "./_components/SiteHighlights";
import CombinedComponent from "./_components/CombinedComponent";

export default async function Page() {
  return (
    <>
      <div className="bg-black">
        <HeroSlider />
      </div>
      <SiteHighlights />
      <FavouriteRulings />
      <RecentNewsSection />
      <CombinedComponent />
    </>
  );
}

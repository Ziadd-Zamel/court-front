import HeroSlider from "./_components/HeroSlider";
import PracticeAreasv3 from "./_components/practice-areas";
import RecentNews from "./_components/RecentNews";
import SiteHighlights from "./_components/SiteHighlights";
import CombinedComponent from "./_components/CombinedComponent";

export default async function Page() {
  return (
    <>
      <div className="bg-black">
        <HeroSlider />
      </div>
      <SiteHighlights />
      <PracticeAreasv3 />
      <RecentNews />
      <CombinedComponent />
    </>
  );
}

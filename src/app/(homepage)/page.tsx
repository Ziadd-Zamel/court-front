"use client";

import { areasv3 } from "@/lib/constants";
import HeroSlider from "./_components/HeroSlider";
import PracticeAreasv3 from "./_components/practice-areas";
import RecentNews from "./_components/RecentNews";
import SiteHighlights from "./_components/SiteHighlights";

const Home = () => {
  return (
    <>
      <div className="bg-black">
        <HeroSlider />
      </div>
      <SiteHighlights />
      <PracticeAreasv3 areas={areasv3} />
      <RecentNews />
    </>
  );
};

export default Home;

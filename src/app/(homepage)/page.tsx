"use client";

import { areasv3 } from "@/lib/constants";
import HeroSlider from "./_components/HeroSlider";
import PracticeAreasv3 from "./_components/practice-areas";
import RecentNews from "./_components/RecentNews";
import SiteHighlights from "./_components/SiteHighlights";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white">
      <div className="relative z-40 bg-black">
        <HeroSlider />
      </div>
      <div className="flex-gro bg-whitew relative z-40">
        <SiteHighlights />
        <div
          className="main-padding relative min-h-[600px]"
          style={{
            backgroundImage: `url('/assets/1.675d21b24af6dbaafa5a.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-[#151a30a6]"></div>

          <PracticeAreasv3 areas={areasv3} />
        </div>

        <div className="box-container bg-[#f5f5f5] pb-6 pt-12">
          <RecentNews />
        </div>
      </div>
    </div>
  );
};

export default Home;

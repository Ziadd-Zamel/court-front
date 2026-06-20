import { getSiteSettings } from "@/lib/api/site-settings.api";
import ServicesGrid from "./_components/about-pages";
import AboutSection from "./_components/about-section";
import MainHeading from "./_components/main-heading";

export default async function AboutCourtPage() {
  const { data } = await getSiteSettings();
  const backgroundImage = data?.about_background ?? "/assets/about.png";
  const backgroundImageSupreme =
    data?.about_supreme_court_background ?? "/assets/about.png";

  return (
    <>
      <MainHeading bgImage={backgroundImage} />
      <div className="bg-main/30 dark:bg-[#121212] w-full">
        <AboutSection bg={backgroundImageSupreme ?? "/assets/aboute.jpg"} />
      </div>
      <ServicesGrid />
    </>
  );
}

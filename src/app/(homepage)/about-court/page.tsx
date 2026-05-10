import { getSiteSettings } from "@/lib/api/site-settings.api";
import ServicesGrid from "./_components/about-pages";
import AboutSection from "./_components/about-section";
import MainHeading from "./_components/main-heading";

export default async function AboutCourtPage() {
  const { data } = await getSiteSettings();
  console.log(data);
  return (
    <>
      <MainHeading bgImage="/assets/about.png" />
      <div className="bg-main/30 dark:bg-[#121212] w-full">
        <AboutSection />
      </div>
      <ServicesGrid />
    </>
  );
}

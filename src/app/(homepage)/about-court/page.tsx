import ServicesGrid from "./_components/about-pages";
import AboutSection from "./_components/about-section";
import MainHeading from "./_components/main-heading";

export default function AboutCourtPage() {
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

import ServicesGrid from "./_components/about-pages";
import AboutSection from "./_components/about-section";
import MainHeading from "./_components/main-heading";

export default function AboutCourtPage() {
  return (
    <>
      <MainHeading bgImage="/assets/bg-1.jpg" overlay />
      <div className="  bg-main/30  w-full">
        <AboutSection />
      </div>
      <ServicesGrid />
    </>
  );
}

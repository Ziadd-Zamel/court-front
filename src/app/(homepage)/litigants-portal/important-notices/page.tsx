import SecondaryHeading from "@/components/common/seondary-heading";
import ImportantNoticesPage from "./_components/important-notices-page";
import { getQuestionCategories } from "@/lib/api/question.api";
import ContactSection from "@/components/custom/contact-section";

export default async function Page() {
  const Tabs = await getQuestionCategories();

  return (
    <>
      <SecondaryHeading title="معلومات مهمة" breadcrumb />
      <ImportantNoticesPage TabsData={Tabs.data} />
      <ContactSection />
    </>
  );
}

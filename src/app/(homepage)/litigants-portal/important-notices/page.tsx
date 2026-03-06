import SecondaryHeading from "@/components/common/seondary-heading";
import ImportantNoticesPage from "./_components/important-notices-page";
import ContactSection from "@/components/custom/contact-section";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const currentPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const limit = Math.max(1, Math.min(50, Number(resolvedSearchParams.limit) || 15));

  return (
    <>
      <SecondaryHeading title="معلومات مهمة" breadcrumb />
      <ImportantNoticesPage
        pagination={{ currentPage, limit }}
        search={resolvedSearchParams.search}
      />
      <ContactSection />
    </>
  );
}

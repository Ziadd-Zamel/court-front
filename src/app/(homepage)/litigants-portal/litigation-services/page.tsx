import SecondaryHeading from "@/components/common/seondary-heading";
import LitigationServicesPage from "./_components/litigation-services-page";
import { getAllCircles, getAllFields } from "@/lib/api/accepted-awyers.api";

export default async function Page() {
  const fields = await getAllFields();
  const Circles = await getAllCircles();
  return (
    <>
      <SecondaryHeading title=" المحامون المقبولون" breadcrumb />
      <LitigationServicesPage circles={Circles.data} fields={fields.data} />
    </>
  );
}

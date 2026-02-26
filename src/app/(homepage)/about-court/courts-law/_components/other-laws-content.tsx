import { getOtherLaws } from "@/lib/api/law.api";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import OtherLawCard from "./other-law-card";

export default async function OtherLawsContent() {
  const [data, error] = await catchError(() => getOtherLaws());

  if (error) return <ErrorState />;

  if (!data || !("data" in data) || !data.data?.length) {
    return <NoDataState />;
  }

  return (
    <div className="flex flex-col">
      {data.data.map((law) => (
        <OtherLawCard key={law.uuid} law={law} />
      ))}
    </div>
  );
}

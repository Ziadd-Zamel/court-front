import { getOtherLawsByCategory } from "@/lib/api/law.api";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import OtherLawCard from "./other-law-card";

interface OtherLawsByCategoryProps {
  categoryUuid: string;
}

export default async function OtherLawsByCategory({
  categoryUuid,
}: OtherLawsByCategoryProps) {
  const [data, error] = await catchError(() =>
    getOtherLawsByCategory(categoryUuid),
  );

  if (error) return <ErrorState />;

  if (!data || !("data" in data) || !data.data?.length) {
    return <NoDataState />;
  }

  return (
    <div className="flex flex-col gap-4 mt-5">
      {data.data.map((law) => (
        <OtherLawCard key={law.uuid} law={law} />
      ))}
    </div>
  );
}

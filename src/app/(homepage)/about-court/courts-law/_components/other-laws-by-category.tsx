import { getOtherLawsByCategory } from "@/lib/api/law.api";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import NoSearchResults from "@/components/custom/no-result";
import { lawMatchesSearch } from "@/lib/utils/law-search";
import OtherLawCard from "./other-law-card";

interface OtherLawsByCategoryProps {
  categoryUuid: string;
  search?: string;
}

export default async function OtherLawsByCategory({
  categoryUuid,
  search,
}: OtherLawsByCategoryProps) {
  const [data, error] = await catchError(() =>
    getOtherLawsByCategory(categoryUuid),
  );

  if (error) return <ErrorState />;

  if (!data || !("data" in data) || !data.data?.length) {
    return <NoDataState />;
  }

  const query = search?.trim() ?? "";
  const laws = query
    ? data.data.filter((law) => lawMatchesSearch(law, query, law.body_html))
    : data.data;

  if (query && laws.length === 0) {
    return <NoSearchResults />;
  }

  return (
    <div className="mt-5 flex flex-col gap-4">
      {laws.map((law) => (
        <OtherLawCard key={law.uuid} law={law} />
      ))}
    </div>
  );
}

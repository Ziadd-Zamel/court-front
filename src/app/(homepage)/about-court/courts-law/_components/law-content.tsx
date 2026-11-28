import { getLawByType } from "@/lib/api/law.api";
import catchError from "@/lib/utils/catch-error";
import { HighlightedHtml } from "@/components/common/highlighted-html";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import NoSearchResults from "@/components/custom/no-result";
import { lawMatchesSearch } from "@/lib/utils/law-search";

type LawTypeSlug = "court-law" | "regulations" | "appeal-texts";

type Props = {
  type: LawTypeSlug;
  search?: string;
};

export default async function LawContent({ type, search }: Props) {
  const [data, error] = await catchError(() => getLawByType(type));

  if (error) return <ErrorState />;

  if (!data || !("data" in data) || !data.data) {
    return <NoDataState />;
  }

  const law = data.data;
  const bodyHtml = law.body_html ?? "";
  const query = search?.trim() ?? "";

  if (query && !lawMatchesSearch(law, query, bodyHtml)) {
    return <NoSearchResults />;
  }

  return (
    <HighlightedHtml
      html={bodyHtml}
      className="prose prose-lg dark:prose-invert text-sm max-w-none text-gray-600 dark:text-white/70 leading-relaxed text-right"
      style={{ direction: "rtl" }}
    />
  );
}

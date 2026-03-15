import { getLawByType } from "@/lib/api/law.api";
import { cleanHtmlStylesServer } from "@/lib/utils/clean-html-styles-server";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";

type LawTypeSlug = "court-law" | "regulations" | "appeal-texts";

type Props = {
  type: LawTypeSlug;
};

export default async function LawContent({ type }: Props) {
  const [data, error] = await catchError(() => getLawByType(type));

  if (error) return <ErrorState />;

  if (!data || !("data" in data) || !data.data) {
    return <NoDataState />;
  }

  const law = data.data;
  const bodyHtml = law.body_html ?? "";

  return (
    <div
      className="prose prose-lg dark:prose-invert text-sm max-w-none text-gray-600 dark:text-white/70 leading-relaxed text-right"
      style={{ direction: "rtl" }}
      dangerouslySetInnerHTML={{
        __html: cleanHtmlStylesServer(bodyHtml),
      }}
    />
  );
}

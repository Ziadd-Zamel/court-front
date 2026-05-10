import EmbedPdfViewer from "./_components/embed-pdf-viewer";

type SearchParams = {
  src?: string | string[];
  page?: string | string[];
  title?: string | string[];
};

function pickFirst(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export const metadata = {
  title: "عارض الملف",
};

export default async function PdfViewerPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const src = pickFirst(params.src) ?? "";
  const pageRaw = pickFirst(params.page);
  const targetPage = (() => {
    const n = Number(pageRaw);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
  })();
  const title = pickFirst(params.title);

  if (!src) {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-white px-6 text-center dark:bg-zinc-950"
        dir="rtl"
      >
        <h2 className="text-xl font-bold text-main">لا يوجد ملف للعرض</h2>
        <p className="text-sm text-gray-600 dark:text-white/70">
          الرجاء التأكد من الرابط المطلوب.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-zinc-100 dark:bg-zinc-900">
      <EmbedPdfViewer src={src} targetPage={targetPage} title={title} />
    </div>
  );
}

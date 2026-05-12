"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPluginRegistration } from "@embedpdf/core";
import { EmbedPDF } from "@embedpdf/core/react";
import { usePdfiumEngine } from "@embedpdf/engines/react";
import {
  DocumentContent,
  DocumentManagerPluginPackage,
} from "@embedpdf/plugin-document-manager/react";
import {
  Viewport,
  ViewportPluginPackage,
} from "@embedpdf/plugin-viewport/react";
import {
  Scroller,
  ScrollPluginPackage,
  useScroll,
  useScrollCapability,
} from "@embedpdf/plugin-scroll/react";
import {
  RenderLayer,
  RenderPluginPackage,
} from "@embedpdf/plugin-render/react";
import { Download, Loader2, X } from "lucide-react";

type Props = {
  src: string;
  targetPage: number;
  title?: string;
};

function buildDownloadName(src: string, title?: string) {
  if (title?.trim()) {
    const safe = title.replace(/[\\/:*?"<>|]+/g, " ").trim();
    return `${safe}.pdf`;
  }
  try {
    const url = new URL(src);
    const last = url.pathname.split("/").pop();
    if (last && last.toLowerCase().endsWith(".pdf")) return last;
  } catch {
    /* ignore */
  }
  return "document.pdf";
}

export default function EmbedPdfViewer({ src, targetPage, title }: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Prevent the underlying page (header/footer/main) from scrolling behind
  // the fixed viewer overlay, which otherwise produces a duplicate scrollbar.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  // Fetch the PDF through the existing proxy (handles cross-origin + SSL).
  useEffect(() => {
    let cancelled = false;
    setDataUrl(null);
    setFetchError(null);

    fetch(`/api/pdf-as-data?src=${encodeURIComponent(src)}`, {
      cache: "no-store",
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return (await r.json()) as { dataUrl?: string; error?: string };
      })
      .then((d) => {
        if (cancelled) return;
        if (!d.dataUrl) throw new Error(d.error ?? "Invalid response");
        setDataUrl(d.dataUrl);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setFetchError(
          err instanceof Error ? err.message : "تعذر تحميل الملف",
        );
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  const { engine, isLoading: engineLoading } = usePdfiumEngine();

  // Plugins must be a stable reference for a given document so the engine
  // doesn't reset itself on re-renders.
  const plugins = useMemo(() => {
    if (!dataUrl) return null;
    return [
      createPluginRegistration(DocumentManagerPluginPackage, {
        initialDocuments: [{ url: dataUrl }],
      }),
      createPluginRegistration(ViewportPluginPackage, { viewportGap: 32 }),
      createPluginRegistration(ScrollPluginPackage, { defaultPageGap: 12 }),
      createPluginRegistration(RenderPluginPackage),
    ];
  }, [dataUrl]);

  const isInitializing = !dataUrl || engineLoading || !engine || !plugins;

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      {fetchError ? (
        <>
          <FallbackToolbar title={title} src={src} dataUrl={dataUrl} />
          <div
            className="flex flex-1 items-center justify-center px-6 py-16 text-center"
            dir="rtl"
          >
            <div>
              <p className="text-lg font-bold text-red-600">تعذر تحميل الملف</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-white/70">
                {fetchError}
              </p>
            </div>
          </div>
        </>
      ) : isInitializing ? (
        <>
          <FallbackToolbar title={title} src={src} dataUrl={dataUrl} />
          <div className="flex flex-1 items-center justify-center" dir="rtl">
            <div className="flex flex-col items-center gap-3 text-main">
              <Loader2 size={36} className="animate-spin" />
              <p className="text-sm font-medium">جاري تجهيز عارض الملف…</p>
            </div>
          </div>
        </>
      ) : (
        <EmbedPDF engine={engine} plugins={plugins}>
          {({ activeDocumentId }) =>
            activeDocumentId ? (
              <DocumentContent documentId={activeDocumentId}>
                {({ isLoading, isError, isLoaded }) => {
                  if (isError) {
                    return (
                      <>
                        <FallbackToolbar
                          title={title}
                          src={src}
                          dataUrl={dataUrl}
                        />
                        <div
                          className="flex flex-1 items-center justify-center px-6 text-center text-red-600"
                          dir="rtl"
                        >
                          تعذر فتح الملف.
                        </div>
                      </>
                    );
                  }

                  if (!isLoaded || isLoading) {
                    return (
                      <>
                        <FallbackToolbar
                          title={title}
                          src={src}
                          dataUrl={dataUrl}
                        />
                        <div
                          className="flex flex-1 items-center justify-center"
                          dir="rtl"
                        >
                          <Loader2 size={36} className="animate-spin text-main" />
                        </div>
                      </>
                    );
                  }

                  return (
                    <ViewerSurface
                      documentId={activeDocumentId}
                      targetPage={targetPage}
                      title={title}
                      src={src}
                      dataUrl={dataUrl}
                    />
                  );
                }}
              </DocumentContent>
            ) : null
          }
        </EmbedPDF>
      )}
    </div>
  );
}

function ViewerSurface({
  documentId,
  targetPage,
  title,
  src,
  dataUrl,
}: {
  documentId: string;
  targetPage: number;
  title?: string;
  src: string;
  dataUrl: string | null;
}) {
  return (
    <>
      <PdfToolbar
        documentId={documentId}
        title={title}
        src={src}
        dataUrl={dataUrl}
      />
      <div className="relative flex-1 min-h-0">
        <Viewport
          documentId={documentId}
          className="pdf-viewport h-full w-full"
          style={{ backgroundColor: "transparent" }}
        >
          <Scroller
            documentId={documentId}
            renderPage={({ width, height, pageIndex }) => (
              <div
                className="bg-white shadow-lg shadow-black/10 dark:shadow-black/40"
                style={{ width, height, position: "relative" }}
              >
                <RenderLayer documentId={documentId} pageIndex={pageIndex} />
              </div>
            )}
          />
        </Viewport>

        <PageJumpEffect documentId={documentId} targetPage={targetPage} />
      </div>
    </>
  );
}

function PdfToolbar({
  documentId,
  title,
  src,
  dataUrl,
}: {
  documentId: string;
  title?: string;
  src: string;
  dataUrl: string | null;
}) {
  const { provides: scroll, state } = useScroll(documentId);
  const [pageInput, setPageInput] = useState<string>("");

  // Keep the input in sync with the current page when the user isn't editing.
  useEffect(() => {
    if (state.currentPage > 0) {
      setPageInput(String(state.currentPage));
    }
  }, [state.currentPage]);

  const handleJumpSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!scroll) return;
    const parsed = Number(pageInput);
    if (!Number.isFinite(parsed) || parsed <= 0) return;
    const safe = Math.max(1, Math.min(parsed, state.totalPages || parsed));
    scroll.scrollToPage({ pageNumber: safe, behavior: "smooth" });
  };

  const downloadHref = dataUrl ?? src;
  const downloadName = buildDownloadName(src, title);

  return (
    <header
      className="flex items-center justify-between gap-2 border-b border-gray-200 bg-white px-2 py-2 shadow-sm sm:gap-3 sm:px-4 sm:py-2.5 dark:border-white/10 dark:bg-zinc-950"
      dir="rtl"
    >
      <h1 className="line-clamp-1 min-w-0 flex-1 text-sm font-bold text-main sm:text-base">
        {title?.trim() || "عارض الملف"}
      </h1>

      <form
        onSubmit={handleJumpSubmit}
        className="flex shrink-0 items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-1 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
      >
        <span className="hidden text-gray-500 dark:text-white/60 sm:inline">
          صفحة
        </span>
        <input
          type="number"
          min={1}
          max={state.totalPages || undefined}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          className="w-12 rounded-sm border border-transparent bg-white px-1.5 py-1 text-center tabular-nums outline-none focus:border-main sm:w-14 sm:px-2 dark:bg-zinc-900"
        />
        <span className="text-gray-500 tabular-nums dark:text-white/60">
          / {state.totalPages || "…"}
        </span>
        <button
          type="submit"
          className="rounded-sm bg-main px-2 py-1 text-xs font-bold text-white hover:bg-main/90 sm:px-3"
        >
          انتقل
        </button>
      </form>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <a
          href={downloadHref}
          download={downloadName}
          target={dataUrl ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-sm border border-main/30 bg-white p-1.5 text-sm font-semibold text-main hover:bg-main/10 sm:px-3 dark:bg-transparent"
          aria-label="تحميل"
          title="تحميل"
        >
          <Download size={16} />
          <span className="hidden sm:inline">تحميل</span>
        </a>
        <button
          type="button"
          onClick={() => {
            window.close();
            // Fallback for tabs not opened via window.open
            if (window.history.length > 1) window.history.back();
          }}
          className="inline-flex items-center justify-center rounded-sm border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-100 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/10"
          aria-label="إغلاق"
          title="إغلاق"
        >
          <X size={16} />
        </button>
      </div>
    </header>
  );
}

function FallbackToolbar({
  title,
  src,
  dataUrl,
}: {
  title?: string;
  src: string;
  dataUrl: string | null;
}) {
  const downloadHref = dataUrl ?? src;
  const downloadName = buildDownloadName(src, title);

  return (
    <header
      className="flex items-center justify-between gap-2 border-b border-gray-200 bg-white px-2 py-2 shadow-sm sm:gap-3 sm:px-4 sm:py-2.5 dark:border-white/10 dark:bg-zinc-950"
      dir="rtl"
    >
      <h1 className="line-clamp-1 min-w-0 flex-1 text-sm font-bold text-main sm:text-base">
        {title?.trim() || "عارض الملف"}
      </h1>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <a
          href={downloadHref}
          download={downloadName}
          target={dataUrl ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-sm border border-main/30 bg-white p-1.5 text-sm font-semibold text-main hover:bg-main/10 sm:px-3 dark:bg-transparent"
          aria-label="تحميل"
          title="تحميل"
        >
          <Download size={16} />
          <span className="hidden sm:inline">تحميل</span>
        </a>
        <button
          type="button"
          onClick={() => {
            window.close();
            if (window.history.length > 1) window.history.back();
          }}
          className="inline-flex items-center justify-center rounded-sm border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-100 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/10"
          aria-label="إغلاق"
          title="إغلاق"
        >
          <X size={16} />
        </button>
      </div>
    </header>
  );
}

function PageJumpEffect({
  documentId,
  targetPage,
}: {
  documentId: string;
  targetPage: number;
}) {
  const { provides: capability } = useScrollCapability();
  const hasScheduledRef = useRef(false);

  useEffect(() => {
    if (!capability) return;
    if (hasScheduledRef.current) return;

    let timeout: number | undefined;

    // Wait for the scroller to actually have a layout — only then will
    // scrollToPage land on the right offset for a virtualized PDF.
    const unsubscribe = capability.onLayoutReady((event) => {
      if (event.documentId !== documentId) return;
      if (!event.isInitial) return;
      if (hasScheduledRef.current) return;
      hasScheduledRef.current = true;

      const scope = capability.forDocument(documentId);
      const total = event.totalPages || scope.getTotalPages() || 1;
      const safePage = Math.max(1, Math.min(targetPage, total));

      // Always start on page 1.
      scope.scrollToPage({ pageNumber: 1, behavior: "instant" });

      if (safePage === 1) return;

      timeout = window.setTimeout(() => {
        scope.scrollToPage({ pageNumber: safePage, behavior: "smooth" });
      }, 3000);
    });

    return () => {
      unsubscribe?.();
      if (timeout) window.clearTimeout(timeout);
    };
  }, [capability, documentId, targetPage]);

  return null;
}


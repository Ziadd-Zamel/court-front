"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPluginRegistration, setScale } from "@embedpdf/core";
import { EmbedPDF, useRegistry } from "@embedpdf/core/react";
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
  // Stream the PDF binary through our proxy so EmbedPDF / pdfium can do
  // progressive range-request loading — way faster than base64 + dataUrl.
  const pdfUrl = useMemo(
    () => `/api/pdf-stream?src=${encodeURIComponent(src)}`,
    [src],
  );

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

  const { engine, isLoading: engineLoading } = usePdfiumEngine();

  // Plugins must be a stable reference for a given document so the engine
  // doesn't reset itself on re-renders.
  const plugins = useMemo(() => {
    return [
      createPluginRegistration(DocumentManagerPluginPackage, {
        initialDocuments: [
          {
            url: pdfUrl,
            mode: "range-request",
            scale: 1,
          },
        ],
      }),
      createPluginRegistration(ViewportPluginPackage, { viewportGap: 12 }),
      createPluginRegistration(ScrollPluginPackage, { defaultPageGap: 8 }),
      createPluginRegistration(RenderPluginPackage),
    ];
  }, [pdfUrl]);

  const isInitializing = engineLoading || !engine;

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      {isInitializing ? (
        <>
          <FallbackToolbar title={title} src={src} />
          <div className="flex flex-1 items-center justify-center" dir="rtl">
            <div className="flex flex-col items-center gap-3 text-main">
              <Loader2 size={32} className="animate-spin" />
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
                        <FallbackToolbar title={title} src={src} />
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
                        <FallbackToolbar title={title} src={src} />
                        <div
                          className="flex flex-1 items-center justify-center"
                          dir="rtl"
                        >
                          <Loader2
                            size={32}
                            className="animate-spin text-main"
                          />
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
}: {
  documentId: string;
  targetPage: number;
  title?: string;
  src: string;
}) {
  return (
    <>
      <PdfToolbar documentId={documentId} title={title} src={src} />
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

        <FitToHeightEffect documentId={documentId} />
        <PageJumpEffect documentId={documentId} targetPage={targetPage} />
      </div>
    </>
  );
}

function PdfToolbar({
  documentId,
  title,
  src,
}: {
  documentId: string;
  title?: string;
  src: string;
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

  const downloadHref = `/api/pdf-stream?src=${encodeURIComponent(src)}`;
  const downloadName = buildDownloadName(src, title);

  return (
    <header
      className="flex items-center justify-between gap-2 border-b border-gray-200 bg-white px-2 py-1 text-xs shadow-sm sm:px-3 sm:py-1.5 dark:border-white/10 dark:bg-zinc-950"
      dir="rtl"
    >
      <h1 className="line-clamp-1 min-w-0 flex-1 text-xs font-bold text-main sm:text-sm">
        {title?.trim() || "عارض الملف"}
      </h1>

      <form
        onSubmit={handleJumpSubmit}
        className="flex shrink-0 items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-1 py-0.5 text-xs dark:border-white/10 dark:bg-white/5 dark:text-white"
      >
        <input
          type="number"
          min={1}
          max={state.totalPages || undefined}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          className="w-10 rounded-sm border border-transparent bg-white px-1 py-0.5 text-center tabular-nums outline-none focus:border-main sm:w-12 dark:bg-zinc-900"
        />
        <span className="text-gray-500 tabular-nums dark:text-white/60">
          / {state.totalPages || "…"}
        </span>
        <button
          type="submit"
          className="rounded-sm bg-main px-2 py-0.5 text-[11px] font-bold text-white hover:bg-main/90"
        >
          انتقل
        </button>
      </form>

      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
        <a
          href={downloadHref}
          download={downloadName}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-sm border border-black bg-white p-1 text-xs font-semibold text-black hover:bg-black/5 sm:px-2 dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          aria-label="تحميل"
          title="تحميل"
        >
          <Download size={14} />
          <span className="hidden sm:inline">تحميل</span>
        </a>
        <button
          type="button"
          onClick={() => {
            window.close();
            // Fallback for tabs not opened via window.open
            if (window.history.length > 1) window.history.back();
          }}
          className="inline-flex items-center justify-center rounded-sm border border-gray-200 p-1 text-gray-600 hover:bg-gray-100 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/10"
          aria-label="إغلاق"
          title="إغلاق"
        >
          <X size={14} />
        </button>
      </div>
    </header>
  );
}

function FallbackToolbar({ title, src }: { title?: string; src: string }) {
  const downloadHref = `/api/pdf-stream?src=${encodeURIComponent(src)}`;
  const downloadName = buildDownloadName(src, title);

  return (
    <header
      className="flex items-center justify-between gap-2 border-b border-gray-200 bg-white px-2 py-1 text-xs shadow-sm sm:px-3 sm:py-1.5 dark:border-white/10 dark:bg-zinc-950"
      dir="rtl"
    >
      <h1 className="line-clamp-1 min-w-0 flex-1 text-xs font-bold text-main sm:text-sm">
        {title?.trim() || "عارض الملف"}
      </h1>

      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
        <a
          href={downloadHref}
          download={downloadName}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-sm border border-black bg-white p-1 text-xs font-semibold text-black hover:bg-black/5 sm:px-2 dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          aria-label="تحميل"
          title="تحميل"
        >
          <Download size={14} />
          <span className="hidden sm:inline">تحميل</span>
        </a>
        <button
          type="button"
          onClick={() => {
            window.close();
            if (window.history.length > 1) window.history.back();
          }}
          className="inline-flex items-center justify-center rounded-sm border border-gray-200 p-1 text-gray-600 hover:bg-gray-100 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/10"
          aria-label="إغلاق"
          title="إغلاق"
        >
          <X size={14} />
        </button>
      </div>
    </header>
  );
}

function FitToHeightEffect({ documentId }: { documentId: string }) {
  const { provides: scrollCap } = useScrollCapability();
  const { registry } = useRegistry();
  const hasFitRef = useRef(false);

  useEffect(() => {
    if (!scrollCap || !registry) return;
    if (hasFitRef.current) return;

    const unsubscribe = scrollCap.onLayoutReady((event) => {
      if (event.documentId !== documentId || !event.isInitial) return;
      if (hasFitRef.current) return;

      const scope = scrollCap.forDocument(documentId);
      const layout = scope.getLayout();
      const firstPage = layout.virtualItems?.[0]?.pageLayouts?.[0];
      if (!firstPage) return;

      // Pages in the layout already include current scale (default 1).
      // Compute the scale needed to fit the viewport height with some gap.
      const viewportEl = document.querySelector<HTMLElement>(".pdf-viewport");
      const viewportHeight = viewportEl?.clientHeight ?? window.innerHeight;
      const viewportWidth = viewportEl?.clientWidth ?? window.innerWidth;
      const targetHeight = Math.max(200, viewportHeight - 40);
      const targetWidth = Math.max(200, viewportWidth - 40);

      const scaleByHeight = targetHeight / firstPage.rotatedHeight;
      const scaleByWidth = targetWidth / firstPage.rotatedWidth;
      const fit = Math.min(scaleByHeight, scaleByWidth);
      // Clamp to a sane range so we don't render absurdly large/small.
      const clamped = Math.max(0.4, Math.min(2.5, fit));

      hasFitRef.current = true;
      registry.getStore().dispatch(setScale(clamped, documentId));
    });

    return () => unsubscribe?.();
  }, [scrollCap, registry, documentId]);

  return null;
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
      }, 1000);
    });

    return () => {
      unsubscribe?.();
      if (timeout) window.clearTimeout(timeout);
    };
  }, [capability, documentId, targetPage]);

  return null;
}

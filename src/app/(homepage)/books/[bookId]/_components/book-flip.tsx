/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip-rtl";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DESKTOP_PAGE_WIDTH = 400;
const PAGE_ASPECT = 550 / 400;

type BookFlipProps = {
  pdfUrl: string;
};

export default function BookFlip({ pdfUrl }: BookFlipProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfUrls, setPdfUrls] = useState<string | null>(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const [pageWidth, setPageWidth] = useState(DESKTOP_PAGE_WIDTH);

  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = pdfUrl.trim();
    if (!trimmed) {
      setPdfUrls(null);
      return;
    }
    fetch(`/api/pdf-as-data?src=${encodeURIComponent(trimmed)}`, {
      cache: "no-store",
    })
      .then((r) => {
        if (!r.ok) throw new Error("pdf proxy failed");
        return r.json();
      })
      .then((d) => setPdfUrls(d.dataUrl))
      .catch(() => setPdfUrls(null));
  }, [pdfUrl]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsPortrait(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const available = container.clientWidth;
      const maxWidth = isPortrait
        ? Math.min(available, 320)
        : Math.min(available / 2, DESKTOP_PAGE_WIDTH);
      setPageWidth(Math.max(220, Math.floor(maxWidth)));
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [isPortrait]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const pageHeight = Math.round(pageWidth * PAGE_ASPECT);

  const goToNextPage = () => {
    bookRef.current?.pageFlip().flipNext();
  };

  const goToPrevPage = () => {
    bookRef.current?.pageFlip().flipPrev();
  };

  return (
    <div ref={containerRef} className="relative w-full px-8 sm:px-10 lg:px-12">
      <div className="flex items-center justify-center">
        <Document
          file={pdfUrls}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex min-h-[280px] items-center justify-center sm:min-h-[400px]">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-white sm:h-16 sm:w-16" />
            </div>
          }
        >
          {/* @ts-expect-error react-pageflip-rtl has incorrect typings */}
          <HTMLFlipBook
            key={`${isPortrait ? "portrait" : "landscape"}-${pageWidth}`}
            ref={bookRef}
            rtl={true}
            width={pageWidth}
            height={pageHeight}
            size="fixed"
            minWidth={pageWidth}
            maxWidth={pageWidth}
            minHeight={pageHeight}
            maxHeight={pageHeight}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={(e) => setCurrentPage(e.data)}
            drawShadow={true}
            flippingTime={800}
            usePortrait={isPortrait}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            disableFlipByClick={false}
            style={{}}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={`page_${index + 1}`}
                className="flex h-full w-full items-center justify-center overflow-hidden bg-white"
              >
                <Page
                  pageNumber={index + 1}
                  width={pageWidth}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </Document>
      </div>

      <button
        type="button"
        onClick={goToPrevPage}
        disabled={currentPage === 0}
        className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer p-1 text-white disabled:cursor-not-allowed sm:right-1 sm:p-2 lg:-right-2"
        aria-label="الصفحة السابقة"
      >
        <ChevronRight className="size-7 sm:size-9 lg:size-10" />
      </button>
      <button
        type="button"
        onClick={goToNextPage}
        disabled={currentPage >= numPages - 1}
        className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer p-1 text-white disabled:cursor-not-allowed sm:left-1 sm:p-2 lg:-left-2"
        aria-label="الصفحة التالية"
      >
        <ChevronLeft className="size-7 sm:size-9 lg:size-10" />
      </button>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function BookFlip() {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfUrls, setPdfUrls] = useState<string | null>(null);

  const bookRef = useRef<any>(null);

  useEffect(() => {
    fetch(`/api/pdf-as-data?src=${encodeURIComponent("/court-book.pdf")}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((d) => setPdfUrls(d.dataUrl))
      .catch(() => setPdfUrls(null));
  }, []);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const goToNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const goToPrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <div className="w-full relative px-10">
      <div className="flex-1 flex items-center justify-center px-8">
        <Document
          file={pdfUrls}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          {/* @ts-expect-error react-pageflip has incorrect typings */}

          <HTMLFlipBook
            ref={bookRef}
            width={400}
            height={550}
            size="fixed"
            minWidth={300}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={(e) => setCurrentPage(e.data)}
            drawShadow={true}
            flippingTime={800}
            usePortrait={false}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            disableFlipByClick={false}
            style={{}}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div
                key={`page_${index + 1}`}
                className="w-full h-full bg-white flex items-center justify-center overflow-hidden"
              >
                <Page
                  pageNumber={index + 1}
                  width={400}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </Document>
      </div>

      <button
        onClick={goToPrevPage}
        disabled={currentPage === 0}
        className="px-6 py-3 text-white cursor-pointer  disabled:cursor-not-allowed  absolute top-1/2 -translate-y-1/2 -right-20 "
      >
        <ChevronRight size={40} />
      </button>
      <button
        onClick={goToNextPage}
        disabled={currentPage >= numPages - 1}
        className="px-6 py-3 text-white cursor-pointer  disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 -left-20"
      >
        <ChevronLeft size={40} />
      </button>
    </div>
  );
}

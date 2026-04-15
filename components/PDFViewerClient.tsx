"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// This MUST live in the same file as Document/Page — not in a separate file
// SSR is disabled at the parent level (CVModal uses next/dynamic with ssr:false)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Props {
  onClose: () => void;
}

export default function PDFViewerClient({ onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState(620);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    // sicurezza: se per qualche motivo currentPage è fuori range
    setCurrentPage((p) => Math.min(Math.max(1, p), numPages));
  };

  const measureWidth = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const style = window.getComputedStyle(el);
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const next = Math.max(280, el.clientWidth - padding);
    setContainerWidth(next);
  }, []);

  // ✅ Misura iniziale + aggiornamenti su resize (modal, viewport, ecc.)
  useEffect(() => {
    measureWidth();

    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => measureWidth());
    ro.observe(el);

    return () => ro.disconnect();
  }, [measureWidth]);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(numPages || 1, p + 1));

  return (
    <div
      className="bg-[#f5f5f5] dark:bg-[#161616] w-full max-w-[700px] max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.3)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5e5e5] dark:border-[#1f1f1f] flex-shrink-0 bg-white dark:bg-[#111]">
        <div className="flex items-center gap-3">
          <span
            id="cv-modal-title"
            className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#9a9a9a]"
          >
            Curriculum Vitae
          </span>
          {numPages > 1 && (
            <span className="font-mono text-[10px] text-[#c0c0c0] dark:text-[#3a3a3a]">
              {currentPage} / {numPages}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {numPages > 1 && (
            <div className="flex items-center gap-1 mr-1">
              <button
                onClick={goPrev}
                disabled={currentPage === 1}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-[#e5e5e5] dark:border-[#2a2a2a] text-[#9a9a9a] disabled:opacity-30 hover:border-[#0f0f0f] dark:hover:border-[#f0f0f0] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M6 2L3 5l3 3" />
                </svg>
              </button>

              <button
                onClick={goNext}
                disabled={numPages > 0 ? currentPage === numPages : true}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-[#e5e5e5] dark:border-[#2a2a2a] text-[#9a9a9a] disabled:opacity-30 hover:border-[#0f0f0f] dark:hover:border-[#f0f0f0] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M4 2l3 3-3 3" />
                </svg>
              </button>
            </div>
          )}

          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide bg-[#0f0f0f] dark:bg-[#f0f0f0] text-white dark:text-[#0f0f0f] px-3.5 py-1.5 rounded-full hover:bg-[#0066ff] dark:hover:bg-[#0066ff] dark:hover:text-white transition-colors"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
            </svg>
            Download
          </a>

          <button
            onClick={onClose}
            aria-label="Close CV viewer"
            className="w-[30px] h-[30px] flex items-center justify-center rounded-full border border-[#e5e5e5] dark:border-[#2a2a2a] text-[#9a9a9a] hover:border-[#0f0f0f] dark:hover:border-[#f0f0f0] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M1 1l10 10M11 1L1 11" />
            </svg>
          </button>
        </div>
      </div>

      {/* PDF area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto flex flex-col items-center py-6 px-6"
      >
        <Document
          file="/cv.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center py-32">
              <svg
                className="animate-spin text-[#0066ff]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="32"
                  strokeDashoffset="12"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center py-32 gap-3">
              <span className="font-mono text-[11px] text-[#9a9a9a]">
                Failed to load PDF.
              </span>
              <span className="font-mono text-[10px] text-[#c0c0c0]">
                Make sure cv.pdf is in /public
              </span>
            </div>
          }
        >
          <Page
            key={`${currentPage}-${containerWidth}`} // ✅ evita glitch su cambio pagina/resize
            pageNumber={currentPage}                // ✅ pagina corrente
            width={containerWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {/* Page dots */}
      {numPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-3 border-t border-[#e0e0e0] dark:border-[#222] bg-white dark:bg-[#111]">
          {Array.from({ length: numPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              aria-label={`Go to page ${i + 1}`}
              className={`rounded-full transition-all duration-200 ${
                currentPage === i + 1
                  ? "w-4 h-1.5 bg-[#0066ff]"
                  : "w-1.5 h-1.5 bg-[#d0d0d0] dark:bg-[#333] hover:bg-[#9a9a9a]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

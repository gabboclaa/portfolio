"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const FOCUSABLE_SELECTORS =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ⚠️ Key insight: dynamic import with ssr:false ensures react-pdf and pdfjs
// NEVER run on the server. This is required for the workerSrc new URL() to work.
const PDFViewerClient = dynamic(() => import("./PDFViewerClient"), {
  ssr: false,
  loading: () => (
    <div
      className="bg-white dark:bg-[#111] w-full max-w-[700px] h-[500px] rounded-2xl flex items-center justify-center"
      style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.3)" }}
    >
      <svg className="animate-spin text-[#0066ff]" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="12" strokeLinecap="round" />
      </svg>
    </div>
  ),
});

interface CVModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CVModal({ open, onClose }: CVModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    // Focus the dialog container so screen readers announce it
    requestAnimationFrame(() => {
      overlayRef.current?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && overlayRef.current) {
        const focusable = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (
            document.activeElement === first ||
            document.activeElement === overlayRef.current
          ) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (
            document.activeElement === last ||
            document.activeElement === overlayRef.current
          ) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onClick={handleBackdrop}
      tabIndex={-1}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
      style={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        animation: "backdropIn 0.3s ease forwards",
        outline: "none",
      }}
    >
      <style>{`@keyframes backdropIn { from { opacity:0; } to { opacity:1; } }`}</style>
      <PDFViewerClient onClose={onClose} />
    </div>
  );
}

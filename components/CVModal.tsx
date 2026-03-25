"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

// ⚠️ Key insight: dynamic import with ssr:false ensures react-pdf and pdfjs
// NEVER run on the server. This is required for the workerSrc new URL() to work.
const PDFViewerClient = dynamic(() => import("./PDFViewerClient"), {
  ssr: false,
  loading: () => (<div className="bg-white dark:bg-[#111] w-full max-w-[700px] h-[500px] rounded-2xl flex items-center justify-center"
      style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.3)" }}>
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
  // Lock body scroll + Escape key
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <style>{`
        @keyframes backdropIn { from { opacity:0; } to { opacity:1; } }
        @keyframes backdropOut { from { opacity:1; } to { opacity:0; } }
      `}</style>
      <div
        onClick={handleBackdrop}
        className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          animation: open ? "backdropIn 0.3s ease forwards" : "backdropOut 0.25s ease forwards",
          pointerEvents: open ? "all" : "none",
          opacity: open ? undefined : 0,
        }}
      >
        {open && <PDFViewerClient onClose={onClose} />}
      </div>
    </>
  );
}

"use client";

import { useEffect, type ReactNode, useRef } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  title = "Modal",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC to close + lock/unlock background scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();

    if (open) {
      window.addEventListener("keydown", onKey);
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("modal-open");
    };
  }, [open, onClose]);

  // Reset modal body scroll to top on open OR when title changes (e.g., different exercise)
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const body = panelRef.current.querySelector(".modal-body-scroll") as HTMLDivElement | null;
    if (body) body.scrollTop = 0;
  }, [open, title]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel: fixed size; header sticky; body scrolls */}
      <div
        ref={panelRef}
        className={`relative z-10 w-[92vw] max-w-4xl h-[80vh] rounded-2xl bg-white shadow-2xl
          transition-all duration-300 transform
          ${open ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}
      >
        {/* Header (sticky) */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-100 bg-white rounded-t-2xl"
        >
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-slate-600 hover:bg-slate-50"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="modal-body-scroll h-[calc(80vh-64px)] overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import { type PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{
  title: string;
  open: boolean;
  onClose: () => void;
  description?: string;
  primaryAction?: React.ReactNode;
}>;

export function Modal({
  title,
  description,
  open,
  onClose,
  primaryAction,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl shadow-emerald-200/50">
        <header className="flex items-start justify-between gap-3 border-b border-emerald-50 px-5 py-4">
          <div>
            <h2 id="modal-title" className="text-lg font-semibold text-emerald-900">
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="text-sm text-emerald-700">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-emerald-700 transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            aria-label="Close modal"
          >
            ×
          </button>
        </header>
        <div className="px-5 py-4 text-sm text-emerald-900">{children}</div>
        {primaryAction && (
          <footer className="flex justify-end gap-2 border-t border-emerald-50 bg-emerald-50/60 px-5 py-3">
            {primaryAction}
          </footer>
        )}
      </div>
    </div>
  );
}

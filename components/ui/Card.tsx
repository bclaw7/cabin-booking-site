"use client";

import type { PropsWithChildren, ReactNode } from "react";

type CardProps = PropsWithChildren<{
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  footer?: ReactNode;
}>;

export function Card({ title, subtitle, footer, className, children }: CardProps) {
  return (
    <section
      className={`rounded-xl border border-emerald-50 bg-white shadow-sm shadow-emerald-100/30 transition hover:shadow-md ${className ?? ""}`}
    >
      {(title || subtitle) && (
        <header className="border-b border-emerald-50 px-5 pb-3 pt-4">
          {title && <h2 className="text-lg font-semibold text-emerald-900">{title}</h2>}
          {subtitle && <p className="text-sm text-emerald-700">{subtitle}</p>}
        </header>
      )}
      <div className="px-5 py-4">{children}</div>
      {footer && <footer className="border-t border-emerald-50 px-5 py-3 text-sm">{footer}</footer>}
    </section>
  );
}

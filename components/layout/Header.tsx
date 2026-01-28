import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-emerald-900">
          ADU Cabin
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-3 text-sm font-medium">
          <Link
            href="/book"
            className="rounded-md px-3 py-2 text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Book a stay
          </Link>
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-emerald-700 transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Overview
          </Link>
        </nav>
      </div>
    </header>
  );
}

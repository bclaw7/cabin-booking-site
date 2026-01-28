import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-500 px-6 py-10 text-white shadow-lg shadow-emerald-200/50 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">Cabin escape</p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Book an ADA-friendly cabin surrounded by redwoods.
            </h1>
            <p className="max-w-2xl text-lg text-emerald-50">
              Step-free entry, wide doorways, and calm lighting make this a comfortable stay for every guest.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link href="/book">Start a booking</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="#details">See amenities</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-sm text-emerald-50 backdrop-blur sm:max-w-xs">
            <p className="font-semibold">Accessibility highlights</p>
            <ul className="mt-2 space-y-1">
              <li>• Step-free path from parking</li>
              <li>• 34\" doorways and lever handles</li>
              <li>• Low-glare, warm lighting</li>
              <li>• Roll-in shower and grab bars</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="details" className="grid gap-4 sm:grid-cols-2">
        <Card title="Thoughtful comforts">
          <ul className="space-y-2 text-sm text-emerald-900">
            <li>• Queen bed + sleeper sofa</li>
            <li>• Fast Wi‑Fi for remote work</li>
            <li>• Induction cooktop + stocked kitchen</li>
            <li>• Private deck with forest views</li>
          </ul>
        </Card>
        <Card title="Booking at a glance">
          <ul className="space-y-2 text-sm text-emerald-900">
            <li>• Mobile-first booking flow</li>
            <li>• Availability check before confirmation</li>
            <li>• Inline validation and clear errors</li>
            <li>• Accessible labels and focus states</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}

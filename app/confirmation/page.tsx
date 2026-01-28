import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type ConfirmationPageProps = {
  searchParams: {
    ref?: string;
    name?: string;
    checkIn?: string;
    checkOut?: string;
    total?: string;
  };
};

export const metadata = {
  title: "Booking confirmed | ADU Cabin",
};

export default function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const checkIn = searchParams.checkIn ? new Date(searchParams.checkIn) : undefined;
  const checkOut = searchParams.checkOut ? new Date(searchParams.checkOut) : undefined;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Confirmation
        </p>
        <h1 className="text-3xl font-bold text-emerald-950">Your stay is requested</h1>
        <p className="text-emerald-800">
          Thanks{searchParams.name ? `, ${searchParams.name}` : ""}! We&apos;ve saved your details and will
          finalize your stay after one quick review.
        </p>
      </div>

      <Card title="Booking summary">
        <dl className="grid gap-4 text-sm text-emerald-900 sm:grid-cols-2">
          <div>
            <dt className="font-medium">Reference</dt>
            <dd className="text-emerald-700">{searchParams.ref ?? "Pending"}</dd>
          </div>
          <div>
            <dt className="font-medium">Guest</dt>
            <dd className="text-emerald-700">{searchParams.name ?? "Unnamed guest"}</dd>
          </div>
          <div>
            <dt className="font-medium">Dates</dt>
            <dd className="text-emerald-700">
              {checkIn && checkOut
                ? `${format(checkIn, "PPP")} → ${format(checkOut, "PPP")}`
                : "We’ll follow up with your dates."}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Estimated total</dt>
            <dd className="text-emerald-700">
              {searchParams.total ? `$${searchParams.total}` : "Calculated at confirmation"}
            </dd>
          </div>
        </dl>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/book">Book another stay</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}

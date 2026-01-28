import { BookingForm } from "@/components/booking/BookingForm";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Book your stay | ADU Cabin",
};

export default function BookPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Book your stay
        </p>
        <h1 className="text-3xl font-bold text-emerald-950">Choose dates, guests, and details</h1>
        <p className="text-emerald-800">
          We check availability before confirming. Expect a fast, mobile-friendly flow with clear validation and
          ARIA-friendly fields.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <BookingForm />
        <div className="space-y-3">
          <Card title="What to expect">
            <ul className="space-y-2 text-sm text-emerald-900">
              <li>• Instant availability check before payment</li>
              <li>• Clear inline errors and focus states</li>
              <li>• ADA-conscious layout and labels</li>
              <li>• Mock payment and confirmation</li>
            </ul>
          </Card>
          <Card title="House basics">
            <ul className="space-y-2 text-sm text-emerald-900">
              <li>• Quiet hours after 9pm</li>
              <li>• No indoor smoking</li>
              <li>• Pets welcome (2 max)</li>
              <li>• Parking for two vehicles</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

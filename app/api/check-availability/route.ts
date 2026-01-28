import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import {
  calculateEstimate,
  isRangeInPast,
  isRangeValid,
  suggestNextAvailableRange,
} from "@/lib/booking-logic";
import { bookingFormSchema } from "@/lib/validations";

const availabilitySchema = bookingFormSchema.pick({
  checkIn: true,
  checkOut: true,
  adults: true,
  children: true,
  pets: true,
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { checkIn, checkOut, adults, children, pets } = availabilitySchema.parse(json);

    if (!isRangeValid(checkIn, checkOut) || isRangeInPast(checkIn)) {
      return NextResponse.json(
        { available: false, message: "Please choose dates in the future with at least one night." },
        { status: 200 },
      );
    }

    const totalGuests = adults + children;
    if (totalGuests > 6) {
      return NextResponse.json(
        { available: false, message: "We can host up to 6 guests total." },
        { status: 200 },
      );
    }

    // Mock blackout: block the first weekend of each month
    const isBlocked =
      checkIn.getDate() <= 7 &&
      [5, 6, 0].includes(checkIn.getDay());

    if (isBlocked) {
      const suggestion = suggestNextAvailableRange();
      return NextResponse.json(
        {
          available: false,
          message: `We're booked for that weekend. Next open window: ${format(
            suggestion.start,
            "MMM d",
          )} – ${format(suggestion.end, "MMM d")}.`,
        },
        { status: 200 },
      );
    }

    const estimate = calculateEstimate(checkIn, checkOut, { pets });

    return NextResponse.json(
      {
        available: true,
        message: "Cabin is available! Continue to confirm.",
        estimate,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Availability check failed", error);
    return NextResponse.json(
      { available: false, message: "Could not check availability. Please try again." },
      { status: 400 },
    );
  }
}

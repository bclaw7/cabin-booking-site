import { NextRequest, NextResponse } from "next/server";
import { calculateEstimate, isRangeInPast, isRangeValid } from "@/lib/booking-logic";
import { bookingFormSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const values = bookingFormSchema.parse(json);

    if (!isRangeValid(values.checkIn, values.checkOut) || isRangeInPast(values.checkIn)) {
      return NextResponse.json(
        { message: "Invalid dates. Please adjust your selection." },
        { status: 400 },
      );
    }

    const estimate = calculateEstimate(values.checkIn, values.checkOut, { pets: values.pets });
    const reference = `CB-${Date.now().toString().slice(-6)}`;

    return NextResponse.json({ reference, estimate }, { status: 200 });
  } catch (error) {
    console.error("Create booking failed", error);
    return NextResponse.json(
      { message: "Unable to create booking. Please try again." },
      { status: 400 },
    );
  }
}

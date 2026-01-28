"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createBooking, checkAvailability } from "@/lib/api-client";
import { calculateEstimate } from "@/lib/booking-logic";
import {
  BookingFormValues,
  bookingFormSchema,
  calcNights,
} from "@/lib/validations";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ContactInfo } from "./ContactInfo";
import { DatePicker } from "./DatePicker";
import { GuestInfo } from "./GuestInfo";
import { PaymentForm } from "./PaymentForm";

const defaultCheckIn = addDays(new Date(), 1);
const defaultCheckOut = addDays(defaultCheckIn, 2);

export function BookingForm() {
  const router = useRouter();
  const [status, setStatus] = useState<{
    error?: string;
    availabilityMessage?: string;
  }>({});

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      checkIn: defaultCheckIn,
      checkOut: defaultCheckOut,
      adults: 2,
      children: 0,
      pets: 0,
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
    mode: "onBlur",
  });

  const watchValues = watch();
  const range = useMemo(
    () => ({
      from: watchValues.checkIn,
      to: watchValues.checkOut,
    }),
    [watchValues.checkIn, watchValues.checkOut],
  );

  const estimate = useMemo(
    () =>
      calculateEstimate(
        watchValues.checkIn,
        watchValues.checkOut,
        { pets: watchValues.pets },
      ),
    [watchValues.checkIn, watchValues.checkOut, watchValues.pets],
  );

  const onSubmit = handleSubmit(async (values) => {
    setStatus({});
    try {
      const availability = await checkAvailability(values);
      if (!availability.available) {
        setStatus({
          availabilityMessage: availability.message,
        });
        return;
      }

      const booking = await createBooking(values);
      const params = new URLSearchParams({
        ref: booking.reference,
        name: values.name,
        checkIn: values.checkIn.toISOString(),
        checkOut: values.checkOut.toISOString(),
        total: booking.estimate.total.toString(),
      });
      router.push(`/confirmation?${params.toString()}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setStatus({ error: message });
    }
  });

  const totalGuests = watchValues.adults + watchValues.children;
  const nights = calcNights(watchValues.checkIn, watchValues.checkOut);

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <Card
        title="Choose your dates"
        subtitle="Select check-in and check-out for your stay."
      >
        <Controller
          control={control}
          name="checkIn"
          render={() => (
            <DatePicker
              range={range}
              onSelect={(newRange) => {
                setValue("checkIn", newRange?.from ?? watchValues.checkIn, {
                  shouldValidate: true,
                });
                setValue("checkOut", newRange?.to ?? watchValues.checkOut, {
                  shouldValidate: true,
                });
              }}
            />
          )}
        />
        {(errors.checkIn || errors.checkOut) && (
          <p className="pt-3 text-sm text-red-600" role="alert">
            {errors.checkIn?.message || errors.checkOut?.message}
          </p>
        )}
      </Card>

      <Card
        title="Guests"
        subtitle="We can comfortably host up to 6 guests and 2 pets."
      >
        <GuestInfo
          adults={watchValues.adults}
          children={watchValues.children}
          pets={watchValues.pets}
          errors={{
            adults: errors.adults?.message,
            children: errors.children?.message,
            pets: errors.pets?.message,
          }}
          onChange={(field, value) =>
            setValue(field, value, { shouldValidate: true, shouldDirty: true })
          }
        />
        <p className="pt-3 text-sm text-emerald-800">
          {totalGuests} guests • {nights || 1} night{(nights || 1) > 1 ? "s" : ""}
        </p>
      </Card>

      <Card
        title="Your details"
        subtitle="We’ll only use these to confirm your stay."
      >
        <ContactInfo
          name={watchValues.name}
          email={watchValues.email}
          phone={watchValues.phone}
          specialRequests={watchValues.specialRequests ?? ""}
          errors={{
            name: errors.name?.message,
            email: errors.email?.message,
            phone: errors.phone?.message,
            specialRequests: errors.specialRequests?.message,
          }}
          onChange={(field, value) =>
            setValue(field, value, { shouldValidate: true, shouldDirty: true })
          }
        />
      </Card>

      <Card
        title="Payment (demo)"
        subtitle="Enter placeholder details to continue. No charges will occur."
      >
        <PaymentForm disabled={isSubmitting} />
      </Card>

      <Card>
        <div className="flex flex-col gap-2 text-sm text-emerald-900">
          <div className="flex items-center justify-between">
            <span>{nights || 1} night{(nights || 1) > 1 ? "s" : ""} × $220</span>
            <span>${estimate.baseRate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Cleaning</span>
            <span>${estimate.cleaningFee}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Pets</span>
            <span>${estimate.petFee}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Service</span>
            <span>${estimate.serviceFee}</span>
          </div>
          <div className="flex items-center justify-between border-t border-emerald-100 pt-2 font-semibold">
            <span>Total</span>
            <span>${estimate.total}</span>
          </div>
          <p className="text-xs text-emerald-700">
            You’ll only be charged after we confirm availability.
          </p>
        </div>
      </Card>

      {status.error && (
        <div
          className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {status.error}
        </div>
      )}

      {status.availabilityMessage && (
        <div
          className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          role="status"
        >
          {status.availabilityMessage}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-emerald-800">
          {range.from && range.to
            ? `${format(range.from, "PPP")} → ${format(range.to, "PPP")}`
            : "Select your dates to continue."}
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Booking..." : "Book now"}
        </Button>
      </div>
    </form>
  );
}

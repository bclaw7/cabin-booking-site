import { differenceInCalendarDays, isAfter, isBefore, startOfDay } from "date-fns";
import { z } from "zod";

const today = startOfDay(new Date());

const coerceDate = (field: string) =>
  z.preprocess(
    (val) => {
      if (val === null || val === undefined || val === "") return undefined;
      if (val instanceof Date) return val;
      const parsed = new Date(val as string);
      return Number.isNaN(parsed.getTime()) ? undefined : parsed;
    },
    z.date({
      error: `${field} date is required`,
    }),
  );

const bookingFormBase = z.object({
  checkIn: coerceDate("Check-in"),
  checkOut: coerceDate("Check-out"),
  adults: z.preprocess(
    (val) => Number(val ?? 0),
    z
      .number()
      .int()
      .min(1, "At least one adult is required")
      .max(6, "Maximum 6 adults"),
  ),
  children: z.preprocess(
    (val) => Number(val ?? 0),
    z
      .number()
      .int()
      .min(0, "Children cannot be negative")
      .max(6, "Maximum 6 children"),
  ),
  pets: z.preprocess(
    (val) => Number(val ?? 0),
    z
      .number()
      .int()
      .min(0, "Pets cannot be negative")
      .max(2, "Up to 2 pets allowed"),
  ),
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})$/,
      "Enter a valid US phone number",
    ),
  specialRequests: z
    .string()
    .trim()
    .max(500, "Special requests are limited to 500 characters")
    .optional()
    .or(z.literal("")),
});

export const bookingFormSchema = bookingFormBase
  .refine(
    (data) => data.checkIn && isAfter(startOfDay(data.checkIn), today),
    {
      message: "Check-in must be after today",
      path: ["checkIn"],
    },
  )
  .refine(
    (data) =>
      data.checkIn &&
      data.checkOut &&
      isBefore(data.checkIn, data.checkOut),
    {
      message: "Check-out must be after check-in",
      path: ["checkOut"],
    },
  )
  .refine(
    (data) =>
      data.checkIn &&
      data.checkOut &&
      differenceInCalendarDays(data.checkOut, data.checkIn) >= 1,
    {
      message: "Minimum 1 night stay",
      path: ["checkOut"],
    },
  )
  .refine(
    (data) => data.adults + data.children <= 6,
    {
      message: "Maximum 6 guests total (adults + children)",
      path: ["children"],
    },
  );

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
export type BookingFormInput = z.input<typeof bookingFormSchema>;
export const availabilitySchema = bookingFormBase.pick({
  checkIn: true,
  checkOut: true,
  adults: true,
  children: true,
  pets: true,
});

export const calcNights = (checkIn: Date, checkOut: Date) =>
  Math.max(differenceInCalendarDays(checkOut, checkIn), 0);

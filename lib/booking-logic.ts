import { addDays, differenceInCalendarDays, isBefore, isEqual, startOfDay } from "date-fns";
import { BookingFormValues } from "./validations";

export type PriceEstimate = {
  nights: number;
  baseRate: number;
  cleaningFee: number;
  petFee: number;
  serviceFee: number;
  total: number;
};

const NIGHTLY_RATE = 220;
const CLEANING_FEE = 95;
const SERVICE_FEE_RATE = 0.08;
const PET_FEE_PER_STAY = 35;

export const normalizeRange = (checkIn: Date, checkOut: Date) => ({
  checkIn: startOfDay(checkIn),
  checkOut: startOfDay(checkOut),
});

export const isRangeValid = (checkIn: Date, checkOut: Date) => {
  const { checkIn: start, checkOut: end } = normalizeRange(checkIn, checkOut);
  return isBefore(start, end) && !isEqual(start, end);
};

export const isRangeInPast = (checkIn: Date) =>
  isBefore(startOfDay(checkIn), startOfDay(new Date()));

export const calculateEstimate = (
  checkIn: Date,
  checkOut: Date,
  { pets }: { pets: number },
): PriceEstimate => {
  const nights = Math.max(differenceInCalendarDays(checkOut, checkIn), 0);
  const baseRate = nights * NIGHTLY_RATE;
  const cleaningFee = CLEANING_FEE;
  const petFee = pets > 0 ? PET_FEE_PER_STAY : 0;
  const serviceFee = Math.round((baseRate + cleaningFee + petFee) * SERVICE_FEE_RATE);
  const total = baseRate + cleaningFee + petFee + serviceFee;

  return { nights, baseRate, cleaningFee, petFee, serviceFee, total };
};

export const suggestNextAvailableRange = () => {
  const start = addDays(startOfDay(new Date()), 1);
  const end = addDays(start, 2);
  return { start, end };
};

export const toApiReadyPayload = (values: BookingFormValues) => ({
  ...values,
  checkIn: values.checkIn.toISOString(),
  checkOut: values.checkOut.toISOString(),
});

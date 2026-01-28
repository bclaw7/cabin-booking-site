import { BookingFormValues } from "./validations";
import { PriceEstimate } from "./booking-logic";

type JsonHeaders = {
  "Content-Type": "application/json";
};

type ApiError = {
  message: string;
};

export type AvailabilityResponse = {
  available: boolean;
  message: string;
  estimate?: PriceEstimate;
};

export type BookingResponse = {
  reference: string;
  estimate: PriceEstimate;
};

async function fetchJson<T>(url: string, init: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const text = await res.text();

  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    /* noop */
  }

  if (!res.ok) {
    const message =
      (data as ApiError)?.message ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

const serializeBooking = (values: BookingFormValues) => ({
  ...values,
  checkIn: values.checkIn.toISOString(),
  checkOut: values.checkOut.toISOString(),
});

export const checkAvailability = async (
  values: BookingFormValues,
): Promise<AvailabilityResponse> => {
  return fetchJson<AvailabilityResponse>("/api/check-availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" } satisfies JsonHeaders,
    body: JSON.stringify({
      checkIn: values.checkIn.toISOString(),
      checkOut: values.checkOut.toISOString(),
      adults: values.adults,
      children: values.children,
      pets: values.pets,
    }),
  });
};

export const createBooking = async (
  values: BookingFormValues,
): Promise<BookingResponse> => {
  return fetchJson<BookingResponse>("/api/create-booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" } satisfies JsonHeaders,
    body: JSON.stringify(serializeBooking(values)),
  });
};

"use client";

import { addDays, format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type DatePickerProps = {
  range: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
};

export function DatePicker({ range, onSelect }: DatePickerProps) {
  const fromDate = addDays(new Date(), 0);
  const disabled = [{ before: fromDate }];

  return (
    <div className="space-y-3">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={onSelect}
        numberOfMonths={1}
        disabled={disabled}
        captionLayout="dropdown-buttons"
        showOutsideDays
        className="rounded-lg border border-emerald-50 bg-white p-3 shadow-sm"
      />
      <div className="text-sm text-emerald-800" aria-live="polite">
        {range?.from ? (
          <p>
            {format(range.from, "PPP")}
            {range?.to ? ` → ${format(range.to, "PPP")}` : " (select check-out)"}
          </p>
        ) : (
          <p>Select check-in and check-out dates.</p>
        )}
      </div>
    </div>
  );
}

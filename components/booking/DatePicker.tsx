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
        captionLayout="dropdown-months"
        showOutsideDays
        className="rounded-lg border border-emerald-100 bg-white p-3 shadow-sm"
        classNames={{
          caption_label: "text-slate-900 font-semibold",
          head_cell: "text-slate-900 font-semibold text-sm",
          day: "text-slate-900 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600",
          day_selected: "bg-emerald-700 text-white font-semibold",
          day_today: "text-emerald-700 font-semibold",
          day_outside: "text-slate-400",
        }}
        styles={{
          months: { color: "#0f172a" },
        }}
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

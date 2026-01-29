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
  const today = new Date();
  const disabled = [{ before: fromDate }];

  const setRange = (from: Date, to: Date) => onSelect({ from, to });

  const handleTomorrow = () => {
    const from = addDays(today, 1);
    setRange(from, addDays(from, 1));
  };

  const handleThisWeekend = () => {
    const day = today.getDay();
    const daysUntilSaturday = (6 - day + 7) % 7;
    const saturday = addDays(today, daysUntilSaturday);
    const sunday = addDays(saturday, 1);
    setRange(saturday, sunday);
  };

  const handleNextWeekend = () => {
    const day = today.getDay();
    const daysUntilNextSaturday = (6 - day + 7) % 7 + 7;
    const saturday = addDays(today, daysUntilNextSaturday);
    const sunday = addDays(saturday, 1);
    setRange(saturday, sunday);
  };

  const handleNextSevenDays = () => {
    const from = addDays(today, 0);
    setRange(from, addDays(from, 6));
  };

  return (
    <div className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-[minmax(0,360px)_1fr] md:gap-6 md:items-start">
        <div className="space-y-3">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={onSelect}
            numberOfMonths={1}
            disabled={disabled}
            captionLayout="dropdown-months"
            showOutsideDays
            className="rounded-md"
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

        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Quick picks</p>
            <p className="text-xs text-slate-600">Jump to common stay lengths.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md border border-emerald-200 bg-white px-3 py-1.5 text-sm font-medium text-emerald-800 shadow-sm transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600"
              onClick={handleTomorrow}
            >
              Tomorrow
            </button>
            <button
              type="button"
              className="rounded-md border border-emerald-200 bg-white px-3 py-1.5 text-sm font-medium text-emerald-800 shadow-sm transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600"
              onClick={handleThisWeekend}
            >
              This weekend
            </button>
            <button
              type="button"
              className="rounded-md border border-emerald-200 bg-white px-3 py-1.5 text-sm font-medium text-emerald-800 shadow-sm transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600"
              onClick={handleNextWeekend}
            >
              Next weekend
            </button>
            <button
              type="button"
              className="rounded-md border border-emerald-200 bg-white px-3 py-1.5 text-sm font-medium text-emerald-800 shadow-sm transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600"
              onClick={handleNextSevenDays}
            >
              Next 7 days
            </button>
          </div>
          <p className="text-xs text-slate-600">
            You can adjust the dates after selecting a quick pick.
          </p>
        </div>
      </div>
    </div>
  );
}

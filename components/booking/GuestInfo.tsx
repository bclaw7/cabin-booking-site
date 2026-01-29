"use client";

type GuestInfoProps = {
  adults: number;
  children: number;
  pets: number;
  errors?: {
    adults?: string;
    children?: string;
    pets?: string;
  };
  onChange: (field: "adults" | "children" | "pets", value: number) => void;
};

export function GuestInfo({ adults, children, pets, errors, onChange }: GuestInfoProps) {
  const inputClasses =
    "w-full rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm text-emerald-900 placeholder-emerald-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 focus:outline-none disabled:bg-emerald-50";

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <label className="space-y-1 text-sm">
        <span className="font-medium text-emerald-900">Adults</span>
        <input
          type="number"
          min={1}
          max={6}
          value={adults}
          onChange={(e) => onChange("adults", Number(e.target.value))}
          className={inputClasses}
          aria-invalid={Boolean(errors?.adults)}
          aria-describedby={errors?.adults ? "adults-error" : undefined}
        />
        {errors?.adults && (
          <span id="adults-error" className="text-xs text-red-600">
            {errors.adults}
          </span>
        )}
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium text-emerald-900">Children</span>
        <input
          type="number"
          min={0}
          max={6}
          value={children}
          onChange={(e) => onChange("children", Number(e.target.value))}
          className={inputClasses}
          aria-invalid={Boolean(errors?.children)}
          aria-describedby={errors?.children ? "children-error" : undefined}
        />
        {errors?.children && (
          <span id="children-error" className="text-xs text-red-600">
            {errors.children}
          </span>
        )}
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium text-emerald-900">Pets</span>
        <input
          type="number"
          min={0}
          max={2}
          value={pets}
          onChange={(e) => onChange("pets", Number(e.target.value))}
          className={inputClasses}
          aria-invalid={Boolean(errors?.pets)}
          aria-describedby={errors?.pets ? "pets-error" : undefined}
        />
        {errors?.pets && (
          <span id="pets-error" className="text-xs text-red-600">
            {errors.pets}
          </span>
        )}
      </label>
    </div>
  );
}

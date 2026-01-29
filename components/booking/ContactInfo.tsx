"use client";

type ContactInfoProps = {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  errors?: {
    name?: string;
    email?: string;
    phone?: string;
    specialRequests?: string;
  };
  onChange: (field: "name" | "email" | "phone" | "specialRequests", value: string) => void;
};

export function ContactInfo({
  name,
  email,
  phone,
  specialRequests,
  errors,
  onChange,
}: ContactInfoProps) {
  const inputClasses =
    "w-full rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm text-emerald-900 placeholder-emerald-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 focus:outline-none disabled:bg-emerald-50";

  return (
    <div className="grid gap-3">
      <label className="space-y-1 text-sm">
        <span className="font-medium text-emerald-900">Full name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          className={inputClasses}
          autoComplete="name"
          aria-invalid={Boolean(errors?.name)}
          aria-describedby={errors?.name ? "name-error" : undefined}
        />
        {errors?.name && (
          <span id="name-error" className="text-xs text-red-600">
            {errors.name}
          </span>
        )}
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="font-medium text-emerald-900">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputClasses}
            autoComplete="email"
            aria-invalid={Boolean(errors?.email)}
            aria-describedby={errors?.email ? "email-error" : undefined}
          />
          {errors?.email && (
            <span id="email-error" className="text-xs text-red-600">
              {errors.email}
            </span>
          )}
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-medium text-emerald-900">Phone</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputClasses}
            autoComplete="tel"
            aria-invalid={Boolean(errors?.phone)}
            aria-describedby={errors?.phone ? "phone-error" : undefined}
          />
          {errors?.phone && (
            <span id="phone-error" className="text-xs text-red-600">
              {errors.phone}
            </span>
          )}
        </label>
      </div>

      <label className="space-y-1 text-sm">
        <span className="font-medium text-emerald-900">Special requests</span>
        <textarea
          value={specialRequests}
          onChange={(e) => onChange("specialRequests", e.target.value)}
          className={`${inputClasses} min-h-[96px] resize-vertical`}
          placeholder="Dietary needs, arrival time, mobility considerations..."
          aria-invalid={Boolean(errors?.specialRequests)}
          aria-describedby={errors?.specialRequests ? "special-requests-error" : undefined}
        />
        {errors?.specialRequests && (
          <span id="special-requests-error" className="text-xs text-red-600">
            {errors.specialRequests}
          </span>
        )}
      </label>
    </div>
  );
}

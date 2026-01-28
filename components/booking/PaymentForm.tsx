"use client";

import { ShieldCheck } from "lucide-react";

type PaymentFormProps = {
  disabled?: boolean;
};

export function PaymentForm({ disabled }: PaymentFormProps) {
  const inputClasses =
    "w-full rounded-md border border-emerald-100 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:bg-emerald-50";

  return (
    <div className="space-y-3 text-sm">
      <p className="flex items-center gap-2 text-emerald-800">
        <ShieldCheck className="h-4 w-4" aria-hidden />
        Demo payment (no real charges). Enter placeholder details to proceed.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="font-medium text-emerald-900">Cardholder name</span>
          <input
            type="text"
            className={inputClasses}
            placeholder="Alex Doe"
            disabled={disabled}
          />
        </label>
        <label className="space-y-1">
          <span className="font-medium text-emerald-900">Card number</span>
          <input
            type="text"
            className={inputClasses}
            placeholder="4242 4242 4242 4242"
            disabled={disabled}
            inputMode="numeric"
          />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="space-y-1">
          <span className="font-medium text-emerald-900">Expiry</span>
          <input
            type="text"
            className={inputClasses}
            placeholder="12/29"
            disabled={disabled}
            inputMode="numeric"
          />
        </label>
        <label className="space-y-1">
          <span className="font-medium text-emerald-900">CVC</span>
          <input
            type="text"
            className={inputClasses}
            placeholder="123"
            disabled={disabled}
            inputMode="numeric"
          />
        </label>
        <label className="space-y-1">
          <span className="font-medium text-emerald-900">ZIP</span>
          <input
            type="text"
            className={inputClasses}
            placeholder="90210"
            disabled={disabled}
          />
        </label>
      </div>
    </div>
  );
}

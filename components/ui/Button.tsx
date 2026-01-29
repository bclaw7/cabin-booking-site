"use client";

import {
  forwardRef,
  isValidElement,
  cloneElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  asChild?: boolean;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
  secondary:
    "bg-white text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
  ghost:
    "bg-transparent text-emerald-700 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
};

const sizeStyles: Record<Size, string> = {
  md: "px-4 py-2 text-sm",
  lg: "px-4 py-2.5 text-base",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth,
      disabled,
      children,
      asChild,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className,
    );

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

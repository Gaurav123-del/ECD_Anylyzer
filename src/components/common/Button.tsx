import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { Loader2 } from "lucide-react";

/*
 * ============================================================
 * TYPES
 * ============================================================
 */

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "outline";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

/*
 * ============================================================
 * STYLES
 * ============================================================
 */

const variantClasses: Record<
  ButtonVariant,
  string
> = {
  primary:
    "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:ring-blue-500",

  secondary:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400",

  danger:
    "border border-red-200 bg-white text-red-600 hover:bg-red-50 focus:ring-red-500",

  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400",

  outline:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-blue-500",
};

const sizeClasses: Record<
  ButtonSize,
  string
> = {
  sm:
    "min-h-9 px-3 text-xs",

  md:
    "min-h-10 px-4 text-sm",

  lg:
    "min-h-12 px-6 text-sm",
};

/*
 * ============================================================
 * BUTTON COMPONENT
 * ============================================================
 */

function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled =
    disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-lg font-semibold",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth
          ? "w-full"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading && (
        <Loader2
          className="h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}

export default Button;
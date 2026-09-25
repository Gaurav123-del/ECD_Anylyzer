import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { Loader2 } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "outline";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white shadow-sm shadow-blue-600/15 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20 focus:ring-blue-500 disabled:bg-blue-300",

  secondary:
    "bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-400 disabled:bg-slate-100 disabled:text-slate-400",

  danger:
    "bg-red-600 text-white shadow-sm shadow-red-600/10 hover:bg-red-700 hover:shadow-md focus:ring-red-500 disabled:bg-red-300",

  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400 disabled:text-slate-300",

  outline:
    "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-12 px-5 text-sm",
};

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
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-70",
        "active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading && (
        <Loader2
          size={16}
          className="shrink-0 animate-spin"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}

export default Button;
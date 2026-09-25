import type {
  ReactNode,
} from "react";

import {
  AlertTriangle,
} from "lucide-react";

interface DisclaimerProps {
  title?: string;
  children?: ReactNode;
  compact?: boolean;
}

function Disclaimer({
  title = "Medical Disclaimer",
  children,
  compact = false,
}: DisclaimerProps) {
  return (
    <div
      role="note"
      className={`rounded-xl border border-amber-200 bg-amber-50 ${
        compact
          ? "p-3"
          : "p-4"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex shrink-0 items-center justify-center rounded-lg bg-amber-100 ${
            compact
              ? "h-8 w-8"
              : "h-9 w-9"
          }`}
        >
          <AlertTriangle
            className={`text-amber-600 ${
              compact
                ? "h-4 w-4"
                : "h-5 w-5"
            }`}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <h3
            className={`font-semibold text-amber-900 ${
              compact
                ? "text-xs"
                : "text-sm"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mt-1 leading-5 text-amber-800 ${
              compact
                ? "text-xs"
                : "text-sm"
            }`}
          >
            {children ??
              "This tool provides AI-assisted ECG analysis for informational purposes only. It is not a medical diagnosis and should not replace evaluation by a qualified healthcare professional."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;
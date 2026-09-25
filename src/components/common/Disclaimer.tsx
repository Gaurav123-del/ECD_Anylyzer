import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface DisclaimerProps {
  title?: string;
  children: ReactNode;
  compact?: boolean;
}

function Disclaimer({
  title = "Disclaimer",
  children,
  compact = false,
}: DisclaimerProps) {
  return (
    <div
      className={[
        "rounded-xl border border-amber-200 bg-amber-50",
        compact ? "p-4" : "p-5",
      ].join(" ")}
      role="note"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <AlertTriangle size={17} />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-amber-900">
            {title}
          </h3>

          <div className="mt-1 text-sm leading-6 text-amber-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;
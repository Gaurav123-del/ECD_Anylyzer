import { ShieldCheck } from "lucide-react";

interface DisclaimerProps {
  compact?: boolean;
}

function Disclaimer({
  compact = false,
}: DisclaimerProps) {
  return (
    <div
      className={`flex gap-3 rounded-xl border border-slate-200 bg-slate-50 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <ShieldCheck
        className={`mt-0.5 shrink-0 text-slate-400 ${
          compact ? "h-4 w-4" : "h-5 w-5"
        }`}
      />

      <p
        className={`leading-5 text-slate-500 ${
          compact ? "text-[11px]" : "text-xs"
        }`}
      >
        AI-generated results are intended for clinical
        assistance and informational purposes only. They
        should not replace evaluation by a qualified
        healthcare professional.
      </p>
    </div>
  );
}

export default Disclaimer;
import { AlertTriangle } from "lucide-react";

function MedicalDisclaimer() {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
      </div>

      <div>
        <h3 className="font-semibold text-amber-900">
          Medical Disclaimer
        </h3>

        <p className="mt-1 text-sm leading-5 text-amber-800">
          AI-generated analysis is intended for assistance
          and informational purposes only. It should not be
          considered a medical diagnosis or a substitute
          for evaluation by a qualified healthcare
          professional.
        </p>
      </div>
    </div>
  );
}

export default MedicalDisclaimer;
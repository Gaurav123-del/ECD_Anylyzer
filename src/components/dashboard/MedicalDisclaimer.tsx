import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import Disclaimer from "../common/Disclaimer";

function MedicalDisclaimer() {
  return (
    <section className="mt-8">
      <Disclaimer
        title="Medical Disclaimer"
        compact
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <ShieldCheck size={17} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Informational and educational use only
              </p>

              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                ECG Analyzer is designed for informational and educational
                purposes only. Its analysis should not be considered a medical
                diagnosis or a substitute for professional medical advice.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50/80">
            <div className="flex items-start gap-3 p-4 sm:p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                <AlertTriangle size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-amber-900">
                  Emergency symptoms
                </p>

                <p className="mt-1.5 text-sm leading-6 text-amber-900/80">
                  If you are experiencing chest pain, severe shortness of
                  breath, fainting, or other emergency symptoms, seek immediate
                  medical attention.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
            <ShieldAlert
              size={18}
              className="mt-0.5 shrink-0 text-slate-500"
            />

            <div className="min-w-0">
              <p className="text-sm leading-6 text-slate-600">
                Always discuss ECG results and AI-generated findings with a
                qualified healthcare professional.
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                <span>Professional review recommended</span>
                <ArrowRight size={11} />
              </div>
            </div>
          </div>
        </div>
      </Disclaimer>
    </section>
  );
}

export default MedicalDisclaimer;
import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import Disclaimer from "../common/Disclaimer";

function MedicalDisclaimer() {
  return (
    <section className="mt-6 w-full min-w-0 sm:mt-8">
      <Disclaimer title="Medical Disclaimer" compact>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <ShieldCheck size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 sm:text-sm">
                Informational and educational use only
              </p>

              <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                ECG Analyzer is designed for informational and educational
                purposes only. Its analysis should not be considered a medical
                diagnosis or a substitute for professional medical advice.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50/80">
            <div className="flex min-w-0 items-start gap-2.5 p-3.5 sm:gap-3 sm:p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                <AlertTriangle size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-amber-900 sm:text-sm">
                  Emergency symptoms
                </p>

                <p className="mt-1.5 text-xs leading-5 text-amber-900/80 sm:text-sm sm:leading-6">
                  If you are experiencing chest pain, severe shortness of
                  breath, fainting, or other emergency symptoms, seek immediate
                  medical attention.
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 sm:gap-3 sm:p-4">
            <ShieldAlert
              size={18}
              className="mt-0.5 shrink-0 text-slate-500"
            />

            <div className="min-w-0">
              <p className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                Always discuss ECG results and AI-generated findings with a
                qualified healthcare professional.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
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
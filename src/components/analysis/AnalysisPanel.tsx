import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock3,
  HeartPulse,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import type { AnalysisState } from "../../types/ecg";

interface AnalysisPanelProps {
  analysis: AnalysisState;
  onAnalyze: () => void;
}

function AnalysisPanel({
  analysis,
  onAnalyze,
}: AnalysisPanelProps) {
  const { status, result, error } = analysis;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
            <Activity className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              ECG Analysis
            </h2>

            <p className="text-xs text-slate-500">
              AI-assisted analysis
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {status === "idle" && (
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <HeartPulse className="h-6 w-6 text-slate-500" />
            </div>

            <h3 className="mt-4 font-medium text-slate-900">
              Ready for analysis
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Start the analysis to send the uploaded ECG
              to the AI analysis service.
            </p>

            <button
              type="button"
              onClick={onAnalyze}
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Analyze ECG
            </button>
          </div>
        )}

        {status === "processing" && (
          <div className="py-8 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />

            <h3 className="mt-5 font-medium text-slate-900">
              Analyzing ECG...
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while the ECG is being processed.
            </p>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-blue-600" />
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>

            <h3 className="mt-4 font-medium text-slate-900">
              Analysis failed
            </h3>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={onAnalyze}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {status === "success" && result && (
          <div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Result
                  </p>

                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {result.prediction}
                  </p>
                </div>

                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">
                  Confidence
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {Math.round(result.confidence * 100)}%
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">
                  Heart Rate
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {result.heartRate
                    ? `${result.heartRate} BPM`
                    : "—"}
                </p>
              </div>
            </div>

            {result.rhythm && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                <HeartPulse className="h-5 w-5 text-blue-600" />

                <div>
                  <p className="text-xs text-slate-500">
                    Rhythm
                  </p>

                  <p className="font-medium text-slate-900">
                    {result.rhythm}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-5">
              <h3 className="font-semibold text-slate-900">
                Findings
              </h3>

              <div className="mt-3 space-y-2">
                {result.findings.map((finding, index) => (
                  <div
                    key={`${finding}-${index}`}
                    className="flex gap-3 rounded-lg bg-slate-50 p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                    <p className="text-sm leading-5 text-slate-600">
                      {finding}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
              <Clock3 className="h-4 w-4" />
              Analysis completed
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

          <p className="text-[11px] leading-5 text-slate-500">
            AI-generated results are intended for clinical
            assistance and informational purposes only. They
            should not replace evaluation by a qualified
            healthcare professional.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default AnalysisPanel;
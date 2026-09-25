import {
  Activity,
  AlertCircle,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";

import Button from "../common/Button";
import Card from "../common/Card";
import Disclaimer from "../common/Disclaimer";
import Loading from "../common/Loading";

import type {
  AnalysisStatus,
  ECGAnalysisResult,
} from "../../types/ecg";

import {
  formatConfidence,
  formatHeartRate,
} from "../../utils/formatters";

interface AnalysisPanelProps {
  status: AnalysisStatus;
  result: ECGAnalysisResult | null;
  error: string | null;
  onAnalyze: () => void;
}

function AnalysisPanel({
  status,
  result,
  error,
  onAnalyze,
}: AnalysisPanelProps) {
  const confidencePercentage = result
    ? Math.min(
        Math.max(
          result.confidence <= 1
            ? result.confidence * 100
            : result.confidence,
          0
        ),
        100
      )
    : 0;

  return (
    <Card
      padding="none"
      className="flex min-h-[440px] flex-col overflow-hidden rounded-2xl border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md" />

            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20">
              <BrainCircuit
                size={21}
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-950">
                ECG Analysis
              </h2>

              <span className="hidden rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-600 sm:inline-flex">
                AI
              </span>
            </div>

            <p className="mt-0.5 text-[11px] font-medium text-slate-400">
              AI-assisted analysis results
            </p>
          </div>
        </div>

        {status === "success" && (
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-bold text-emerald-700">
              Complete
            </span>
          </div>
        )}

        {status === "processing" && (
          <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />

            <span className="text-[10px] font-bold text-blue-700">
              Processing
            </span>
          </div>
        )}
      </div>

      {status === "idle" && (
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_55%)]" />

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-blue-500/10 blur-2xl" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 shadow-sm">
              <BrainCircuit
                size={35}
                strokeWidth={1.7}
              />
            </div>
          </div>

          <div className="relative">
            <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <Sparkles size={11} />
              Ready
            </div>

            <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900">
              Ready for analysis
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Upload an ECG file and start the analysis to
              receive structured AI-assisted findings.
            </p>

            <Button
              className="mt-6 shadow-lg shadow-blue-600/15"
              onClick={onAnalyze}
            >
              <BrainCircuit size={17} />
              Analyze ECG
              <ChevronRight size={15} />
            </Button>
          </div>
        </div>
      )}

      {status === "processing" && (
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.07),transparent_55%)]" />

          <div className="relative">
            <div className="absolute inset-[-14px] animate-pulse rounded-full border border-blue-200/60" />

            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <Activity
                  size={27}
                  className="animate-pulse"
                />
              </div>
            </div>
          </div>

          <Loading
            text="Analyzing ECG..."
            size="lg"
          />

          <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
            Please wait while the ECG analysis service
            processes your file.
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-semibold text-blue-600">
            <BrainCircuit size={12} />
            AI processing in progress
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600 shadow-sm">
            <AlertCircle
              size={30}
              strokeWidth={1.8}
            />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            Analysis failed
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-red-600">
            {error ||
              "Unable to analyze this ECG. Please try again."}
          </p>

          <Button
            variant="outline"
            className="mt-6"
            onClick={onAnalyze}
          >
            <RotateCcw size={16} />
            Try Again
          </Button>
        </div>
      )}

      {status === "success" && result && (
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-5 p-5">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 p-4">
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-100/60 blur-2xl" />

              <div className="relative flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                  <CheckCircle2
                    size={20}
                    strokeWidth={2.2}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600">
                      Prediction
                    </p>

                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-700">
                      Result
                    </span>
                  </div>

                  <p className="mt-1 break-words text-lg font-bold tracking-tight text-slate-950">
                    {result.prediction}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Model confidence
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                    {formatConfidence(
                      result.confidence
                    )}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-100 bg-white text-[10px] font-bold text-blue-600">
                  {Math.round(
                    confidencePercentage
                  )}
                  %
                </div>
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700"
                  style={{
                    width: `${confidencePercentage}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[9px] font-medium text-slate-400">
                <span>0%</span>
                <span>AI confidence</span>
                <span>100%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <HeartPulse size={16} />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Heart Rate
                  </span>
                </div>

                <p className="mt-3 text-base font-bold text-slate-950">
                  {formatHeartRate(
                    result.heartRate
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <Waves size={16} />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Rhythm
                  </span>
                </div>

                <p className="mt-3 truncate text-sm font-bold text-slate-950">
                  {result.rhythm ||
                    "Not available"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Activity size={16} />
                  </div>

                  <h3 className="text-sm font-bold text-slate-950">
                    Findings
                  </h3>
                </div>

                <span className="text-[10px] font-semibold text-slate-400">
                  {result.findings.length}{" "}
                  {result.findings.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              {result.findings.length > 0 ? (
                <ul className="mt-4 space-y-2.5">
                  {result.findings.map(
                    (finding, index) => (
                      <li
                        key={`${finding}-${index}`}
                        className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />

                        <span>{finding}</span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="mt-3 rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-500">
                  No additional findings were
                  provided.
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2.5">
              <ShieldCheck
                size={15}
                className="shrink-0 text-blue-600"
              />

              <p className="text-[10px] leading-4 text-blue-700">
                Review AI-assisted results with a
                qualified healthcare professional.
              </p>
            </div>

            <Button
              variant="outline"
              fullWidth
              className="h-11"
              onClick={onAnalyze}
            >
              <RotateCcw size={16} />
              Analyze Again
            </Button>

            <Disclaimer
              title="Important"
              compact
            >
              AI-assisted results are informational and
              should not be considered a medical diagnosis.
            </Disclaimer>
          </div>
        </div>
      )}
    </Card>
  );
}

export default AnalysisPanel;
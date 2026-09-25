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
      className="flex min-h-[420px] w-full min-w-0 flex-col overflow-hidden rounded-2xl border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:min-h-[440px]"
    >
      <div className="flex min-h-[68px] items-center justify-between gap-3 border-b border-slate-200/80 bg-white px-3.5 py-3 sm:min-h-[76px] sm:px-5 sm:py-4">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20 sm:h-11 sm:w-11">
              <BrainCircuit size={19} strokeWidth={2} className="sm:h-[21px] sm:w-[21px]" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h2 className="truncate text-sm font-bold text-slate-950 sm:text-[15px]">
                ECG Analysis
              </h2>

              <span className="hidden shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-600 sm:inline-flex">
                AI
              </span>
            </div>

            <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400 sm:text-[11px]">
              AI-assisted analysis results
            </p>
          </div>
        </div>

        {status === "success" && (
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1.5 sm:px-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="hidden text-[10px] font-bold text-emerald-700 sm:inline">
              Complete
            </span>
          </div>
        )}

        {status === "processing" && (
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-2 py-1.5 sm:px-2.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
            <span className="hidden text-[10px] font-bold text-blue-700 sm:inline">
              Processing
            </span>
          </div>
        )}

        {status === "error" && (
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-red-50 px-2 py-1.5 sm:px-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <span className="hidden text-[10px] font-bold text-red-700 sm:inline">
              Error
            </span>
          </div>
        )}
      </div>

      {status === "idle" && (
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10 text-center sm:px-6 sm:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_55%)]" />

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-blue-500/10 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 shadow-sm sm:h-20 sm:w-20">
              <BrainCircuit
                size={29}
                strokeWidth={1.7}
                className="sm:h-[35px] sm:w-[35px]"
              />
            </div>
          </div>

          <div className="relative w-full">
            <div className="mx-auto mt-5 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:mt-6">
              <Sparkles size={11} />
              Ready
            </div>

            <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Ready for analysis
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
              Upload an ECG file and start the analysis to receive structured
              AI-assisted findings.
            </p>

            <Button
              className="mt-5 shadow-lg shadow-blue-600/15 sm:mt-6"
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
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10 text-center sm:px-6 sm:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.07),transparent_55%)]" />

          <div className="relative">
            <div className="absolute inset-[-12px] animate-pulse rounded-full border border-blue-200/60 sm:inset-[-14px]" />

            <div className="flex h-18 w-18 items-center justify-center rounded-full border border-blue-100 bg-blue-50 sm:h-20 sm:w-20">
              <div className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm sm:h-14 sm:w-14">
                <Activity
                  size={25}
                  className="animate-pulse sm:h-[27px] sm:w-[27px]"
                />
              </div>
            </div>
          </div>

          <Loading text="Analyzing ECG..." size="lg" />

          <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm">
            Please wait while the ECG analysis service processes your file.
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-semibold text-blue-600 sm:mt-6">
            <BrainCircuit size={12} />
            AI processing in progress
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600 shadow-sm sm:h-16 sm:w-16">
            <AlertCircle
              size={27}
              strokeWidth={1.8}
              className="sm:h-[30px] sm:w-[30px]"
            />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            Analysis failed
          </h3>

          <p className="mt-2 max-w-sm break-words text-xs leading-5 text-red-600 sm:text-sm sm:leading-6">
            {error || "Unable to analyze this ECG. Please try again."}
          </p>

          <Button
            variant="outline"
            className="mt-5 sm:mt-6"
            onClick={onAnalyze}
          >
            <RotateCcw size={16} />
            Try Again
          </Button>
        </div>
      )}

      {status === "success" && result && (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-4 p-3.5 sm:space-y-5 sm:p-5">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 p-3.5 sm:p-4">
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-100/60 blur-2xl" />

              <div className="relative flex items-start gap-2.5 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100 sm:h-10 sm:w-10">
                  <CheckCircle2 size={19} strokeWidth={2.2} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-600 sm:text-[10px]">
                      Prediction
                    </p>

                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-700">
                      Result
                    </span>
                  </div>

                  <p className="mt-1 break-words text-base font-bold tracking-tight text-slate-950 sm:text-lg">
                    {result.prediction}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 sm:p-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
                    Model confidence
                  </p>

                  <p className="mt-1 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {formatConfidence(result.confidence)}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-blue-100 bg-white text-[10px] font-bold text-blue-600 sm:h-12 sm:w-12">
                  {Math.round(confidencePercentage)}%
                </div>
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700"
                  style={{ width: `${confidencePercentage}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[9px] font-medium text-slate-400">
                <span>0%</span>
                <span>AI confidence</span>
                <span>100%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <HeartPulse size={16} />
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:text-[10px]">
                    Heart Rate
                  </span>
                </div>

                <p className="mt-3 text-base font-bold text-slate-950">
                  {formatHeartRate(result.heartRate)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <Waves size={16} />
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:text-[10px]">
                    Rhythm
                  </span>
                </div>

                <p className="mt-3 truncate text-sm font-bold text-slate-950">
                  {result.rhythm || "Not available"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4">
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
                  {result.findings.length === 1 ? "item" : "items"}
                </span>
              </div>

              {result.findings.length > 0 ? (
                <ul className="mt-4 space-y-2.5">
                  {result.findings.map((finding, index) => (
                    <li
                      key={`${finding}-${index}`}
                      className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span className="min-w-0 break-words">{finding}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-500">
                  No additional findings were provided.
                </p>
              )}
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2.5">
              <ShieldCheck
                size={15}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="text-[10px] leading-4 text-blue-700">
                Review AI-assisted results with a qualified healthcare
                professional.
              </p>
            </div>

            <Button
              variant="outline"
              fullWidth
              className="min-h-11"
              onClick={onAnalyze}
            >
              <RotateCcw size={16} />
              Analyze Again
            </Button>

            <Disclaimer title="Important" compact>
              AI-assisted results are informational and should not be
              considered a medical diagnosis.
            </Disclaimer>
          </div>
        </div>
      )}
    </Card>
  );
}

export default AnalysisPanel;
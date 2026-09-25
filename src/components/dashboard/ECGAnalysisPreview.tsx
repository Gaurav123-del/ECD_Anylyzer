import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface ECGAnalysisResult {
  prediction: string;
  confidence: number;
  heartRate: number | null;
  rhythm: string | null;
  findings: string[];
}

type AnalysisStatus = "idle" | "processing" | "success" | "error";

interface ECGAnalysisPreviewProps {
  status?: AnalysisStatus;
  result?: ECGAnalysisResult | null;
}

const WAVEFORM_PATH = `
M0 130
L45 130
L70 130
L84 121
L94 139
L106 130
L145 130
L170 130
L184 130
L198 130
L213 130
L228 74
L242 194
L256 130
L300 130
L325 130
L340 120
L352 140
L365 130
L410 130
L435 130
L450 130
L465 130
L480 58
L495 202
L510 130
L550 130
L580 130
L595 120
L607 140
L620 130
L670 130
L700 130
L715 130
L730 130
L745 68
L760 195
L775 130
L820 130
L845 130
L860 120
L872 140
L885 130
L930 130
L960 130
L1000 130
`;

function ECGWaveform() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.055)_1px,transparent_1px)] bg-[size:18px_18px]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.08)_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="absolute inset-y-0 left-0 flex w-[200%] ecg-track">
        {[0, 1].map((item) => (
          <svg
            key={item}
            viewBox="0 0 1000 260"
            className="h-full w-1/2 shrink-0"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={WAVEFORM_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            />
          </svg>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/60 to-transparent sm:w-32" />

      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-blue-600 shadow-sm backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-blue-600" />
        </span>
        Live ECG
      </div>

      <style>{`
        @keyframes ecg-infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .ecg-track {
          animation: ecg-infinite-scroll 4.5s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .ecg-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

function normalizeConfidence(confidence: number) {
  const value = confidence <= 1 ? confidence * 100 : confidence;
  return Math.min(Math.max(value, 0), 100);
}

function ECGAnalysisPreview({
  status = "idle",
  result = null,
}: ECGAnalysisPreviewProps) {
  const [liveHeartRate, setLiveHeartRate] = useState(72);
  const [liveConfidence, setLiveConfidence] = useState(94);

  useEffect(() => {
    if (status === "processing" || status === "success") {
      return;
    }

    const interval = window.setInterval(() => {
      setLiveHeartRate((current) => {
        const next = current + Math.floor(Math.random() * 5) - 2;
        return Math.min(Math.max(next, 68), 78);
      });
    }, 1200);

    return () => window.clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === "processing" || status === "success") {
      return;
    }

    const interval = window.setInterval(() => {
      setLiveConfidence((current) => {
        const next = current + Math.floor(Math.random() * 3) - 1;
        return Math.min(Math.max(next, 91), 97);
      });
    }, 1600);

    return () => window.clearInterval(interval);
  }, [status]);

  const hasRealResult = status === "success" && result !== null;
  const isProcessing = status === "processing";
  const isError = status === "error";

  const displayHeartRate = hasRealResult
    ? result?.heartRate ?? null
    : liveHeartRate;

  const displayConfidence = hasRealResult
    ? normalizeConfidence(result?.confidence ?? 0)
    : liveConfidence;

  const displayRhythm = hasRealResult
    ? result?.rhythm ?? "Not available"
    : "Normal";

  const statusText = useMemo(() => {
    if (isProcessing) return "Analyzing";
    if (hasRealResult) return "Analyzed";
    if (isError) return "Error";
    return "Live";
  }, [isProcessing, hasRealResult, isError]);

  return (
    <section className="relative w-full min-w-0 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-[28px]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative flex min-w-0 items-start justify-between gap-3 px-4 pb-4 pt-5 sm:gap-4 sm:px-8 sm:pb-5 sm:pt-7">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Activity size={14} className="shrink-0 text-blue-600" />
            <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600 sm:text-[11px]">
              ECG Monitoring
            </p>
          </div>

          <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-950 sm:text-2xl">
            AI Analysis Preview
          </h2>
        </div>

        <div
          className={[
            "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold sm:gap-2 sm:px-3.5 sm:py-2 sm:text-xs",
            isProcessing
              ? "border border-blue-100 bg-blue-50 text-blue-700"
              : hasRealResult
                ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                : isError
                  ? "border border-red-100 bg-red-50 text-red-700"
                  : "border border-emerald-100 bg-emerald-50 text-emerald-700",
          ].join(" ")}
        >
          {isProcessing ? (
            <>
              <Loader2 size={13} className="animate-spin sm:h-[14px] sm:w-[14px]" />
              Analyzing
            </>
          ) : hasRealResult ? (
            <>
              <CheckCircle2 size={13} className="sm:h-[14px] sm:w-[14px]" />
              Analyzed
            </>
          ) : isError ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 sm:h-2 sm:w-2" />
              Error
            </>
          ) : (
            <>
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative h-full w-full rounded-full bg-emerald-500" />
              </span>
              Live
            </>
          )}
        </div>
      </div>

      <div className="relative px-4 sm:px-8">
        <div className="h-[180px] overflow-hidden rounded-xl border border-blue-100 bg-white sm:h-[220px] sm:rounded-2xl lg:h-[250px]">
          <ECGWaveform />
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-2.5 px-4 pb-5 pt-4 min-[420px]:grid-cols-3 sm:gap-3 sm:px-8 sm:pb-8 sm:pt-6">
        <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 sm:rounded-2xl sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
              Heart Rate
            </p>
            <Activity size={14} className="shrink-0 text-slate-400" />
          </div>

          <div className="mt-1.5 flex items-baseline gap-1.5 sm:mt-2">
            <span className="text-xl font-bold tracking-tight text-slate-900 tabular-nums sm:text-2xl">
              {isProcessing ? "--" : displayHeartRate ?? "--"}
            </span>
            <span className="text-xs font-semibold text-slate-500 sm:text-sm">
              bpm
            </span>
          </div>

          {!hasRealResult && !isProcessing && (
            <p className="mt-1 text-[9px] font-medium text-slate-400">
              Live monitor
            </p>
          )}
        </div>

        <div className="min-w-0 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3.5 sm:rounded-2xl sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-600 sm:text-[10px]">
              Rhythm
            </p>

            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </div>

          <p className="mt-1.5 truncate text-lg font-bold tracking-tight text-emerald-700 sm:mt-2 sm:text-2xl">
            {isProcessing ? "Analyzing..." : displayRhythm}
          </p>
        </div>

        <div className="min-w-0 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3.5 sm:rounded-2xl sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-blue-600 sm:text-[10px]">
              Confidence
            </p>
            <BrainCircuit size={15} className="shrink-0 text-blue-500" />
          </div>

          <p className="mt-1.5 text-xl font-bold tracking-tight text-blue-600 tabular-nums sm:mt-2 sm:text-2xl">
            {isProcessing ? "--" : `${Math.round(displayConfidence)}%`}
          </p>

          {!isProcessing && (
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${displayConfidence}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-8">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              {!isError && (
                <span
                  className={[
                    "absolute inline-flex h-full w-full rounded-full",
                    isProcessing
                      ? "animate-ping bg-blue-400 opacity-50"
                      : "animate-ping bg-emerald-400 opacity-50",
                  ].join(" ")}
                />
              )}

              <span
                className={[
                  "relative h-2 w-2 rounded-full",
                  isError
                    ? "bg-red-500"
                    : isProcessing
                      ? "bg-blue-500"
                      : "bg-emerald-500",
                ].join(" ")}
              />
            </span>

            <span className="truncate text-[9px] font-semibold text-slate-500 sm:text-[10px]">
              {statusText} ECG monitoring
            </span>
          </div>

          <span className="hidden shrink-0 text-[9px] font-medium uppercase tracking-[0.12em] text-slate-300 min-[420px]:block">
            Real-time preview
          </span>
        </div>
      </div>
    </section>
  );
}

export default ECGAnalysisPreview;
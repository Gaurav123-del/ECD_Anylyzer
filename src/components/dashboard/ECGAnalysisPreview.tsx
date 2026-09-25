import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

interface ECGAnalysisResult {
  prediction: string;
  confidence: number;
  heartRate: number | null;
  rhythm: string | null;
  findings: string[];
}

type AnalysisStatus =
  | "idle"
  | "processing"
  | "success"
  | "error";

interface ECGAnalysisPreviewProps {
  status?: AnalysisStatus;
  result?: ECGAnalysisResult | null;
}

/* ============================================================
   ECG WAVEFORM
   ============================================================ */

function ECGWaveform() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.055)_1px,transparent_1px)] bg-[size:18px_18px]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.08)_1px,transparent_1px)] bg-[size:90px_90px]" />

      {/* Moving waveform */}
      <div className="absolute inset-y-0 left-0 flex w-[200%] ecg-track">
        {/* Waveform 1 */}
        <svg
          viewBox="0 0 1000 260"
          className="h-full w-1/2 shrink-0"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
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
            "
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-600"
          />
        </svg>

        {/* Waveform 2 - identical copy for infinite loop */}
        <svg
          viewBox="0 0 1000 260"
          className="h-full w-1/2 shrink-0"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
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
            "
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-600"
          />
        </svg>
      </div>

      {/* Center scan glow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/50 to-transparent" />

      {/* Live badge */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-blue-600 shadow-sm backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />

          <span className="relative h-2 w-2 rounded-full bg-blue-600" />
        </span>

        Live ECG
      </div>

      <style>
        {`
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
        `}
      </style>
    </div>
  );
}

/* ============================================================
   CONFIDENCE NORMALIZATION
   ============================================================ */

function normalizeConfidence(
  confidence: number
): number {
  const value =
    confidence <= 1
      ? confidence * 100
      : confidence;

  return Math.min(
    Math.max(value, 0),
    100
  );
}

/* ============================================================
   ECG ANALYSIS PREVIEW
   ============================================================ */

function ECGAnalysisPreview({
  status = "idle",
  result = null,
}: ECGAnalysisPreviewProps) {
  /*
   * Simulated live values for the dashboard preview.
   *
   * These are visual/demo monitoring values.
   * Once the real API returns a result, the API values
   * replace these values automatically.
   */

  const [liveHeartRate, setLiveHeartRate] =
    useState(72);

  const [liveConfidence, setLiveConfidence] =
    useState(94);

  /* ==========================================================
     LIVE HEART RATE
     ========================================================== */

  useEffect(() => {
    /*
     * Don't simulate values while real analysis is
     * processing or after a real result is available.
     */
    if (
      status === "processing" ||
      status === "success"
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setLiveHeartRate((current) => {
        const change =
          Math.floor(Math.random() * 5) - 2;

        const next = current + change;

        return Math.min(
          Math.max(next, 68),
          78
        );
      });
    }, 1200);

    return () => {
      window.clearInterval(interval);
    };
  }, [status]);

  /* ==========================================================
     LIVE CONFIDENCE
     ========================================================== */

  useEffect(() => {
    if (
      status === "processing" ||
      status === "success"
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setLiveConfidence((current) => {
        const change =
          Math.floor(Math.random() * 3) - 1;

        const next = current + change;

        return Math.min(
          Math.max(next, 91),
          97
        );
      });
    }, 1600);

    return () => {
      window.clearInterval(interval);
    };
  }, [status]);

  /* ==========================================================
     REAL API VALUES
     ========================================================== */

  const hasRealResult =
    status === "success" &&
    result !== null;

  const realHeartRate =
    hasRealResult
      ? result.heartRate
      : null;

  const realConfidence =
    hasRealResult
      ? normalizeConfidence(result.confidence)
      : null;

  const realRhythm =
    hasRealResult
      ? result.rhythm
      : null;

  /*
   * Display values.
   *
   * Before API result:
   * simulated live values.
   *
   * After API result:
   * real backend values.
   */
  const displayHeartRate =
    hasRealResult
      ? realHeartRate
      : liveHeartRate;

  const displayConfidence =
    hasRealResult
      ? realConfidence ?? 0
      : liveConfidence;

  const displayRhythm =
    hasRealResult
      ? realRhythm ?? "Not available"
      : "Normal";

  const isProcessing =
    status === "processing";

  const isError =
    status === "error";

  const statusText = useMemo(() => {
    if (isProcessing) {
      return "Analyzing";
    }

    if (hasRealResult) {
      return "Analyzed";
    }

    if (isError) {
      return "Error";
    }

    return "Live";
  }, [
    isProcessing,
    hasRealResult,
    isError,
  ]);

  return (
<section className="relative w-full overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-[28px]">      {/* ======================================================
          BACKGROUND GLOW
      ======================================================= */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-cyan-100/40 blur-3xl" />

      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="relative flex items-start justify-between gap-4 px-6 pb-5 pt-7 sm:px-8">
        <div>
          <div className="flex items-center gap-2">
            <Activity
              size={14}
              className="text-blue-600"
            />

            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">
              ECG Monitoring
            </p>
          </div>

          <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
            AI Analysis Preview
          </h2>
        </div>

        {/* Status */}
        <div
          className={[
            "flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold",
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
              <Loader2
                size={14}
                className="animate-spin"
              />

              Analyzing
            </>
          ) : hasRealResult ? (
            <>
              <CheckCircle2 size={14} />

              Analyzed
            </>
          ) : isError ? (
            <>
              <span className="h-2 w-2 rounded-full bg-red-500" />

              Error
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              Live
            </>
          )}
        </div>
      </div>

      {/* ======================================================
          ECG MONITOR
      ======================================================= */}

      <div className="relative px-6 sm:px-8">
        <div className="h-[220px] overflow-hidden rounded-2xl border border-blue-100 bg-white sm:h-[250px]">
          <ECGWaveform />
        </div>
      </div>

      {/* ======================================================
          LIVE METRICS
      ======================================================= */}

      <div className="relative grid grid-cols-1 gap-3 px-6 pb-7 pt-6 sm:grid-cols-3 sm:px-8 sm:pb-8">
        {/* Heart Rate */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Heart Rate
            </p>

            <Activity
              size={14}
              className="text-slate-400"
            />
          </div>

          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
              {isProcessing
                ? "--"
                : displayHeartRate ?? "--"}
            </span>

            <span className="text-sm font-semibold text-slate-500">
              bpm
            </span>
          </div>

          {!hasRealResult &&
            !isProcessing && (
              <p className="mt-1 text-[9px] font-medium text-slate-400">
                Live monitor
              </p>
            )}
        </div>

        {/* Rhythm */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600">
              Rhythm
            </p>

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </div>

          <p className="mt-2 truncate text-xl font-bold tracking-tight text-emerald-700 sm:text-2xl">
            {isProcessing
              ? "Analyzing..."
              : displayRhythm}
          </p>
        </div>

        {/* Confidence */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-600">
              Confidence
            </p>

            <BrainCircuit
              size={15}
              className="text-blue-500"
            />
          </div>

          <p className="mt-2 text-2xl font-bold tracking-tight text-blue-600 tabular-nums">
            {isProcessing
              ? "--"
              : `${Math.round(displayConfidence)}%`}
          </p>

          {!isProcessing && (
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                style={{
                  width: `${displayConfidence}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ======================================================
          LIVE STATUS BAR
      ======================================================= */}

      <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-3 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={[
                "relative flex h-2 w-2",
                isError
                  ? ""
                  : "animate-pulse",
              ].join(" ")}
            >
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

            <span className="text-[10px] font-semibold text-slate-500">
              {statusText} ECG monitoring
            </span>
          </div>

          <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-300">
            Real-time preview
          </span>
        </div>
      </div>
    </section>
  );
}

export default ECGAnalysisPreview;
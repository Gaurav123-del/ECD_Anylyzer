import {
  Activity,
  CheckCircle2,
  HeartPulse,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import type {
  AnalysisState,
} from "../../types/ecg";

import Button from "../common/Button";
import Card from "../common/Card";
import Disclaimer from "../common/Disclaimer";
import Loading from "../common/Loading";

/*
 * ============================================================
 * PROPS
 * ============================================================
 */

interface AnalysisPanelProps {
  analysis: AnalysisState;
  onAnalyze: () => void;
}

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function formatConfidence(
  confidence: number
): string {
  /*
   * Supports both:
   * 0.95  -> 95%
   * 95    -> 95%
   */
  const percentage =
    confidence <= 1
      ? confidence * 100
      : confidence;

  return `${percentage.toFixed(1)}%`;
}

function getConfidenceWidth(
  confidence: number
): string {
  const percentage =
    confidence <= 1
      ? confidence * 100
      : confidence;

  return `${Math.min(
    Math.max(percentage, 0),
    100
  )}%`;
}

/*
 * ============================================================
 * ANALYSIS PANEL
 * ============================================================
 */

function AnalysisPanel({
  analysis,
  onAnalyze,
}: AnalysisPanelProps) {
  const {
    status,
    result,
    error,
  } = analysis;

  /*
   * ==========================================================
   * IDLE STATE
   * ==========================================================
   */

  if (status === "idle") {
    return (
      <div className="space-y-4">
        <Card padding="lg">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Sparkles
                className="h-5 w-5 text-blue-600"
                aria-hidden="true"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                AI ECG Analysis
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Analyze the uploaded ECG using the connected
                AI analysis service.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={onAnalyze}
            >
              <Activity
                className="h-4 w-4"
                aria-hidden="true"
              />

              Analyze ECG
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck
              className="h-4 w-4"
              aria-hidden="true"
            />

            Secure analysis
          </div>
        </Card>

        <Disclaimer compact />
      </div>
    );
  }

  /*
   * ==========================================================
   * PROCESSING STATE
   * ==========================================================
   */

  if (status === "processing") {
    return (
      <div className="space-y-4">
        <Card padding="lg">
          <Loading
            text="Analyzing your ECG..."
            size="lg"
          />

          <div className="mt-6 rounded-xl bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Sparkles
                className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                aria-hidden="true"
              />

              <p className="text-xs leading-5 text-slate-600">
                The ECG is being processed. Please keep this
                page open until the analysis is complete.
              </p>
            </div>
          </div>
        </Card>

        <Disclaimer compact />
      </div>
    );
  }

  /*
   * ==========================================================
   * ERROR STATE
   * ==========================================================
   */

  if (status === "error") {
    return (
      <div className="space-y-4">
        <Card padding="lg">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
              <RefreshCw
                className="h-5 w-5 text-red-600"
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold text-slate-900">
                Analysis Failed
              </h2>

              <p className="mt-1 text-sm leading-5 text-red-600">
                {error ??
                  "Unable to analyze this ECG."}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={onAnalyze}
            >
              <RefreshCw
                className="h-4 w-4"
                aria-hidden="true"
              />

              Try Again
            </Button>
          </div>
        </Card>

        <Disclaimer compact />
      </div>
    );
  }

  /*
   * ==========================================================
   * SUCCESS STATE
   * ==========================================================
   */

  if (
    status === "success" &&
    result
  ) {
    return (
      <div className="space-y-4">
        {/* ====================================================
            RESULT HEADER
            ==================================================== */}

        <Card padding="lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2
                  className="h-5 w-5 text-emerald-600"
                  aria-hidden="true"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Analysis Result
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {result.prediction}
                </h2>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Complete
            </span>
          </div>

          {/* ==================================================
              CONFIDENCE
              ================================================== */}

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Confidence
              </span>

              <span className="text-sm font-bold text-slate-900">
                {formatConfidence(
                  result.confidence
                )}
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{
                  width:
                    getConfidenceWidth(
                      result.confidence
                    ),
                }}
              />
            </div>
          </div>
        </Card>

        {/* ====================================================
            VITALS
            ==================================================== */}

        <div className="grid grid-cols-2 gap-3">
          <Card
            padding="md"
            className="min-w-0"
          >
            <div className="flex items-center gap-2">
              <HeartPulse
                className="h-4 w-4 text-red-500"
                aria-hidden="true"
              />

              <span className="text-xs font-medium text-slate-500">
                Heart Rate
              </span>
            </div>

            <div className="mt-3">
              {result.heartRate !== null ? (
                <>
                  <span className="text-2xl font-bold text-slate-900">
                    {result.heartRate}
                  </span>

                  <span className="ml-1 text-xs text-slate-400">
                    BPM
                  </span>
                </>
              ) : (
                <span className="text-sm text-slate-400">
                  Not available
                </span>
              )}
            </div>
          </Card>

          <Card
            padding="md"
            className="min-w-0"
          >
            <div className="flex items-center gap-2">
              <Activity
                className="h-4 w-4 text-blue-600"
                aria-hidden="true"
              />

              <span className="text-xs font-medium text-slate-500">
                Rhythm
              </span>
            </div>

            <div className="mt-3">
              <p className="truncate text-sm font-semibold text-slate-900">
                {result.rhythm ??
                  "Not available"}
              </p>
            </div>
          </Card>
        </div>

        {/* ====================================================
            FINDINGS
            ==================================================== */}

        <Card padding="lg">
          <h3 className="text-sm font-semibold text-slate-900">
            Findings
          </h3>

          {result.findings.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {result.findings.map(
                (finding, index) => (
                  <li
                    key={`${finding}-${index}`}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                      aria-hidden="true"
                    />

                    <span className="text-sm leading-5 text-slate-600">
                      {finding}
                    </span>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-400">
              No findings were returned by the analysis
              service.
            </p>
          )}
        </Card>

        {/* ====================================================
            ANALYZE AGAIN
            ==================================================== */}

        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={onAnalyze}
        >
          <RefreshCw
            className="h-4 w-4"
            aria-hidden="true"
          />

          Analyze Again
        </Button>

        {/* ====================================================
            DISCLAIMER
            ==================================================== */}

        <Disclaimer compact>
          AI-generated ECG analysis is provided for
          informational purposes only. It does not constitute
          a medical diagnosis. Results should be reviewed and
          interpreted by a qualified healthcare professional.
        </Disclaimer>
      </div>
    );
  }

  /*
   * ==========================================================
   * FALLBACK
   * ==========================================================
   */

  return (
    <Card padding="lg">
      <p className="text-sm text-slate-500">
        ECG analysis is ready.
      </p>
    </Card>
  );
}

export default AnalysisPanel;
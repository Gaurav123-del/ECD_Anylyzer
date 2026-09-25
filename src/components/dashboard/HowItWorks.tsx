import {
  Activity,
  BrainCircuit,
  FileSearch,
  Upload,
} from "lucide-react";

import Card from "../common/Card";

/*
 * ============================================================
 * TYPES
 * ============================================================
 */

interface Step {
  number: string;
  title: string;
  description: string;
  icon: typeof Upload;
}

/*
 * ============================================================
 * STEPS
 * ============================================================
 */

const steps: Step[] = [
  {
    number: "01",
    title: "Upload ECG",
    description:
      "Upload a supported ECG image or PDF from your device.",
    icon: Upload,
  },
  {
    number: "02",
    title: "View & Inspect",
    description:
      "Use zoom, pan, page navigation, and fullscreen controls to inspect the ECG.",
    icon: FileSearch,
  },
  {
    number: "03",
    title: "AI Analysis",
    description:
      "Send the ECG to the connected AI analysis service and receive structured results.",
    icon: BrainCircuit,
  },
];

/*
 * ============================================================
 * ECG WAVEFORM
 * ============================================================
 */

function ECGWaveform() {
  return (
    <div className="overflow-hidden rounded-xl border border-blue-100 bg-blue-50/60 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Activity
          className="h-4 w-4 text-blue-600"
          aria-hidden="true"
        />

        <span className="text-xs font-semibold text-slate-600">
          ECG Preview
        </span>
      </div>

      <svg
        viewBox="0 0 600 150"
        className="h-auto w-full"
        role="img"
        aria-label="Illustrative ECG waveform"
      >
        <path
          d="M0 82 H55 L68 81 L78 78 L90 82 H135 L148 82 L160 48 L171 120 L185 18 L200 82 H250 L263 82 L275 80 L286 78 L298 82 H340 L353 82 L365 48 L376 120 L390 18 L405 82 H455 L468 82 L480 80 L492 78 L505 82 H600"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500"
        />
      </svg>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
        <span>Illustrative waveform</span>
        <span>For UI demonstration</span>
      </div>
    </div>
  );
}

/*
 * ============================================================
 * HOW IT WORKS
 * ============================================================
 */

function HowItWorks() {
  return (
    <Card
      padding="lg"
      className="h-fit"
    >
      {/* ======================================================
          HEADER
          ====================================================== */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Simple workflow
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          How It Works
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Analyze an ECG in three straightforward steps.
        </p>
      </div>

      {/* ======================================================
          STEPS
          ====================================================== */}

      <div className="mt-6 space-y-5">
        {steps.map(
          ({
            number,
            title,
            description,
            icon: Icon,
          }) => (
            <div
              key={number}
              className="flex gap-4"
            >
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Icon
                    className="h-5 w-5 text-blue-600"
                    aria-hidden="true"
                  />
                </div>

                {number !== "03" && (
                  <div className="absolute left-1/2 top-10 h-5 w-px -translate-x-1/2 bg-slate-200" />
                )}
              </div>

              <div className="min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-blue-600">
                    {number}
                  </span>

                  <h3 className="text-sm font-semibold text-slate-900">
                    {title}
                  </h3>
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {description}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {/* ======================================================
          ECG PREVIEW
          ====================================================== */}

      <div className="mt-7">
        <ECGWaveform />
      </div>

      {/* ======================================================
          STATUS
          ====================================================== */}

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5">
        <span
          className="h-2 w-2 rounded-full bg-emerald-500"
          aria-hidden="true"
        />

        <p className="text-xs text-slate-500">
          Ready for ECG upload
        </p>
      </div>
    </Card>
  );
}

export default HowItWorks;
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  Upload,
} from "lucide-react";

import Card from "../common/Card";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your ECG",
    description:
      "Select a JPG, PNG, or PDF ECG report from your device.",
  },
  {
    number: "02",
    icon: Activity,
    title: "View the recording",
    description:
      "Inspect the ECG using zoom, pan, page navigation, and fullscreen controls.",
  },
  {
    number: "03",
    icon: BrainCircuit,
    title: "Run AI analysis",
    description:
      "Send the ECG to the connected analysis service for AI-assisted processing.",
  },
  {
    number: "04",
    icon: FileSearch,
    title: "Review results",
    description:
      "Review prediction, confidence, heart rate, rhythm, and available findings.",
  },
];

function ECGWaveform() {
  return (
    <svg
      viewBox="0 0 900 180"
      className="h-auto w-full"
      role="img"
      aria-label="Illustrative ECG waveform"
      fill="none"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="ecg-small-grid"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M18 0L0 0 0 18"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-blue-100"
          />
        </pattern>

        <pattern
          id="ecg-large-grid"
          width="90"
          height="90"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="90"
            height="90"
            fill="url(#ecg-small-grid)"
          />

          <path
            d="M90 0L0 0 0 90"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-200"
          />
        </pattern>
      </defs>

      <rect
        width="900"
        height="180"
        fill="url(#ecg-large-grid)"
      />

      <path
        d="
          M0 90
          L55 90
          L70 87
          L82 90
          L100 90
          L115 72
          L125 108
          L137 90
          L195 90

          L210 90
          L225 86
          L238 90
          L258 90
          L275 35
          L287 145
          L300 90
          L360 90

          L375 90
          L390 87
          L403 90
          L423 90
          L438 72
          L450 108
          L462 90
          L520 90

          L535 90
          L550 86
          L563 90
          L583 90
          L600 35
          L612 145
          L625 90
          L685 90

          L700 90
          L715 87
          L728 90
          L748 90
          L763 72
          L775 108
          L787 90
          L845 90

          L860 90
          L875 86
          L888 90
          L900 90
        "
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-600"
      />

      <path
        d="M0 90H900"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="4 8"
        className="text-blue-300/50"
      />
    </svg>
  );
}

function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="relative w-full min-w-0 py-4 sm:py-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <div className="mx-auto max-w-3xl px-1 text-center sm:px-0">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-700 sm:px-3.5 sm:text-[10px]">
            <Activity size={12} />
            Simple Workflow
          </div>

          <h2
            id="how-it-works-heading"
            className="mt-4 text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:mt-5 sm:text-3xl lg:text-4xl"
          >
            From ECG upload to
            <span className="text-blue-600">
              {" "}
              structured insights
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-slate-500 sm:mt-4 sm:text-sm sm:leading-7 lg:text-base">
            Follow a simple four-step workflow to upload, inspect, analyze,
            and review your ECG report.
          </p>
        </div>

        <div className="relative mt-7 sm:mt-10 lg:mt-12">
          <div className="absolute left-[12.5%] right-[12.5%] top-[46px] hidden h-px bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 lg:block" />

          <div className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative min-w-0"
                >
                  <Card
                    padding="none"
                    className="relative h-full min-w-0 overflow-hidden border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                  >
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-70 transition-opacity group-hover:opacity-100" />

                    <div className="p-4 sm:p-5 lg:p-6">
                      <div className="flex items-center justify-between">
                        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/20 sm:h-12 sm:w-12">
                          <Icon
                            size={20}
                            strokeWidth={2}
                            className="sm:h-[21px] sm:w-[21px]"
                          />
                        </div>

                        <span className="text-2xl font-bold tracking-tight text-slate-100 transition-colors group-hover:text-blue-50 sm:text-3xl">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="mt-5 text-sm font-bold tracking-tight text-slate-900 sm:mt-6 sm:text-[15px]">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-slate-500 sm:mt-2.5 sm:text-sm sm:leading-6">
                        {step.description}
                      </p>

                      {index < steps.length - 1 && (
                        <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-300 transition-colors group-hover:text-blue-500 sm:mt-5 sm:text-[10px]">
                          <span>Next step</span>
                          <ArrowRight size={12} />
                        </div>
                      )}

                      {index === steps.length - 1 && (
                        <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600 sm:mt-5 sm:text-[10px]">
                          <CheckCircle2 size={13} />
                          Complete
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-sky-50 p-3.5 shadow-sm sm:mt-10 sm:p-5 lg:p-6">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-200/20 blur-3xl" />

          <div className="relative mb-4 flex min-w-0 flex-col justify-between gap-3 sm:mb-5 sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <Activity size={15} />
                </div>

                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-blue-600 sm:text-[10px]">
                  ECG Preview
                </p>
              </div>

              <p className="mt-2 text-sm font-bold text-slate-800 sm:text-base">
                High-resolution waveform visualization
              </p>

              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                Designed for focused waveform inspection.
              </p>
            </div>

            <div className="flex w-fit max-w-full items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[9px] font-bold text-emerald-700 shadow-sm sm:text-[10px]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Ready for ECG upload
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
            <ECGWaveform />
          </div>

          <div className="relative mt-3 flex flex-col gap-2.5 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
            <div className="flex items-center gap-2 text-[9px] font-medium text-slate-400 sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              ECG waveform preview
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[9px] font-medium text-slate-400 sm:gap-3 sm:text-[10px]">
              <span>Upload</span>
              <ArrowRight size={11} />
              <span>Analyze</span>
              <ArrowRight size={11} />
              <span>Review</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
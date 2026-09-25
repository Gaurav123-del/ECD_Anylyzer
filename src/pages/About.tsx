import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileSearch,
  FileText,
  ShieldCheck,
  Upload,
  Waves,
} from "lucide-react";

import Header from "../components/layout/Header";
import Disclaimer from "../components/common/Disclaimer";

const workflow = [
  {
    number: "01",
    icon: Upload,
    title: "Upload ECG",
    description:
      "Upload an ECG image or PDF report through the secure upload interface.",
  },
  {
    number: "02",
    icon: Activity,
    title: "Review Waveform",
    description:
      "View the uploaded ECG with zoom, pan, and fullscreen controls.",
  },
  {
    number: "03",
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Send the ECG to the configured analysis service for AI-assisted interpretation.",
  },
  {
    number: "04",
    icon: FileSearch,
    title: "Review Results",
    description:
      "Review the prediction, confidence, heart rate, rhythm, and reported findings.",
  },
];

const features = [
  {
    icon: Activity,
    title: "ECG Viewer",
    description:
      "Interactive ECG viewing with zoom, pan, reset, and fullscreen support.",
    accent: "from-blue-500 to-cyan-400",
    iconClass: "text-blue-600",
    iconBackground: "bg-blue-50",
  },
  {
    icon: BrainCircuit,
    title: "AI-Assisted Analysis",
    description:
      "Connects to an analysis API to return structured ECG analysis results.",
    accent: "from-indigo-500 to-violet-400",
    iconClass: "text-indigo-600",
    iconBackground: "bg-indigo-50",
  },
  {
    icon: Clock3,
    title: "Analysis History",
    description:
      "Previously analyzed ECG results can be reviewed from the local history page.",
    accent: "from-emerald-500 to-teal-400",
    iconClass: "text-emerald-600",
    iconBackground: "bg-emerald-50",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Focused",
    description:
      "Browser-side history storage keeps saved analysis records on the user's device.",
    accent: "from-cyan-500 to-sky-400",
    iconClass: "text-cyan-600",
    iconBackground: "bg-cyan-50",
  },
];

const technologies = [
  "React + TypeScript",
  "Vite",
  "Tailwind CSS",
  "Axios API integration",
  "PDF.js ECG viewing",
  "Browser local history",
];

function ECGPreview() {
  return (
    <div className="relative min-w-0 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/95 px-2.5 py-1.5 text-[9px] font-bold text-emerald-700 shadow-sm backdrop-blur sm:right-5 sm:top-5 sm:gap-2 sm:px-3 sm:text-[10px]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        ECG Ready
      </div>

      <div className="border-b border-slate-100 bg-slate-50/70 px-3.5 py-3.5 sm:px-5 sm:py-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-9 sm:w-9">
            <Activity size={16} className="sm:h-[17px] sm:w-[17px]" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900">ECG Preview</p>
            <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[10px]">
              Interactive waveform workspace
            </p>
          </div>
        </div>
      </div>

      <div className="p-2.5 sm:p-5">
        <div className="min-w-0 overflow-hidden rounded-xl border border-blue-100 bg-white">
          <svg
            viewBox="0 0 900 260"
            className="h-auto w-full"
            role="img"
            aria-label="Decorative ECG waveform"
          >
            <defs>
              <pattern
                id="about-small-grid"
                width="18"
                height="18"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M18 0L0 0 0 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  className="text-blue-100"
                />
              </pattern>

              <pattern
                id="about-large-grid"
                width="90"
                height="90"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  width="90"
                  height="90"
                  fill="url(#about-small-grid)"
                />
                <path
                  d="M90 0L0 0 0 90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-blue-200"
                />
              </pattern>
            </defs>

            <rect
              width="900"
              height="260"
              fill="url(#about-large-grid)"
            />

            <path
              d="
                M0 135
                L70 135
                L88 135
                L98 125
                L108 145
                L120 135
                L180 135
                L200 135
                L212 125
                L220 145
                L232 135
                L270 135
                L280 132
                L290 135
                L300 135
                L312 60
                L324 190
                L338 135
                L390 135
                L410 135
                L425 125
                L435 145
                L447 135
                L510 135
                L530 135
                L542 125
                L550 145
                L562 135
                L600 135
                L612 132
                L620 135
                L632 60
                L644 190
                L658 135
                L710 135
                L730 135
                L742 125
                L752 145
                L764 135
                L820 135
                L840 135
                L852 125
                L862 145
                L874 135
                L900 135
              "
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            />

            <path
              d="M0 135H900"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              className="text-blue-300/50"
            />
          </svg>
        </div>

        <div className="mt-3 flex min-w-0 flex-col gap-2.5 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
          <div className="flex items-center gap-2 text-[9px] font-semibold text-slate-400 sm:text-[10px]">
            <Waves size={13} className="text-blue-500" />
            High-resolution waveform
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300 sm:text-[10px]">
            <span>Zoom</span>
            <span>•</span>
            <span>Pan</span>
            <span>•</span>
            <span>Fullscreen</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-[#f7faff] text-slate-900">
      <Header />

      <main className="w-full min-w-0">
        <section className="relative min-w-0 overflow-hidden border-b border-blue-100 bg-white">
          <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />

          <div className="relative mx-auto w-full max-w-7xl min-w-0 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
              <div className="min-w-0">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-700 sm:px-3.5 sm:text-[10px]">
                  <Activity size={12} />
                  About ECG Analyzer
                </div>

                <h1 className="mt-5 text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                  A focused interface for
                  <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                    ECG analysis
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-xs leading-6 text-slate-500 sm:mt-6 sm:text-base sm:leading-7">
                  ECG Analyzer provides a focused workflow for uploading ECG
                  reports, reviewing ECG files, requesting AI-assisted analysis,
                  and viewing previous analysis results.
                </p>

                <div className="mt-6 flex min-w-0 flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap">
                  <a
                    href="/"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
                  >
                    Analyze an ECG
                    <ArrowRight size={14} />
                  </a>

                  <a
                    href="/history"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Clock3 size={14} />
                    View History
                  </a>
                </div>

                <div className="mt-6 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-400 sm:mt-8 sm:gap-x-5 sm:text-[10px]">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck
                      size={13}
                      className="text-emerald-500"
                    />
                    Privacy focused
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <BrainCircuit
                      size={13}
                      className="text-blue-500"
                    />
                    AI-assisted workflow
                  </span>
                </div>
              </div>

              <ECGPreview />
            </div>
          </div>
        </section>

        <section className="relative min-w-0 py-10 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
            <div className="grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-700 sm:text-[10px]">
                  <FileText size={12} />
                  What It Does
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:mt-5 sm:text-4xl">
                  From ECG upload to
                  <span className="text-blue-600">
                    {" "}
                    structured results
                  </span>
                </h2>

                <p className="mt-4 text-xs leading-6 text-slate-500 sm:mt-5 sm:text-base sm:leading-7">
                  The application brings ECG file handling, visualization, and
                  analysis into one frontend workflow. Users can upload
                  supported ECG files, inspect them using the viewer, and run
                  analysis when an ECG is available.
                </p>

                <p className="mt-3 text-xs leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
                  Analysis results are presented in a structured format,
                  including prediction, confidence, heart rate, rhythm, and
                  findings when provided by the analysis service.
                </p>

                <div className="mt-5 grid min-w-0 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3">
                  {[
                    "Upload supported ECG files",
                    "Inspect waveform details",
                    "Request AI-assisted analysis",
                    "Review structured results",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm"
                    >
                      <CheckCircle2
                        size={15}
                        className="shrink-0 text-emerald-500"
                      />

                      <span className="min-w-0 text-xs font-semibold text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-w-0">
                <div className="absolute -inset-4 rounded-3xl bg-blue-100/40 blur-2xl" />

                <div className="relative min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:rounded-3xl sm:p-6">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900">
                        Analysis Workspace
                      </p>

                      <p className="mt-1 truncate text-[9px] text-slate-400 sm:text-[10px]">
                        Upload → View → Analyze → Review
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <BrainCircuit size={17} />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3">
                    {workflow.map((step, index) => {
                      const Icon = step.icon;

                      return (
                        <div
                          key={step.number}
                          className="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 sm:gap-3"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                            <Icon size={16} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-800">
                              {step.title}
                            </p>

                            <p className="mt-0.5 truncate text-[9px] text-slate-400 sm:text-[10px]">
                              {step.description}
                            </p>
                          </div>

                          <span className="shrink-0 text-[9px] font-bold text-slate-300 sm:text-[10px]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative min-w-0 overflow-hidden border-y border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-7xl min-w-0 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-700 sm:px-3.5 sm:text-[10px]">
                <Activity size={12} />
                Workflow
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:mt-5 sm:text-4xl">
                How ECG Analyzer
                <span className="text-blue-600"> works</span>
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
                A straightforward four-step workflow from file upload to
                analysis review.
              </p>
            </div>

            <div className="relative mt-7 sm:mt-10 lg:mt-12">
              <div className="absolute left-[12.5%] right-[12.5%] top-[46px] hidden h-px bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 lg:block" />

              <div className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
                {workflow.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.number}
                      className="group relative min-w-0"
                    >
                      <div className="relative h-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                        <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-70 transition-opacity group-hover:opacity-100" />

                        <div className="p-4 sm:p-6">
                          <div className="flex items-center justify-between">
                            <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/20 sm:h-12 sm:w-12">
                              <Icon size={20} />
                            </div>

                            <span className="text-2xl font-bold text-slate-100 transition-colors group-hover:text-blue-50 sm:text-3xl">
                              {step.number}
                            </span>
                          </div>

                          <h3 className="mt-5 text-sm font-bold text-slate-900 sm:mt-6 sm:text-[15px]">
                            {step.title}
                          </h3>

                          <p className="mt-2 text-xs leading-5 text-slate-500 sm:mt-2.5 sm:text-sm sm:leading-6">
                            {step.description}
                          </p>

                          <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300 transition-colors group-hover:text-blue-500 sm:mt-5 sm:text-[10px]">
                            <span>
                              {index === workflow.length - 1
                                ? "Complete"
                                : "Next step"}
                            </span>

                            {index < workflow.length - 1 ? (
                              <ArrowRight size={11} />
                            ) : (
                              <CheckCircle2 size={12} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative min-w-0 py-10 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-700 sm:px-3.5 sm:text-[10px]">
                <ShieldCheck size={12} />
                Platform Features
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:mt-5 sm:text-4xl">
                Built around the
                <span className="text-blue-600"> ECG workflow</span>
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
                A focused set of capabilities designed around ECG upload,
                visualization, analysis, and review.
              </p>
            </div>

            <div className="mt-7 grid min-w-0 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                  >
                    <div
                      className={`h-1 bg-gradient-to-r ${feature.accent} opacity-70 transition-opacity group-hover:opacity-100`}
                    />

                    <div className="relative p-4 sm:p-6">
                      <span className="absolute right-4 top-4 text-2xl font-bold text-slate-100 transition-colors group-hover:text-blue-50 sm:right-5 sm:top-5 sm:text-3xl">
                        0{index + 1}
                      </span>

                      <div
                        className={[
                          "flex h-11 w-11 items-center justify-center rounded-xl border border-white shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 sm:h-12 sm:w-12",
                          feature.iconBackground,
                          feature.iconClass,
                        ].join(" ")}
                      >
                        <Icon size={20} />
                      </div>

                      <h3 className="mt-5 pr-7 text-sm font-bold text-slate-900 sm:mt-6 sm:text-[15px]">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-slate-500 sm:mt-2.5 sm:text-sm sm:leading-6">
                        {feature.description}
                      </p>

                      <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300 transition-colors group-hover:text-blue-600 sm:mt-5 sm:text-[10px]">
                        <span>Platform capability</span>
                        <ArrowRight size={11} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative min-w-0 overflow-hidden border-y border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-7xl min-w-0 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-700 sm:px-3.5 sm:text-[10px]">
                  <BrainCircuit size={12} />
                  Technology
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:mt-5 sm:text-4xl">
                  Modern web
                  <span className="text-blue-600"> architecture</span>
                </h2>

                <p className="mt-4 max-w-xl text-xs leading-6 text-slate-500 sm:mt-5 sm:text-base sm:leading-7">
                  The frontend is designed as a component-based React
                  application with a responsive interface and separated
                  services, hooks, utilities, and data types.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-700 sm:mt-6 sm:text-[10px]">
                  <ShieldCheck size={13} />
                  Component-based frontend
                </div>
              </div>

              <div className="grid min-w-0 gap-2.5 sm:grid-cols-2 sm:gap-3">
                {technologies.map((technology, index) => (
                  <div
                    key={technology}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3.5 transition-all hover:border-blue-200 hover:bg-blue-50/50 sm:px-4 sm:py-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="min-w-0 text-xs font-semibold text-slate-700 sm:text-sm">
                      {technology}
                    </span>

                    <span className="ml-auto shrink-0 text-[9px] font-bold text-slate-200 transition-colors group-hover:text-blue-200 sm:text-[10px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl min-w-0 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <Disclaimer title="Important Medical Disclaimer">
            <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="min-w-0 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                ECG Analyzer is intended for informational and educational
                purposes. AI-assisted results are not a medical diagnosis and
                should not replace evaluation by a qualified healthcare
                professional. If you have emergency symptoms, seek immediate
                medical attention.
              </p>
            </div>
          </Disclaimer>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-3 px-4 py-6 sm:px-6 sm:py-7 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Activity size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800">
                ECG Analyzer
              </p>

              <p className="text-[9px] text-slate-400 sm:text-[10px]">
                AI-assisted ECG analysis platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-400 sm:text-[10px]">
            <ShieldCheck size={13} />
            Informational use only
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
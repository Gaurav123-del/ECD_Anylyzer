import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import Card from "../common/Card";

interface Feature {
  icon:
    | typeof Activity
    | typeof BrainCircuit
    | typeof Clock3
    | typeof ShieldCheck;
  title: string;
  description: string;
  iconClass: string;
  iconBackground: string;
  accent: string;
}

const features: Feature[] = [
  {
    icon: Activity,
    title: "High-Resolution ECG Viewer",
    description:
      "Inspect ECG images and PDF reports with smooth zoom, pan, and fullscreen controls for detailed waveform review.",
    iconClass: "text-blue-600",
    iconBackground: "bg-blue-50",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    icon: BrainCircuit,
    title: "AI-Assisted Analysis",
    description:
      "Run automated analysis and receive structured results including prediction, confidence, rhythm, and findings.",
    iconClass: "text-indigo-600",
    iconBackground: "bg-indigo-50",
    accent: "from-indigo-500 to-violet-400",
  },
  {
    icon: Clock3,
    title: "Analysis History",
    description:
      "Keep previous ECG analyses organized locally so earlier results and findings can be reviewed quickly.",
    iconClass: "text-emerald-600",
    iconBackground: "bg-emerald-50",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Designed around privacy-conscious handling with transparent workflows and clear medical-use limitations.",
    iconClass: "text-cyan-600",
    iconBackground: "bg-cyan-50",
    accent: "from-cyan-500 to-sky-400",
  },
];

function FeatureCards() {
  return (
    <section
      aria-labelledby="features-heading"
      className="relative w-full min-w-0 py-4 sm:py-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <div className="mx-auto max-w-3xl px-1 text-center sm:px-0">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-700 sm:px-3.5 sm:text-[10px]">
            <Activity size={12} />
            Platform Features
          </div>

          <h2
            id="features-heading"
            className="mt-4 text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:mt-5 sm:text-3xl lg:text-4xl"
          >
            A focused workspace for
            <span className="text-blue-600"> smarter ECG review</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-slate-500 sm:mt-4 sm:text-sm sm:leading-7 lg:text-base">
            Everything you need to upload, inspect, analyze, and review ECG
            records through one clean clinical interface.
          </p>
        </div>

        <div className="mt-7 grid min-w-0 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                padding="none"
                className="group relative h-full min-w-0 overflow-hidden border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)]"
              >
                <div
                  className={`h-1 w-full bg-gradient-to-r ${feature.accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative p-4 sm:p-5 lg:p-6">
                  <div className="absolute right-4 top-4 text-[9px] font-bold text-slate-200 transition-colors group-hover:text-blue-100 sm:right-5 sm:top-5 sm:text-[10px]">
                    0{index + 1}
                  </div>

                  <div className="relative">
                    <div
                      className={[
                        "absolute inset-0 h-11 w-11 rounded-xl opacity-30 blur-xl transition-opacity group-hover:opacity-60 sm:h-12 sm:w-12",
                        feature.iconBackground,
                      ].join(" ")}
                    />

                    <div
                      className={[
                        "relative flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 sm:h-12 sm:w-12",
                        feature.iconBackground,
                        feature.iconClass,
                        "border-white",
                      ].join(" ")}
                    >
                      <Icon
                        size={20}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="sm:h-[21px] sm:w-[21px]"
                      />
                    </div>
                  </div>

                  <h3 className="mt-5 pr-6 text-sm font-bold tracking-tight text-slate-900 sm:mt-6 sm:text-[15px]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500 sm:mt-2.5 sm:text-sm sm:leading-6">
                    {feature.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 transition-colors group-hover:text-blue-600 sm:mt-5 sm:text-[11px]">
                    <span>Explore capability</span>

                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-5 flex min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 via-white to-sky-50/70 px-4 py-3.5 text-center sm:mt-8 sm:flex-row sm:px-5 sm:py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
            <ShieldCheck size={16} />
          </div>

          <p className="text-[11px] leading-5 text-slate-500 sm:text-xs">
            Built for structured ECG review with a simple, focused, and
            transparent workflow.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeatureCards;
import {
  Activity,
  Brain,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "High-resolution ECG viewer",
    description:
      "View your ECG with smooth zoom, pan and multi-page PDF support.",
    points: [
      "Zoom & pan",
      "Multi-page support",
    ],
    style:
      "border-blue-200 bg-blue-50/30",
    iconStyle:
      "bg-blue-100 text-blue-600",
  },
  {
    icon: Brain,
    title: "AI-assisted analysis",
    description:
      "Detect key heart patterns using advanced AI models.",
    points: [
      "Rhythm analysis",
      "Key findings",
    ],
    style:
      "border-emerald-200 bg-emerald-50/30",
    iconStyle:
      "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Clock3,
    title: "Analysis history",
    description:
      "Access and manage your previous ECG analyses.",
    points: [
      "View past results",
      "Track progress",
    ],
    style:
      "border-violet-200 bg-violet-50/30",
    iconStyle:
      "bg-violet-100 text-violet-600",
  },
];

function FeatureCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className={`rounded-2xl border p-5 ${feature.style}`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${feature.iconStyle}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {feature.description}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {feature.points.map((point) => (
                <span
                  key={point}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
                >
                 <CheckCircle2
  className={`h-4 w-4 ${
    feature.title === "High-resolution ECG viewer"
      ? "text-blue-600"
      : feature.title === "AI-assisted analysis"
        ? "text-emerald-600"
        : "text-violet-600"
  }`}
/>
                  {point}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FeatureCards;
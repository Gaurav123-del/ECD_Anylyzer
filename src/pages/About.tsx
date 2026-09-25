import {
  Activity,
  BrainCircuit,
  FileCheck2,
  HeartPulse,
  ShieldCheck,
  Upload,
} from "lucide-react";

import Header from "../components/layout/Header";
import Card from "../components/common/Card";
import Disclaimer from "../components/common/Disclaimer";

interface Feature {
  icon: typeof Activity;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Upload,
    title: "Simple ECG Upload",
    description:
      "Upload supported ECG images or PDF documents directly from the dashboard.",
  },
  {
    icon: Activity,
    title: "ECG Viewer",
    description:
      "Inspect ECG documents with zoom, pan, page navigation, and fullscreen viewing.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Assisted Analysis",
    description:
      "Send the uploaded ECG to the connected analysis service and display the returned results.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Workflow",
    description:
      "The frontend validates supported files before sending them to the analysis service.",
  },
];

/*
 * ============================================================
 * ABOUT PAGE
 * ============================================================
 */

function About() {
  return (
    <div className="min-h-screen bg-[#f4f9fd]">
      <Header />

      <main className="mx-auto max-w-[1200px] px-5 py-10 lg:px-8">
        {/* ====================================================
            HERO
            ==================================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.4fr_0.8fr] lg:p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600">
                <HeartPulse
                  className="h-4 w-4"
                  aria-hidden="true"
                />

                ECG Analyzer
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Intelligent ECG
                <span className="text-blue-600">
                  {" "}
                  Analysis
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                ECG Analyzer is a web-based interface for
                uploading, viewing, and analyzing ECG
                documents through a connected AI analysis
                service.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2.5 text-sm text-slate-600">
                  <FileCheck2
                    className="h-4 w-4 text-blue-600"
                    aria-hidden="true"
                  />

                  JPG / PNG / PDF
                </div>

                <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2.5 text-sm text-slate-600">
                  <ShieldCheck
                    className="h-4 w-4 text-emerald-600"
                    aria-hidden="true"
                  />

                  Secure workflow
                </div>
              </div>
            </div>

            {/* ==================================================
                ECG VISUAL
                ================================================== */}

            <div className="flex min-h-[250px] items-center justify-center rounded-2xl bg-blue-50 p-6">
              <div className="w-full max-w-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Activity
                    className="h-5 w-5 text-blue-600"
                    aria-hidden="true"
                  />

                  <span className="text-sm font-semibold text-slate-700">
                    ECG Preview
                  </span>
                </div>

                <svg
                  viewBox="0 0 500 150"
                  className="w-full"
                  role="img"
                  aria-label="Illustrative ECG waveform"
                >
                  <path
                    d="M0 82 H70 L82 80 L92 78 L102 82 H145 L158 82 L170 48 L180 120 L194 18 L208 82 H250 L265 82 L275 80 L286 78 L298 82 H340 L352 82 L364 48 L374 120 L388 18 L402 82 H500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  />
                </svg>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Illustrative waveform</span>
                  <span>Not diagnostic</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            HOW IT WORKS
            ==================================================== */}

        <section className="mt-8">
          <div className="mb-5">
            <p className="text-sm font-semibold text-blue-600">
              How it works
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              From ECG upload to analysis
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              The application separates file handling, document
              viewing, and analysis so each stage remains simple
              and focused.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <Card padding="lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Upload
                  className="h-5 w-5 text-blue-600"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Step 01
              </p>

              <h3 className="mt-1 font-semibold text-slate-900">
                Upload
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Select a supported ECG image or PDF and let
                the application validate the file.
              </p>
            </Card>

            <Card padding="lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <Activity
                  className="h-5 w-5 text-emerald-600"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Step 02
              </p>

              <h3 className="mt-1 font-semibold text-slate-900">
                Inspect
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View the ECG with image or PDF controls,
                including zoom, pan, navigation, and fullscreen.
              </p>
            </Card>

            <Card padding="lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                <BrainCircuit
                  className="h-5 w-5 text-violet-600"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Step 03
              </p>

              <h3 className="mt-1 font-semibold text-slate-900">
                Analyze
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit the ECG to the connected analysis
                service and display its returned findings.
              </p>
            </Card>
          </div>
        </section>

        {/* ====================================================
            FEATURES
            ==================================================== */}

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-sm font-semibold text-blue-600">
              Platform features
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Built for a focused ECG workflow
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map(
              ({
                icon: Icon,
                title,
                description,
              }) => (
                <Card
                  key={title}
                  padding="lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <Icon
                        className="h-5 w-5 text-blue-600"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            )}
          </div>
        </section>

        {/* ====================================================
            TECHNOLOGY
            ==================================================== */}

        <section className="mt-10">
          <Card padding="lg">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Application architecture
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Designed as a modern React frontend
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  The application uses a component-based
                  frontend architecture with dedicated services,
                  hooks, utilities, and typed data models.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Frontend
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    React + TypeScript
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Build
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    Vite
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Styling
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    Tailwind CSS
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    PDF
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    PDF.js
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ====================================================
            MEDICAL DISCLAIMER
            ==================================================== */}

        <section className="mt-8">
          <Disclaimer>
            ECG Analyzer is an AI-assisted software interface
            intended for informational and workflow-support
            purposes. Results are not a medical diagnosis and
            should not be used as a substitute for professional
            medical evaluation, clinical judgment, or emergency
            care.
          </Disclaimer>
        </section>
      </main>
    </div>
  );
}

export default About;
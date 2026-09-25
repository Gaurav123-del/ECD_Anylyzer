import { lazy, Suspense, useCallback, useState } from "react";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileImage,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import Header from "../components/layout/Header";
import UploadZone from "../components/upload/UploadZone";
import ECGViewer from "../components/ecg/ECGViewer";
import AnalysisPanel from "../components/analysis/AnalysisPanel";

import useECGAnalysis from "../hooks/useECGAnalysis";

const ECGAnalysisPreview = lazy(
  () => import("../components/dashboard/ECGAnalysisPreview")
);
const HowItWorks = lazy(
  () => import("../components/dashboard/HowItWorks")
);
const FeatureCards = lazy(
  () => import("../components/dashboard/FeatureCards")
);
const MedicalDisclaimer = lazy(
  () => import("../components/dashboard/MedicalDisclaimer")
);

function SectionLoader() {
  return (
    <div className="flex min-h-[180px] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
    </div>
  );
}

function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    status,
    result,
    error,
    analyze,
    resetAnalysis,
  } = useECGAnalysis();

  const handleFileSelect = useCallback(
    (file: File | null) => {
      setSelectedFile(file);
      resetAnalysis();
    },
    [resetAnalysis]
  );

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    resetAnalysis();
  }, [resetAnalysis]);

  const handleAnalyze = useCallback(() => {
    if (!selectedFile) return;
    void analyze(selectedFile);
  }, [selectedFile, analyze]);

  const scrollToUpload = useCallback(() => {
    document.getElementById("upload-section")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  const scrollToHowItWorks = useCallback(() => {
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const workspaceStatus =
    status === "processing"
      ? "Analysis in progress"
      : status === "success"
        ? "Analysis complete"
        : status === "error"
          ? "Analysis error"
          : "Workspace ready";

  const statusDot =
    status === "processing"
      ? "animate-pulse bg-blue-500"
      : status === "error"
        ? "bg-red-500"
        : "bg-emerald-500";

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-[#f7faff] text-slate-900">
      <Header />

      <main className="w-full min-w-0 overflow-x-hidden">
        <section className="relative w-full min-w-0 overflow-hidden border-b border-blue-100/70 bg-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.10),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.10),transparent_32%)]" />

          <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl" />

          <div className="relative mx-auto w-full max-w-7xl min-w-0 px-4 py-9 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
            <div className="grid min-w-0 items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(420px,540px)] lg:gap-12 xl:gap-16">
              <div className="min-w-0 max-w-2xl">
                <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[9px] font-semibold tracking-[0.06em] text-blue-700 shadow-sm sm:mb-5 sm:px-4 sm:py-2 sm:text-xs">
                  <Sparkles size={14} />
                  <span className="truncate">
                    AI-POWERED ECG ANALYSIS PLATFORM
                  </span>
                </div>

                <h1 className="max-w-3xl text-[34px] font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                  Analyze ECG Reports
                  <span className="mt-2 block bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                    With AI Assistance
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-xs leading-6 text-slate-600 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
                  Upload an ECG image or PDF, inspect the waveform, and receive
                  structured AI-assisted analysis through a simple clinical
                  workflow.
                </p>

                <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row">
                  <button
                    type="button"
                    onClick={scrollToUpload}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 sm:w-auto sm:px-6"
                  >
                    <UploadCloud size={18} />
                    Upload ECG
                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={scrollToHowItWorks}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:w-auto sm:px-6"
                  >
                    How It Works
                  </button>
                </div>

                <div className="mt-7 grid min-w-0 grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
                  <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-3 shadow-sm">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-800">
                        JPG, PNG & PDF
                      </p>
                      <p className="truncate text-[10px] text-slate-500 sm:text-[11px]">
                        Multiple formats
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-3 shadow-sm">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <ShieldCheck size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-800">
                        Secure & Private
                      </p>
                      <p className="truncate text-[10px] text-slate-500 sm:text-[11px]">
                        Local history
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-3 shadow-sm">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <BrainCircuit size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-800">
                        AI-Assisted
                      </p>
                      <p className="truncate text-[10px] text-slate-500 sm:text-[11px]">
                        Structured results
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mx-auto w-full min-w-0 max-w-[540px]">
                <div className="absolute inset-6 rounded-[2rem] bg-blue-500/10 blur-3xl" />

                <div className="relative w-full min-w-0 overflow-hidden rounded-[1.5rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-sky-50 p-2.5 shadow-[0_20px_60px_rgba(37,99,235,0.12)] sm:rounded-[2rem] sm:p-3 lg:aspect-square lg:p-4">
                  <div className="flex w-full min-w-0 flex-col">
                    <Suspense fallback={<SectionLoader />}>
                      <ECGAnalysisPreview
                        status={status}
                        result={result}
                      />
                    </Suspense>

                    <div className="mt-3 flex min-w-0 items-center gap-2.5 rounded-xl border border-blue-100 bg-white/90 p-3 shadow-sm backdrop-blur sm:gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/20">
                        <Activity size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          Intelligent ECG Workspace
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          View, analyze and review your ECG records.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="upload-section"
          className="relative mx-auto w-full max-w-7xl min-w-0 px-4 py-9 sm:px-6 sm:py-10 lg:px-8 lg:py-14"
        >
          <div className="mx-auto w-full max-w-5xl min-w-0">
            <div className="mb-4 flex min-w-0 flex-col gap-3 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-blue-700 sm:text-[11px]">
                  <UploadCloud size={13} />
                  Start Analysis
                </div>

                <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                  Upload your ECG
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Select an ECG image or PDF report to begin analysis.
                </p>
              </div>

              <div className="flex min-w-0 items-start gap-2 text-[10px] text-slate-500 sm:items-center sm:text-xs">
                <ShieldCheck
                  size={15}
                  className="mt-0.5 shrink-0 text-emerald-600 sm:mt-0"
                />

                <span>Your selected file stays in your browser.</span>
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm sm:p-3">
              <UploadZone
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl min-w-0 px-4 pb-11 sm:px-6 sm:pb-14 lg:px-8">
          <div className="mb-5 flex min-w-0 flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-600 sm:text-[11px]">
                <Activity size={13} />
                Workspace
              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                ECG Analysis Workspace
              </h2>

              <p className="mt-1 max-w-2xl text-xs text-slate-500 sm:text-sm">
                Review your ECG and run AI-assisted analysis from one focused
                workspace.
              </p>
            </div>

            <div className="flex w-fit max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[10px] font-medium text-slate-500 shadow-sm sm:text-xs">
              <span className={`h-2 w-2 rounded-full ${statusDot}`} />

              <span className="whitespace-nowrap">{workspaceStatus}</span>
            </div>
          </div>

          <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)] lg:gap-6">
            <div className="min-w-0">
              <ECGViewer
                file={selectedFile}
                onRemove={handleRemoveFile}
              />
            </div>

            <div className="min-w-0">
              <AnalysisPanel
                status={status}
                result={result}
                error={error}
                onAnalyze={handleAnalyze}
              />
            </div>
          </div>
        </section>

        <section className="w-full min-w-0 overflow-hidden border-y border-slate-200/80 bg-white">
          <div className="mx-auto w-full max-w-7xl min-w-0 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <Suspense fallback={<SectionLoader />}>
              <FeatureCards />
            </Suspense>
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto w-full max-w-7xl min-w-0 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
        >
          <Suspense fallback={<SectionLoader />}>
            <HowItWorks />
          </Suspense>
        </section>

        <section className="mx-auto w-full max-w-7xl min-w-0 px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
          <Suspense fallback={<SectionLoader />}>
            <MedicalDisclaimer />
          </Suspense>
        </section>
      </main>

      <footer className="w-full border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-4 px-4 py-6 sm:px-6 sm:py-7 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
              <FileImage size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900">
                ECG Analyzer
              </p>

              <p className="text-xs text-slate-500">
                AI-assisted cardiac analysis
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-slate-500 sm:gap-x-5 sm:text-xs">
            <span>Informational use only</span>

            <span className="hidden h-3 w-px bg-slate-200 sm:block" />

            <span>Review results with a healthcare professional</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
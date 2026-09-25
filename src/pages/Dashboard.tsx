import { useCallback, useState } from "react";

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

import ECGAnalysisPreview from "../components/dashboard/ECGAnalysisPreview";
import HowItWorks from "../components/dashboard/HowItWorks";
import FeatureCards from "../components/dashboard/FeatureCards";
import MedicalDisclaimer from "../components/dashboard/MedicalDisclaimer";

import useECGAnalysis from "../hooks/useECGAnalysis";

function Dashboard() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

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
    if (!selectedFile) {
      return;
    }

    void analyze(selectedFile);
  }, [selectedFile, analyze]);

  const scrollToUpload = useCallback(() => {
    document
      .getElementById("upload-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }, []);

  const scrollToHowItWorks = useCallback(() => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7faff] text-slate-900">
      <Header />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden border-b border-blue-100/70 bg-white">
          {/* Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.10),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.10),transparent_32%)]" />

          <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

          <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
              {/* =================================================
                  LEFT HERO
              ================================================== */}
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold tracking-wide text-blue-700 shadow-sm">
                  <Sparkles size={14} />

                  AI-POWERED ECG ANALYSIS PLATFORM
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-bold tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                  Analyze ECG Reports

                  <span className="mt-2 block bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                    With AI Assistance
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  Upload an ECG image or PDF, inspect the waveform,
                  and receive structured AI-assisted analysis through
                  a simple clinical workflow.
                </p>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={scrollToUpload}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 active:scale-[0.98]"
                  >
                    <UploadCloud size={18} />

                    Upload ECG

                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={scrollToHowItWorks}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98]"
                  >
                    How It Works
                  </button>
                </div>

                {/* Trust cards */}
                <div className="mt-9 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* Formats */}
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-3 shadow-sm backdrop-blur">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800">
                        JPG, PNG & PDF
                      </p>

                      <p className="text-[11px] text-slate-500">
                        Multiple formats
                      </p>
                    </div>
                  </div>

                  {/* Privacy */}
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-3 shadow-sm backdrop-blur">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <ShieldCheck size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800">
                        Secure & Private
                      </p>

                      <p className="text-[11px] text-slate-500">
                        Local history
                      </p>
                    </div>
                  </div>

                  {/* AI */}
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-3 shadow-sm backdrop-blur">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <BrainCircuit size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800">
                        AI-Assisted
                      </p>

                      <p className="text-[11px] text-slate-500">
                        Structured results
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  RIGHT ECG MONITOR — SQUARE
              ================================================== */}
              <div className="relative mx-auto w-full max-w-[560px]">
                {/* Glow */}
                <div className="absolute inset-8 rounded-[2rem] bg-blue-500/10 blur-3xl" />

                {/* Square outer container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-sky-50 p-3 shadow-[0_25px_70px_rgba(37,99,235,0.14)] sm:p-4">
                  <div className="flex h-full min-h-0 flex-col">
                    {/* ECG monitoring */}
                    <div className="min-h-0 flex-1">
                      <ECGAnalysisPreview
                        status={status}
                        result={result}
                      />
                    </div>            
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            UPLOAD SECTION
        ====================================================== */}
        <section
          id="upload-section"
          className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
        >
          <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-blue-50/70 to-transparent" />

          <div className="mx-auto max-w-5xl">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700">
                  <UploadCloud size={13} />

                  Start Analysis
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Upload your ECG
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select an ECG image or PDF report to begin analysis.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck
                  size={15}
                  className="text-emerald-600"
                />

                Your selected file stays in your browser.
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-3">
              <UploadZone
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            ANALYSIS WORKSPACE
        ====================================================== */}
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <Activity size={13} />

                Workspace
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                ECG Analysis Workspace
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review your ECG and run AI-assisted analysis from one
                focused workspace.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm sm:flex">
              <span
                className={[
                  "h-2 w-2 rounded-full",
                  status === "processing"
                    ? "animate-pulse bg-blue-500"
                    : status === "error"
                      ? "bg-red-500"
                      : "bg-emerald-500",
                ].join(" ")}
              />

              {status === "processing"
                ? "Analysis in progress"
                : status === "success"
                  ? "Analysis complete"
                  : status === "error"
                    ? "Analysis error"
                    : "Analysis workspace ready"}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.85fr)]">
            <ECGViewer
              file={selectedFile}
              onRemove={handleRemoveFile}
            />

            <AnalysisPanel
              status={status}
              result={result}
              error={error}
              onAnalyze={handleAnalyze}
            />
          </div>
        </section>

        {/* =====================================================
            FEATURES
        ====================================================== */}
        <section className="border-y border-slate-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <FeatureCards />
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section
          id="how-it-works"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <HowItWorks />
        </section>

        {/* =====================================================
            MEDICAL DISCLAIMER
        ====================================================== */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <MedicalDisclaimer />
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
              <FileImage size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                ECG Analyzer
              </p>

              <p className="text-xs text-slate-500">
                AI-assisted cardiac analysis
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <span>Informational use only</span>

            <span className="hidden h-3 w-px bg-slate-200 sm:block" />

            <span>
              Review results with a healthcare professional
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
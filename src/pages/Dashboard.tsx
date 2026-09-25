import { useState } from "react";

import {
  Activity,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

import Header from "../components/layout/Header";
import UploadZone from "../components/upload/UploadZone";
import ECGViewer from "../components/ecg/ECGViewer";
import AnalysisPanel from "../components/analysis/AnalysisPanel";

import HowItWorks from "../components/dashboard/HowItWorks";
import FeatureCards from "../components/dashboard/FeatureCards";
import MedicalDisclaimer from "../components/dashboard/MedicalDisclaimer";

import { useECGAnalysis } from "../hooks/useECGAnalysis";

function Dashboard() {
  const [ecgFile, setEcgFile] =
    useState<File | null>(null);

  const analysis =
    useECGAnalysis();

  const handleFileSelect = (
    file: File
  ) => {
    setEcgFile(file);
    analysis.resetAnalysis();
  };

  const handleRemoveFile = () => {
    setEcgFile(null);
    analysis.resetAnalysis();
  };

  const handleAnalyze = () => {
    if (!ecgFile) {
      return;
    }

    analysis.analyze(ecgFile);
  };

  return (
    <div className="min-h-screen bg-[#f4f9fd]">
      <Header />

      <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">

        {!ecgFile ? (
          <>
            {/* Hero */}
            <section className="mb-7">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

                <div>
                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-medium text-blue-600">
                    <HeartPulse className="h-4 w-4" />
                    AI-Powered
                    <span>•</span>
                    Secure
                    <span>•</span>
                    For Better Healthcare
                  </div>

                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    ECG Analysis Dashboard
                  </h1>

                  <p className="mt-3 text-lg text-slate-500">
                    Upload an ECG image or PDF to view,
                    inspect, and analyze.
                  </p>
                </div>

                {/* ECG decoration */}
                <div className="hidden items-center gap-4 lg:flex">
                  <svg
                    viewBox="0 0 180 70"
                    className="h-20 w-44"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 38 H35 L45 37 L53 35 L61 38 H72 L79 20 L86 56 L94 5 L103 38 H123 L131 37 L140 32 L148 38 H180"
                      fill="none"
                      stroke="#93c5fd"
                      strokeWidth="2"
                    />
                  </svg>

                  <div className="rounded-xl bg-blue-50 px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />

                      <span className="text-sm font-medium text-slate-600">
                        AI for
                        <br />
                        Healthier Hearts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main area */}
            <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">

              {/* Left */}
              <div className="space-y-5">
                <UploadZone
                  onFileSelect={
                    handleFileSelect
                  }
                />

                <FeatureCards />
              </div>

              {/* Right */}
              <HowItWorks />
            </section>

            {/* Disclaimer */}
            <section className="mt-5">
              <MedicalDisclaimer />
            </section>
          </>
        ) : (
          /* Analysis screen */
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <ShieldCheck className="h-4 w-4" />
                Secure ECG Workspace
              </div>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                ECG Analysis
              </h1>
            </div>

            <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <ECGViewer
                file={ecgFile}
                onRemove={
                  handleRemoveFile
                }
              />

              <AnalysisPanel
                analysis={analysis}
                onAnalyze={
                  handleAnalyze
                }
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
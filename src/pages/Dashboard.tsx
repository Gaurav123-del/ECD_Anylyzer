import { useState } from "react";

import Header from "../components/layout/Header";
import UploadZone from "../components/upload/UploadZone";
import ECGViewer from "../components/ecg/ECGViewer";
import AnalysisPanel from "../components/analysis/AnalysisPanel";

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
    if (!ecgFile) return;

    analysis.analyze(ecgFile);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {!ecgFile ? (
          <UploadZone
            onFileSelect={handleFileSelect}
          />
        ) : (
          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <ECGViewer
              file={ecgFile}
              onRemove={handleRemoveFile}
            />

            <AnalysisPanel
              analysis={analysis}
              onAnalyze={handleAnalyze}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
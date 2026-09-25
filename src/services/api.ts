import type { ECGAnalysisResult } from "../types/ecg";

const MOCK_DELAY = 1800;

export async function analyzeECG(
  file: File
): Promise<ECGAnalysisResult> {
  // Simulate API processing time
  await new Promise((resolve) =>
    setTimeout(resolve, MOCK_DELAY)
  );

  console.log("ECG sent for analysis:", file.name);

  return {
    status: "success",
    prediction: "Analysis Available",
    confidence: 0.96,
    heartRate: 72,
    rhythm: "Sinus Rhythm",
    findings: [
      "ECG image successfully processed.",
      "Waveform visualization is available.",
      "AI analysis response received successfully.",
    ],
  };
}
export type AnalysisStatus =
  | "idle"
  | "processing"
  | "success"
  | "error";

export interface ECGAnalysisResult {
  status: "success";
  prediction: string;
  confidence: number;
  heartRate: number | null;
  rhythm: string | null;
  findings: string[];
}

export interface AnalysisState {
  status: AnalysisStatus;
  result: ECGAnalysisResult | null;
  error: string | null;
}
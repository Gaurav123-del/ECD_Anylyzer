export interface ECGHistoryItem {
  id: string;
  fileName: string;
  fileSize: number;
  createdAt: string;

  prediction: string;
  confidence: number;
  heartRate: number | null;
  rhythm: string | null;
  findings: string[];
}
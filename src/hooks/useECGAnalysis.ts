import { useCallback, useState } from "react";

import { analyzeECG } from "../services/api";
import type {
  AnalysisState,
  ECGAnalysisResult,
} from "../types/ecg";

import { saveHistoryItem } from "../utils/historyStorage";

function createHistoryId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function useECGAnalysis() {
  const [state, setState] = useState<AnalysisState>({
    status: "idle",
    result: null,
    error: null,
  });

  const analyze = useCallback(async (file: File) => {
    setState({
      status: "processing",
      result: null,
      error: null,
    });

    try {
      const response = await analyzeECG(file);

      const result: ECGAnalysisResult = {
        status: "success",
        prediction: response.prediction,
        confidence: response.confidence,
        heartRate: response.heartRate,
        rhythm: response.rhythm,
        findings: Array.isArray(response.findings)
          ? response.findings
          : [],
      };

      saveHistoryItem({
        id: createHistoryId(),
        fileName: file.name,
        fileSize: file.size,
        createdAt: new Date().toISOString(),
        prediction: result.prediction,
        confidence: result.confidence,
        heartRate: result.heartRate,
        rhythm: result.rhythm,
        findings: result.findings,
      });

      setState({
        status: "success",
        result,
        error: null,
      });

      return result;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "ECG analysis failed. Please try again.";

      setState({
        status: "error",
        result: null,
        error: message,
      });

      return null;
    }
  }, []);

  const resetAnalysis = useCallback(() => {
    setState({
      status: "idle",
      result: null,
      error: null,
    });
  }, []);

  return {
    status: state.status,
    result: state.result,
    error: state.error,
    analyze,
    resetAnalysis,
  };
}

export default useECGAnalysis;
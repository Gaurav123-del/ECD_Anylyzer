import { useCallback, useState } from "react";
import { analyzeECG } from "../services/api";
import type {
  AnalysisState,
} from "../types/ecg";

const INITIAL_STATE: AnalysisState = {
  status: "idle",
  result: null,
  error: null,
};

export function useECGAnalysis() {
  const [state, setState] =
    useState<AnalysisState>(INITIAL_STATE);

  const analyze = useCallback(async (file: File) => {
    setState({
      status: "processing",
      result: null,
      error: null,
    });

    try {
      const result = await analyzeECG(file);

      setState({
        status: "success",
        result,
        error: null,
      });
    } catch {
      setState({
        status: "error",
        result: null,
        error: "Unable to analyze the ECG. Please try again.",
      });
    }
  }, []);

  const resetAnalysis = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    analyze,
    resetAnalysis,
  };
}
import {
  useCallback,
  useState,
} from "react";

import { analyzeECG } from "../services/api";

import {
  saveECGHistory,
} from "../utils/historyStorage";

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
    useState<AnalysisState>(
      INITIAL_STATE
    );

  /*
   * Analyze ECG
   */
  const analyze = useCallback(
    async (file: File) => {
      setState({
        status: "processing",
        result: null,
        error: null,
      });

      try {
        const response =
          await analyzeECG(file);

        const result = {
          status: "success" as const,
          prediction:
            response.prediction,
          confidence:
            response.confidence,
          heartRate:
            response.heartRate,
          rhythm:
            response.rhythm,
          findings:
            response.findings,
        };

        /*
         * Update analysis state
         */
        setState({
          status: "success",
          result,
          error: null,
        });

        /*
         * Save successful analysis
         * to browser history.
         */
        saveECGHistory({
          id: crypto.randomUUID(),

          fileName:
            file.name,

          fileSize:
            file.size,

          createdAt:
            new Date().toISOString(),

          prediction:
            result.prediction,

          confidence:
            result.confidence,

          heartRate:
            result.heartRate,

          rhythm:
            result.rhythm,

          findings:
            result.findings,
        });
      } catch (error) {
        console.error(
          "ECG analysis failed:",
          error
        );

        /*
         * Get API error message
         */
        const message =
          error instanceof Error
            ? error.message
            : "Unable to analyze the ECG. Please try again.";

        setState({
          status: "error",
          result: null,
          error: message,
        });
      }
    },
    []
  );

  /*
   * Reset analysis
   */
  const resetAnalysis =
    useCallback(() => {
      setState(
        INITIAL_STATE
      );
    }, []);

  return {
    status: state.status,
    result: state.result,
    error: state.error,

    analyze,
    resetAnalysis,
  };
}
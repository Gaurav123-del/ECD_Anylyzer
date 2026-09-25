import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: {
    Accept: "application/json",
  },
});

export interface ECGAnalysisResponse {
  prediction: string;
  confidence: number;
  heartRate: number | null;
  rhythm: string | null;
  findings: string[];
}

interface APIErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

function getAPIErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data as
        | APIErrorResponse
        | undefined;

      if (data?.detail) {
        return data.detail;
      }

      if (data?.message) {
        return data.message;
      }

      if (data?.error) {
        return data.error;
      }

      return `Server error (${error.response.status}).`;
    }

    if (error.request) {
      return "Unable to connect to the ECG analysis server.";
    }

    return error.message || "Request failed.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

export async function analyzeECG(
  file: File
): Promise<ECGAnalysisResponse> {
  const formData = new FormData();

  formData.append("file", file);

  try {
    const response =
      await api.post<ECGAnalysisResponse>(
        "/api/ecg/analyze",
        formData
      );

    return response.data;
  } catch (error) {
    throw new Error(getAPIErrorMessage(error));
  }
}

export async function checkAPIHealth(): Promise<boolean> {
  try {
    await api.get("/health");
    return true;
  } catch {
    return false;
  }
}

export default api;
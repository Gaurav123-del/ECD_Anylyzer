import axios from "axios";

/*
 * ============================================================
 * API CONFIGURATION
 * ============================================================
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000";

/*
 * Axios instance
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: {
    Accept: "application/json",
  },
});

/*
 * ============================================================
 * API RESPONSE TYPES
 * ============================================================
 */

export interface ECGAnalysisResponse {
  prediction: string;
  confidence: number;
  heartRate: number | null;
  rhythm: string | null;
  findings: string[];
}

/*
 * Backend error structure
 */
interface APIErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

/*
 * ============================================================
 * ERROR HANDLING
 * ============================================================
 */

function getAPIErrorMessage(
  error: unknown
): string {
  if (!axios.isAxiosError(error)) {
    return "Something went wrong while analyzing the ECG.";
  }

  /*
   * Server returned an HTTP response.
   */
  if (error.response) {
    const data =
      error.response.data as
        | APIErrorResponse
        | undefined;

    /*
     * Prefer backend-provided messages.
     */
    if (data?.detail) {
      return data.detail;
    }

    if (data?.message) {
      return data.message;
    }

    if (data?.error) {
      return data.error;
    }

    /*
     * Handle common HTTP status codes.
     */
    switch (error.response.status) {
      case 400:
        return "Invalid ECG file or request.";

      case 401:
        return "Authentication is required.";

      case 403:
        return "You do not have permission to perform this analysis.";

      case 404:
        return "The ECG analysis endpoint was not found.";

      case 413:
        return "The ECG file is too large.";

      case 415:
        return "This ECG file format is not supported.";

      case 422:
        return "The ECG data could not be processed.";

      case 429:
        return "Too many analysis requests. Please try again later.";

      default:
        if (
          error.response.status >= 500
        ) {
          return "The ECG analysis server is temporarily unavailable.";
        }
    }
  }

  /*
   * Request was created but no response
   * was received from the server.
   */
  if (error.request) {
    return "Unable to connect to the ECG analysis server.";
  }

  /*
   * Fallback.
   */
  return (
    error.message ||
    "Something went wrong while analyzing the ECG."
  );
}

/*
 * ============================================================
 * ANALYZE ECG
 * ============================================================
 */

export async function analyzeECG(
  file: File
): Promise<ECGAnalysisResponse> {
  const formData =
    new FormData();

  /*
   * Backend expects the uploaded ECG
   * under the "file" field.
   */
  formData.append(
    "file",
    file
  );

  try {
    const response =
      await api.post<ECGAnalysisResponse>(
        "/api/ecg/analyze",
        formData
      );

    return response.data;
  } catch (error) {
    const message =
      getAPIErrorMessage(error);

    throw new Error(message);
  }
}

/*
 * ============================================================
 * HEALTH CHECK
 * ============================================================
 *
 * Useful for checking whether the backend
 * is available.
 */

export async function checkAPIHealth(): Promise<boolean> {
  try {
    await api.get("/health");

    return true;
  } catch {
    return false;
  }
}

/*
 * ============================================================
 * DEFAULT AXIOS INSTANCE
 * ============================================================
 */

export default api;
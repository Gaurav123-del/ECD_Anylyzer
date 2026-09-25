import type { ECGHistoryItem } from "../types/history";

const HISTORY_KEY = "ecg-analyzer-history";
const MAX_HISTORY_ITEMS = 50;

function isValidHistoryItem(
  value: unknown
): value is ECGHistoryItem {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const item = value as Partial<ECGHistoryItem>;

  return (
    typeof item.id === "string" &&
    typeof item.fileName === "string" &&
    typeof item.fileSize === "number" &&
    typeof item.createdAt === "string" &&
    typeof item.prediction === "string" &&
    typeof item.confidence === "number" &&
    (item.heartRate === null ||
      typeof item.heartRate === "number") &&
    (item.rhythm === null ||
      typeof item.rhythm === "string") &&
    Array.isArray(item.findings) &&
    item.findings.every(
      (finding) => typeof finding === "string"
    )
  );
}

export function getHistory(): ECGHistoryItem[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidHistoryItem);
  } catch (error) {
    console.error(
      "Unable to read ECG history:",
      error
    );

    return [];
  }
}

export function saveHistoryItem(
  item: ECGHistoryItem
): void {
  try {
    const currentHistory = getHistory();

    const updatedHistory = [
      item,
      ...currentHistory.filter(
        (existing) => existing.id !== item.id
      ),
    ].slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );
  } catch (error) {
    console.error(
      "Unable to save ECG history:",
      error
    );
  }
}

export function deleteHistoryItem(
  id: string
): void {
  try {
    const updatedHistory = getHistory().filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );
  } catch (error) {
    console.error(
      "Unable to delete ECG history item:",
      error
    );
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error(
      "Unable to clear ECG history:",
      error
    );
  }
}

export { HISTORY_KEY, MAX_HISTORY_ITEMS };
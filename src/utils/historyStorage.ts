import type { ECGHistoryItem } from "../types/history";

const HISTORY_KEY = "ecg-analyzer-history";

export function getECGHistory(): ECGHistoryItem[] {
  try {
    const stored =
      localStorage.getItem(HISTORY_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as ECGHistoryItem[];
  } catch (error) {
    console.error(
      "Unable to load ECG history:",
      error
    );

    return [];
  }
}

export function saveECGHistory(
  item: ECGHistoryItem
): void {
  try {
    const currentHistory =
      getECGHistory();

    const updatedHistory = [
      item,
      ...currentHistory,
    ].slice(0, 50);

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

export function deleteECGHistory(
  id: string
): void {
  try {
    const currentHistory =
      getECGHistory();

    const updatedHistory =
      currentHistory.filter(
        (item) => item.id !== id
      );

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );
  } catch (error) {
    console.error(
      "Unable to delete ECG history:",
      error
    );
  }
}

export function clearECGHistory(): void {
  localStorage.removeItem(
    HISTORY_KEY
  );
}
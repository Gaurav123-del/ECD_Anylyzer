export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "0 B";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1024;

  if (mb < 1024) {
    return `${mb.toFixed(2)} MB`;
  }

  const gb = mb / 1024;

  return `${gb.toFixed(2)} GB`;
}

export function formatZoom(zoom: number): string {
  if (!Number.isFinite(zoom)) {
    return "100%";
  }

  return `${Math.round(zoom * 100)}%`;
}

export function formatConfidence(
  confidence: number
): string {
  if (!Number.isFinite(confidence)) {
    return "N/A";
  }

  const percentage =
    confidence <= 1
      ? confidence * 100
      : confidence;

  return `${Math.min(
    Math.max(percentage, 0),
    100
  ).toFixed(1)}%`;
}

export function formatHeartRate(
  heartRate: number | null
): string {
  if (
    heartRate === null ||
    !Number.isFinite(heartRate)
  ) {
    return "Not available";
  }

  return `${Math.round(heartRate)} BPM`;
}

export function formatDate(
  date: string | number | Date
): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  const size = bytes / Math.pow(1024, index);

  return `${size.toFixed(index === 0 ? 0 : 1)} ${
    units[index]
  }`;
}

export function formatZoom(zoom: number): string {
  return `${Math.round(zoom * 100)}%`;
}
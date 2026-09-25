const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
] as const;

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export interface FileValidationResult {
  valid: boolean;
  error: string | null;
}

export function validateECGFile(
  file: File | null
): FileValidationResult {
  if (!file) {
    return {
      valid: false,
      error: "Please select an ECG file.",
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: "The selected ECG file is empty.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: "File size must be less than 20 MB.",
    };
  }

  const isAllowedType = ALLOWED_FILE_TYPES.includes(
    file.type as (typeof ALLOWED_FILE_TYPES)[number]
  );

  const extension = file.name
    .split(".")
    .pop()
    ?.toLowerCase();

  const isAllowedExtension =
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "pdf";

  if (!isAllowedType && !isAllowedExtension) {
    return {
      valid: false,
      error: "Please upload a JPG, PNG, or PDF file.",
    };
  }

  return {
    valid: true,
    error: null,
  };
}

export const ECG_MAX_FILE_SIZE = MAX_FILE_SIZE;

export const ECG_ALLOWED_FILE_TYPES =
  ALLOWED_FILE_TYPES;
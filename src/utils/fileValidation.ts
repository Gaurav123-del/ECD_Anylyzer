const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
] as const;

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

export interface FileValidationResult {
  valid: boolean;
  error: string | null;
}

export function validateECGFile(
  file: File
): FileValidationResult {
  if (!ALLOWED_FILE_TYPES.includes(
    file.type as (typeof ALLOWED_FILE_TYPES)[number]
  )) {
    return {
      valid: false,
      error: "Please upload a JPG, PNG, or PDF file.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: "File size must be less than 20 MB.",
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: "The selected file is empty.",
    };
  }

  return {
    valid: true,
    error: null,
  };
}
import {
  useCallback,
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
  DragEvent,
} from "react";

import {
  FileImage,
  Upload,
  FileText,
} from "lucide-react";

import { validateECGFile } from "../../utils/fileValidation";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

function UploadZone({
  onFileSelect,
}: UploadZoneProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const processFile = useCallback(
    (file: File) => {
      const validation =
        validateECGFile(file);

      if (!validation.valid) {
        setError(validation.error);
        return;
      }

      setError(null);

      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (file) {
      processFile(file);
    }

    // Allows selecting the same file again.
    event.target.value = "";
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    setIsDragging(false);

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      processFile(file);
    }
  };

  return (
    <section className="mx-auto max-w-3xl pt-10">
      {/* Heading */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <FileImage className="h-7 w-7 text-blue-600" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Upload Your ECG
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Upload an ECG image or PDF to view and analyze it.
        </p>
      </div>

      {/* Upload area */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload ECG file"
        onClick={() =>
          inputRef.current?.click()
        }
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() =>
          setIsDragging(false)
        }
        onDrop={handleDrop}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center outline-none transition ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50"
        } focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,application/pdf,.jpg,.jpeg,.png,.pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <Upload className="h-6 w-6 text-slate-600" />
        </div>

        <h3 className="mt-5 font-semibold text-slate-900">
          Drag & drop your ECG here
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          or click to browse from your computer
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span>JPG</span>
          <span>PNG</span>
          <span>PDF</span>
          <span>Max 20 MB</span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-600"
        >
          {error}
        </div>
      )}

      {/* Information */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <FileText className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

        <p className="text-xs leading-5 text-slate-500">
          Upload a clear ECG image or PDF for the best
          viewing experience. AI-generated results should
          be reviewed by a qualified healthcare professional.
        </p>
      </div>
    </section>
  );
}

export default UploadZone;
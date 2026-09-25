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
  FileText,
  FileUp,
  Image as ImageIcon,
  Upload,
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
    <div>
      {/* Upload card */}
      <div
        onClick={() =>
          inputRef.current?.click()
        }
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() =>
          setIsDragging(false)
        }
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            inputRef.current?.click();
          }
        }}
        className={`group cursor-pointer rounded-2xl border bg-white p-6 shadow-sm transition sm:p-8 ${
          isDragging
            ? "border-blue-500 bg-blue-50/50"
            : "border-slate-200 hover:border-blue-300 hover:shadow-md"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,application/pdf,.jpg,.jpeg,.png,.pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        <div
          className={`rounded-xl border-2 border-dashed p-8 text-center transition sm:p-10 ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-blue-200 bg-blue-50/30 group-hover:bg-blue-50/60"
          }`}
        >
          {/* Upload icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <FileUp className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Upload Your ECG
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Upload an ECG image or PDF to view and analyze it.
          </p>

          {/* Choose file */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              inputRef.current?.click();
            }}
            className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Upload className="h-4 w-4" />
            Choose File
          </button>

          <p className="mt-3 text-sm text-slate-500">
            or drag and drop your ECG here
          </p>

          <p className="mt-1 text-xs text-slate-400">
            JPG, PNG or PDF (Max 20 MB)
          </p>

          {/* File types */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-medium text-slate-600">
              <ImageIcon className="h-3.5 w-3.5" />
              JPG
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-medium text-slate-600">
              <ImageIcon className="h-3.5 w-3.5" />
              PNG
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-medium text-slate-600">
              <FileText className="h-3.5 w-3.5 text-red-500" />
              PDF
            </span>
          </div>
        </div>

        {/* Secure notice */}
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3">
          <FileImage className="h-5 w-5 shrink-0 text-blue-600" />

          <p className="text-xs leading-5 text-slate-500">
            Your files are processed securely and kept
            confidential. AI-generated results should be
            reviewed by a qualified healthcare professional.
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default UploadZone;
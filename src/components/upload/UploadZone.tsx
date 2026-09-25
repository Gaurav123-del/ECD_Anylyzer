import { useCallback, useRef, useState } from "react";
import type {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileImage,
  FileText,
  LockKeyhole,
  UploadCloud,
  X,
} from "lucide-react";

import {
  ECG_ALLOWED_FILE_TYPES,
  ECG_MAX_FILE_SIZE,
  validateECGFile,
} from "../../utils/fileValidation";
import { formatFileSize } from "../../utils/formatters";

interface UploadZoneProps {
  selectedFile?: File | null;
  onFileSelect: (file: File | null) => void;
}

function UploadZone({
  selectedFile = null,
  onFileSelect,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    (file: File | null) => {
      if (!file) {
        return;
      }

      const validation = validateECGFile(file);

      if (!validation.valid) {
        setError(validation.error);
        onFileSelect(null);
        return;
      }

      setError(null);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;

      processFile(file);
      event.target.value = "";
    },
    [processFile]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragging(false);

      const file = event.dataTransfer.files?.[0] ?? null;

      processFile(file);
    },
    [processFile]
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragging(false);
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        inputRef.current?.click();
      }
    },
    []
  );

  const handleBrowse = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleRemove = useCallback(() => {
    setError(null);
    onFileSelect(null);
  }, [onFileSelect]);

  const acceptedTypes =
    ECG_ALLOWED_FILE_TYPES.join(",");

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleInputChange}
        className="hidden"
        aria-label="Upload ECG file"
      />

      {!selectedFile ? (
        <div
          role="button"
          tabIndex={0}
          onClick={handleBrowse}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={[
            "group relative overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 sm:p-10",
            isDragging
              ? "scale-[1.01] border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10"
              : "border-slate-200 bg-gradient-to-br from-white via-white to-blue-50/30 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-lg hover:shadow-slate-900/5",
          ].join(" ")}
        >
          <div
            className={[
              "absolute inset-x-0 top-0 h-1 transition-all duration-300",
              isDragging
                ? "bg-blue-600"
                : "bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100",
            ].join(" ")}
          />

          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100/40 blur-3xl transition group-hover:bg-blue-100/70" />

          <div className="absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-sky-100/40 blur-3xl" />

          <div className="relative">
            <div
              className={[
                "mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border shadow-sm transition-all duration-300",
                isDragging
                  ? "border-blue-200 bg-blue-100 text-blue-700 shadow-blue-500/10"
                  : "border-blue-100 bg-blue-50 text-blue-600 group-hover:-translate-y-1 group-hover:bg-blue-100 group-hover:shadow-md",
              ].join(" ")}
            >
              <UploadCloud
                size={34}
                strokeWidth={1.8}
              />
            </div>

            <div className="mx-auto mt-6 max-w-lg">
              <h3 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                {isDragging
                  ? "Drop your ECG file here"
                  : "Upload your ECG report"}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Drag and drop your ECG file here, or browse
                your device to select a report.
              </p>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleBrowse();
              }}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 active:translate-y-0"
            >
              <UploadCloud size={17} />
              Choose ECG File
            </button>

            <div className="mx-auto mt-7 flex max-w-md flex-wrap items-center justify-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm">
                <FileImage
                  size={13}
                  className="text-blue-500"
                />
                JPG / PNG
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm">
                <FileText
                  size={13}
                  className="text-blue-500"
                />
                PDF
              </span>

              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm">
                Max {formatFileSize(ECG_MAX_FILE_SIZE)}
              </span>
            </div>

            <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 border-t border-slate-100 pt-5 text-[11px] font-medium text-slate-400">
              <LockKeyhole
                size={13}
                className="text-emerald-500"
              />
              Secure file handling
              <span className="text-slate-300">•</span>
              Simple clinical workflow
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50/40 p-5 shadow-sm sm:p-6">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-100/50 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white bg-white text-emerald-600 shadow-md">
              {selectedFile.type === "application/pdf" ? (
                <FileText size={27} />
              ) : (
                <FileImage size={27} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2
                    size={14}
                    className="text-emerald-600"
                  />
                </div>

                <p className="text-sm font-bold text-emerald-700">
                  ECG file ready
                </p>
              </div>

              <p className="mt-1.5 truncate text-sm font-semibold text-slate-900">
                {selectedFile.name}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>
                  {formatFileSize(selectedFile.size)}
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  {selectedFile.type ===
                  "application/pdf"
                    ? "PDF document"
                    : "Image file"}
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span className="font-medium text-emerald-600">
                  Valid file
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:self-center"
              aria-label="Remove selected ECG"
              title="Remove file"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative mt-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-white/80 px-4 py-3">
            <CheckCircle2
              size={15}
              className="shrink-0 text-emerald-500"
            />

            <p className="text-xs font-medium text-slate-600">
              Your ECG is ready to be reviewed in the
              analysis workspace.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700 shadow-sm">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-100">
            <AlertCircle size={16} />
          </div>

          <div className="pt-0.5">
            <p className="font-semibold">
              Upload failed
            </p>

            <p className="mt-0.5 text-xs leading-5 text-red-600">
              {error}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] leading-5 text-slate-400">
        <LockKeyhole
          size={12}
          className="shrink-0"
        />

        <p>
          Your selected file is processed according to
          the configured ECG analysis service.
        </p>
      </div>
    </div>
  );
}

export default UploadZone;
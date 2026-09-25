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
  const inputRef =
    useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================================
     FILE PROCESSING
  ========================================================== */

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

  /* ==========================================================
     FILE INPUT
  ========================================================== */

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file =
        event.target.files?.[0] ?? null;

      processFile(file);

      /*
       * Allows selecting the same file again
       * after removing it.
       */
      event.target.value = "";
    },
    [processFile]
  );

  /* ==========================================================
     DRAG & DROP
  ========================================================== */

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

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragging(false);

      const file =
        event.dataTransfer.files?.[0] ?? null;

      processFile(file);
    },
    [processFile]
  );

  /* ==========================================================
     KEYBOARD
  ========================================================== */

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

  /* ==========================================================
     BROWSE
  ========================================================== */

  const handleBrowse = useCallback(() => {
    inputRef.current?.click();
  }, []);

  /* ==========================================================
     REMOVE
  ========================================================== */

  const handleRemove = useCallback(() => {
    setError(null);
    setIsDragging(false);

    onFileSelect(null);
  }, [onFileSelect]);

  const acceptedTypes =
    ECG_ALLOWED_FILE_TYPES.join(",");

  /* ==========================================================
     UI
  ========================================================== */

  return (
    <div className="w-full min-w-0">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleInputChange}
        className="hidden"
        aria-label="Upload ECG file"
      />

      {/* ======================================================
          EMPTY STATE
      ======================================================= */}

      {!selectedFile ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload ECG file"
          onClick={handleBrowse}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={[
            "group relative w-full overflow-hidden rounded-2xl border-2 border-dashed text-center",
            "transition-all duration-300",
            "focus:outline-none focus:ring-4 focus:ring-blue-100",
            "touch-manipulation",
            isDragging
              ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10"
              : "border-slate-200 bg-gradient-to-br from-white via-white to-blue-50/30 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-lg hover:shadow-slate-900/5",
          ].join(" ")}
        >
          {/* Top accent */}
          <div
            className={[
              "absolute inset-x-0 top-0 h-1 transition-all duration-300",
              isDragging
                ? "bg-blue-600"
                : "bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100",
            ].join(" ")}
          />

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100/40 blur-3xl transition group-hover:bg-blue-100/70" />

          <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-sky-100/40 blur-3xl" />

          {/* Content */}
          <div className="relative px-4 py-7 sm:px-8 sm:py-10 lg:px-10">
            {/* Upload icon */}
            <div
              className={[
                "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm transition-all duration-300 sm:h-20 sm:w-20",
                isDragging
                  ? "border-blue-200 bg-blue-100 text-blue-700 shadow-blue-500/10"
                  : "border-blue-100 bg-blue-50 text-blue-600 group-hover:-translate-y-1 group-hover:bg-blue-100 group-hover:shadow-md",
              ].join(" ")}
            >
              <UploadCloud
                size={30}
                strokeWidth={1.8}
                className="sm:h-[34px] sm:w-[34px]"
              />
            </div>

            {/* Heading */}
            <div className="mx-auto mt-5 max-w-lg sm:mt-6">
              <h3 className="text-base font-bold tracking-tight text-slate-950 sm:text-lg lg:text-xl">
                {isDragging
                  ? "Drop your ECG file here"
                  : "Upload your ECG report"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                <span className="hidden sm:inline">
                  Drag and drop your ECG file here, or browse
                  your device to select a report.
                </span>

                <span className="sm:hidden">
                  Select an ECG image or PDF from your device.
                </span>
              </p>
            </div>

            {/* Browse button */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleBrowse();
              }}
              className="mt-6 inline-flex min-h-11 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 active:translate-y-0 sm:mt-7 sm:w-auto sm:px-6"
            >
              <UploadCloud size={17} />

              Choose ECG File
            </button>

            {/* Supported formats */}
            <div className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-2 sm:mt-7 sm:gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-600 shadow-sm sm:px-3 sm:text-[11px]">
                <FileImage
                  size={13}
                  className="text-blue-500"
                />

                JPG / PNG
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-600 shadow-sm sm:px-3 sm:text-[11px]">
                <FileText
                  size={13}
                  className="text-blue-500"
                />

                PDF
              </span>

              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm sm:px-3 sm:text-[11px]">
                Max {formatFileSize(ECG_MAX_FILE_SIZE)}
              </span>
            </div>

            {/* Privacy */}
            <div className="mx-auto mt-5 flex max-w-md flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-slate-100 pt-4 text-[10px] font-medium text-slate-400 sm:mt-6 sm:pt-5 sm:text-[11px]">
              <LockKeyhole
                size={13}
                className="text-emerald-500"
              />

              <span>Secure file handling</span>

              <span className="hidden text-slate-300 sm:inline">
                •
              </span>

              <span>Simple clinical workflow</span>
            </div>
          </div>
        </div>
      ) : (
        /* ====================================================
           SELECTED FILE
        ===================================================== */
        <div className="relative w-full overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50/40 p-4 shadow-sm sm:p-6">
          {/* Glow */}
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-100/50 blur-3xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            {/* File icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white bg-white text-emerald-600 shadow-md sm:h-16 sm:w-16 sm:rounded-2xl">
              {selectedFile.type ===
              "application/pdf" ? (
                <FileText
                  size={25}
                  className="sm:h-[27px] sm:w-[27px]"
                />
              ) : (
                <FileImage
                  size={25}
                  className="sm:h-[27px] sm:w-[27px]"
                />
              )}
            </div>

            {/* File details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2
                    size={14}
                    className="text-emerald-600"
                  />
                </div>

                <p className="text-sm font-bold text-emerald-700">
                  ECG file ready
                </p>
              </div>

              <p
                className="mt-1.5 break-all text-sm font-semibold text-slate-900 sm:truncate sm:break-normal"
                title={selectedFile.name}
              >
                {selectedFile.name}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
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

            {/* Remove */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-3 top-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:static sm:h-10 sm:w-10"
              aria-label="Remove selected ECG"
              title="Remove file"
            >
              <X size={18} />
            </button>
          </div>

          {/* Ready message */}
          <div className="relative mt-4 flex items-start gap-2 rounded-xl border border-emerald-100 bg-white/80 px-3.5 py-3 sm:mt-5 sm:px-4">
            <CheckCircle2
              size={15}
              className="mt-0.5 shrink-0 text-emerald-500"
            />

            <p className="text-xs leading-5 font-medium text-slate-600">
              Your ECG is ready to be reviewed in the
              analysis workspace.
            </p>
          </div>
        </div>
      )}

      {/* ======================================================
          ERROR
      ======================================================= */}

      {error && (
        <div className="mt-3 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700 shadow-sm sm:mt-4 sm:px-4 sm:py-3.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-100">
            <AlertCircle size={16} />
          </div>

          <div className="min-w-0 pt-0.5">
            <p className="font-semibold">
              Upload failed
            </p>

            <p className="mt-0.5 break-words text-xs leading-5 text-red-600">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* ======================================================
          FOOTER PRIVACY MESSAGE
      ======================================================= */}

      <div className="mt-3 flex items-start justify-center gap-2 px-2 text-center text-[10px] leading-4 text-slate-400 sm:mt-4 sm:text-[11px] sm:leading-5">
        <LockKeyhole
          size={12}
          className="mt-0.5 shrink-0"
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
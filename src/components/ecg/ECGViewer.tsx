import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  FileImage,
  Loader2,
  Trash2,
} from "lucide-react";

import ViewerControls from "./ViewerControls";

import {
  useECGViewer,
} from "../../hooks/useECGViewer";

import {
  formatFileSize,
} from "../../utils/formatters";

/*
 * ============================================================
 * LAZY PDF VIEWER
 * ============================================================
 *
 * PDF.js is loaded only when the selected ECG is a PDF.
 * This keeps the initial Dashboard bundle smaller.
 */
const PDFViewer = lazy(
  () => import("./PDFViewer")
);

/*
 * ============================================================
 * PROPS
 * ============================================================
 */

interface ECGViewerProps {
  file: File;
  onRemove: () => void;
}

/*
 * ============================================================
 * COMPONENT
 * ============================================================
 */

function ECGViewer({
  file,
  onRemove,
}: ECGViewerProps) {
  /*
   * ==========================================================
   * IMAGE URL
   * ==========================================================
   */

  const [imageUrl, setImageUrl] =
    useState<string | null>(null);

  /*
   * ==========================================================
   * VIEWER HOOK
   * ==========================================================
   */

  const {
    zoom,
    position,
    viewerRef,
    zoomIn,
    zoomOut,
    resetView,
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleFullscreen,
  } = useECGViewer();

  /*
   * ==========================================================
   * FILE TYPE
   * ==========================================================
   */

  const isPDF =
    file.type === "application/pdf";

  /*
   * ==========================================================
   * CREATE IMAGE OBJECT URL
   * ==========================================================
   */

  useEffect(() => {
    /*
     * PDFs don't need an image URL.
     */
    if (isPDF) {
      setImageUrl(null);
      return;
    }

    /*
     * Create temporary browser URL.
     */
    const url =
      URL.createObjectURL(file);

    setImageUrl(url);

    /*
     * Always revoke the URL when the
     * file changes or component unmounts.
     */
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file, isPDF]);

  /*
   * ==========================================================
   * RENDER
   * ==========================================================
   */

  return (
    <section>
      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <FileImage
              className="h-5 w-5 shrink-0 text-blue-600"
              aria-hidden="true"
            />

            <h2 className="font-semibold text-slate-900">
              ECG Viewer
            </h2>
          </div>

          <div className="mt-1 flex min-w-0 items-center gap-2 text-sm text-slate-500">
            <span className="truncate">
              {file.name}
            </span>

            <span
              className="shrink-0"
              aria-hidden="true"
            >
              •
            </span>

            <span className="shrink-0">
              {formatFileSize(file.size)}
            </span>
          </div>
        </div>

        {/* ==================================================
            REMOVE BUTTON
            ================================================== */}

        <button
          type="button"
          onClick={onRemove}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <Trash2
            className="h-4 w-4"
            aria-hidden="true"
          />

          Remove ECG
        </button>
      </div>

      {/* ======================================================
          VIEWER
          ====================================================== */}

      <div
        ref={viewerRef}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        {/* ====================================================
            PDF
            ==================================================== */}

        {isPDF ? (
          <Suspense
            fallback={
              <div className="flex min-h-[500px] items-center justify-center bg-slate-100">
                <div className="text-center">
                  <Loader2
                    className="mx-auto h-8 w-8 animate-spin text-blue-600"
                    aria-hidden="true"
                  />

                  <p className="mt-3 text-sm font-medium text-slate-600">
                    Loading PDF viewer...
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Preparing your ECG document
                  </p>
                </div>
              </div>
            }
          >
            <PDFViewer file={file} />
          </Suspense>
        ) : (
          <>
            {/* ==================================================
                IMAGE VIEWER
                ================================================== */}

            <div
              onWheel={handleWheel}
              onPointerDown={
                handlePointerDown
              }
              onPointerMove={
                handlePointerMove
              }
              onPointerUp={
                handlePointerUp
              }
              onPointerCancel={
                handlePointerUp
              }
              className={`relative flex min-h-[500px] items-center justify-center overflow-hidden bg-slate-100 p-4 ${
                zoom > 1
                  ? "cursor-grab active:cursor-grabbing"
                  : "cursor-default"
              }`}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded ECG"
                  draggable={false}
                  decoding="async"
                  className="max-h-[70vh] max-w-full select-none object-contain will-change-transform"
                  style={{
                    transform:
                      `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoom})`,

                    transformOrigin:
                      "center center",
                  }}
                />
              ) : (
                <div className="text-center">
                  <Loader2
                    className="mx-auto h-8 w-8 animate-spin text-blue-600"
                    aria-hidden="true"
                  />

                  <p className="mt-3 text-sm font-medium text-slate-600">
                    Loading ECG...
                  </p>
                </div>
              )}
            </div>

            {/* ==================================================
                CONTROLS
                ================================================== */}

            <ViewerControls
              zoom={zoom}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onReset={resetView}
              onFullscreen={
                handleFullscreen
              }
            />
          </>
        )}
      </div>
    </section>
  );
}

export default ECGViewer;
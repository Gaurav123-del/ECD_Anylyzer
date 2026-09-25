import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Activity,
  FileImage,
  FileText,
  Maximize2,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import Card from "../common/Card";
import Loading from "../common/Loading";
import ViewerControls from "./ViewerControls";
import useECGViewer from "../../hooks/useECGViewer";

const PDFViewer = lazy(() => import("./PDFViewer"));

interface ECGViewerProps {
  file: File | null;
  onRemove: () => void;
}

function ECGViewer({
  file,
  onRemove,
}: ECGViewerProps) {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const [imageUrl, setImageUrl] =
    useState<string | null>(null);

  const {
    zoom,
    position,
    isFullscreen,
    zoomIn,
    zoomOut,
    reset,
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    toggleFullscreen,
  } = useECGViewer();

  const isPDF = useMemo(() => {
    if (!file) {
      return false;
    }

    return (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    );
  }, [file]);

  useEffect(() => {
    if (!file || isPDF) {
      setImageUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);

    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file, isPDF]);

  const handleFullscreen = useCallback(() => {
    if (containerRef.current) {
      void toggleFullscreen(containerRef.current);
    }
  }, [toggleFullscreen]);

  return (
    <Card
      padding="none"
      className={[
        "overflow-hidden border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
        isFullscreen ? "rounded-none" : "rounded-2xl",
      ].join(" ")}
    >
      <div className="flex min-h-[76px] items-center justify-between gap-4 border-b border-slate-200/80 bg-white px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={[
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-sm",
              file
                ? "border-blue-100 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-400",
            ].join(" ")}
          >
            {isPDF ? (
              <FileText size={20} />
            ) : (
              <FileImage size={20} />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm font-bold text-slate-950 sm:text-[15px]">
                {file ? file.name : "ECG Viewer"}
              </h2>

              {file && (
                <span className="hidden shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 sm:inline-flex">
                  Ready
                </span>
              )}
            </div>

            <p className="mt-0.5 text-[11px] font-medium text-slate-400">
              {file
                ? isPDF
                  ? "PDF ECG report"
                  : "ECG image"
                : "ECG visualization workspace"}
            </p>
          </div>
        </div>

        {file && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-500 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">
              Remove
            </span>
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        className={[
          "relative min-h-[440px] overflow-hidden bg-slate-100",
          isFullscreen
            ? "h-screen min-h-screen"
            : "",
        ].join(" ")}
      >
        {!file && (
          <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden px-6">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />

            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/20 blur-3xl" />

            <div className="relative max-w-md text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.10)]">
                <Activity
                  size={34}
                  strokeWidth={1.7}
                />
              </div>

              <div className="mt-6">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
                  ECG Visualization
                </p>

                <h3 className="text-xl font-bold tracking-tight text-slate-800">
                  No ECG selected
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Upload an ECG image or PDF report to
                  display the waveform and begin your
                  analysis.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm">
                  JPG
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm">
                  PNG
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm">
                  PDF
                </span>
              </div>
            </div>
          </div>
        )}

        {file && isPDF && (
          <Suspense
            fallback={
              <div className="flex min-h-[440px] items-center justify-center bg-slate-50">
                <Loading text="Preparing PDF viewer..." />
              </div>
            }
          >
            <PDFViewer
              file={file}
              onFullscreen={handleFullscreen}
            />
          </Suspense>
        )}

        {file &&
          !isPDF &&
          imageUrl && (
            <div
              className="relative flex min-h-[440px] h-full w-full items-center justify-center overflow-hidden bg-slate-100"
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                cursor:
                  zoom > 1 ? "grab" : "default",
                touchAction:
                  zoom > 1 ? "none" : "auto",
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.035)_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                ECG Preview
              </div>

              <img
                src={imageUrl}
                alt={`Uploaded ECG: ${file.name}`}
                draggable={false}
                className="relative z-[1] max-h-[700px] max-w-[94%] select-none object-contain drop-shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  transformOrigin:
                    "center center",
                  transition:
                    "transform 120ms ease-out",
                }}
              />

              <div className="absolute bottom-4 left-4 z-10 hidden items-center gap-2 rounded-lg border border-white/80 bg-white/90 px-3 py-2 text-[10px] font-medium text-slate-500 shadow-sm backdrop-blur sm:flex">
                <Activity
                  size={13}
                  className="text-blue-500"
                />
                Scroll to zoom
                <span className="text-slate-300">
                  •
                </span>
                Drag to pan
              </div>
            </div>
          )}

        {file && !isPDF && imageUrl && (
          <div className="absolute bottom-4 right-4 z-20 rounded-xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl shadow-slate-900/10 backdrop-blur">
            <ViewerControls
              zoom={zoom}
              minZoom={0.5}
              maxZoom={5}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onReset={reset}
              onFullscreen={handleFullscreen}
            />
          </div>
        )}

        {file && isPDF && (
          <button
            type="button"
            onClick={handleFullscreen}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/95 text-slate-500 shadow-lg backdrop-blur transition hover:bg-blue-50 hover:text-blue-600"
            aria-label="Enter fullscreen"
            title="Fullscreen"
          >
            <Maximize2 size={16} />
          </button>
        )}
      </div>

      {file && (
        <div className="flex min-h-[48px] flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 bg-white px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50">
              <Activity
                size={13}
                className="text-blue-600"
              />
            </div>

            <span>
              {isPDF
                ? "PDF document viewer"
                : "Zoom and pan to inspect the ECG"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1.5 text-[10px] font-medium text-slate-400 sm:flex">
              <ShieldCheck size={12} />
              Local preview
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
              {(
                file.size /
                (1024 * 1024)
              ).toFixed(2)}{" "}
              MB
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}

export default ECGViewer;
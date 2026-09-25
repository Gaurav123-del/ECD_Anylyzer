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

function ECGViewer({ file, onRemove }: ECGViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
    if (!file) return false;

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
        "w-full min-w-0 overflow-hidden border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
        isFullscreen ? "rounded-none" : "rounded-2xl",
      ].join(" ")}
    >
      <div className="flex min-h-[68px] items-center justify-between gap-3 border-b border-slate-200/80 bg-white px-3 py-3 sm:min-h-[76px] sm:gap-4 sm:px-5 sm:py-3.5">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div
            className={[
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-sm sm:h-11 sm:w-11",
              file
                ? "border-blue-100 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-400",
            ].join(" ")}
          >
            {isPDF ? <FileText size={19} /> : <FileImage size={19} />}
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h2 className="min-w-0 truncate text-sm font-bold text-slate-950 sm:text-[15px]">
                {file ? file.name : "ECG Viewer"}
              </h2>

              {file && (
                <span className="hidden shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 sm:inline-flex">
                  Ready
                </span>
              )}
            </div>

            <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400 sm:text-[11px]">
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
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:w-auto sm:gap-2 sm:px-3"
            aria-label="Remove ECG file"
            title="Remove ECG"
          >
            <Trash2 size={14} />
            <span className="hidden text-xs font-semibold sm:inline">
              Remove
            </span>
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        className={[
          "relative min-h-[360px] overflow-hidden bg-slate-100 sm:min-h-[440px]",
          isFullscreen ? "h-screen min-h-screen" : "",
        ].join(" ")}
      >
        {!file && (
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden px-4 py-10 sm:min-h-[440px] sm:px-6">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.035)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:28px_28px]" />

            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/20 blur-3xl sm:h-72 sm:w-72" />

            <div className="relative w-full max-w-md text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.10)] sm:h-20 sm:w-20">
                <Activity
                  size={29}
                  strokeWidth={1.7}
                  className="sm:h-[34px] sm:w-[34px]"
                />
              </div>

              <div className="mt-5 sm:mt-6">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 sm:text-[11px]">
                  ECG Visualization
                </p>

                <h3 className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
                  No ECG selected
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                  Upload an ECG image or PDF report to display the waveform and
                  begin your analysis.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2 sm:mt-6">
                {["JPG", "PNG", "PDF"].map((format) => (
                  <span
                    key={format}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {file && isPDF && (
          <Suspense
            fallback={
              <div className="flex min-h-[360px] items-center justify-center bg-slate-50 sm:min-h-[440px]">
                <Loading text="Preparing PDF viewer..." />
              </div>
            }
          >
            <PDFViewer file={file} onFullscreen={handleFullscreen} />
          </Suspense>
        )}

        {file && !isPDF && imageUrl && (
          <div
            className="relative flex min-h-[360px] h-full w-full items-center justify-center overflow-hidden bg-slate-100 sm:min-h-[440px]"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              cursor: zoom > 1 ? "grab" : "default",
              touchAction: zoom > 1 ? "none" : "auto",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.035)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:24px_24px]" />

            <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2 rounded-lg border border-white/80 bg-white/90 px-2.5 py-1.5 text-[9px] font-semibold text-slate-500 shadow-sm backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ECG Preview
            </div>

            <img
              src={imageUrl}
              alt={`Uploaded ECG: ${file.name}`}
              draggable={false}
              className="relative z-[1] max-h-[620px] max-w-[94%] select-none object-contain drop-shadow-[0_10px_30px_rgba(15,23,42,0.12)] sm:max-h-[700px]"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                transition: "transform 120ms ease-out",
              }}
            />

            <div className="absolute bottom-3 left-3 z-10 hidden items-center gap-2 rounded-lg border border-white/80 bg-white/90 px-3 py-2 text-[10px] font-medium text-slate-500 shadow-sm backdrop-blur sm:flex sm:bottom-4 sm:left-4">
              <Activity size={13} className="text-blue-500" />
              Scroll to zoom
              <span className="text-slate-300">•</span>
              Drag to pan
            </div>
          </div>
        )}

        {file && !isPDF && imageUrl && (
          <div className="absolute bottom-3 right-3 z-20 rounded-xl border border-slate-200/80 bg-white/95 p-1 shadow-xl shadow-slate-900/10 backdrop-blur sm:bottom-4 sm:right-4 sm:p-1.5">
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
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/95 text-slate-500 shadow-lg backdrop-blur transition hover:bg-blue-50 hover:text-blue-600 sm:right-4 sm:top-4"
            aria-label="Enter fullscreen"
            title="Fullscreen"
          >
            <Maximize2 size={16} />
          </button>
        )}
      </div>

      {file && (
        <div className="flex min-h-[48px] flex-col gap-2 border-t border-slate-200/80 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2 text-[10px] font-medium text-slate-500 sm:text-[11px]">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50">
              <Activity size={13} className="text-blue-600" />
            </div>

            <span className="truncate">
              {isPDF
                ? "PDF document viewer"
                : "Zoom and pan to inspect the ECG"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="hidden items-center gap-1.5 text-[10px] font-medium text-slate-400 sm:flex">
              <ShieldCheck size={12} />
              Local preview
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}

export default ECGViewer;
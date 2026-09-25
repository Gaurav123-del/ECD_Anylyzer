import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";

import {
  GlobalWorkerOptions,
  getDocument,
} from "pdfjs-dist";

import type {
  PDFPageProxy,
  RenderTask,
} from "pdfjs-dist";

import Loading from "../common/Loading";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  file: File;
  onFullscreen?: () => void;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.25;

function PDFViewer({
  file,
  onFullscreen,
}: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);

  const [pdf, setPdf] = useState<
    Awaited<
      ReturnType<typeof getDocument>["promise"]
    > | null
  >(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = pdf?.numPages ?? 0;

  useEffect(() => {
    let cancelled = false;

    const loadPDF = async () => {
      setLoading(true);
      setError(null);
      setPageNumber(1);
      setZoom(1);
      setPdf(null);

      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;

      try {
        const arrayBuffer = await file.arrayBuffer();

        if (cancelled) {
          return;
        }

        const loadingTask = getDocument({
          data: arrayBuffer,
        });

        const loadedPdf = await loadingTask.promise;

        if (cancelled) {
          return;
        }

        setPdf(loadedPdf);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error("PDF loading error:", err);

        setPdf(null);
        setError(
          "Unable to load this PDF. Please check that the file is a valid PDF document."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPDF();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
    };
  }, [file]);

  const renderPage = useCallback(async () => {
    if (!pdf || !canvasRef.current) {
      return;
    }

    setRendering(true);
    setError(null);

    renderTaskRef.current?.cancel();
    renderTaskRef.current = null;

    try {
      const page: PDFPageProxy = await pdf.getPage(pageNumber);

      const viewport = page.getViewport({
        scale: zoom,
      });

      const devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Unable to create canvas context.");
      }

      canvas.width = Math.ceil(
        viewport.width * devicePixelRatio
      );

      canvas.height = Math.ceil(
        viewport.height * devicePixelRatio
      );

      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
      );

      context.clearRect(
        0,
        0,
        viewport.width,
        viewport.height
      );

      const renderTask = page.render({
        canvas,
        viewport,
      });

      renderTaskRef.current = renderTask;

      await renderTask.promise;

      if (renderTaskRef.current === renderTask) {
        renderTaskRef.current = null;
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : String(err);

      if (
        message.toLowerCase().includes("cancel")
      ) {
        return;
      }

      console.error("PDF render error:", err);

      setError("Unable to render this PDF page.");
    } finally {
      setRendering(false);
    }
  }, [pdf, pageNumber, zoom]);

  useEffect(() => {
    void renderPage();

    return () => {
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
    };
  }, [renderPage]);

  const zoomIn = useCallback(() => {
    setZoom((current) =>
      Math.min(
        MAX_ZOOM,
        Number((current + ZOOM_STEP).toFixed(2))
      )
    );
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((current) =>
      Math.max(
        MIN_ZOOM,
        Number((current - ZOOM_STEP).toFixed(2))
      )
    );
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const previousPage = useCallback(() => {
    setPageNumber((current) =>
      Math.max(1, current - 1)
    );
  }, []);

  const nextPage = useCallback(() => {
    setPageNumber((current) =>
      Math.min(totalPages, current + 1)
    );
  }, [totalPages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        previousPage();
      }

      if (event.key === "ArrowRight") {
        nextPage();
      }

      if (
        event.key === "+" ||
        event.key === "="
      ) {
        zoomIn();
      }

      if (event.key === "-") {
        zoomOut();
      }

      if (event.key === "0") {
        resetZoom();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    nextPage,
    previousPage,
    resetZoom,
    zoomIn,
    zoomOut,
  ]);

  if (loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center bg-slate-50 sm:min-h-[420px]">
        <Loading text="Loading PDF..." />
      </div>
    );
  }

  if (error && !pdf) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center px-4 text-center sm:min-h-[420px] sm:px-6">
        <div className="max-w-md rounded-xl border border-red-200 bg-red-50 px-4 py-4 sm:px-5">
          <p className="break-words text-xs font-medium leading-5 text-red-700 sm:text-sm">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[360px] flex-col bg-slate-100 sm:min-h-[420px]">
      <div className="flex flex-col gap-2 border-b border-slate-200 bg-white px-2.5 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-3">
        <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-start">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={previousPage}
              disabled={pageNumber <= 1}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
              title="Previous page"
            >
              <ChevronLeft size={17} />
            </button>

            <div className="min-w-[78px] px-1 text-center text-[11px] font-semibold text-slate-600 sm:min-w-[90px] sm:text-xs">
              Page {pageNumber} / {totalPages}
            </div>

            <button
              type="button"
              onClick={nextPage}
              disabled={pageNumber >= totalPages}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
              title="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>

          <span className="text-[10px] font-medium text-slate-400 sm:hidden">
            PDF
          </span>
        </div>

        <div className="flex w-full items-center justify-between gap-1.5 sm:w-auto sm:justify-end">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoom <= MIN_ZOOM}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Zoom out"
              title="Zoom out"
            >
              <Minus size={16} />
            </button>

            <button
              type="button"
              onClick={resetZoom}
              className="min-w-[56px] rounded-lg border border-slate-200 bg-white px-2 py-2 text-[11px] font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 sm:min-w-[60px] sm:text-xs"
              aria-label="Reset zoom"
              title="Reset zoom"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              type="button"
              onClick={zoomIn}
              disabled={zoom >= MAX_ZOOM}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Zoom in"
              title="Zoom in"
            >
              <Plus size={16} />
            </button>

            <button
              type="button"
              onClick={resetZoom}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              aria-label="Reset zoom"
              title="Reset zoom"
            >
              <RotateCcw size={15} />
            </button>
          </div>

          {onFullscreen && (
            <button
              type="button"
              onClick={onFullscreen}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              aria-label="Fullscreen"
              title="Fullscreen"
            >
              <Maximize2 size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="relative flex min-h-[290px] flex-1 items-start justify-center overflow-auto p-3 sm:min-h-[340px] sm:p-6">
        {rendering && (
          <div className="sticky top-2 z-10 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-500 shadow-sm sm:absolute sm:left-1/2 sm:top-4 sm:-translate-x-1/2 sm:text-xs">
            Rendering page...
          </div>
        )}

        <div className="rounded-sm bg-white shadow-md">
          <canvas
            ref={canvasRef}
            className="block max-w-none"
          />
        </div>
      </div>

      {error && pdf && (
        <div className="border-t border-red-200 bg-red-50 px-3 py-2 text-center text-[10px] text-red-700 sm:px-4 sm:text-xs">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-1 border-t border-slate-200 bg-white px-3 py-2 text-[10px] text-slate-400 sm:flex-row sm:px-4 sm:text-xs sm:text-slate-500">
        <span>Use ← / → to change pages</span>
        <span>+ / − zoom · 0 reset</span>
      </div>
    </div>
  );
}

export default PDFViewer;
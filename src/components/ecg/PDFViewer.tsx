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
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const renderTaskRef =
    useRef<RenderTask | null>(null);

  const [pdf, setPdf] =
    useState<Awaited<
      ReturnType<typeof getDocument>["promise"]
    > | null>(null);

  const [pageNumber, setPageNumber] =
    useState(1);

  const [zoom, setZoom] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [rendering, setRendering] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const totalPages = pdf?.numPages ?? 0;

  /* ========================================
     Load PDF
  ======================================== */

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
        const arrayBuffer =
          await file.arrayBuffer();

        if (cancelled) {
          return;
        }

        const loadingTask = getDocument({
          data: arrayBuffer,
        });

        const loadedPdf =
          await loadingTask.promise;

        if (cancelled) {
          return;
        }

        setPdf(loadedPdf);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "PDF loading error:",
          err
        );

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

  /* ========================================
     Render PDF page
  ======================================== */

  const renderPage = useCallback(
    async () => {
      if (!pdf || !canvasRef.current) {
        return;
      }

      setRendering(true);
      setError(null);

      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;

      try {
        const page: PDFPageProxy =
          await pdf.getPage(pageNumber);

        const viewport =
          page.getViewport({
            scale: zoom,
          });

        const devicePixelRatio = Math.min(
          window.devicePixelRatio || 1,
          2
        );

        const canvas = canvasRef.current;

        const context =
          canvas.getContext("2d");

        if (!context) {
          throw new Error(
            "Unable to create canvas context."
          );
        }

        canvas.width = Math.ceil(
          viewport.width *
            devicePixelRatio
        );

        canvas.height = Math.ceil(
          viewport.height *
            devicePixelRatio
        );

        canvas.style.width =
          `${viewport.width}px`;

        canvas.style.height =
          `${viewport.height}px`;

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

        const renderTask =
          page.render({
            canvas,
            viewport,
          });

        renderTaskRef.current =
          renderTask;

        await renderTask.promise;

        if (
          renderTaskRef.current ===
          renderTask
        ) {
          renderTaskRef.current = null;
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : String(err);

        if (
          message
            .toLowerCase()
            .includes("cancel")
        ) {
          return;
        }

        console.error(
          "PDF render error:",
          err
        );

        setError(
          "Unable to render this PDF page."
        );
      } finally {
        setRendering(false);
      }
    },
    [pdf, pageNumber, zoom]
  );

  useEffect(() => {
    void renderPage();

    return () => {
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
    };
  }, [renderPage]);

  /* ========================================
     Zoom controls
  ======================================== */

  const zoomIn = useCallback(() => {
    setZoom((current) =>
      Math.min(
        MAX_ZOOM,
        Number(
          (current + ZOOM_STEP).toFixed(2)
        )
      )
    );
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((current) =>
      Math.max(
        MIN_ZOOM,
        Number(
          (current - ZOOM_STEP).toFixed(2)
        )
      )
    );
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  /* ========================================
     Page controls
  ======================================== */

  const previousPage = useCallback(() => {
    setPageNumber((current) =>
      Math.max(1, current - 1)
    );
  }, []);

  const nextPage = useCallback(() => {
    setPageNumber((current) =>
      Math.min(
        totalPages,
        current + 1
      )
    );
  }, [totalPages]);

  /* ========================================
     Keyboard controls
  ======================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
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

  /* ========================================
     Loading state
  ======================================== */

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <Loading text="Loading PDF..." />
      </div>
    );
  }

  /* ========================================
     Error state
  ======================================== */

  if (error && !pdf) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>
        </div>
      </div>
    );
  }

  /* ========================================
     PDF viewer
  ======================================== */

  return (
    <div className="flex min-h-[420px] flex-col bg-slate-100">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 py-2">
        {/* Page navigation */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
            title="Previous page"
          >
            <ChevronLeft size={17} />
          </button>

          <div className="min-w-[90px] text-center text-xs font-semibold text-slate-600">
            Page {pageNumber} /{" "}
            {totalPages}
          </div>

          <button
            type="button"
            onClick={nextPage}
            disabled={
              pageNumber >= totalPages
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
            title="Next page"
          >
            <ChevronRight size={17} />
          </button>
        </div>

        {/* Zoom controls */}
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
            className="min-w-[60px] rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
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

          {onFullscreen && (
            <button
              type="button"
              onClick={onFullscreen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              aria-label="Fullscreen"
              title="Fullscreen"
            >
              <Maximize2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* PDF canvas */}
      <div className="relative flex flex-1 items-start justify-center overflow-auto p-6">
        {rendering && (
          <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
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

      {/* Render error */}
      {error && pdf && (
        <div className="border-t border-red-200 bg-red-50 px-4 py-2 text-center text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-500">
        <span>
          Use ← / → to change pages
        </span>

        <span>
          +/- zoom · 0 reset
        </span>
      </div>
    </div>
  );
}

export default PDFViewer;
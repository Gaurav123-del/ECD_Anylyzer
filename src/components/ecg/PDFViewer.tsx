import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  PointerEvent,
  WheelEvent,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

import * as pdfjsLib from "pdfjs-dist";

import type {
  PDFDocumentProxy,
} from "pdfjs-dist";

import ViewerControls from "./ViewerControls";

/*
 * ============================================================
 * PDF.js WORKER
 * ============================================================
 *
 * PDF.js needs a worker to process PDF files without blocking
 * the main browser thread.
 */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

/*
 * ============================================================
 * TYPES
 * ============================================================
 */

interface PDFViewerProps {
  file: File;
}

/*
 * ============================================================
 * VIEWER CONSTANTS
 * ============================================================
 */

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.25;

/*
 * ============================================================
 * PDF VIEWER
 * ============================================================
 */

function PDFViewer({
  file,
}: PDFViewerProps) {
  /*
   * Canvas used to render the current PDF page.
   */
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  /*
   * Main fullscreen container.
   */
  const containerRef =
    useRef<HTMLDivElement>(null);

  /*
   * Drag state.
   */
  const isDragging =
    useRef(false);

  /*
   * Pointer position when dragging starts.
   */
  const dragStart =
    useRef({
      x: 0,
      y: 0,
    });

  /*
   * Viewer position when dragging starts.
   */
  const startPosition =
    useRef({
      x: 0,
      y: 0,
    });

  /*
   * Loaded PDF document.
   */
  const [pdf, setPdf] =
    useState<PDFDocumentProxy | null>(
      null
    );

  /*
   * Current page number.
   */
  const [pageNumber, setPageNumber] =
    useState(1);

  /*
   * Total number of PDF pages.
   */
  const [pageCount, setPageCount] =
    useState(0);

  /*
   * Current zoom level.
   */
  const [zoom, setZoom] =
    useState(1);

  /*
   * Current pan position.
   */
  const [position, setPosition] =
    useState({
      x: 0,
      y: 0,
    });

  /*
   * PDF loading state.
   */
  const [loading, setLoading] =
    useState(true);

  /*
   * Current page rendering state.
   */
  const [rendering, setRendering] =
    useState(false);

  /*
   * Error message.
   */
  const [error, setError] =
    useState<string | null>(null);

  /*
   * ==========================================================
   * LOAD PDF
   * ==========================================================
   */

  useEffect(() => {
    let cancelled = false;

    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);

        /*
         * Reset viewer when a new file is selected.
         */
        setPdf(null);
        setPageNumber(1);
        setPageCount(0);
        setZoom(1);

        setPosition({
          x: 0,
          y: 0,
        });

        /*
         * Convert File into ArrayBuffer.
         */
        const arrayBuffer =
          await file.arrayBuffer();

        if (cancelled) {
          return;
        }

        /*
         * Load PDF through PDF.js.
         */
        const loadingTask =
          pdfjsLib.getDocument({
            data: arrayBuffer,
          });

        const loadedPdf =
          await loadingTask.promise;

        if (cancelled) {
          return;
        }

        /*
         * Store PDF document.
         */
        setPdf(loadedPdf);

        setPageCount(
          loadedPdf.numPages
        );
      } catch {
        if (!cancelled) {
          setError(
            "Unable to open this PDF file."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPDF();

    return () => {
      cancelled = true;
    };
  }, [file]);

  /*
   * ==========================================================
   * RENDER CURRENT PAGE
   * ==========================================================
   */

  useEffect(() => {
    if (
      !pdf ||
      !canvasRef.current
    ) {
      return;
    }

    let cancelled = false;

    const renderPage = async () => {
      try {
        setRendering(true);
        setError(null);

        /*
         * Get the selected page.
         */
        const page =
          await pdf.getPage(
            pageNumber
          );

        if (cancelled) {
          return;
        }

        /*
         * Base PDF rendering scale.
         */
        const scale =
          1.5 * zoom;

        /*
         * Create viewport.
         */
        const viewport =
          page.getViewport({
            scale,
          });

        const canvas =
          canvasRef.current;

        if (!canvas) {
          return;
        }

        /*
         * Create 2D rendering context.
         */
        const context =
          canvas.getContext("2d", {
            alpha: false,
          });

        if (!context) {
          throw new Error(
            "Unable to create canvas context."
          );
        }

        /*
         * Account for high-DPI displays.
         */
        const outputScale =
          window.devicePixelRatio || 1;

        /*
         * ======================================================
         * CANVAS RESOLUTION
         * ======================================================
         */

        canvas.width =
          Math.floor(
            viewport.width *
              outputScale
          );

        canvas.height =
          Math.floor(
            viewport.height *
              outputScale
          );

        /*
         * ======================================================
         * CANVAS DISPLAY SIZE
         * ======================================================
         */

        canvas.style.width =
          `${viewport.width}px`;

        canvas.style.height =
          `${viewport.height}px`;

        /*
         * ======================================================
         * HIGH-DPI RENDERING
         * ======================================================
         */

        context.setTransform(
          outputScale,
          0,
          0,
          outputScale,
          0,
          0
        );

        /*
         * ======================================================
         * WHITE BACKGROUND
         * ======================================================
         */

        context.fillStyle =
          "#ffffff";

        context.fillRect(
          0,
          0,
          viewport.width,
          viewport.height
        );

        /*
         * ======================================================
         * RENDER PDF PAGE
         * ======================================================
         */

        const renderTask =
          page.render({
            canvas,
            viewport,
          });

        await renderTask.promise;

        if (cancelled) {
          return;
        }
      } catch {
        if (!cancelled) {
          setError(
            "Unable to render this ECG page."
          );
        }
      } finally {
        if (!cancelled) {
          setRendering(false);
        }
      }
    };

    void renderPage();

    return () => {
      cancelled = true;
    };
  }, [
    pdf,
    pageNumber,
    zoom,
  ]);

  /*
   * ==========================================================
   * RESET VIEW
   * ==========================================================
   */

  const resetView =
    useCallback(() => {
      setZoom(1);

      setPosition({
        x: 0,
        y: 0,
      });
    }, []);

  /*
   * ==========================================================
   * ZOOM IN
   * ==========================================================
   */

  const zoomIn =
    useCallback(() => {
      setZoom((currentZoom) =>
        Math.min(
          currentZoom + ZOOM_STEP,
          MAX_ZOOM
        )
      );
    }, []);

  /*
   * ==========================================================
   * ZOOM OUT
   * ==========================================================
   */

  const zoomOut =
    useCallback(() => {
      setZoom((currentZoom) =>
        Math.max(
          currentZoom - ZOOM_STEP,
          MIN_ZOOM
        )
      );
    }, []);

  /*
   * ==========================================================
   * PREVIOUS PAGE
   * ==========================================================
   */

  const previousPage =
    useCallback(() => {
      setPageNumber((currentPage) =>
        Math.max(
          currentPage - 1,
          1
        )
      );

      setPosition({
        x: 0,
        y: 0,
      });
    }, []);

  /*
   * ==========================================================
   * NEXT PAGE
   * ==========================================================
   */

  const nextPage =
    useCallback(() => {
      setPageNumber((currentPage) =>
        Math.min(
          currentPage + 1,
          pageCount
        )
      );

      setPosition({
        x: 0,
        y: 0,
      });
    }, [pageCount]);

  /*
   * ==========================================================
   * FULLSCREEN
   * ==========================================================
   */

  const handleFullscreen =
    useCallback(() => {
      void containerRef.current?.requestFullscreen?.();
    }, []);

  /*
   * ==========================================================
   * POINTER DOWN
   * ==========================================================
   */

  const handlePointerDown =
    useCallback(
      (
        event: PointerEvent<HTMLDivElement>
      ) => {
        /*
         * Panning is only enabled when zoomed.
         */
        if (zoom <= 1) {
          return;
        }

        isDragging.current = true;

        dragStart.current = {
          x: event.clientX,
          y: event.clientY,
        };

        startPosition.current = {
          ...position,
        };

        event.currentTarget.setPointerCapture(
          event.pointerId
        );
      },
      [position, zoom]
    );

  /*
   * ==========================================================
   * POINTER MOVE
   * ==========================================================
   */

  const handlePointerMove =
    useCallback(
      (
        event: PointerEvent<HTMLDivElement>
      ) => {
        if (!isDragging.current) {
          return;
        }

        const deltaX =
          event.clientX -
          dragStart.current.x;

        const deltaY =
          event.clientY -
          dragStart.current.y;

        setPosition({
          x:
            startPosition.current.x +
            deltaX,

          y:
            startPosition.current.y +
            deltaY,
        });
      },
      []
    );

  /*
   * ==========================================================
   * POINTER UP
   * ==========================================================
   */

  const handlePointerUp =
    useCallback(
      (
        event: PointerEvent<HTMLDivElement>
      ) => {
        isDragging.current = false;

        if (
          event.currentTarget.hasPointerCapture(
            event.pointerId
          )
        ) {
          event.currentTarget.releasePointerCapture(
            event.pointerId
          );
        }
      },
      []
    );

  /*
   * ==========================================================
   * MOUSE WHEEL ZOOM
   * ==========================================================
   */

  const handleWheel =
    useCallback(
      (
        event: WheelEvent<HTMLDivElement>
      ) => {
        event.preventDefault();

        if (event.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      },
      [zoomIn, zoomOut]
    );

  /*
   * ==========================================================
   * LOADING STATE
   * ==========================================================
   */

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-slate-100">
        <div className="text-center">
          <Loader2
            className="mx-auto h-8 w-8 animate-spin text-blue-600"
            aria-hidden="true"
          />

          <p className="mt-3 text-sm font-medium text-slate-600">
            Loading ECG PDF...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Preparing the document viewer
          </p>
        </div>
      </div>
    );
  }

  /*
   * ==========================================================
   * ERROR STATE
   * ==========================================================
   */

  if (error) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-slate-100 p-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <span
              className="text-xl text-red-500"
              aria-hidden="true"
            >
              !
            </span>
          </div>

          <p className="mt-4 font-medium text-red-600">
            {error}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Please try uploading the ECG PDF again.
          </p>
        </div>
      </div>
    );
  }

  /*
   * ==========================================================
   * PDF VIEWER
   * ==========================================================
   */

  return (
    <div
      ref={containerRef}
      className="overflow-hidden bg-white"
    >
      {/* ======================================================
          PDF CANVAS
          ====================================================== */}

      <div
        onWheel={handleWheel}
        className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-slate-100 p-4"
      >
        <div
          className={`relative ${
            zoom > 1
              ? "cursor-grab active:cursor-grabbing"
              : "cursor-default"
          }`}
          style={{
            transform:
              `translate3d(${position.x}px, ${position.y}px, 0)`,

            touchAction:
              zoom > 1
                ? "none"
                : "auto",
          }}
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
        >
          <canvas
            ref={canvasRef}
            className="block max-w-none select-none shadow-md"
          />
        </div>

        {/* ==================================================
            RENDERING INDICATOR
            ================================================== */}

        {rendering && (
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-500 shadow-sm backdrop-blur">
            <Loader2
              className="h-3.5 w-3.5 animate-spin text-blue-600"
              aria-hidden="true"
            />

            Rendering page...
          </div>
        )}
      </div>

      {/* ======================================================
          PAGE NAVIGATION
          ====================================================== */}

      <div className="flex items-center justify-center gap-3 border-t border-slate-200 bg-white p-3">
        <button
          type="button"
          onClick={previousPage}
          disabled={pageNumber <= 1}
          aria-label="Previous page"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft
            className="h-4 w-4"
            aria-hidden="true"
          />
        </button>

        <span className="min-w-24 text-center text-sm font-medium text-slate-600">
          Page {pageNumber} / {pageCount}
        </span>

        <button
          type="button"
          onClick={nextPage}
          disabled={
            pageNumber >= pageCount
          }
          aria-label="Next page"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight
            className="h-4 w-4"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* ======================================================
          ZOOM CONTROLS
          ====================================================== */}

      <ViewerControls
        zoom={zoom}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetView}
        onFullscreen={
          handleFullscreen
        }
      />
    </div>
  );
}

export default PDFViewer;
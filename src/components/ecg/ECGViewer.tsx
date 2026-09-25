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
  FileImage,
  Trash2,
} from "lucide-react";

import ViewerControls from "./ViewerControls";

import { formatFileSize } from "../../utils/formatters";

interface ECGViewerProps {
  file: File;
  onRemove: () => void;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.25;

function ECGViewer({
  file,
  onRemove,
}: ECGViewerProps) {
  const [imageUrl, setImageUrl] =
    useState<string | null>(null);

  const [zoom, setZoom] =
    useState(1);

  const [position, setPosition] =
    useState({
      x: 0,
      y: 0,
    });

  const viewerRef =
    useRef<HTMLDivElement>(null);

  const isDragging =
    useRef(false);

  const dragStart =
    useRef({
      x: 0,
      y: 0,
    });

  const startPosition =
    useRef({
      x: 0,
      y: 0,
    });

  useEffect(() => {
    if (!file.type.startsWith("image/")) {
      setImageUrl(null);
      return;
    }

    const url =
      URL.createObjectURL(file);

    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const resetView = useCallback(() => {
    setZoom(1);

    setPosition({
      x: 0,
      y: 0,
    });
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((current) =>
      Math.min(
        current + ZOOM_STEP,
        MAX_ZOOM
      )
    );
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((current) =>
      Math.max(
        current - ZOOM_STEP,
        MIN_ZOOM
      )
    );
  }, []);

  const handleWheel = useCallback(
    (
      event: WheelEvent<HTMLDivElement>
    ) => {
      event.preventDefault();

      const direction =
        event.deltaY < 0 ? 1 : -1;

      setZoom((current) => {
        const next =
          current +
          direction * ZOOM_STEP;

        return Math.min(
          Math.max(
            next,
            MIN_ZOOM
          ),
          MAX_ZOOM
        );
      });
    },
    []
  );

  const handlePointerDown =
    useCallback(
      (
        event: PointerEvent<HTMLDivElement>
      ) => {
        if (zoom <= 1) return;

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

  const handlePointerMove =
    useCallback(
      (
        event: PointerEvent<HTMLDivElement>
      ) => {
        if (!isDragging.current) return;

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

  const handleFullscreen =
    useCallback(() => {
      viewerRef.current?.requestFullscreen?.();
    }, []);

  return (
    <section>
      {/* Header */}
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <FileImage className="h-5 w-5 shrink-0 text-blue-600" />

            <h2 className="font-semibold text-slate-900">
              ECG Viewer
            </h2>
          </div>

          <div className="mt-1 flex min-w-0 gap-2 text-sm text-slate-500">
            <span className="truncate">
              {file.name}
            </span>

            <span className="shrink-0">
              •
            </span>

            <span className="shrink-0">
              {formatFileSize(file.size)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />

          Remove ECG
        </button>
      </div>

      {/* Viewer */}
      <div
        ref={viewerRef}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
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
              <FileImage className="mx-auto h-12 w-12 text-slate-400" />

              <p className="mt-3 font-medium text-slate-700">
                PDF uploaded
              </p>

              <p className="mt-1 text-sm text-slate-500">
                PDF viewer will be added next.
              </p>
            </div>
          )}
        </div>

        <ViewerControls
          zoom={zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={resetView}
          onFullscreen={handleFullscreen}
        />
      </div>
    </section>
  );
}

export default ECGViewer;
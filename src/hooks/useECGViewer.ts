import { useCallback, useRef, useState } from "react";
import type { PointerEvent, WheelEvent } from "react";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.25;

interface Position {
  x: number;
  y: number;
}

function useECGViewer() {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef<Position>({
    x: 0,
    y: 0,
  });

  const zoomIn = useCallback(() => {
    setZoom((current) =>
      Math.min(
        MAX_ZOOM,
        Number((current + ZOOM_STEP).toFixed(2))
      )
    );
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((current) => {
      const next = Math.max(
        MIN_ZOOM,
        Number((current - ZOOM_STEP).toFixed(2))
      );

      if (next <= 1) {
        setPosition({ x: 0, y: 0 });
      }

      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setZoom(1);
    setPosition({
      x: 0,
      y: 0,
    });
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (event.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    },
    [zoomIn, zoomOut]
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (zoom <= 1) return;

      isDraggingRef.current = true;

      lastPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [zoom]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || zoom <= 1) {
        return;
      }

      const deltaX =
        event.clientX - lastPointerRef.current.x;

      const deltaY =
        event.clientY - lastPointerRef.current.y;

      lastPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      setPosition((current) => ({
        x: current.x + deltaX,
        y: current.y + deltaY,
      }));
    },
    [zoom]
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = false;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(
          event.pointerId
        );
      }
    },
    []
  );

  const toggleFullscreen = useCallback(
    async (element?: HTMLElement | null) => {
      try {
        if (!document.fullscreenElement) {
          const target = element ?? document.documentElement;

          await target.requestFullscreen();

          setIsFullscreen(true);
        } else {
          await document.exitFullscreen();

          setIsFullscreen(false);
        }
      } catch (error) {
        console.error(
          "Fullscreen operation failed:",
          error
        );
      }
    },
    []
  );

  const canZoomIn = zoom < MAX_ZOOM;
  const canZoomOut = zoom > MIN_ZOOM;

  return {
    zoom,
    position,
    isFullscreen,
    canZoomIn,
    canZoomOut,
    zoomIn,
    zoomOut,
    reset,
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    toggleFullscreen,
  };
}

export default useECGViewer;
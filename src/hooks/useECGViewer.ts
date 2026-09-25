import {
  useCallback,
  useRef,
  useState,
} from "react";

import type {
  PointerEvent,
  WheelEvent,
} from "react";

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
 * TYPES
 * ============================================================
 */

interface Position {
  x: number;
  y: number;
}

/*
 * ============================================================
 * HOOK
 * ============================================================
 */

export function useECGViewer() {
  /*
   * Current zoom level.
   */
  const [zoom, setZoom] =
    useState(1);

  /*
   * Current image/PDF position.
   */
  const [position, setPosition] =
    useState<Position>({
      x: 0,
      y: 0,
    });

  /*
   * Fullscreen viewer reference.
   */
  const viewerRef =
    useRef<HTMLDivElement>(null);

  /*
   * Drag state.
   */
  const isDragging =
    useRef(false);

  /*
   * Pointer position when dragging begins.
   */
  const dragStart =
    useRef<Position>({
      x: 0,
      y: 0,
    });

  /*
   * Position when dragging begins.
   */
  const startPosition =
    useRef<Position>({
      x: 0,
      y: 0,
    });

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
   * WHEEL ZOOM
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
   * POINTER DOWN
   * ==========================================================
   */

  const handlePointerDown =
    useCallback(
      (
        event: PointerEvent<HTMLDivElement>
      ) => {
        /*
         * Do not allow panning at 100%
         * or below.
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
   * FULLSCREEN
   * ==========================================================
   */

  const handleFullscreen =
    useCallback(() => {
      void viewerRef.current?.requestFullscreen?.();
    }, []);

  /*
   * ==========================================================
   * RETURN API
   * ==========================================================
   */

  return {
    /*
     * State
     */
    zoom,
    position,

    /*
     * References
     */
    viewerRef,

    /*
     * Zoom controls
     */
    zoomIn,
    zoomOut,
    resetView,

    /*
     * Mouse / pointer controls
     */
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,

    /*
     * Fullscreen
     */
    handleFullscreen,
  };
}
import {
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";

interface ViewerControlsProps {
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFullscreen?: () => void;
}

function ViewerControls({
  zoom,
  minZoom = 0.5,
  maxZoom = 5,
  onZoomIn,
  onZoomOut,
  onReset,
  onFullscreen,
}: ViewerControlsProps) {
  const zoomPercentage = Math.round(zoom * 100);

  const canZoomOut = zoom > minZoom;
  const canZoomIn = zoom < maxZoom;

  const buttonClass =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        className={buttonClass}
        aria-label="Zoom out"
        title="Zoom out"
      >
        <Minus size={16} />
      </button>

      <button
        type="button"
        onClick={onReset}
        className="min-w-[64px] rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
        aria-label="Reset zoom"
        title="Reset zoom"
      >
        {zoomPercentage}%
      </button>

      <button
        type="button"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        className={buttonClass}
        aria-label="Zoom in"
        title="Zoom in"
      >
        <Plus size={16} />
      </button>

      <button
        type="button"
        onClick={onReset}
        className={buttonClass}
        aria-label="Reset viewer"
        title="Reset viewer"
      >
        <RotateCcw size={15} />
      </button>

      {onFullscreen && (
        <button
          type="button"
          onClick={onFullscreen}
          className={buttonClass}
          aria-label="Fullscreen"
          title="Fullscreen"
        >
          <Maximize2 size={15} />
        </button>
      )}
    </div>
  );
}

export default ViewerControls;
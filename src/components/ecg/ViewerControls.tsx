import {
  Maximize,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";

interface ViewerControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFullscreen: () => void;
}

function ViewerControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  onFullscreen,
}: ViewerControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 bg-white p-3">
      <button
        type="button"
        onClick={onZoomOut}
        disabled={zoom <= 0.5}
        aria-label="Zoom out"
        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="h-4 w-4" />
      </button>

      <span
        aria-live="polite"
        className="min-w-16 text-center text-sm font-medium text-slate-600"
      >
        {Math.round(zoom * 100)}%
      </span>

      <button
        type="button"
        onClick={onZoomIn}
        disabled={zoom >= 5}
        aria-label="Zoom in"
        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
      </button>

      <div className="mx-1 h-6 w-px bg-slate-200" />

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
      >
        <RotateCcw className="h-4 w-4" />

        Reset
      </button>

      <button
        type="button"
        onClick={onFullscreen}
        aria-label="Open fullscreen"
        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
      >
        <Maximize className="h-4 w-4" />
      </button>
    </div>
  );
}

export default ViewerControls;
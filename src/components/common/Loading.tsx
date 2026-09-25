interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

function Loading({
  message = "Loading...",
  fullScreen = false,
}: LoadingProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-10"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

        <p className="mt-3 text-sm text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Loading;
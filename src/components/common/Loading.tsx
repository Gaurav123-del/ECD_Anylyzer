import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: {
    spinner: 16,
    text: "text-xs",
  },
  md: {
    spinner: 24,
    text: "text-sm",
  },
  lg: {
    spinner: 32,
    text: "text-base",
  },
} as const;

function Loading({
  text = "Loading...",
  fullScreen = false,
  size = "md",
}: LoadingProps) {
  const currentSize = sizeClasses[size];

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        size={currentSize.spinner}
        className="animate-spin text-blue-600"
        aria-hidden="true"
      />

      {text && (
        <p className={`${currentSize.text} text-slate-500`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex min-h-32 items-center justify-center">
      {content}
    </div>
  );
}

export default Loading;
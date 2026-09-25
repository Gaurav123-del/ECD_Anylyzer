import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
} from "lucide-react";

interface StatusBadgeProps {
  status:
    | "idle"
    | "processing"
    | "success"
    | "error";
}

function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    idle: {
      label: "Ready",
      className: "bg-slate-100 text-slate-600",
      icon: Clock3,
    },

    processing: {
      label: "Processing",
      className: "bg-blue-100 text-blue-700",
      icon: Loader2,
    },

    success: {
      label: "Completed",
      className: "bg-emerald-100 text-emerald-700",
      icon: CheckCircle2,
    },

    error: {
      label: "Error",
      className: "bg-red-100 text-red-700",
      icon: AlertCircle,
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${current.className}`}
    >
      <Icon
        className={`h-3.5 w-3.5 ${
          status === "processing"
            ? "animate-spin"
            : ""
        }`}
      />

      {current.label}
    </span>
  );
}

export default StatusBadge;
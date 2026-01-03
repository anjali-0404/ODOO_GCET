import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

export type AttendanceStatus = "present" | "on-leave" | "absent";

interface AttendanceStatusIndicatorProps {
  status: AttendanceStatus;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const statusConfig: Record<
  AttendanceStatus,
  { color: string; label: string; icon?: React.ReactNode; bgColor?: string }
> = {
  present: {
    color: "bg-green-500",
    bgColor: "bg-green-500/10",
    label: "Present",
  },
  "on-leave": {
    color: "bg-blue-400",
    bgColor: "bg-blue-500/10",
    label: "On Leave",
    icon: <Plane className="h-3 w-3" />,
  },
  absent: {
    color: "bg-yellow-500",
    bgColor: "bg-yellow-500/10",
    label: "Absent",
  },
};

const sizeConfig = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
  lg: "h-4 w-4",
};

export function AttendanceStatusIndicator({
  status,
  size = "md",
  showLabel = false,
  className,
}: AttendanceStatusIndicatorProps) {
  const config = statusConfig[status];
  const sizeClass = sizeConfig[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center",
          sizeClass,
          config.color
        )}
        title={config.label}
      >
        {config.icon && status === "on-leave" && (
          <span className="text-white scale-75">{config.icon}</span>
        )}
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground">{config.label}</span>
      )}
    </div>
  );
}

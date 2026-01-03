import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

export type EmployeeStatus = "present" | "on-leave" | "absent";

interface EmployeeCardProps {
  employee: {
    id: string;
    name: string;
    avatar?: string;
    position?: string;
    department?: string;
    status: EmployeeStatus;
  };
  onClick?: () => void;
}

const statusConfig: Record<EmployeeStatus, { color: string; label: string; icon?: React.ReactNode }> = {
  present: { color: "bg-success", label: "Present" },
  "on-leave": { color: "bg-warning", label: "On Leave", icon: <Plane className="h-3 w-3" /> },
  absent: { color: "bg-destructive", label: "Absent" },
};

export function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  const status = statusConfig[employee.status];
  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card
      variant="elevated"
      className={cn(
        "p-4 cursor-pointer hover:border-primary/50 transition-all group",
        "hover:shadow-glow-sm"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center gap-3">
        {/* Avatar with status indicator */}
        <div className="relative">
          <Avatar className="h-16 w-16 border-2 border-border group-hover:border-primary/50 transition-colors">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          {/* Status indicator */}
          <div
            className={cn(
              "absolute -top-1 -right-1 h-5 w-5 rounded-full border-2 border-card flex items-center justify-center",
              status.color
            )}
            title={status.label}
          >
            {status.icon && (
              <span className="text-white">{status.icon}</span>
            )}
          </div>
        </div>

        {/* Employee info */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
            {employee.name}
          </h3>
          {employee.position && (
            <p className="text-xs text-muted-foreground">{employee.position}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

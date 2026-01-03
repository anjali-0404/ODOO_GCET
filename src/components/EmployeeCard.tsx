import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { AttendanceStatusIndicator } from "./AttendanceStatusIndicator";
import type { AttendanceStatus } from "./AttendanceStatusIndicator";

export type EmployeeStatus = AttendanceStatus;

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

export function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
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
          {/* Status indicator positioned at top-right */}
          <div
            className="absolute -top-1 -right-1"
            title={employee.status}
          >
            <AttendanceStatusIndicator status={employee.status} size="lg" />
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

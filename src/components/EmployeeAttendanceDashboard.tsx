import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for employee's own attendance
const mockEmployeeAttendance = [
  { 
    date: "28/10/2025", 
    checkIn: "10:00", 
    checkOut: "19:00", 
    workHours: "09:00", 
    extraHours: "01:00",
    dayOfWeek: "Tuesday"
  },
  { 
    date: "29/10/2025", 
    checkIn: "10:00", 
    checkOut: "19:00", 
    workHours: "09:00", 
    extraHours: "01:00",
    dayOfWeek: "Wednesday"
  },
  { 
    date: "30/10/2025", 
    checkIn: "09:30", 
    checkOut: "18:30", 
    workHours: "09:00", 
    extraHours: "01:00",
    dayOfWeek: "Thursday"
  },
  { 
    date: "31/10/2025", 
    checkIn: "09:45", 
    checkOut: "18:45", 
    workHours: "09:00", 
    extraHours: "01:00",
    dayOfWeek: "Friday"
  },
  { 
    date: "01/11/2025", 
    checkIn: "-", 
    checkOut: "-", 
    workHours: "-", 
    extraHours: "-",
    dayOfWeek: "Saturday"
  },
  { 
    date: "02/11/2025", 
    checkIn: "-", 
    checkOut: "-", 
    workHours: "-", 
    extraHours: "-",
    dayOfWeek: "Sunday"
  },
  { 
    date: "03/11/2025", 
    checkIn: "10:00", 
    checkOut: "19:00", 
    workHours: "09:00", 
    extraHours: "01:00",
    dayOfWeek: "Monday"
  },
];

export function EmployeeAttendanceDashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1)); // October 2025
  const [viewMode, setViewMode] = useState<"date" | "day">("date");

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  // Calculate stats for the month
  const daysPresent = mockEmployeeAttendance.filter(
    (record) => record.checkIn !== "-"
  ).length;
  const leavesCount = mockEmployeeAttendance.filter(
    (record) => record.checkIn === "-"
  ).length;
  const totalWorkingDays = mockEmployeeAttendance.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle className="text-xl">Attendance</CardTitle>
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Month Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="min-w-[140px]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatMonth(currentMonth)}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "date" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("date")}
                >
                  Date
                </Button>
                <Button
                  variant={viewMode === "day" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("day")}
                >
                  Day
                </Button>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Count of days present</span>
                <span className="text-2xl font-bold">{daysPresent}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Leaves count</span>
                <span className="text-2xl font-bold">{leavesCount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Total working days</span>
                <span className="text-2xl font-bold">{totalWorkingDays}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Current Date Display */}
          <div className="mb-4 p-3 bg-muted/50 rounded-md">
            <p className="font-medium">22, October 2025</p>
          </div>

          {/* Attendance Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Work Hours</TableHead>
                  <TableHead>Extra Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEmployeeAttendance.map((record, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {record.date}
                      {viewMode === "day" && (
                        <span className="text-xs text-muted-foreground ml-2">
                          ({record.dayOfWeek})
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>
                      {record.workHours !== "-" && (
                        <span className="font-medium">{record.workHours}</span>
                      )}
                      {record.workHours === "-" && <span>-</span>}
                    </TableCell>
                    <TableCell>
                      {record.extraHours !== "-" && (
                        <Badge variant="secondary" className="font-mono">
                          {record.extraHours}
                        </Badge>
                      )}
                      {record.extraHours === "-" && <span>-</span>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

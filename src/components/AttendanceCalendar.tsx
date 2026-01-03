import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { AttendanceStatusIndicator } from "./AttendanceStatusIndicator";
import type { AttendanceStatus } from "./AttendanceStatusIndicator";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
  date: Date;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  hours?: string;
}

// Mock attendance data for the calendar
const mockAttendanceRecords: AttendanceRecord[] = [
  { date: new Date(2026, 0, 3), status: "present", checkIn: "09:00 AM", checkOut: "05:30 PM", hours: "8h 30m" },
  { date: new Date(2026, 0, 2), status: "present", checkIn: "09:15 AM", checkOut: "06:00 PM", hours: "8h 45m" },
  { date: new Date(2026, 0, 1), status: "on-leave" },
  { date: new Date(2025, 11, 31), status: "present", checkIn: "08:45 AM", checkOut: "05:15 PM", hours: "8h 30m" },
  { date: new Date(2025, 11, 30), status: "absent" },
  { date: new Date(2025, 11, 27), status: "present", checkIn: "09:00 AM", checkOut: "05:45 PM", hours: "8h 45m" },
  { date: new Date(2025, 11, 26), status: "present", checkIn: "09:10 AM", checkOut: "05:30 PM", hours: "8h 20m" },
  { date: new Date(2025, 11, 25), status: "on-leave" },
  { date: new Date(2025, 11, 24), status: "present", checkIn: "09:05 AM", checkOut: "05:40 PM", hours: "8h 35m" },
  { date: new Date(2025, 11, 23), status: "present", checkIn: "08:55 AM", checkOut: "05:25 PM", hours: "8h 30m" },
];

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function AttendanceCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getAttendanceForDate = (date: Date): AttendanceRecord | undefined => {
    return mockAttendanceRecords.find((record) => isSameDay(record.date, date));
  };

  const selectedAttendance = selectedDate ? getAttendanceForDate(selectedDate) : null;

  const modifiers = {
    present: mockAttendanceRecords
      .filter((r) => r.status === "present")
      .map((r) => r.date),
    absent: mockAttendanceRecords
      .filter((r) => r.status === "absent")
      .map((r) => r.date),
    onLeave: mockAttendanceRecords
      .filter((r) => r.status === "on-leave")
      .map((r) => r.date),
  };

  const modifiersClassNames = {
    present: "bg-green-500/20 text-green-700 hover:bg-green-500/30 font-semibold",
    absent: "bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30 font-semibold",
    onLeave: "bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 font-semibold",
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Attendance Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className="rounded-md border w-full"
          />
          
          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
              <span className="text-sm text-muted-foreground">On Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="text-sm text-muted-foreground">Absent</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {selectedDate
              ? selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Select a date"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedAttendance ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <AttendanceStatusIndicator
                  status={selectedAttendance.status}
                  size="md"
                  showLabel
                />
              </div>

              {selectedAttendance.checkIn && (
                <>
                  <div className="flex items-center justify-between py-2 border-t">
                    <span className="text-sm text-muted-foreground">Check In</span>
                    <span className="text-sm font-medium">
                      {selectedAttendance.checkIn}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t">
                    <span className="text-sm text-muted-foreground">Check Out</span>
                    <span className="text-sm font-medium">
                      {selectedAttendance.checkOut}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t">
                    <span className="text-sm text-muted-foreground">
                      Total Hours
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {selectedAttendance.hours}
                    </span>
                  </div>
                </>
              )}

              {selectedAttendance.status === "on-leave" && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                  <p className="text-sm text-blue-700">
                    You were on approved leave this day.
                  </p>
                </div>
              )}

              {selectedAttendance.status === "absent" && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                  <p className="text-sm text-yellow-700">
                    No attendance record found for this day.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-sm text-muted-foreground">
              {selectedDate
                ? "No attendance record for this date"
                : "Select a date to view details"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

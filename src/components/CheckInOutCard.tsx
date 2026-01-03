import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, LogIn, LogOut, AlertCircle, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { AttendanceStatusIndicator } from "./AttendanceStatusIndicator";
import type { AttendanceStatus } from "./AttendanceStatusIndicator";
import { Badge } from "@/components/ui/badge";

const STANDARD_CHECK_IN = "09:00"; // 9:00 AM
const STANDARD_WORK_HOURS = 8; // 8 hours
const LATE_THRESHOLD_MINUTES = 15; // 15 minutes

export function CheckInOutCard() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [status, setStatus] = useState<AttendanceStatus>("absent");
  const [isLate, setIsLate] = useState(false);
  const [lateByMinutes, setLateByMinutes] = useState(0);
  const [workDuration, setWorkDuration] = useState<string | null>(null);
  const [hasOvertime, setHasOvertime] = useState(false);
  const [overtimeHours, setOvertimeHours] = useState(0);

  const calculateTimeDifference = (startTime: Date, endTime: Date) => {
    const diff = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes, totalHours: diff / (1000 * 60 * 60) };
  };

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    // Check if late
    const [standardHour, standardMinute] = STANDARD_CHECK_IN.split(":").map(Number);
    const standardTime = new Date(now);
    standardTime.setHours(standardHour, standardMinute, 0, 0);
    
    const minutesLate = Math.floor((now.getTime() - standardTime.getTime()) / (1000 * 60));
    
    if (minutesLate > LATE_THRESHOLD_MINUTES) {
      setIsLate(true);
      setLateByMinutes(minutesLate);
    } else {
      setIsLate(false);
      setLateByMinutes(0);
    }
    
    setCheckInTime(timeString);
    setIsCheckedIn(true);
    setStatus("present"); // Update status to present (green) on check-in
    setCheckOutTime(null);
    setWorkDuration(null);
    setHasOvertime(false);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setCheckOutTime(timeString);
    setIsCheckedIn(false);

    // Calculate work duration
    if (checkInTime) {
      const checkInDate = new Date();
      const [inHour, inMinute, inPeriod] = checkInTime.match(/(\d+):(\d+)\s(\w+)/)?.slice(1) || [];
      let hour = parseInt(inHour);
      if (inPeriod === "PM" && hour !== 12) hour += 12;
      if (inPeriod === "AM" && hour === 12) hour = 0;
      checkInDate.setHours(hour, parseInt(inMinute), 0, 0);

      const { hours, minutes, totalHours } = calculateTimeDifference(checkInDate, now);
      setWorkDuration(`${hours}h ${minutes}m`);

      // Check for overtime (more than standard work hours)
      if (totalHours > STANDARD_WORK_HOURS) {
        setHasOvertime(true);
        setOvertimeHours(totalHours - STANDARD_WORK_HOURS);
      }
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Attendance
          </CardTitle>
          <AttendanceStatusIndicator status={status} size="lg" showLabel />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Late Arrival Warning */}
        {isLate && isCheckedIn && (
          <div className="flex items-start gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
            <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-700">Late Check-in</p>
              <p className="text-xs text-orange-600">
                You're {lateByMinutes} minutes late. Standard time: {STANDARD_CHECK_IN} AM
              </p>
            </div>
          </div>
        )}

        {/* Check-in Time Display */}
        {checkInTime && (
          <div className="flex items-center justify-between py-3 px-4 bg-green-500/10 rounded-md border border-green-500/20">
            <div className="flex items-center gap-2">
              <LogIn className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-muted-foreground">Check In</p>
                <p className="text-lg font-semibold text-green-600">{checkInTime}</p>
              </div>
            </div>
            {isLate && (
              <Badge variant="outline" className="text-orange-600 border-orange-300">
                Late
              </Badge>
            )}
          </div>
        )}

        {/* Check-out Time Display */}
        {checkOutTime && (
          <div className="flex items-center justify-between py-3 px-4 bg-blue-500/10 rounded-md border border-blue-500/20">
            <div className="flex items-center gap-2">
              <LogOut className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-muted-foreground">Check Out</p>
                <p className="text-lg font-semibold text-blue-600">{checkOutTime}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!isCheckedIn ? (
            <Button onClick={handleCheckIn} className="w-full" size="lg">
              <LogIn className="mr-2 h-4 w-4" />
              Check In
            </Button>
          ) : (
            <Button
              onClick={handleCheckOut}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Check Out
            </Button>
          )}
        </div>

        {/* Work Duration & Overtime */}
        {checkInTime && checkOutTime && workDuration && (
          <div className="space-y-2">
            <div className="text-center py-2 px-3 bg-muted/50 rounded-md">
              <p className="text-xs text-muted-foreground">Total Work Time</p>
              <p className="text-sm font-semibold">{workDuration}</p>
            </div>
            
            {hasOvertime && (
              <div className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-500/20 rounded-md">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-700">Overtime</p>
                  <p className="text-xs text-purple-600">
                    +{overtimeHours.toFixed(1)} hours beyond standard {STANDARD_WORK_HOURS}h
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

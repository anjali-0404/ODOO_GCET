import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useState } from "react";

export function CheckInOutCard() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckInTime(null);
  };

  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isCheckedIn && checkInTime && (
          <div className="text-center py-2 px-3 bg-success/10 rounded-md border border-success/20">
            <p className="text-xs text-muted-foreground">Checked in at</p>
            <p className="text-lg font-semibold text-success">{checkInTime}</p>
          </div>
        )}
        
        {isCheckedIn ? (
          <Button
            onClick={handleCheckOut}
            variant="outline"
            className="w-full"
          >
            Check Out →
          </Button>
        ) : (
          <Button
            onClick={handleCheckIn}
            className="w-full"
          >
            Check In →
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Users, Video, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: "meeting" | "event" | "holiday" | "deadline";
  attendees?: string[];
  location?: string;
  description?: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Team Standup",
    date: new Date(2026, 0, 6),
    startTime: "09:00 AM",
    endTime: "09:30 AM",
    type: "meeting",
    attendees: ["John Doe", "Jane Smith", "Mike Wilson"],
    location: "Conference Room A",
  },
  {
    id: "2",
    title: "Q1 Planning Meeting",
    date: new Date(2026, 0, 8),
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    type: "meeting",
    attendees: ["HR Team", "Management"],
    location: "Virtual - Zoom",
  },
  {
    id: "3",
    title: "New Year Holiday",
    date: new Date(2026, 0, 1),
    startTime: "All Day",
    endTime: "All Day",
    type: "holiday",
  },
  {
    id: "4",
    title: "Project Deadline - Website Redesign",
    date: new Date(2026, 0, 15),
    startTime: "05:00 PM",
    endTime: "05:00 PM",
    type: "deadline",
  },
  {
    id: "5",
    title: "Company Town Hall",
    date: new Date(2026, 0, 10),
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    type: "event",
    attendees: ["All Employees"],
    location: "Main Auditorium",
  },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return mockEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const selectedDateEvents = selectedDate ? mockEvents.filter(event =>
    event.date.getDate() === selectedDate.getDate() &&
    event.date.getMonth() === selectedDate.getMonth() &&
    event.date.getFullYear() === selectedDate.getFullYear()
  ) : [];

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-500";
      case "event": return "bg-purple-500";
      case "holiday": return "bg-red-500";
      case "deadline": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">Manage your events and schedules</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={previousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startingDayOfWeek }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const events = getEventsForDate(day);
                  const isToday = new Date().getDate() === day && 
                                  new Date().getMonth() === currentDate.getMonth() &&
                                  new Date().getFullYear() === currentDate.getFullYear();
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                  const isSelected = selectedDate?.getDate() === day &&
                                    selectedDate?.getMonth() === currentDate.getMonth() &&
                                    selectedDate?.getFullYear() === currentDate.getFullYear();

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        "aspect-square p-2 rounded-lg border-2 transition-all relative hover:border-primary",
                        isToday && "border-primary bg-primary/10",
                        isSelected && "border-primary bg-primary/20",
                        !isToday && !isSelected && "border-transparent hover:bg-accent"
                      )}
                    >
                      <div className="text-sm font-medium">{day}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className={cn("w-1.5 h-1.5 rounded-full", getEventColor(event.type))}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Event Details Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {selectedDate ? selectedDate.toDateString() : "Select a date"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <div key={event.id} className="space-y-2 pb-4 border-b last:border-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold">{event.title}</h4>
                          <Badge variant={event.type === "holiday" ? "destructive" : "default"}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{event.startTime} - {event.endTime}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              {event.location.includes("Virtual") ? (
                                <Video className="h-3 w-3" />
                              ) : (
                                <MapPin className="h-3 w-3" />
                              )}
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.attendees && (
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3" />
                              <span>{event.attendees.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No events for this date
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Event Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Event Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { type: "meeting", label: "Meetings" },
                  { type: "event", label: "Events" },
                  { type: "holiday", label: "Holidays" },
                  { type: "deadline", label: "Deadlines" },
                ].map((item) => (
                  <div key={item.type} className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full", getEventColor(item.type))} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

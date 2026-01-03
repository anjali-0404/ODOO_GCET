import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Users, CalendarOff, CheckCircle } from "lucide-react";

interface Notification {
  id: string;
  type: "attendance" | "time-off" | "system" | "approval";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon?: React.ReactNode;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "attendance",
    title: "Late Check-in Reminder",
    message: "You checked in at 9:45 AM today. Standard time is 9:00 AM.",
    time: "2 hours ago",
    read: false,
    icon: <Clock className="h-4 w-4 text-orange-500" />,
  },
  {
    id: "2",
    type: "approval",
    title: "Time-off Approved",
    message: "Your time-off request for Jan 10-12 has been approved.",
    time: "5 hours ago",
    read: false,
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  {
    id: "3",
    type: "system",
    title: "Team Member Absent",
    message: "James Brown is absent today. Laura Perez is covering.",
    time: "1 day ago",
    read: true,
    icon: <Users className="h-4 w-4 text-blue-500" />,
  },
  {
    id: "4",
    type: "time-off",
    title: "Upcoming Leave",
    message: "You have 3 days of leave scheduled next week.",
    time: "2 days ago",
    read: true,
    icon: <CalendarOff className="h-4 w-4 text-purple-500" />,
  },
  {
    id: "5",
    type: "attendance",
    title: "Perfect Attendance Week",
    message: "Great job! You've maintained 100% attendance this week.",
    time: "3 days ago",
    read: true,
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
];

export function NotificationDropdown() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[400px]">
          {mockNotifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            mockNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-2 p-3 cursor-pointer"
              >
                <div className="flex items-start gap-3 w-full">
                  {notification.icon && (
                    <div className="mt-0.5">{notification.icon}</div>
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center text-sm font-medium cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

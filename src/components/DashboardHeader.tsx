import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import dayflowLogo from "@/assets/dayflow-logo.svg";
import {
  Users,
  Clock,
  CalendarOff,
  Settings,
} from "lucide-react";
import { UserProfileDropdown } from "./UserProfileDropdown";
<<<<<<< HEAD
=======
import { NotificationDropdown } from "./NotificationDropdown";
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd

const navItems = [
  { label: "Employees", href: "/dashboard", icon: Users },
  { label: "Attendance", href: "/dashboard/attendance", icon: Clock },
  { label: "Time Off", href: "/dashboard/time-off", icon: CalendarOff },
];

export function DashboardHeader() {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={dayflowLogo} alt="Dayflow" className="h-6 invert" />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
<<<<<<< HEAD
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard/settings"
              className="text-muted-foreground hover:text-foreground transition-colors"
=======
          <div className="flex items-center gap-2">
            <NotificationDropdown />
            <Link
              to="/dashboard/settings"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
            >
              <Settings className="h-5 w-5" />
            </Link>
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

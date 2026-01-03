import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import odooLogo from "@/assets/image.png";
import {
  LayoutDashboard,
  Calendar,
  CalendarOff,
  FolderKanban,
  Users,
  StickyNote,
  Gift,
  FileText,
  Settings,
  HelpCircle,
  ChevronDown,
  Clock,
  UsersRound,
} from "lucide-react";
import { UserProfileDropdown } from "./UserProfileDropdown";

const mainNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Employees", href: "/dashboard/employees", icon: UsersRound },
  { label: "Attendance", href: "/dashboard/attendance", icon: Clock },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "Time Off", href: "/dashboard/time-off", icon: CalendarOff },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Team", href: "/dashboard/team", icon: Users },
  { label: "Notes", href: "/dashboard/notes", icon: StickyNote },
  { label: "Benefits", href: "/dashboard/benefits", icon: Gift, badge: "NEW" },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
];

const favoriteItems = [
  { label: "Synergy Team", color: "bg-blue-500" },
  { label: "Monday Redesign", color: "bg-red-500" },
  { label: "Udemy Courses", color: "bg-yellow-500" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={cn("w-64 bg-sidebar-background border-r border-sidebar-border flex flex-col h-screen sticky top-0", className)}>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-3">
          <img src={odooLogo} alt="odoo" className="h-8" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sidebar-foreground">odoo</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">HR Management</span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 mb-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3">
            Main
          </span>
        </div>
        <nav className="space-y-1 px-3">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-primary text-primary-foreground">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronDown className="h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        {/* Favorites */}
        <div className="mt-8 px-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3">
            Favorites
          </span>
          <div className="mt-2 space-y-1">
            {favoriteItems.map((item, index) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              >
                <span className={cn("h-2 w-2 rounded-full", item.color)} />
                <span className="flex-1 text-left">{item.label}</span>
                <span className="text-xs text-muted-foreground">⌘ {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
        <Link
          to="/dashboard/support"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <HelpCircle className="h-4 w-4" />
          <span>Support</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-3">
        <UserProfileDropdown showFullProfile />
      </div>
    </aside>
  );
}

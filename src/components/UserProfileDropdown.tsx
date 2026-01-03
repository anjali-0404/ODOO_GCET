import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface UserProfileDropdownProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    isCheckedIn?: boolean;
  };
  showFullProfile?: boolean;
}

export function UserProfileDropdown({ user, showFullProfile = false }: UserProfileDropdownProps) {
  const navigate = useNavigate();
  
  // Default mock user for now
  const currentUser = user || {
    name: "Sophia Williams",
    email: "sophia@alignui.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    isCheckedIn: true,
  };

  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    // Will implement actual logout logic later
    navigate("/signin");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex items-center gap-3 w-full focus:outline-none hover:bg-sidebar-accent/50 rounded-lg p-2 transition-colors">
          <div className="relative">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* Status indicator */}
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                currentUser.isCheckedIn ? "bg-success" : "bg-destructive"
              }`}
            />
          </div>
          {showFullProfile && (
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium truncate flex items-center gap-1">
                {currentUser.name}
                <span className="text-blue-400">✓</span>
              </p>
              <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-2">
          <p className="text-sm font-medium">{currentUser.name}</p>
          <p className="text-xs text-muted-foreground">{currentUser.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

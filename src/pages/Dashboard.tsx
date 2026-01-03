import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckInOutCard } from "@/components/CheckInOutCard";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Bell, 
  Calendar, 
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">{user?.name || "User"}</h1>
              <p className="text-muted-foreground">Welcome back to odoo 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                // Search functionality can be added here
                console.log("Search clicked");
              }}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                // Notifications can be added here
                console.log("Notifications clicked");
              }}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/dashboard/calendar")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button
              onClick={() => navigate("/dashboard/time-off")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create a Request
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Check-in/out Card */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <CheckInOutCard />
          </div>

          {/* Right Column - Welcome Message */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 border border-primary/20">
              <h2 className="text-2xl font-semibold mb-4">Welcome to odoo</h2>
              <p className="text-muted-foreground mb-6">
                Your all-in-one HR management system. Track attendance, manage time off, 
                view your schedule, and stay connected with your team.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/dashboard/attendance")}
                >
                  View Attendance
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/dashboard/time-off")}
                >
                  Request Time Off
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/dashboard/profile")}
                >
                  My Profile
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-card border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Today's Status</p>
                <p className="text-2xl font-semibold text-primary">
                  {user ? "Active" : "Offline"}
                </p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Department</p>
                <p className="text-2xl font-semibold">
                  {user?.department || "Not Set"}
                </p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Position</p>
                <p className="text-2xl font-semibold">
                  {user?.position || "Not Set"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

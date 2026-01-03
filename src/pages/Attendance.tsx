import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeAttendanceDashboard } from "@/components/EmployeeAttendanceDashboard";
import { HRAttendanceListView } from "@/components/HRAttendanceListView";
import { HRAttendanceDashboard } from "@/components/HRAttendanceDashboard";
import { AttendanceAnalytics } from "@/components/AttendanceAnalytics";
import { AttendanceCalendar } from "@/components/AttendanceCalendar";
import { Users, TrendingUp, CalendarDays, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Attendance() {
  const [activeTab, setActiveTab] = useState<"my-attendance" | "calendar" | "analytics" | "team-list" | "team-overview">("my-attendance");
  const { role } = useAuth();
  
  // Show team tabs only for HR role
  const canViewTeam = role === "hr";

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Attendance Management</h1>
          <p className="text-muted-foreground">
            {canViewTeam ? "Manage employee attendance and view team analytics" : "Track your attendance and view your analytics"}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
          <TabsList className="grid w-full max-w-4xl" style={{ gridTemplateColumns: canViewTeam ? 'repeat(5, 1fr)' : 'repeat(3, 1fr)' }}>
            <TabsTrigger value="my-attendance" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {canViewTeam ? "My Record" : "My Attendance"}
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            {canViewTeam && (
              <>
                <TabsTrigger value="team-list" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Team List
                </TabsTrigger>
                <TabsTrigger value="team-overview" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team Overview
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Employee's Own Attendance Table */}
          <TabsContent value="my-attendance" className="space-y-6">
            <EmployeeAttendanceDashboard />
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar" className="space-y-6">
            <AttendanceCalendar />
          </TabsContent>

          {/* Analytics View */}
          <TabsContent value="analytics" className="space-y-6">
            <AttendanceAnalytics />
          </TabsContent>

          {/* HR: Team List View (Daily attendance of all employees) */}
          {canViewTeam && (
            <TabsContent value="team-list" className="space-y-6">
              <HRAttendanceListView />
            </TabsContent>
          )}

          {/* HR: Team Overview (Grid view with cards) */}
          {canViewTeam && (
            <TabsContent value="team-overview" className="space-y-6">
              <HRAttendanceDashboard />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}

import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Search, Calendar } from "lucide-react";

// Mock attendance data
const mockAttendance = [
  { id: "1", name: "John Doe", date: "2025-10-26", checkIn: "10:00", checkOut: "19:00", workHours: "08:00", extraHours: "01:00" },
  { id: "2", name: "Jane Smith", date: "2025-10-26", checkIn: "10:00", checkOut: "19:00", workHours: "08:00", extraHours: "01:00" },
  { id: "3", name: "Mike Johnson", date: "2025-10-26", checkIn: "-", checkOut: "-", workHours: "-", extraHours: "-" },
  { id: "4", name: "Sarah Williams", date: "2025-10-26", checkIn: "09:30", checkOut: "18:30", workHours: "08:00", extraHours: "01:00" },
  { id: "5", name: "David Brown", date: "2025-10-26", checkIn: "10:15", checkOut: "19:15", workHours: "08:00", extraHours: "01:00" },
];

export default function Attendance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 26)); // October 26, 2025
  const [viewMode, setViewMode] = useState<"day" | "date">("day");

  const filteredAttendance = mockAttendance.filter((record) =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };
=======
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
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
<<<<<<< HEAD
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-xl">Attendance</CardTitle>
              <div className="relative w-64">
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                  clearable
                  onClear={() => setSearchQuery("")}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Date navigation */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateDate("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateDate("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "date" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("date")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                </Button>
                <Button
                  variant={viewMode === "day" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("day")}
                >
                  Day
                </Button>
              </div>
            </div>

            {/* Current date display */}
            <div className="mb-4 p-3 bg-secondary rounded-md">
              <p className="font-medium">{formatDate(currentDate)}</p>
            </div>

            {/* Attendance table */}
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Day</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Work Hours</TableHead>
                    <TableHead>Extra Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.name}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.workHours}</TableCell>
                      <TableCell>{record.extraHours}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAttendance.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No attendance records found.</p>
              </div>
            )}
          </CardContent>
        </Card>
=======
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
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
      </main>
    </div>
  );
}

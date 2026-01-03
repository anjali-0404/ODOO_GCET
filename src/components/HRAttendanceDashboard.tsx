import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AttendanceStatusIndicator } from "./AttendanceStatusIndicator";
import type { AttendanceStatus } from "./AttendanceStatusIndicator";
import { Search, Filter, Users, Download, FileText, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Employee {
  id: string;
  name: string;
  avatar?: string;
  position: string;
  department: string;
  location?: string;
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
}

// Mock employee data
const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Sophia Williams",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    position: "Senior Designer",
    department: "Design",
    location: "New York",
    status: "present",
    checkInTime: "09:00 AM",
  },
  {
    id: "2",
    name: "James Brown",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    position: "Marketing Manager",
    department: "Marketing",
    location: "San Francisco",
    status: "on-leave",
  },
  {
    id: "3",
    name: "Laura Perez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    position: "Product Manager",
    department: "Product",
    location: "Remote",
    status: "present",
    checkInTime: "08:45 AM",
  },
  {
    id: "4",
    name: "Arthur Taylor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    position: "Partnership Lead",
    department: "Business",
    location: "London",
    status: "present",
    checkInTime: "09:15 AM",
  },
  {
    id: "5",
    name: "Emma Wright",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    position: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    status: "absent",
  },
  {
    id: "6",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    position: "Backend Developer",
    department: "Engineering",
    location: "New York",
    status: "present",
    checkInTime: "09:30 AM",
  },
  {
    id: "7",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    position: "HR Manager",
    department: "Human Resources",
    location: "New York",
    status: "present",
    checkInTime: "08:30 AM",
  },
  {
    id: "8",
    name: "David Martinez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    position: "Sales Director",
    department: "Sales",
    location: "Chicago",
    status: "on-leave",
  },
];

export function HRAttendanceDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<AttendanceStatus | "all">("all");

  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || employee.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockEmployees.length,
    present: mockEmployees.filter(e => e.status === "present").length,
    absent: mockEmployees.filter(e => e.status === "absent").length,
    onLeave: mockEmployees.filter(e => e.status === "on-leave").length,
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Position", "Department", "Location", "Status", "Check-in", "Check-out"];
    const csvData = filteredEmployees.map(emp => [
      emp.name,
      emp.position,
      emp.department,
      emp.location || "-",
      emp.status,
      emp.checkInTime || "-",
      emp.checkOutTime || "-"
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-report-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Report exported successfully!");
  };

  // Export to PDF (simplified - in production, use a library like jsPDF)
  const exportToPDF = () => {
    toast.info("PDF export will be available with jsPDF library integration");
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-blue-600">{stats.onLeave}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.absent}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5" />
              Employee Attendance
            </CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToPDF}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "present" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("present")}
              className="gap-2"
            >
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Present
            </Button>
            <Button
              variant={filterStatus === "on-leave" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("on-leave")}
              className="gap-2"
            >
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              On Leave
            </Button>
            <Button
              variant={filterStatus === "absent" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("absent")}
              className="gap-2"
            >
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              Absent
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback>
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-sm truncate">{employee.name}</h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {employee.position}
                          </p>
                          <div className="flex items-center gap-1 mt-1 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                              {employee.department}
                            </Badge>
                            {employee.location && (
                              <Badge variant="outline" className="text-xs gap-1">
                                <MapPin className="h-3 w-3" />
                                {employee.location}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <AttendanceStatusIndicator status={employee.status} size="md" />
                      </div>
                      {employee.checkInTime && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          In: {employee.checkInTime}
                        </div>
                      )}
                      {employee.checkOutTime && (
                        <div className="text-xs text-muted-foreground">
                          Out: {employee.checkOutTime}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No employees found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

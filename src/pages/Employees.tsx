import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { EmployeeCard } from "@/components/EmployeeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Users, Filter, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { EmployeeStatus } from "@/components/EmployeeCard";

// Mock employee data
const mockEmployees = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    position: "Senior Frontend Developer",
    department: "Engineering",
    status: "present" as EmployeeStatus,
    email: "sarah.j@company.com",
    location: "New York",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    position: "Product Manager",
    department: "Product",
    status: "present" as EmployeeStatus,
    email: "michael.c@company.com",
    location: "San Francisco",
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    position: "UX Designer",
    department: "Design",
    status: "on-leave" as EmployeeStatus,
    email: "emma.w@company.com",
    location: "Los Angeles",
  },
  {
    id: "4",
    name: "James Rodriguez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    position: "Backend Developer",
    department: "Engineering",
    status: "present" as EmployeeStatus,
    email: "james.r@company.com",
    location: "Austin",
  },
  {
    id: "5",
    name: "Olivia Martinez",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    position: "Marketing Manager",
    department: "Marketing",
    status: "absent" as EmployeeStatus,
    email: "olivia.m@company.com",
    location: "Chicago",
  },
  {
    id: "6",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    position: "DevOps Engineer",
    department: "Engineering",
    status: "present" as EmployeeStatus,
    email: "david.k@company.com",
    location: "Seattle",
  },
  {
    id: "7",
    name: "Sophie Anderson",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
    position: "HR Manager",
    department: "Human Resources",
    status: "present" as EmployeeStatus,
    email: "sophie.a@company.com",
    location: "Boston",
  },
  {
    id: "8",
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    position: "QA Engineer",
    department: "Engineering",
    status: "on-leave" as EmployeeStatus,
    email: "alex.t@company.com",
    location: "Denver",
  },
  {
    id: "9",
    name: "Isabella Garcia",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
    position: "Sales Manager",
    department: "Sales",
    status: "present" as EmployeeStatus,
    email: "isabella.g@company.com",
    location: "Miami",
  },
  {
    id: "10",
    name: "Ryan Lee",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150",
    position: "Data Analyst",
    department: "Analytics",
    status: "present" as EmployeeStatus,
    email: "ryan.l@company.com",
    location: "Portland",
  },
  {
    id: "11",
    name: "Mia Brown",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    position: "Content Writer",
    department: "Marketing",
    status: "absent" as EmployeeStatus,
    email: "mia.b@company.com",
    location: "Nashville",
  },
  {
    id: "12",
    name: "Daniel Park",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
    position: "Full Stack Developer",
    department: "Engineering",
    status: "present" as EmployeeStatus,
    email: "daniel.p@company.com",
    location: "San Diego",
  },
];

export default function Employees() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get unique departments
  const departments = Array.from(
    new Set(mockEmployees.map((emp) => emp.department))
  );

  // Filter employees based on search and filters
  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;

    const matchesStatus =
      statusFilter === "all" || employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: mockEmployees.length,
    present: mockEmployees.filter((e) => e.status === "present").length,
    absent: mockEmployees.filter((e) => e.status === "absent").length,
    onLeave: mockEmployees.filter((e) => e.status === "on-leave").length,
  };

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/dashboard/employee/${employeeId}`);
  };

  const exportEmployeeList = () => {
    // Create CSV content
    const headers = ["Name", "Position", "Department", "Email", "Location", "Status"];
    const rows = filteredEmployees.map((emp) => [
      emp.name,
      emp.position,
      emp.department,
      emp.email,
      emp.location,
      emp.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `employees_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Redirect if not HR
  if (role !== "hr") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                You don't have permission to view this page.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Users className="h-8 w-8" />
            Employees
          </h1>
          <p className="text-muted-foreground">
            View and manage all employees in your organization
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Present Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-green-600">
                  {stats.present}
                </div>
                <Badge className="bg-green-500/20 text-green-600 border-0">
                  {Math.round((stats.present / stats.total) * 100)}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                On Leave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.onLeave}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Absent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.absent}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, position, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Department Filter */}
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>

              {/* Export Button */}
              <Button onClick={exportEmployeeList} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredEmployees.length} of {mockEmployees.length}{" "}
              employees
            </div>
          </CardContent>
        </Card>

        {/* Employee Grid */}
        {filteredEmployees.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No employees found matching your filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onClick={() => handleEmployeeClick(employee.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

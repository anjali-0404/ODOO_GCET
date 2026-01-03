import { useState } from "react";
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
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AttendanceStatusIndicator } from "./AttendanceStatusIndicator";
import type { AttendanceStatus } from "./AttendanceStatusIndicator";

interface EmployeeAttendanceRecord {
  id: string;
  name: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  extraHours: string;
  status: AttendanceStatus;
}

// Mock data for all employees on a specific day
const mockAllEmployeesAttendance: EmployeeAttendanceRecord[] = [
  {
    id: "1",
    name: "John Doe",
    checkIn: "10:00",
    checkOut: "19:00",
    workHours: "09:00",
    extraHours: "01:00",
    status: "present",
  },
  {
    id: "2",
    name: "Jane Smith",
    checkIn: "10:00",
    checkOut: "19:00",
    workHours: "09:00",
    extraHours: "01:00",
    status: "present",
  },
  {
    id: "3",
    name: "Mike Johnson",
    checkIn: "-",
    checkOut: "-",
    workHours: "-",
    extraHours: "-",
    status: "absent",
  },
  {
    id: "4",
    name: "Sarah Williams",
    checkIn: "09:30",
    checkOut: "18:30",
    workHours: "09:00",
    extraHours: "01:00",
    status: "present",
  },
  {
    id: "5",
    name: "David Brown",
    checkIn: "10:15",
    checkOut: "19:15",
    workHours: "09:00",
    extraHours: "01:00",
    status: "present",
  },
  {
    id: "6",
    name: "Emma Wilson",
    checkIn: "09:45",
    checkOut: "18:45",
    workHours: "09:00",
    extraHours: "01:00",
    status: "present",
  },
  {
    id: "7",
    name: "James Taylor",
    checkIn: "-",
    checkOut: "-",
    workHours: "-",
    extraHours: "-",
    status: "on-leave",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    checkIn: "10:05",
    checkOut: "19:05",
    workHours: "09:00",
    extraHours: "01:00",
    status: "present",
  },
];

export function HRAttendanceListView() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 22)); // October 22, 2025
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"date" | "day">("date");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
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

  const filteredEmployees = mockAllEmployeesAttendance.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Attendance</CardTitle>
              
              {/* Search Bar */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Searchbar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              {/* Date Navigation */}
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

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "date" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("date")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
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
          </div>
        </CardHeader>

        <CardContent>
          {/* Current Date Display */}
          <div className="mb-4 p-3 bg-muted/50 rounded-md">
            <p className="font-medium">{formatDate(currentDate)}</p>
          </div>

          {/* Attendance Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Emp</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Work Hours</TableHead>
                  <TableHead>Extra Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <AttendanceStatusIndicator
                          status={employee.status}
                          size="sm"
                        />
                        {employee.name}
                      </div>
                    </TableCell>
                    <TableCell>{employee.checkIn}</TableCell>
                    <TableCell>{employee.checkOut}</TableCell>
                    <TableCell>
                      {employee.workHours !== "-" && (
                        <span className="font-medium">{employee.workHours}</span>
                      )}
                      {employee.workHours === "-" && <span>-</span>}
                    </TableCell>
                    <TableCell>
                      {employee.extraHours !== "-" && (
                        <Badge variant="secondary" className="font-mono">
                          {employee.extraHours}
                        </Badge>
                      )}
                      {employee.extraHours === "-" && <span>-</span>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No employees found matching your search.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

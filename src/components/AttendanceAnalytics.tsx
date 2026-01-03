import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Calendar, Clock } from "lucide-react";

// Mock data for weekly attendance
const weeklyData = [
  { day: "Mon", present: 45, absent: 2, onLeave: 3 },
  { day: "Tue", present: 47, absent: 1, onLeave: 2 },
  { day: "Wed", present: 46, absent: 2, onLeave: 2 },
  { day: "Thu", present: 48, absent: 1, onLeave: 1 },
  { day: "Fri", present: 44, absent: 3, onLeave: 3 },
];

// Mock data for monthly attendance
const monthlyData = [
  { week: "Week 1", present: 92, absent: 5, onLeave: 3 },
  { week: "Week 2", present: 94, absent: 3, onLeave: 3 },
  { week: "Week 3", present: 90, absent: 6, onLeave: 4 },
  { week: "Week 4", present: 93, absent: 4, onLeave: 3 },
];

// Mock data for attendance distribution
const distributionData = [
  { name: "Present", value: 85, color: "#22c55e" },
  { name: "On Leave", value: 10, color: "#3b82f6" },
  { name: "Absent", value: 5, color: "#eab308" },
];

// Mock data for check-in times
const checkInTimeData = [
  { time: "Before 9:00", count: 35 },
  { time: "9:00 - 9:15", count: 28 },
  { time: "9:15 - 9:30", count: 15 },
  { time: "After 9:30", count: 8 },
];

export function AttendanceAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Attendance Analytics</h2>
          <p className="text-muted-foreground">
            Track attendance trends and patterns
          </p>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="check-in">Check-in Times</TabsTrigger>
        </TabsList>

        {/* Weekly View */}
        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Attendance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="present"
                    stroke="#22c55e"
                    strokeWidth={2}
                    name="Present"
                  />
                  <Line
                    type="monotone"
                    dataKey="absent"
                    stroke="#eab308"
                    strokeWidth={2}
                    name="Absent"
                  />
                  <Line
                    type="monotone"
                    dataKey="onLeave"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="On Leave"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Average Present
                    </p>
                    <p className="text-2xl font-bold">46</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      +4% from last week
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full bg-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Average Absent
                    </p>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 rotate-180" />
                      -1 from last week
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full bg-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Attendance Rate
                    </p>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      +2% from last week
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full bg-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monthly View */}
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Monthly Attendance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#22c55e" name="Present" />
                  <Bar dataKey="absent" fill="#eab308" name="Absent" />
                  <Bar dataKey="onLeave" fill="#3b82f6" name="On Leave" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution View */}
        <TabsContent value="distribution">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {distributionData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Check-in Times */}
        <TabsContent value="check-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Check-in Time Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={checkInTimeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="time" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8b5cf6" name="Employees" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Insights</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 70% of employees check in before 9:15 AM</li>
                  <li>• Only 8 employees consistently arrive late</li>
                  <li>• Average check-in time: 9:08 AM</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

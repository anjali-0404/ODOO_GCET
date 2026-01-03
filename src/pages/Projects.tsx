import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, Calendar, Users, Clock, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "planning";
  progress: number;
  startDate: string;
  endDate: string;
  team: { name: string; avatar: string }[];
  priority: "high" | "medium" | "low";
  tasksCompleted: number;
  totalTasks: number;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX",
    status: "active",
    progress: 65,
    startDate: "Jan 1, 2026",
    endDate: "Mar 15, 2026",
    team: [
      { name: "John Doe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
      { name: "Jane Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" },
      { name: "Mike Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
    ],
    priority: "high",
    tasksCompleted: 13,
    totalTasks: 20,
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms",
    status: "active",
    progress: 45,
    startDate: "Dec 15, 2025",
    endDate: "Apr 30, 2026",
    team: [
      { name: "Sarah Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
      { name: "Tom Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom" },
    ],
    priority: "high",
    tasksCompleted: 18,
    totalTasks: 40,
  },
  {
    id: "3",
    name: "HR System Integration",
    description: "Integrate new HRIS with existing payroll and attendance systems",
    status: "active",
    progress: 80,
    startDate: "Nov 1, 2025",
    endDate: "Jan 31, 2026",
    team: [
      { name: "Emily Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
      { name: "Chris Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris" },
      { name: "Alex Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    ],
    priority: "medium",
    tasksCompleted: 24,
    totalTasks: 30,
  },
  {
    id: "4",
    name: "Marketing Campaign Q1",
    description: "Launch new product marketing campaign across all channels",
    status: "planning",
    progress: 15,
    startDate: "Jan 10, 2026",
    endDate: "Mar 31, 2026",
    team: [
      { name: "Lisa Wang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" },
    ],
    priority: "medium",
    tasksCompleted: 3,
    totalTasks: 25,
  },
  {
    id: "5",
    name: "Security Audit 2025",
    description: "Comprehensive security assessment and vulnerability testing",
    status: "completed",
    progress: 100,
    startDate: "Oct 1, 2025",
    endDate: "Dec 31, 2025",
    team: [
      { name: "David Miller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
      { name: "Rachel Green", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel" },
    ],
    priority: "high",
    tasksCompleted: 15,
    totalTasks: 15,
  },
  {
    id: "6",
    name: "Office Renovation",
    description: "Modernize office space with new furniture and equipment",
    status: "on-hold",
    progress: 30,
    startDate: "Dec 1, 2025",
    endDate: "Feb 28, 2026",
    team: [
      { name: "Kevin Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin" },
    ],
    priority: "low",
    tasksCompleted: 6,
    totalTasks: 20,
  },
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "completed": return "bg-blue-500";
      case "on-hold": return "bg-yellow-500";
      case "planning": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || project.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: mockProjects.length,
    active: mockProjects.filter(p => p.status === "active").length,
    completed: mockProjects.filter(p => p.status === "completed").length,
    onHold: mockProjects.filter(p => p.status === "on-hold").length,
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage and track all your projects</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.completed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">On Hold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.onHold}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="on-hold">On Hold</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 mt-3">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge variant={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                  <div className="text-xs text-muted-foreground">
                    {project.tasksCompleted}/{project.totalTasks} tasks completed
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{project.startDate} - {project.endDate}</span>
                </div>

                {/* Team */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, idx) => (
                      <Avatar key={idx} className="border-2 border-background h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted border-2 border-background text-xs">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{project.team.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

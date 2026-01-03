import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, Calendar, Users, Clock, MoreVertical, Trash2, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/contexts/ProjectsContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Projects() {
  const navigate = useNavigate();
  const { projects, addProject, deleteProject } = useProjects();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "planning" as "active" | "completed" | "on-hold" | "planning",
    priority: "medium" as "high" | "medium" | "low",
    startDate: "",
    endDate: "",
    budget: "",
    department: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "completed": return "bg-blue-500";
      case "on-hold": return "bg-yellow-500";
      case "planning": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string): "destructive" | "default" | "secondary" => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || project.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === "active").length,
    completed: projects.filter(p => p.status === "completed").length,
    onHold: projects.filter(p => p.status === "on-hold").length,
  };

  const handleAddProject = () => {
    if (!newProject.name || !newProject.startDate || !newProject.endDate) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    addProject({
      name: newProject.name,
      description: newProject.description,
      status: newProject.status,
      priority: newProject.priority,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      budget: newProject.budget || "$0",
      department: newProject.department || "General",
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 0,
      tasks: [],
      team: [],
      files: [],
      activities: [],
    });

    setNewProject({
      name: "",
      description: "",
      status: "planning",
      priority: "medium",
      startDate: "",
      endDate: "",
      budget: "",
      department: "",
    });
    setIsAddProjectOpen(false);
    toast({ title: "Project created", description: "New project has been added." });
  };

  const handleDeleteProject = () => {
    if (deleteProjectId) {
      deleteProject(deleteProjectId);
      setDeleteProjectId(null);
      toast({ title: "Project deleted", description: "Project has been removed." });
    }
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
          <Button onClick={() => setIsAddProjectOpen(true)}>
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
            <Card 
              key={project.id} 
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 cursor-pointer" onClick={() => navigate(`/dashboard/projects/${project.id}`)}>
                    <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/dashboard/projects/${project.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setDeleteProjectId(project.id)} 
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
              <CardContent className="space-y-4 cursor-pointer" onClick={() => navigate(`/dashboard/projects/${project.id}`)}>
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

        {/* Add Project Dialog */}
        <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Add a new project to your workspace</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input 
                    placeholder="Enter project name" 
                    value={newProject.name} 
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input 
                    placeholder="e.g., Engineering" 
                    value={newProject.department} 
                    onChange={(e) => setNewProject({ ...newProject, department: e.target.value })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  placeholder="Describe the project..." 
                  value={newProject.description} 
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} 
                  rows={3} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={newProject.status} onValueChange={(v) => setNewProject({ ...newProject, status: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newProject.priority} onValueChange={(v) => setNewProject({ ...newProject, priority: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input 
                    type="date" 
                    value={newProject.startDate} 
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Input 
                    type="date" 
                    value={newProject.endDate} 
                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Budget</Label>
                <Input 
                  placeholder="e.g., $50,000" 
                  value={newProject.budget} 
                  onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProjectOpen(false)}>Cancel</Button>
              <Button onClick={handleAddProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteProjectId} onOpenChange={() => setDeleteProjectId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this project? This action cannot be undone and will remove all tasks, files, and team assignments.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}

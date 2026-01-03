import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useProjects, Task, Project } from "@/contexts/ProjectsContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  FileText,
  CheckCircle2,
  Circle,
  Clock,
  Paperclip,
  Download,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  Upload,
  X,
  AlertCircle
} from "lucide-react";

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const { 
    getProject, 
    updateProject: contextUpdateProject, 
    addTask: contextAddTask, 
    deleteTask: contextDeleteTask, 
    toggleTaskStatus, 
    addMember: contextAddMember, 
    removeMember: contextRemoveMember,
    addFile: contextAddFile,
    deleteFile: contextDeleteFile,
    availableMembers 
  } = useProjects();
  
  const project = projectId ? getProject(projectId) : undefined;
  
  // Dialog states
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isUploadFileOpen, setIsUploadFileOpen] = useState(false);
  
  // Form states
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    status: "active" as Project["status"],
    priority: "medium" as Project["priority"],
    startDate: "",
    endDate: "",
    budget: "",
    department: "",
  });
  
  const [newTask, setNewTask] = useState({
    title: "",
    assigneeId: "",
    dueDate: "",
    priority: "medium" as Task["priority"],
  });
  
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
            <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
            <Link to="/dashboard/projects">
              <Button><ArrowLeft className="mr-2 h-4 w-4" />Back to Projects</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Task functions
  const handleToggleTaskStatus = (taskId: string) => {
    toggleTaskStatus(project.id, taskId);
    toast({ title: "Task updated", description: "Task status has been changed." });
  };

  const handleDeleteTask = (taskId: string) => {
    contextDeleteTask(project.id, taskId);
    toast({ title: "Task deleted", description: "Task has been removed from the project." });
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assigneeId || !newTask.dueDate) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    
    const assignee = project.team.find(m => m.id === newTask.assigneeId);
    if (!assignee) return;
    
    contextAddTask(project.id, {
      title: newTask.title,
      status: "todo",
      assignee: { name: assignee.name, avatar: assignee.avatar },
      dueDate: new Date(newTask.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      priority: newTask.priority,
    });
    
    setNewTask({ title: "", assigneeId: "", dueDate: "", priority: "medium" });
    setIsAddTaskOpen(false);
    toast({ title: "Task added", description: "New task has been added to the project." });
  };

  // Team functions
  const handleAddMember = () => {
    if (!selectedMember) {
      toast({ title: "Error", description: "Please select a team member.", variant: "destructive" });
      return;
    }
    
    const member = availableMembers.find(m => m.id === selectedMember);
    if (!member) return;
    
    contextAddMember(project.id, {
      id: member.id,
      name: member.name,
      role: member.role,
      avatar: member.avatar,
      email: member.email,
    });
    
    setSelectedMember("");
    setIsAddMemberOpen(false);
    toast({ title: "Member added", description: `${member.name} has been added to the team.` });
  };

  const handleRemoveMember = (memberId: string) => {
    contextRemoveMember(project.id, memberId);
    toast({ title: "Member removed", description: "Team member has been removed from the project." });
  };

  // File functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "File too large", description: "Maximum file size is 10MB.", variant: "destructive" });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadFile = () => {
    if (!selectedFile) {
      toast({ title: "Error", description: "Please select a file.", variant: "destructive" });
      return;
    }
    
    contextAddFile(project.id, {
      name: selectedFile.name,
      type: selectedFile.name.split(".").pop()?.toUpperCase() || "FILE",
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadedBy: "You",
      uploadedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });
    
    setSelectedFile(null);
    setIsUploadFileOpen(false);
    toast({ title: "File uploaded", description: `${selectedFile.name} has been uploaded.` });
  };

  const handleDeleteFile = (fileId: string) => {
    contextDeleteFile(project.id, fileId);
    toast({ title: "File deleted", description: "File has been removed." });
  };

  // Edit project
  const openEditProject = () => {
    setEditForm({
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      startDate: project.startDate,
      endDate: project.endDate,
      budget: project.budget,
      department: project.department,
    });
    setIsEditProjectOpen(true);
  };

  const handleSaveProject = () => {
    contextUpdateProject(project.id, {
      name: editForm.name,
      description: editForm.description,
      status: editForm.status,
      priority: editForm.priority,
      startDate: editForm.startDate,
      endDate: editForm.endDate,
      budget: editForm.budget,
      department: editForm.department,
    });
    setIsEditProjectOpen(false);
    toast({ title: "Project updated", description: "Project details have been saved." });
  };

  // Helper functions
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

  const getTaskIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const completedTasks = project.tasks.filter(t => t.status === "completed").length;
  const availableMembersToAdd = availableMembers.filter(m => !project.team.find(t => t.id === m.id));

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />Back to Projects
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                <Badge variant={getPriorityColor(project.priority)}>{project.priority} priority</Badge>
              </div>
              <p className="text-muted-foreground max-w-3xl">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={openEditProject}>
                <Edit className="mr-2 h-4 w-4" />Edit
              </Button>
              <Button onClick={() => setIsAddTaskOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />Add Task
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{new Date(project.startDate).toLocaleDateString()}</div>
              <div className="text-xs text-muted-foreground">to {new Date(project.endDate).toLocaleDateString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />Team Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.team.length}</div>
              <div className="text-xs text-muted-foreground">members</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}/{project.tasks.length}</div>
              <div className="text-xs text-muted-foreground">completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.budget}</div>
              <div className="text-xs text-muted-foreground">{project.department}</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardHeader><CardTitle>Overall Progress</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Project Completion</span>
                <span className="text-2xl font-bold">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-3" />
              <div className="text-sm text-muted-foreground">{completedTasks} of {project.tasks.length} tasks completed</div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="tasks" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tasks">Tasks ({project.tasks.length})</TabsTrigger>
            <TabsTrigger value="team">Team ({project.team.length})</TabsTrigger>
            <TabsTrigger value="files">Files ({project.files.length})</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">All Tasks</h3>
              <Button size="sm" onClick={() => setIsAddTaskOpen(true)}>
                <Plus className="mr-2 h-3 w-3" />Add Task
              </Button>
            </div>
            
            {project.tasks.length === 0 ? (
              <Card><CardContent className="py-8 text-center text-muted-foreground">No tasks yet. Click "Add Task" to create one.</CardContent></Card>
            ) : (
              <div className="space-y-2">
                {project.tasks.map((task) => (
                  <Card key={task.id} className="hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Checkbox 
                          checked={task.status === "completed"}
                          onCheckedChange={() => handleToggleTaskStatus(task.id)}
                          className="h-5 w-5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getTaskIcon(task.status)}
                            <h4 className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>{task.title}</h4>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /><span>{task.dueDate}</span>
                            </div>
                            <Badge variant={getPriorityColor(task.priority)} className="text-xs">{task.priority}</Badge>
                          </div>
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                        </Avatar>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleToggleTaskStatus(task.id)}>
                              {task.status === "completed" ? "Mark as Todo" : "Mark as Complete"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Team Members</h3>
              <Button size="sm" onClick={() => setIsAddMemberOpen(true)} disabled={availableMembersToAdd.length === 0}>
                <Plus className="mr-2 h-3 w-3" />Add Member
              </Button>
            </div>
            
            {project.team.length === 0 ? (
              <Card><CardContent className="py-8 text-center text-muted-foreground">No team members yet.</CardContent></Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.team.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold truncate">{member.name}</h4>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                              <p className="text-xs text-muted-foreground mt-1">{member.email}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleRemoveMember(member.id)} className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />Remove from Team
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="mt-3 text-xs text-muted-foreground">
                            {member.tasksCompleted}/{member.tasksAssigned} tasks completed
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Project Files</h3>
              <Button size="sm" onClick={() => setIsUploadFileOpen(true)}>
                <Upload className="mr-2 h-3 w-3" />Upload File
              </Button>
            </div>
            
            {project.files.length === 0 ? (
              <Card><CardContent className="py-8 text-center text-muted-foreground">No files yet. Click "Upload File" to add one.</CardContent></Card>
            ) : (
              <div className="space-y-2">
                {project.files.map((file) => (
                  <Card key={file.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Paperclip className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{file.name}</h4>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{file.type}</span>
                            <span>{file.size}</span>
                            <span>by {file.uploadedBy}</span>
                            <span>{file.uploadedAt}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(file.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            {project.activities.length === 0 ? (
              <Card><CardContent className="py-8 text-center text-muted-foreground">No activity yet.</CardContent></Card>
            ) : (
              <div className="space-y-4">
                {project.activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user.name}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Project Dialog */}
        <Dialog open={isEditProjectOpen} onOpenChange={setIsEditProjectOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>Update project details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input value={editForm.department} onChange={(e) => setEditForm({ ...editForm, department: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editForm.status} onValueChange={(v) => setEditForm({ ...editForm, status: v as Project["status"] })}>
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
                  <Select value={editForm.priority} onValueChange={(v) => setEditForm({ ...editForm, priority: v as Project["priority"] })}>
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
                  <Label>Start Date</Label>
                  <Input type="date" value={editForm.startDate} onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" value={editForm.endDate} onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Budget</Label>
                <Input value={editForm.budget} onChange={(e) => setEditForm({ ...editForm, budget: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditProjectOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveProject}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Task Dialog */}
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new task for this project</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Task Title</Label>
                <Input placeholder="Enter task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Assignee</Label>
                <Select value={newTask.assigneeId} onValueChange={(v) => setNewTask({ ...newTask, assigneeId: v })}>
                  <SelectTrigger><SelectValue placeholder="Select team member" /></SelectTrigger>
                  <SelectContent>
                    {project.team.map((member) => (
                      <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newTask.priority} onValueChange={(v) => setNewTask({ ...newTask, priority: v as Task["priority"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>Cancel</Button>
              <Button onClick={handleAddTask}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Member Dialog */}
        <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>Add a new member to this project</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-2">
                <Label>Select Member</Label>
                <Select value={selectedMember} onValueChange={setSelectedMember}>
                  <SelectTrigger><SelectValue placeholder="Choose a team member" /></SelectTrigger>
                  <SelectContent>
                    {availableMembersToAdd.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                          <span className="text-muted-foreground">- {member.role}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>Cancel</Button>
              <Button onClick={handleAddMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Upload File Dialog */}
        <Dialog open={isUploadFileOpen} onOpenChange={setIsUploadFileOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File</DialogTitle>
              <DialogDescription>Upload a file to this project (max 10MB)</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to select a file</p>
                </label>
                {selectedFile && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    <span className="text-sm">{selectedFile.name}</span>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setSelectedFile(null); setIsUploadFileOpen(false); }}>Cancel</Button>
              <Button onClick={handleUploadFile} disabled={!selectedFile}>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Mail, Phone, MapPin, Calendar, Users, MoreVertical, Edit, Trash2 } from "lucide-react";
import { useTeam, TeamMember } from "@/contexts/TeamContext";
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

export default function Team() {
  const { members, addMember, updateMember, deleteMember } = useTeam();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    department: "Engineering",
    email: "",
    phone: "",
    location: "",
    status: "available" as TeamMember["status"],
    skills: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "busy": return "bg-red-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const departments = [...new Set(members.map(m => m.department))];

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || member.department.toLowerCase().replace(/\s+/g, '-') === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: members.length,
    available: members.filter(m => m.status === "available").length,
    busy: members.filter(m => m.status === "busy").length,
    away: members.filter(m => m.status === "away").length,
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.email) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    addMember({
      name: newMember.name,
      role: newMember.role,
      department: newMember.department,
      email: newMember.email,
      phone: newMember.phone || "Not provided",
      location: newMember.location || "Remote",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newMember.name.replace(/\s+/g, '')}`,
      status: newMember.status,
      joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      skills: newMember.skills.split(",").map(s => s.trim()).filter(s => s),
    });

    setNewMember({
      name: "",
      role: "",
      department: "Engineering",
      email: "",
      phone: "",
      location: "",
      status: "available",
      skills: "",
    });
    setIsAddMemberOpen(false);
    toast({ title: "Member added", description: "New team member has been added." });
  };

  const handleEditMember = () => {
    if (!editingMember) return;

    updateMember(editingMember.id, editingMember);
    setEditingMember(null);
    setIsEditMemberOpen(false);
    toast({ title: "Member updated", description: "Team member has been updated." });
  };

  const handleDeleteMember = () => {
    if (deleteMemberId) {
      deleteMember(deleteMemberId);
      setDeleteMemberId(null);
      toast({ title: "Member removed", description: "Team member has been removed." });
    }
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember({ ...member });
    setIsEditMemberOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Team</h1>
            <p className="text-muted-foreground">Manage your team members</p>
          </div>
          <Button onClick={() => setIsAddMemberOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />Total Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.available}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Busy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.busy}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Away</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.away}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {departments.map((dept) => (
              <TabsTrigger key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>
                {dept}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold truncate">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <Badge variant="secondary" className="mt-1">{member.department}</Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(member)}>
                            <Edit className="mr-2 h-4 w-4" />Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => setDeleteMemberId(member.id)} 
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {member.joinDate}</span>
                  </div>
                </div>

                {member.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
                    ))}
                    {member.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{member.skills.length - 3}</Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No team members found</p>
          </div>
        )}

        {/* Add Member Dialog */}
        <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>Add a new member to your team</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input 
                    placeholder="Enter full name" 
                    value={newMember.name} 
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Input 
                    placeholder="e.g., Software Engineer" 
                    value={newMember.role} 
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={newMember.department} onValueChange={(v) => setNewMember({ ...newMember, department: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Human Resources">Human Resources</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={newMember.status} onValueChange={(v) => setNewMember({ ...newMember, status: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="away">Away</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input 
                    type="email"
                    placeholder="email@company.com" 
                    value={newMember.email} 
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input 
                    placeholder="+1 (555) 123-4567" 
                    value={newMember.phone} 
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input 
                  placeholder="e.g., San Francisco, CA" 
                  value={newMember.location} 
                  onChange={(e) => setNewMember({ ...newMember, location: e.target.value })} 
                />
              </div>
              <div className="space-y-2">
                <Label>Skills (comma-separated)</Label>
                <Input 
                  placeholder="e.g., React, TypeScript, Node.js" 
                  value={newMember.skills} 
                  onChange={(e) => setNewMember({ ...newMember, skills: e.target.value })} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>Cancel</Button>
              <Button onClick={handleAddMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Member Dialog */}
        <Dialog open={isEditMemberOpen} onOpenChange={setIsEditMemberOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Team Member</DialogTitle>
              <DialogDescription>Update member information</DialogDescription>
            </DialogHeader>
            {editingMember && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      value={editingMember.name} 
                      onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input 
                      value={editingMember.role} 
                      onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select value={editingMember.department} onValueChange={(v) => setEditingMember({ ...editingMember, department: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={editingMember.status} onValueChange={(v) => setEditingMember({ ...editingMember, status: v as any })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                        <SelectItem value="away">Away</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      value={editingMember.email} 
                      onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      value={editingMember.phone} 
                      onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input 
                    value={editingMember.location} 
                    onChange={(e) => setEditingMember({ ...editingMember, location: e.target.value })} 
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditMemberOpen(false)}>Cancel</Button>
              <Button onClick={handleEditMember}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteMemberId} onOpenChange={() => setDeleteMemberId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this team member? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteMember} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}

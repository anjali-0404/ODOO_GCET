import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Phone, MapPin, Calendar, Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: "available" | "busy" | "away" | "offline";
  joinDate: string;
  skills: string[];
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Engineering Manager",
    department: "Engineering",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    status: "available",
    joinDate: "Jan 2024",
    skills: ["Leadership", "React", "Node.js"],
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Senior Developer",
    department: "Engineering",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    status: "busy",
    joinDate: "Mar 2023",
    skills: ["TypeScript", "Python", "AWS"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "HR Manager",
    department: "Human Resources",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    status: "available",
    joinDate: "Jun 2022",
    skills: ["Recruiting", "Employee Relations", "HR Systems"],
  },
  {
    id: "4",
    name: "David Kim",
    role: "Product Designer",
    department: "Design",
    email: "david.kim@company.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    status: "away",
    joinDate: "Sep 2023",
    skills: ["UI/UX", "Figma", "Design Systems"],
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Marketing Director",
    department: "Marketing",
    email: "lisa.wang@company.com",
    phone: "+1 (555) 567-8901",
    location: "Los Angeles, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    status: "available",
    joinDate: "Feb 2023",
    skills: ["Digital Marketing", "SEO", "Content Strategy"],
  },
  {
    id: "6",
    name: "James Wilson",
    role: "DevOps Engineer",
    department: "Engineering",
    email: "james.wilson@company.com",
    phone: "+1 (555) 678-9012",
    location: "Boston, MA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    status: "available",
    joinDate: "Nov 2022",
    skills: ["Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: "7",
    name: "Rachel Green",
    role: "Sales Manager",
    department: "Sales",
    email: "rachel.green@company.com",
    phone: "+1 (555) 789-0123",
    location: "Chicago, IL",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
    status: "busy",
    joinDate: "Apr 2024",
    skills: ["B2B Sales", "CRM", "Negotiation"],
  },
  {
    id: "8",
    name: "Tom Anderson",
    role: "QA Lead",
    department: "Engineering",
    email: "tom.anderson@company.com",
    phone: "+1 (555) 890-1234",
    location: "Denver, CO",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
    status: "offline",
    joinDate: "Jul 2023",
    skills: ["Testing", "Automation", "Selenium"],
  },
];

export default function Team() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "busy": return "bg-red-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const filteredMembers = mockTeamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || member.department.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  const departments = ["all", ...Array.from(new Set(mockTeamMembers.map(m => m.department.toLowerCase())))];

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Team Directory</h1>
            <p className="text-muted-foreground">View and connect with your team members</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockTeamMembers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {mockTeamMembers.filter(m => m.status === "available").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {new Set(mockTeamMembers.map(m => m.department)).size}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Busy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {mockTeamMembers.filter(m => m.status === "busy").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
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
            {departments.map((dept) => (
              <TabsTrigger key={dept} value={dept} className="capitalize">
                {dept}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <Badge variant="secondary" className="mt-2">{member.department}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline truncate">
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{member.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {member.joinDate}</span>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">Message</Button>
                  <Button size="sm" variant="outline" className="flex-1">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No team members found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

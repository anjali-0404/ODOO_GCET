import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Bell, 
  Calendar, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Zap,
  StickyNote,
  Users,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const timeOffRequests = [
  { date: "Aug 11, 2023", type: "Sick", status: "pending" },
  { date: "July 15, 2023", type: "Annual", status: "confirmed" },
  { date: "Jun 24, 2023", type: "Casual", status: "rejected" },
];

const statusTracker = {
  absent: [
    { name: "James Brown", avatar: "", replacedBy: "Laura Perez" },
  ],
  away: [
    { name: "Sophia Williams", avatar: "", company: "Synergy", time: "25m" },
    { name: "Arthur Taylor", avatar: "", company: "Apex", time: "12m" },
    { name: "Emma Wright", avatar: "", company: "Pulse", time: "8m" },
  ],
};

const meetings = [
  { title: "Meeting with James Brown", time: "8:00 - 8:45 AM (UTC)", platform: "Google Meet", tag: "MARKETING", color: "bg-orange-500/20 text-orange-400" },
  { title: "Meeting with Laura Perez", time: "9:00 - 9:45 AM (UTC)", platform: "Zoom", tag: "PRODUCT MANAGER", color: "bg-purple-500/20 text-purple-400" },
  { title: "Meeting with Arthur Taylor", time: "10:00 - 11:00 AM (UTC)", platform: "Slack", tag: "PARTNERSHIP", color: "bg-blue-500/20 text-blue-400" },
];

const notes = [
  { title: "Text Inputs for Design System", description: "Search for inspiration to provide a rich con...", tags: ["Today", "To-do"], date: "Aug 02", done: false },
  { title: "Meeting with Arthur Taylor", description: "Discuss the MVP version of Apex Mobile a...", tags: ["Today", "Meeting"], date: "Aug 02", done: true },
  { title: "Check neutral and state colors", description: "Button components will be revised and de...", tags: ["Yesterday", "Important"], date: "Aug 01", done: true },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date(2023, 7, 2)); // Aug 2, 2023
  const totalTimeOff = 20;
  const usedTimeOff = 16;

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">Sophia Williams</h1>
              <p className="text-muted-foreground">Welcome back to Synergy 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create a Request
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Time Off Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Off
                </CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
              </CardHeader>
              <CardContent>
                {/* Circular Progress */}
                <div className="flex justify-center mb-6">
                  <div className="relative h-32 w-32">
                    <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        strokeDasharray={`${(usedTimeOff / totalTimeOff) * 251.2} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{usedTimeOff}</span>
                      <span className="text-xs text-muted-foreground">OUT OF {totalTimeOff}</span>
                    </div>
                  </div>
                </div>

                {/* Time Off List */}
                <div className="space-y-3">
                  {timeOffRequests.map((request, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${
                          request.status === 'pending' ? 'bg-yellow-500' :
                          request.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="text-sm">{request.date}</span>
                        <span className="text-xs text-muted-foreground">({request.type})</span>
                      </div>
                      <Badge variant={
                        request.status === 'pending' ? 'secondary' :
                        request.status === 'confirmed' ? 'default' : 'destructive'
                      } className="capitalize text-xs">
                        {request.status === 'confirmed' ? 'Confirmed' : request.status === 'pending' ? 'Pending' : 'Rejected'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status Tracker */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Status Tracker
                </CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Absent */}
                <div>
                  <span className="text-xs text-muted-foreground uppercase">Absent</span>
                  {statusTracker.absent.map((person, idx) => (
                    <div key={idx} className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60`} />
                          <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{person.name} 🎒</p>
                          <p className="text-xs text-muted-foreground">Replaced by <span className="text-primary">{person.replacedBy}</span></p>
                        </div>
                      </div>
                      <Badge variant="secondary">Absent</Badge>
                    </div>
                  ))}
                </div>

                {/* Away */}
                <div>
                  <span className="text-xs text-muted-foreground uppercase">Away</span>
                  {statusTracker.away.map((person, idx) => (
                    <div key={idx} className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://images.unsplash.com/photo-${1500648767791 + idx}-00dcc994a43e?w=60`} />
                          <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{person.name} 💼</p>
                          <p className="text-xs text-muted-foreground">{person.company}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-0">
                        <span className="mr-1">●</span>{person.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Current Project */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Current Project
                </CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Project Name</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚀</span>
                      <span className="font-medium">Monday App Design</span>
                      <Badge className="bg-green-500/20 text-green-400 border-0 text-xs">
                        ● In Progress
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Project Manager</p>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60" />
                          <AvatarFallback>LP</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Laura P.</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Design Lead</p>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60" />
                          <AvatarFallback>AG</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Arthur G.</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Team</p>
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        {[1,2,3,4,5].map((i) => (
                          <Avatar key={i} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={`https://images.unsplash.com/photo-${1494790108377 + i * 100}?w=60`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="ml-3 text-sm text-muted-foreground">+8 people</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Timeline</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      12/10/2022 · 01/04/2023
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                    <p className="text-sm text-muted-foreground">
                      ✏️ Mobile and desktop app design for the ne...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <StickyNote className="h-4 w-4" />
                  Notes
                </CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {notes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                      note.done ? 'bg-green-500 border-green-500' : 'border-muted-foreground'
                    }`}>
                      {note.done && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{note.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{note.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {note.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {note.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Schedule */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
              </CardHeader>
              <CardContent>
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">Aug, 2023</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {[
                    { day: 'Fri', date: 31 },
                    { day: 'Sat', date: 1 },
                    { day: 'Sun', date: 2, active: true },
                    { day: 'Mon', date: 3 },
                    { day: 'Tue', date: 4 },
                  ].map((d) => (
                    <div 
                      key={d.date}
                      className={`text-center py-2 rounded-lg ${
                        d.active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      }`}
                    >
                      <p className="text-xs text-muted-foreground">{d.day}</p>
                      <p className="font-medium">{String(d.date).padStart(2, '0')}</p>
                    </div>
                  ))}
                </div>

                {/* Search */}
                <div className="flex gap-2 mb-4">
                  <Input placeholder="Search..." leftIcon={<Search className="h-4 w-4" />} className="flex-1" />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-4 border-b border-border">
                  <button className="pb-2 text-sm font-medium border-b-2 border-primary text-foreground">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Meetings
                  </button>
                  <button className="pb-2 text-sm text-muted-foreground">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Events
                  </button>
                  <button className="pb-2 text-sm text-muted-foreground">
                    🏖️ Holiday
                  </button>
                </div>

                {/* Meetings List */}
                <div className="space-y-3">
                  {meetings.map((meeting, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${
                      idx === 0 ? 'bg-orange-500/10' : idx === 1 ? 'bg-purple-500/10' : 'bg-blue-500/10'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{meeting.title}</p>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{meeting.time}</p>
                      <div className="flex -space-x-2 mb-2">
                        {[1,2,3].map((i) => (
                          <Avatar key={i} className="h-6 w-6 border-2 border-background">
                            <AvatarFallback className="text-xs">U</AvatarFallback>
                          </Avatar>
                        ))}
                        <span className="ml-2 text-xs text-muted-foreground">+2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">On {meeting.platform}</span>
                        <Badge className={`${meeting.color} border-0 text-xs`}>
                          {meeting.tag}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

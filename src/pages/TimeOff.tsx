import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Search, Check, X, Upload, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type LeaveStatus = "pending" | "approved" | "rejected";
type LeaveType = "Paid Time Off" | "Sick Leave" | "Unpaid Leave";

interface TimeOffRequest {
  id: string;
  employee: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  allocation: number;
  attachment?: string;
}

const statusColors: Record<LeaveStatus, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  approved: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

const leaveTypes: LeaveType[] = ["Paid Time Off", "Sick Leave", "Unpaid Leave"];

export default function TimeOff() {
  const { user, role } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState<TimeOffRequest[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Form state
  const [leaveType, setLeaveType] = useState<LeaveType>("Paid Time Off");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allocation, setAllocation] = useState("");

  // Check if user is HR
  const isHROrAdmin = role === "hr" || role === "admin";

  // Filter requests based on role
  const userRequests = isHROrAdmin 
    ? requests 
    : requests.filter(req => req.employee === user?.name);

  const filteredRequests = userRequests.filter((request) =>
    request.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      toast({
        title: "File selected",
        description: `${file.name} is ready to upload`,
      });
    }
  };

  const handleSubmit = () => {
    if (!user || !startDate || !endDate || !allocation) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Calculate days between dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const newRequest: TimeOffRequest = {
      id: Date.now().toString(),
      employee: user.name,
      type: leaveType,
      startDate,
      endDate,
      status: "pending",
      allocation: parseFloat(allocation),
      attachment: selectedFile?.name,
    };

    setRequests(prev => [newRequest, ...prev]);
    
    toast({
      title: "Request submitted",
      description: `Your ${leaveType} request has been submitted successfully`,
    });

    // Reset form
    setLeaveType("Paid Time Off");
    setStartDate("");
    setEndDate("");
    setAllocation("");
    setSelectedFile(null);
    setIsDialogOpen(false);
  };

  const handleApprove = (id: string) => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "approved" as LeaveStatus } : req))
    );
    toast({
      title: "Request approved",
      description: "Time off request has been approved",
    });
  };

  const handleReject = (id: string) => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "rejected" as LeaveStatus } : req))
    );
    toast({
      title: "Request rejected",
      description: "Time off request has been rejected",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        {/* Leave balances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-primary font-medium">Paid Time Off</p>
                <p className="text-2xl font-bold">24 Days available</p>
                <p className="text-xs text-muted-foreground">Out of 30 days total</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-primary font-medium">Sick Leave</p>
                <p className="text-2xl font-bold">7 Days available</p>
                <p className="text-xs text-muted-foreground">Out of 10 days total</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-primary font-medium">Unpaid Leave</p>
                <p className="text-2xl font-bold">Unlimited</p>
                <p className="text-xs text-muted-foreground">No limit</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Off requests */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl">
                  {isHROrAdmin ? "All Time Off Requests" : "My Time Off Requests"}
                </CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Time Off Type Request</DialogTitle>
                      <DialogDescription>
                        Submit a new time off request
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Employee</Label>
                        <Input disabled value={user?.name || "Employee"} />
                      </div>
                      <div className="space-y-2">
                        <Label>Time Off Type</Label>
                        <Select value={leaveType} onValueChange={(value) => setLeaveType(value as LeaveType)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                          <SelectContent>
                            {leaveTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>From</Label>
                          <Input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>To</Label>
                          <Input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Allocation</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            placeholder="6" 
                            className="w-24"
                            value={allocation}
                            onChange={(e) => setAllocation(e.target.value)}
                          />
                          <span className="text-muted-foreground">Days</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Attachment</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              id="file-upload"
                              className="hidden"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => document.getElementById('file-upload')?.click()}
                              type="button"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                            <span className="text-xs text-muted-foreground">
                              (For sick leave certificate)
                            </span>
                          </div>
                          {selectedFile && (
                            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="text-sm flex-1 truncate">{selectedFile.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedFile(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsDialogOpen(false);
                          setSelectedFile(null);
                        }}
                      >
                        Discard
                      </Button>
                      <Button onClick={handleSubmit}>Submit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              {isHROrAdmin && (
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {filteredRequests.length > 0 ? (
              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      {isHROrAdmin && <TableHead>Employee</TableHead>}
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Attachment</TableHead>
                      <TableHead>Status</TableHead>
                      {isHROrAdmin && <TableHead className="text-right">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        {isHROrAdmin && <TableCell className="font-medium">{request.employee}</TableCell>}
                        <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className="text-primary">{request.type}</span>
                        </TableCell>
                        <TableCell>{request.allocation} days</TableCell>
                        <TableCell>
                          {request.attachment ? (
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="text-xs truncate max-w-[100px]">{request.attachment}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">No file</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[request.status]}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </TableCell>
                        {isHROrAdmin && (
                          <TableCell className="text-right">
                            {request.status === "pending" && (
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  onClick={() => handleReject(request.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                                  onClick={() => handleApprove(request.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground mb-2">
                  {isHROrAdmin 
                    ? "No time off requests found." 
                    : "You haven't submitted any time off requests yet."}
                </p>
                <p className="text-sm text-muted-foreground">
                  Click the "New Request" button above to submit a time off request.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

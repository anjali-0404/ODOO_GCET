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
import { Label } from "@/components/ui/label";
import { Plus, Search, Check, X } from "lucide-react";

type LeaveStatus = "pending" | "approved" | "rejected";
type LeaveType = "Paid Time Off" | "Sick Leave" | "Unpaid Leave";

interface TimeOffRequest {
  id: string;
  employee: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  allocation?: number;
}

// Mock data
const mockTimeOffRequests: TimeOffRequest[] = [
  { id: "1", employee: "John Doe", type: "Paid Time Off", startDate: "2025-10-28", endDate: "2025-10-28", status: "pending" },
  { id: "2", employee: "Jane Smith", type: "Sick Leave", startDate: "2025-10-25", endDate: "2025-10-26", status: "approved" },
  { id: "3", employee: "Mike Johnson", type: "Paid Time Off", startDate: "2025-10-20", endDate: "2025-10-22", status: "approved" },
];

const leaveBalances = {
  "Paid Time Off": { available: 24, total: 30 },
  "Sick Leave": { available: 7, total: 10 },
};

const statusColors: Record<LeaveStatus, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  approved: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function TimeOff() {
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState(mockTimeOffRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredRequests = requests.filter((request) =>
    request.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (id: string) => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "approved" as LeaveStatus } : req))
    );
  };

  const handleReject = (id: string) => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "rejected" as LeaveStatus } : req))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        {/* Leave balances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary font-medium">Paid Time Off</p>
                  <p className="text-2xl font-bold">{leaveBalances["Paid Time Off"].available} Days available</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary font-medium">Sick Leave</p>
                  <p className="text-2xl font-bold">{leaveBalances["Sick Leave"].available} Days available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Off requests */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl">Time Off</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      NEW
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Time Off Type Request</DialogTitle>
                      <DialogDescription>
                        Submit a new time off request
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Employee</Label>
                        <Input placeholder="Select employee" disabled value="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label>Time Off Type</Label>
                        <Input placeholder="Paid Time Off" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>From</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>To</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Allocation</Label>
                        <div className="flex items-center gap-2">
                          <Input type="number" placeholder="01.00" className="w-24" />
                          <span className="text-muted-foreground">Days</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Attachment</Label>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Upload
                          </Button>
                          <span className="text-xs text-muted-foreground">(For sick leave certificate)</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Discard
                      </Button>
                      <Button onClick={() => setIsDialogOpen(false)}>Submit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative w-64">
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                  clearable
                  onClear={() => setSearchQuery("")}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Time Off Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.employee}</TableCell>
                      <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className="text-primary">{request.type}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[request.status]}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredRequests.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No time off requests found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

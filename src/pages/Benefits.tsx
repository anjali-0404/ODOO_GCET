import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  Shield, 
  Wallet, 
  Plane, 
  GraduationCap, 
  Dumbbell, 
  Car, 
  Home,
  Gift,
  Coffee,
  ArrowRight,
  Check,
  Plus,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";
import { useBenefits, Benefit, iconMap } from "@/contexts/BenefitsContext";
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

export default function Benefits() {
  const { benefits, enrollBenefit, unenrollBenefit, addBenefit, deleteBenefit } = useBenefits();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [isAddBenefitOpen, setIsAddBenefitOpen] = useState(false);
  const [deleteBenefitId, setDeleteBenefitId] = useState<string | null>(null);
  const [viewBenefit, setViewBenefit] = useState<Benefit | null>(null);

  const [newBenefit, setNewBenefit] = useState({
    name: "",
    category: "Insurance",
    description: "",
    iconName: "Heart",
    value: "",
    details: "",
  });

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Gift;
    return <Icon className="h-6 w-6" />;
  };

  const categories = [...new Set(benefits.map(b => b.category))];

  const filteredBenefits = benefits.filter((benefit) => {
    if (activeTab === "all") return true;
    if (activeTab === "enrolled") return benefit.enrolled;
    if (activeTab === "available") return !benefit.enrolled;
    return benefit.category.toLowerCase().replace(/\s+/g, '-') === activeTab;
  });

  const stats = {
    total: benefits.length,
    enrolled: benefits.filter(b => b.enrolled).length,
    available: benefits.filter(b => !b.enrolled).length,
  };

  const handleEnroll = (id: string) => {
    enrollBenefit(id);
    toast({ title: "Enrolled!", description: "You have been enrolled in this benefit." });
  };

  const handleUnenroll = (id: string) => {
    unenrollBenefit(id);
    toast({ title: "Unenrolled", description: "You have been removed from this benefit." });
  };

  const handleAddBenefit = () => {
    if (!newBenefit.name || !newBenefit.description) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    addBenefit({
      name: newBenefit.name,
      category: newBenefit.category,
      description: newBenefit.description,
      iconName: newBenefit.iconName,
      enrolled: false,
      value: newBenefit.value,
      details: newBenefit.details.split("\n").filter(d => d.trim()),
    });

    setNewBenefit({
      name: "",
      category: "Insurance",
      description: "",
      iconName: "Heart",
      value: "",
      details: "",
    });
    setIsAddBenefitOpen(false);
    toast({ title: "Benefit added", description: "New benefit has been added." });
  };

  const handleDeleteBenefit = () => {
    if (deleteBenefitId) {
      deleteBenefit(deleteBenefitId);
      setDeleteBenefitId(null);
      toast({ title: "Benefit removed", description: "Benefit has been removed." });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Benefits</h1>
            <p className="text-muted-foreground">Manage your employee benefits and perks</p>
          </div>
          <Button onClick={() => setIsAddBenefitOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Benefit
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Enrolled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.enrolled}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available to Enroll</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.available}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBenefits.map((benefit) => (
            <Card key={benefit.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {getIcon(benefit.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    {benefit.enrolled && (
                      <Badge className="bg-green-500">Enrolled</Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewBenefit(benefit)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeleteBenefitId(benefit.id)} 
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardTitle className="mt-4">{benefit.name}</CardTitle>
                <CardDescription>{benefit.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <Badge variant="outline">{benefit.category}</Badge>
                  </div>
                  {benefit.value && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Value</span>
                      <span className="font-medium">{benefit.value}</span>
                    </div>
                  )}
                  {benefit.coverage && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-medium">{benefit.coverage}</span>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    {benefit.enrolled ? (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleUnenroll(benefit.id)}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => handleEnroll(benefit.id)}
                      >
                        Enroll Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBenefits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No benefits found</p>
          </div>
        )}

        {/* Add Benefit Dialog */}
        <Dialog open={isAddBenefitOpen} onOpenChange={setIsAddBenefitOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Benefit</DialogTitle>
              <DialogDescription>Create a new benefit for employees</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Benefit Name *</Label>
                  <Input 
                    placeholder="e.g., Health Insurance" 
                    value={newBenefit.name} 
                    onChange={(e) => setNewBenefit({ ...newBenefit, name: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newBenefit.category} onValueChange={(v) => setNewBenefit({ ...newBenefit, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Insurance">Insurance</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Time Off">Time Off</SelectItem>
                      <SelectItem value="Professional Growth">Professional Growth</SelectItem>
                      <SelectItem value="Wellness">Wellness</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Remote Work">Remote Work</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select value={newBenefit.iconName} onValueChange={(v) => setNewBenefit({ ...newBenefit, iconName: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Heart">Health</SelectItem>
                      <SelectItem value="Shield">Shield</SelectItem>
                      <SelectItem value="Wallet">Wallet</SelectItem>
                      <SelectItem value="Plane">Plane</SelectItem>
                      <SelectItem value="GraduationCap">Education</SelectItem>
                      <SelectItem value="Dumbbell">Fitness</SelectItem>
                      <SelectItem value="Car">Transport</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Gift">Gift</SelectItem>
                      <SelectItem value="Coffee">Coffee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input 
                    placeholder="e.g., $500/month" 
                    value={newBenefit.value} 
                    onChange={(e) => setNewBenefit({ ...newBenefit, value: e.target.value })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea 
                  placeholder="Describe the benefit..." 
                  value={newBenefit.description} 
                  onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })} 
                  rows={2} 
                />
              </div>
              <div className="space-y-2">
                <Label>Details (one per line)</Label>
                <Textarea 
                  placeholder="Enter benefit details, one per line..." 
                  value={newBenefit.details} 
                  onChange={(e) => setNewBenefit({ ...newBenefit, details: e.target.value })} 
                  rows={4} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddBenefitOpen(false)}>Cancel</Button>
              <Button onClick={handleAddBenefit}>Add Benefit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Benefit Details Dialog */}
        <Dialog open={!!viewBenefit} onOpenChange={() => setViewBenefit(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{viewBenefit?.name}</DialogTitle>
              <DialogDescription>{viewBenefit?.description}</DialogDescription>
            </DialogHeader>
            {viewBenefit && (
              <div className="py-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {getIcon(viewBenefit.iconName)}
                    </div>
                    <div>
                      <p className="font-medium">{viewBenefit.category}</p>
                      {viewBenefit.value && <p className="text-sm text-muted-foreground">{viewBenefit.value}</p>}
                    </div>
                  </div>
                  
                  {viewBenefit.details.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">What's Included:</h4>
                      <ul className="space-y-2">
                        {viewBenefit.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewBenefit(null)}>Close</Button>
              {viewBenefit && !viewBenefit.enrolled && (
                <Button onClick={() => { handleEnroll(viewBenefit.id); setViewBenefit(null); }}>
                  Enroll Now
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteBenefitId} onOpenChange={() => setDeleteBenefitId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Benefit</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this benefit? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteBenefit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}

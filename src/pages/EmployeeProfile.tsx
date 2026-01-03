import { Link, useParams } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Edit2, Save, X, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";

interface EmployeeData {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
  location?: string;
  status?: string;
  join_date?: string;
}

export default function EmployeeProfile() {
  const { id } = useParams<{ id: string }>();
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Determine if viewing own profile or another employee's profile
  const isOwnProfile = !id || (user && id === String(user.id));
  const displayUser = isOwnProfile ? user : employee;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    location: "",
  });

  // Extended profile data (mock for now)
  const [profileData, setProfileData] = useState({
    about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    whatILove: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    hobbies: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    skills: ["JavaScript", "TypeScript", "React", "Node.js"],
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
    dateOfBirth: "1990-05-20",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    nationality: "American",
    personalEmail: "john@gmail.com",
    gender: "Male",
    maritalStatus: "Single",
    dateOfJoining: "2022-03-15",
    accountNumber: "123456789012",
    bankName: "Chase Bank",
    ifscCode: "CHASE0001234",
    panNo: "ABCDE1234F",
    uanNo: "100123456789",
    empCode: "EMP001",
    monthlyWage: 50000,
    yearlyWage: 600000,
    workingDays: 5,
    breakTime: "1 hour",
    basic: 25000,
    hra: 12500,
    standardAllowance: 4167,
    performanceBonus: 2083,
    lta: 2083,
    fixedAllowance: 2918,
    pfEmployee: 3000,
    pfEmployer: 3000,
    professionalTax: 200,
  });

  // Fetch employee data if viewing another employee's profile
  useEffect(() => {
    const fetchEmployee = async () => {
      if (id && (!user || id !== String(user.id))) {
        setIsLoading(true);
        try {
          const employeeData = await api.getUser(parseInt(id));
          setEmployee(employeeData);
          setFormData({
            name: employeeData.name || "",
            email: employeeData.email || "",
            phone: employeeData.phone || "",
            department: employeeData.department || "",
            position: employeeData.position || "",
            location: employeeData.location || "",
          });
        } catch (error) {
          console.error("Failed to fetch employee:", error);
          toast({
            title: "Error",
            description: "Failed to load employee profile.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchEmployee();
  }, [id, user]);
  
  // Update form data when viewing own profile
  useEffect(() => {
    if (isOwnProfile && user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        department: user.department || "",
        position: user.position || "",
        location: user.location || "",
      });
    }
  }, [user, isOwnProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      console.log("Saving profile:", formData);
      await updateUserProfile(formData);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    if (displayUser) {
      setFormData({
        name: displayUser.name,
        email: displayUser.email,
        phone: displayUser.phone || "",
        department: displayUser.department || "",
        position: displayUser.position || "",
        location: displayUser.location || "",
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-6">
          <p>Loading employee profile...</p>
        </main>
      </div>
    );
  }

  if (!displayUser) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-6">
          <p>Employee not found.</p>
        </main>
      </div>
    );
  }

  const initials = displayUser.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <Link to={isOwnProfile ? "/dashboard" : "/dashboard/employees"} className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {isOwnProfile ? "Back to Dashboard" : "Back to Employees"}
        </Link>
        
        {/* Profile Header Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-border">
                  <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">{initials}</AvatarFallback>
                </Avatar>
                {isOwnProfile && !isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="absolute bottom-0 right-0 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Name</Label>
                      <Input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        disabled={!isEditing || !isOwnProfile} 
                        className="font-semibold" 
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Job Position</Label>
                      <Input 
                        name="position" 
                        value={formData.position} 
                        onChange={handleInputChange} 
                        disabled={!isEditing || !isOwnProfile} 
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <Input 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        disabled={!isEditing || !isOwnProfile} 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Mobile</Label>
                      <Input 
                        name="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        disabled={!isEditing || !isOwnProfile} 
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Department</Label>
                      <Input 
                        name="department" 
                        value={formData.department} 
                        onChange={handleInputChange} 
                        disabled={!isEditing || !isOwnProfile} 
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Location</Label>
                      <Input 
                        name="location" 
                        value={formData.location} 
                        onChange={handleInputChange} 
                        disabled={!isEditing || !isOwnProfile} 
                      />
                    </div>
                  </div>
                </div>
                {isOwnProfile && isEditing && (
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="resume" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="private">Private Info</TabsTrigger>
            <TabsTrigger value="salary">Salary Info</TabsTrigger>
            <TabsTrigger value="settings">HR Settings</TabsTrigger>
          </TabsList>

          {/* Resume Tab */}
          <TabsContent value="resume">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      defaultValue={profileData.about} 
                      className="min-h-[100px]"
                      placeholder="Tell us about yourself..."
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What I love about my job</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      defaultValue={profileData.whatILove} 
                      className="min-h-[100px]"
                      placeholder="What do you love about your job..."
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">My interests and hobbies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      defaultValue={profileData.hobbies} 
                      className="min-h-[100px]"
                      placeholder="Your interests and hobbies..."
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="mt-4 text-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skills
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {profileData.certifications.map((cert) => (
                        <li key={cert} className="text-sm text-muted-foreground">
                          • {cert}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" size="sm" className="mt-4 text-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Certification
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Private Info Tab */}
          <TabsContent value="private">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Date of Birth</Label>
                    <Input type="date" defaultValue={profileData.dateOfBirth} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Residing Address</Label>
                    <Input defaultValue={profileData.address} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Nationality</Label>
                    <Input defaultValue={profileData.nationality} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Personal Email</Label>
                    <Input type="email" defaultValue={profileData.personalEmail} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Gender</Label>
                    <Input defaultValue={profileData.gender} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Marital Status</Label>
                    <Input defaultValue={profileData.maritalStatus} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Date of Joining</Label>
                    <Input type="date" defaultValue={profileData.dateOfJoining} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bank Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Account Number</Label>
                    <Input defaultValue={profileData.accountNumber} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Bank Name</Label>
                    <Input defaultValue={profileData.bankName} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">IFSC Code</Label>
                    <Input defaultValue={profileData.ifscCode} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">PAN No</Label>
                    <Input defaultValue={profileData.panNo} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">UAN NO</Label>
                    <Input defaultValue={profileData.uanNo} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Emp Code</Label>
                    <Input defaultValue={profileData.empCode} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Salary Info Tab */}
          <TabsContent value="salary">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Salary Information</CardTitle>
                  <div className="px-4 py-2 bg-muted rounded-md">
                    <span className="text-sm font-medium">Important</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  The Salary Information tab allows you to define and manage all salary-related
                  details for an employee, including wage type, working schedule, salary
                  components, and benefits.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Wage Type */}
                  <div>
                    <h3 className="text-sm font-medium mb-4">Wage Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm mb-2 block">Monthly Wage</Label>
                        <div className="flex gap-2 items-center">
                          <Input
                            type="number"
                            defaultValue={profileData.monthlyWage}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">/ Month</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm mb-2 block">Working Days per Week</Label>
                        <Input type="number" defaultValue={profileData.workingDays} />
                      </div>
                      <div>
                        <Label className="text-sm mb-2 block">Yearly Wage</Label>
                        <div className="flex gap-2 items-center">
                          <Input
                            type="number"
                            defaultValue={profileData.yearlyWage}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">/ Year</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm mb-2 block">Break Time</Label>
                        <div className="flex gap-2 items-center">
                          <Input defaultValue={profileData.breakTime} className="flex-1" />
                          <span className="text-sm text-muted-foreground">/ hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Salary Components */}
                  <div>
                    <h3 className="text-sm font-medium mb-4">Salary Components</h3>
                    <div className="space-y-3 border rounded-lg p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <span className="text-sm font-medium">Basic Salary</span>
                          <p className="text-xs text-muted-foreground">50% of total salary</p>
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue={profileData.basic} />
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue="50.00" disabled />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <span className="text-sm font-medium">House Rent Allowance</span>
                          <p className="text-xs text-muted-foreground">25% of total salary</p>
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue={profileData.hra} />
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue="25.00" disabled />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <span className="text-sm font-medium">Standard Allowance</span>
                          <p className="text-xs text-muted-foreground">8.33% of total salary</p>
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue={profileData.standardAllowance} />
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue="8.33" disabled />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <span className="text-sm font-medium">Performance Bonus</span>
                          <p className="text-xs text-muted-foreground">4.17% of total salary</p>
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue={profileData.performanceBonus} />
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue="4.17" disabled />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <span className="text-sm font-medium">Leave Travel Allowance</span>
                          <p className="text-xs text-muted-foreground">4.17% of total salary</p>
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue={profileData.lta} />
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue="4.17" disabled />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <span className="text-sm font-medium">Fixed Allowance</span>
                          <p className="text-xs text-muted-foreground">Remaining amount</p>
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue={profileData.fixedAllowance} />
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue="5.83" disabled />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PF Contribution */}
                  <div>
                    <h3 className="text-sm font-medium mb-4">Provident Fund (PF) Contribution</h3>
                    <div className="space-y-3 border rounded-lg p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <span className="text-sm font-medium">Employee Contribution</span>
                          <p className="text-xs text-muted-foreground">12% of basic salary</p>
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue={profileData.pfEmployee} />
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue="12.00" disabled />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <span className="text-sm font-medium">Employer Contribution</span>
                          <p className="text-xs text-muted-foreground">12% of basic salary</p>
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue={profileData.pfEmployer} />
                        </div>
                        <div className="col-span-3">
                          <Input type="number" defaultValue="12.00" disabled />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Tax */}
                  <div>
                    <h3 className="text-sm font-medium mb-4">Professional Tax</h3>
                    <div className="border rounded-lg p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <span className="text-sm font-medium">Monthly Professional Tax</span>
                        </div>
                        <div className="col-span-6">
                          <Input type="number" defaultValue={profileData.professionalTax} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Salary Information
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HR Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">HR Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Employee Status</Label>
                    <Input defaultValue="Active" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Reporting Manager</Label>
                    <Input defaultValue="Sarah Williams" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Work Location</Label>
                    <Input defaultValue={user.location || "Office"} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Employment Type</Label>
                    <Input defaultValue="Full-time" />
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Building2, Briefcase, Users, Calendar, Edit2 } from "lucide-react";

// Mock employee data - in real app this would come from API
const mockEmployee = {
  id: "1",
  name: "John Doe",
  loginId: "OIJODO2022D001",
  email: "john.doe@company.com",
  phone: "+1 (555) 123-4567",
  position: "Software Engineer",
  department: "Engineering",
  manager: "Sarah Williams",
  location: "New York, NY",
  company: "Acme Inc.",
  dateOfJoining: "2022-03-15",
  dateOfBirth: "1990-05-20",
  address: "123 Main Street, Apt 4B, New York, NY 10001",
  nationality: "American",
  gender: "Male",
  maritalStatus: "Single",
  personalEmail: "johndoe@gmail.com",
  about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  whatILove: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  hobbies: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python"],
  certifications: ["AWS Certified Developer", "Google Cloud Professional"],
  bankDetails: {
    accountNumber: "****4567",
    bankName: "Chase Bank",
    ifscCode: "CHASE0001234",
  },
  salary: {
    monthlyWage: 50000,
    basic: 25000,
    hra: 12500,
    standardAllowance: 4167,
    performanceBonus: 2083,
    lta: 2083,
    fixedAllowance: 2918,
    pfEmployee: 3000,
    pfEmployer: 3000,
    professionalTax: 200,
  },
};

export default function EmployeeProfile() {
  const { id } = useParams();
  const employee = mockEmployee; // In real app, fetch based on id

  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        {/* Back button */}
        <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Employees
        </Link>

        {/* Profile header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-border">
                  <AvatarImage src={undefined} alt={employee.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>

              {/* Basic info */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{employee.name}</h1>
                  <p className="text-muted-foreground text-sm mb-3">{employee.loginId}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {employee.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {employee.phone}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Company:</span>
                    {employee.company}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Department:</span>
                    {employee.department}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Manager:</span>
                    {employee.manager}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location:</span>
                    {employee.location}
                  </div>
                </div>
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
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="resume">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{employee.about}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What I love about my job</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{employee.whatILove}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">My interests and hobbies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{employee.hobbies}</p>
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
                      {employee.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="mt-4 text-primary">
                      + Add Skills
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {employee.certifications.map((cert) => (
                        <li key={cert} className="text-sm text-muted-foreground">
                          • {cert}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" size="sm" className="mt-4 text-primary">
                      + Add Certification
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="private">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date of Birth</span>
                    <span>{new Date(employee.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Residing Address</span>
                    <span className="text-right max-w-[200px]">{employee.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nationality</span>
                    <span>{employee.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Personal Email</span>
                    <span>{employee.personalEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender</span>
                    <span>{employee.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Marital Status</span>
                    <span>{employee.maritalStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date of Joining</span>
                    <span>{new Date(employee.dateOfJoining).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bank Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Number</span>
                    <span>{employee.bankDetails.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank Name</span>
                    <span>{employee.bankDetails.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IFSC Code</span>
                    <span>{employee.bankDetails.ifscCode}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="salary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Salary Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="font-medium">Monthly Wage</span>
                    <span className="text-xl font-bold">₹{employee.salary.monthlyWage.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="font-medium">Yearly Wage</span>
                    <span className="text-xl font-bold">₹{(employee.salary.monthlyWage * 12).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Salary Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Basic Salary (50%)</span>
                    <span>₹{employee.salary.basic.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">HRA (50% of Basic)</span>
                    <span>₹{employee.salary.hra.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Standard Allowance</span>
                    <span>₹{employee.salary.standardAllowance.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Performance Bonus</span>
                    <span>₹{employee.salary.performanceBonus.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">LTA</span>
                    <span>₹{employee.salary.lta.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fixed Allowance</span>
                    <span>₹{employee.salary.fixedAllowance.toLocaleString()}/month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PF Contribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Employee (12%)</span>
                    <span>₹{employee.salary.pfEmployee.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Employer (12%)</span>
                    <span>₹{employee.salary.pfEmployer.toLocaleString()}/month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tax Deductions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Professional Tax</span>
                    <span>₹{employee.salary.professionalTax.toLocaleString()}/month</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle className="text-lg">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Login History
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Phone, MapPin, Building2, Briefcase, Users, Calendar, Edit2, Pencil } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
    accountNumber: "123456789012",
    bankName: "Chase Bank",
    ifscCode: "CHASE0001234",
    panNo: "ABCDE1234F",
    uanNo: "100123456789",
    empCode: "EMP001",
  },
  salary: {
    monthlyWage: 50000,
    yearlyWage: 600000,
    workingDays: 5,
    breakTime: "1 hour",
    basic: 25000,
    hra: 12500,
    houseRentAllowance: 12500,
    standardAllowance: 4167,
    performanceBonus: 2083,
    lta: 2083,
    leaveTravel: 2083,
    fixedAllowance: 2918,
    pfEmployee: 3000,
    pfEmployer: 3000,
    professionalTax: 200,
  },
};

export default function EmployeeProfile() {
  const { id } = useParams();
  const { role, user } = useAuth();
  const employee = mockEmployee; // In real app, fetch based on id

  // Check if user is viewing their own profile
  const isOwnProfile = !id || id === "me" || id === user?.id;

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
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Name</Label>
                    <Input defaultValue={employee.name} className="font-semibold" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Job Position</Label>
                    <Input defaultValue={employee.position} />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <Input type="email" defaultValue={employee.email} />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Mobile</Label>
                    <Input type="tel" defaultValue={employee.phone} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Company</Label>
                    <Input defaultValue={employee.company} />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Department</Label>
                    <Input defaultValue={employee.department} />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Manager</Label>
                    <Input defaultValue={employee.manager} />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Location</Label>
                    <Input defaultValue={employee.location} />
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
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Date of Birth</Label>
                    <Input type="date" defaultValue={employee.dateOfBirth} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Residing Address</Label>
                    <Input defaultValue={employee.address} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Nationality</Label>
                    <Input defaultValue={employee.nationality} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Personal Email</Label>
                    <Input type="email" defaultValue={employee.personalEmail} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Gender</Label>
                    <Input defaultValue={employee.gender} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Marital Status</Label>
                    <Input defaultValue={employee.maritalStatus} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Date of Joining</Label>
                    <Input type="date" defaultValue={employee.dateOfJoining} />
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
                    <Input defaultValue={employee.bankDetails.accountNumber} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Bank Name</Label>
                    <Input defaultValue={employee.bankDetails.bankName} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">IFSC Code</Label>
                    <Input defaultValue={employee.bankDetails.ifscCode} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">PAN No</Label>
                    <Input defaultValue={employee.bankDetails.panNo} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">UAN NO</Label>
                    <Input defaultValue={employee.bankDetails.uanNo} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Emp Code</Label>
                    <Input defaultValue={employee.bankDetails.empCode} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="salary">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Salary Information</CardTitle>
                  <div className="px-4 py-2 bg-muted rounded-md">
                    <span className="text-sm font-medium">Important</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  The Salary Information tab allows users to define and manage all salary-related
                  details for an employee, including wage type, working schedule, salary
                  components, benefits. Salary components should be calculated automatically
                  based on the defined Wage.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Wage Section */}
                  <div>
                    <h3 className="text-sm font-medium mb-4">- Wage Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm mb-2 block">Month Wage</Label>
                        <div className="flex gap-2 items-center">
                          <Input
                            type="number"
                            defaultValue={employee.salary.monthlyWage}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">/ Month</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm mb-2 block">No of working days in a week:</Label>
                        <Input type="number" defaultValue={employee.salary.workingDays} />
                      </div>
                      <div>
                        <Label className="text-sm mb-2 block">Yearly wage</Label>
                        <div className="flex gap-2 items-center">
                          <Input
                            type="number"
                            defaultValue={employee.salary.yearlyWage}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">/ Yearly</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm mb-2 block">Break Time</Label>
                        <div className="flex gap-2 items-center">
                          <Input defaultValue={employee.salary.breakTime} className="flex-1" />
                          <span className="text-sm text-muted-foreground">/ hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Salary Components */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">- Salary Components</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Section where users can define salary structure components.
                      <br />
                      Each component should include:
                      <br />
                      Basic, House Rent Allowance, Standard Allowance, Performance Bonus, Leave
                      Travel Allowance, Fixed Allowance
                      <br />
                      <br />
                      Computation Type: Fixed Amount or Percentage of Wage
                      <br />
                      <br />
                      Value: Percentage field (e.g., 50% for Basic, 50% of Basic for HRA, Standard
                      Allowance 8.33%, Performance Bonus 4.17%, Leave Travel Allowance 4.17%,
                      Fixed Allowance is = wage - total of all the component)
                      <br />
                      <br />
                      Salary component values should auto-update when the wage amount changes.
                      The total of all components should not exceed the defined Wage
                    </p>

                    <div className="space-y-3 border rounded-lg p-4">
                      {/* Basic Salary */}
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <span className="text-sm">Default Base salary from company salary components</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            HRA provided for employees 50% of the salary
                          </p>
                        </div>
                        <div className="col-span-3">
                          <div className="flex gap-2 items-center">
                            <Input
                              type="number"
                              defaultValue={employee.salary.basic}
                              className="text-right"
                            />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">₹ / month</span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex gap-2 items-center">
                            <Input
                              type="number"
                              defaultValue="50.00"
                              className="text-right"
                            />
                            <span className="text-xs text-muted-foreground">%</span>
                          </div>
                        </div>
                      </div>

                      {/* House Rent Allowance */}
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <span className="text-sm">House Rent Allowance</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            HRA provided for employees 50% of the basic salary
                          </p>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            defaultValue={employee.salary.houseRentAllowance}
                            className="text-right"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            defaultValue="50.00"
                            className="text-right"
                          />
                        </div>
                      </div>

                      {/* Standard Allowance */}
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <span className="text-sm">Standard Allowance</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            A standard allowance is a predetermined fixed amount provided to employee
                            as part of their salary.
                          </p>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            defaultValue={employee.salary.standardAllowance}
                            className="text-right"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            defaultValue="8.33"
                            className="text-right"
                          />
                        </div>
                      </div>

                      {/* Performance Bonus */}
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <span className="text-sm">Performance Bonus</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            Variable amount paid during payroll. This value defined by the company and
                            is 4.17% of the basic salary.
                          </p>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            defaultValue={employee.salary.performanceBonus}
                            className="text-right"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            defaultValue="4.17"
                            className="text-right"
                          />
                        </div>
                      </div>

                      {/* Leave Travel Allowance */}
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <span className="text-sm">Leave Travel Allowance</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            LTA is paid by the company to employees to cover their travel expenses and
                            calculated as 4.17% of the basic salary.
                          </p>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            defaultValue={employee.salary.leaveTravel}
                            className="text-right"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            defaultValue="4.17"
                            className="text-right"
                          />
                        </div>
                      </div>

                      {/* Fixed Allowance */}
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <span className="text-sm">Fixed Allowance</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            Fixed allowance portion of wage is determined after calculating all salary
                            components
                          </p>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            defaultValue={employee.salary.fixedAllowance}
                            className="text-right"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            defaultValue="5.83"
                            className="text-right"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PF Contribution */}
                  <div>
                    <h3 className="text-sm font-medium mb-4">
                      - Provident Fund (PF) Contribution
                    </h3>
                    <div className="space-y-3 border rounded-lg p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <span className="text-sm">Employee</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            PF is calculated based on the basic salary
                          </p>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            defaultValue={employee.salary.pfEmployee}
                            className="text-right"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            defaultValue="12.00"
                            className="text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <span className="text-sm">Employer</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            PF is calculated based on the basic salary
                          </p>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            defaultValue={employee.salary.pfEmployer}
                            className="text-right"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            defaultValue="12.00"
                            className="text-right"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tax Deductions */}
                  <div>
                    <h3 className="text-sm font-medium mb-4">- Tax Deductions</h3>
                    <div className="space-y-3 border rounded-lg p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <span className="text-sm">Professional Tax</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            Professional Tax deducted from the Gross Salary
                          </p>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            defaultValue={employee.salary.professionalTax}
                            className="text-right"
                          />
                        </div>
                        <div className="col-span-2">
                          <span className="text-sm text-muted-foreground">Fixed: 200</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Automatic Calculation Note */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-2">- Automatic Calculation:</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The system should calculate each component amount based on the employee's
                      defined Wage.
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">Example:</p>
                    <p className="text-sm text-muted-foreground">
                      If Wage = 750,000 and Basic = 50% of wage, then Basic = 125,000.
                      <br />
                      If HRA = 50% of Basic, then HRA = 112,500.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      Each fields for configuration (e.g., PF rate 12%).
                      <br />
                      and Professional Tax 200
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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

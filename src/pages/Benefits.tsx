import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Shield, 
  Umbrella, 
  GraduationCap, 
  Car, 
  Home,
  Wallet,
  Gift,
  Plane,
  Dumbbell,
  Coffee,
  ArrowRight,
  Check
} from "lucide-react";

interface Benefit {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  enrolled: boolean;
  value?: string;
  coverage?: string;
  details: string[];
}

const mockBenefits: Benefit[] = [
  {
    id: "1",
    name: "Health Insurance",
    category: "Insurance",
    description: "Comprehensive medical, dental, and vision coverage for you and your family",
    icon: Heart,
    enrolled: true,
    value: "$850/month",
    coverage: "Family Plan",
    details: [
      "Medical coverage with $0 deductible",
      "Dental coverage including orthodontics",
      "Vision coverage with annual exam",
      "Prescription drug coverage",
      "Mental health support"
    ]
  },
  {
    id: "2",
    name: "Life Insurance",
    category: "Insurance",
    description: "Life insurance coverage to protect your loved ones",
    icon: Shield,
    enrolled: true,
    value: "2x Annual Salary",
    coverage: "Basic Coverage",
    details: [
      "Basic life insurance (2x salary)",
      "Option to purchase additional coverage",
      "Accidental death & dismemberment",
      "No medical exam required"
    ]
  },
  {
    id: "3",
    name: "401(k) Retirement Plan",
    category: "Financial",
    description: "Build your retirement savings with company matching",
    icon: Wallet,
    enrolled: true,
    value: "6% Match",
    coverage: "Enrolled",
    details: [
      "Company matches up to 6% of salary",
      "Immediate vesting of contributions",
      "Multiple investment options",
      "Financial planning resources"
    ]
  },
  {
    id: "4",
    name: "Paid Time Off",
    category: "Time Off",
    description: "Generous PTO policy for work-life balance",
    icon: Plane,
    enrolled: true,
    value: "25 Days/Year",
    coverage: "Unlimited",
    details: [
      "25 days of PTO annually",
      "10 paid holidays",
      "Birthday day off",
      "Additional days with tenure"
    ]
  },
  {
    id: "5",
    name: "Learning & Development",
    category: "Professional Growth",
    description: "Invest in your professional growth and skills",
    icon: GraduationCap,
    enrolled: true,
    value: "$2,000/year",
    coverage: "Active",
    details: [
      "$2,000 annual learning budget",
      "Conference attendance support",
      "Online course subscriptions",
      "Professional certification reimbursement"
    ]
  },
  {
    id: "6",
    name: "Gym Membership",
    category: "Wellness",
    description: "Stay healthy with subsidized gym membership",
    icon: Dumbbell,
    enrolled: false,
    value: "$50/month subsidy",
    details: [
      "Partnership with major gym chains",
      "$50 monthly subsidy",
      "Access to fitness classes",
      "Virtual workout programs"
    ]
  },
  {
    id: "7",
    name: "Commuter Benefits",
    category: "Transportation",
    description: "Pre-tax benefits for your daily commute",
    icon: Car,
    enrolled: false,
    value: "$300/month",
    details: [
      "Pre-tax transit pass",
      "Parking reimbursement",
      "Bike share subsidy",
      "Electric vehicle charging"
    ]
  },
  {
    id: "8",
    name: "Home Office Stipend",
    category: "Remote Work",
    description: "Equipment and setup for remote work",
    icon: Home,
    enrolled: true,
    value: "$1,000 one-time",
    coverage: "Used",
    details: [
      "$1,000 one-time setup budget",
      "$100 monthly internet stipend",
      "Ergonomic equipment",
      "Co-working space access"
    ]
  },
  {
    id: "9",
    name: "Employee Assistance Program",
    category: "Wellness",
    description: "Confidential support for personal and work-life issues",
    icon: Umbrella,
    enrolled: true,
    value: "Included",
    coverage: "Active",
    details: [
      "24/7 counseling services",
      "Legal consultation",
      "Financial planning advice",
      "Work-life balance resources"
    ]
  },
  {
    id: "10",
    name: "Free Meals & Snacks",
    category: "Perks",
    description: "Complimentary meals and snacks at the office",
    icon: Coffee,
    enrolled: true,
    value: "Included",
    coverage: "Daily",
    details: [
      "Free breakfast and lunch",
      "Snacks and beverages",
      "Catered team events",
      "Dietary accommodations"
    ]
  },
  {
    id: "11",
    name: "Employee Referral Bonus",
    category: "Perks",
    description: "Earn rewards for referring great talent",
    icon: Gift,
    enrolled: true,
    value: "Up to $5,000",
    coverage: "Active",
    details: [
      "Up to $5,000 per referral",
      "Bonus paid after 90 days",
      "Unlimited referrals",
      "Priority consideration"
    ]
  },
];

export default function Benefits() {
  const enrolledBenefits = mockBenefits.filter(b => b.enrolled);
  const availableBenefits = mockBenefits.filter(b => !b.enrolled);

  const categories = Array.from(new Set(mockBenefits.map(b => b.category)));

  const BenefitCard = ({ benefit }: { benefit: Benefit }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <benefit.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg">{benefit.name}</CardTitle>
                {benefit.enrolled && (
                  <Badge variant="default">Enrolled</Badge>
                )}
              </div>
              <Badge variant="secondary" className="mb-2">{benefit.category}</Badge>
              <CardDescription>{benefit.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {benefit.value && (
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Value</span>
            <span className="text-lg font-bold">{benefit.value}</span>
          </div>
        )}
        {benefit.coverage && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Coverage</span>
            <span className="font-medium">{benefit.coverage}</span>
          </div>
        )}
        <div className="space-y-2">
          <p className="text-sm font-medium">Details:</p>
          <ul className="space-y-2">
            {benefit.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button className="w-full" variant={benefit.enrolled ? "outline" : "default"}>
          {benefit.enrolled ? "Manage Benefit" : "Enroll Now"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">Benefits</h1>
              <Badge>NEW</Badge>
            </div>
            <p className="text-muted-foreground">Explore and manage your employee benefits</p>
          </div>
          <Button variant="outline">
            Download Benefits Guide
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockBenefits.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Enrolled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{enrolledBenefits.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{availableBenefits.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Annual Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$45K+</div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollment Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Benefit Enrollment</CardTitle>
            <CardDescription>
              You've enrolled in {enrolledBenefits.length} out of {mockBenefits.length} available benefits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(enrolledBenefits.length / mockBenefits.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Benefits</TabsTrigger>
            <TabsTrigger value="enrolled">My Benefits ({enrolledBenefits.length})</TabsTrigger>
            <TabsTrigger value="available">Available ({availableBenefits.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {categories.map((category) => {
              const categoryBenefits = mockBenefits.filter(b => b.category === category);
              return (
                <div key={category}>
                  <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryBenefits.map((benefit) => (
                      <BenefitCard key={benefit.id} benefit={benefit} />
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="enrolled">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledBenefits.map((benefit) => (
                <BenefitCard key={benefit.id} benefit={benefit} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableBenefits.map((benefit) => (
                <BenefitCard key={benefit.id} benefit={benefit} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

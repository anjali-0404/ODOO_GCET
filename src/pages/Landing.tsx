import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import dayflowLogo from "@/assets/dayflow-logo.svg";
import { 
  Users, 
  Clock, 
  CalendarCheck, 
  Shield, 
  ArrowRight,
  ChevronRight,
  BarChart3,
  Building2
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Employee Management",
    description: "Centralized employee profiles with complete workforce visibility",
  },
  {
    icon: Clock,
    title: "Attendance Tracking",
    description: "Real-time check-in/out with automated time calculations",
  },
  {
    icon: CalendarCheck,
    title: "Leave Management",
    description: "Streamlined leave requests with balance tracking",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Comprehensive insights into workforce productivity",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 bg-background/80">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src={dayflowLogo} alt="Dayflow" className="h-6 invert" />
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Shield className="h-4 w-4" />
            Secure & Reliable HR Management
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Modern HR Management
            <span className="block text-gradient">Made Simple</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Streamline your workforce management with DAYFLOW. Track attendance, 
            manage leave requests, and empower your team with self-service tools.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="px-8">
                <Building2 className="mr-2 h-5 w-5" />
                Register Your Company
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline" size="lg" className="px-8">
                Employee Login
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete HR solution designed for modern teams
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join hundreds of companies using DAYFLOW to manage their workforce efficiently.
            </p>
            <Link to="/signup">
              <Button size="lg" className="px-10">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={dayflowLogo} alt="Dayflow" className="h-5 invert opacity-60" />
          <p className="text-sm text-muted-foreground">
            © 2026 DAYFLOW. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Mail, Lock, User, Building2, Phone, Upload, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import dayflowLogo from "@/assets/dayflow-logo.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SignUpFormData {
  companyName: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "employee" | "hr" | "";
  acceptTerms: boolean;
}

interface FormErrors {
  companyName?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  acceptTerms?: string;
  general?: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate Employee ID format: [CompanyPrefix][NamePrefix][Year][Serial]
  const generateEmployeeId = (companyName: string, name: string) => {
    const companyPrefix = companyName.substring(0, 2).toUpperCase();
    const nameParts = name.trim().split(" ");
    const namePrefix = (
      (nameParts[0]?.substring(0, 2) || "") +
      (nameParts[1]?.substring(0, 2) || "")
    ).toUpperCase();
    const year = new Date().getFullYear();
    const serial = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0");
    return `${companyPrefix}${namePrefix}${year}${serial}`;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof SignUpFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const employeeId = generateEmployeeId(formData.companyName, formData.name);
      console.log("Generated Employee ID:", employeeId);
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
      setFormData({
        companyName: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
        acceptTerms: false,
      });
    } catch {
      setErrors({
        general: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-success">
              Account Created Successfully!
            </CardTitle>
            <CardDescription>
              Please check your email to verify your account before signing in.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <Button onClick={() => setIsSuccess(false)} variant="outline" className="w-full">
              Sign Up Another Account
            </Button>
            <Link to="/signin" className="w-full">
              <Button className="w-full">Go to Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img src={dayflowLogo} alt="Dayflow" className="h-8 invert" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Register your company and start managing your workforce
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            {errors.general && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {errors.general}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="companyName">Company Name</Label>
              <div className="flex gap-2">
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Acme Inc."
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  error={!!errors.companyName}
                  leftIcon={<Building2 className="h-4 w-4" />}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon" className="shrink-0">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={!!errors.name}
                leftIcon={<User className="h-4 w-4" />}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={!!errors.email}
                leftIcon={<Mail className="h-4 w-4" />}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={!!errors.phone}
                leftIcon={<Phone className="h-4 w-4" />}
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
                disabled={isLoading}
              >
                <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="hr">HR Manager</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                error={!!errors.password}
                leftIcon={<Lock className="h-4 w-4" />}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                error={!!errors.confirmPassword}
                leftIcon={<Lock className="h-4 w-4" />}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Checkbox
                id="acceptTerms"
                label="I agree to the Terms and Conditions and Privacy Policy"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("acceptTerms", checked === true)
                }
                error={errors.acceptTerms}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 p-6 pt-0">
            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-primary hover:underline font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;

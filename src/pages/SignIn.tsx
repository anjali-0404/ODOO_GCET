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
import { useState } from "react";
<<<<<<< HEAD
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import dayflowLogo from "@/assets/dayflow-logo.svg";
=======
import { Mail, Lock, Users, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import dayflowLogo from "@/assets/dayflow-logo.svg";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd

interface SignInFormData {
  loginId: string;
  password: string;
<<<<<<< HEAD
=======
  role: UserRole;
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
}

interface FormErrors {
  loginId?: string;
  password?: string;
<<<<<<< HEAD
=======
  role?: string;
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
  general?: string;
}

const SignIn = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [formData, setFormData] = useState<SignInFormData>({
    loginId: "",
    password: "",
=======
  const { signIn } = useAuth();
  const [formData, setFormData] = useState<SignInFormData>({
    loginId: "",
    password: "",
    role: "employee",
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.loginId.trim()) {
      newErrors.loginId = "Login ID or Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SignInFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
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
<<<<<<< HEAD
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
=======
      await signIn(formData.loginId, formData.password, formData.role);
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
      // Navigate to dashboard on success
      navigate("/dashboard");
    } catch {
      setErrors({
        general: "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img src={dayflowLogo} alt="Dayflow" className="h-8 invert" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
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

<<<<<<< HEAD
=======
            {/* Role Selection */}
            <div className="flex flex-col gap-2">
              <Label>Sign in as</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange("role", "employee")}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                    formData.role === "employee"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  disabled={isLoading}
                >
                  <Users className="h-6 w-6" />
                  <span className="text-sm font-medium">Employee</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange("role", "hr")}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                    formData.role === "hr"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  disabled={isLoading}
                >
                  <Briefcase className="h-6 w-6" />
                  <span className="text-sm font-medium">HR Manager</span>
                </button>
              </div>
            </div>

>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
            <div className="flex flex-col gap-2">
              <Label htmlFor="loginId">Login ID / Email</Label>
              <Input
                id="loginId"
                type="text"
                placeholder="OIJODO2022D001 or john@company.com"
                value={formData.loginId}
                onChange={(e) => handleInputChange("loginId", e.target.value)}
                error={!!errors.loginId}
                leftIcon={<Mail className="h-4 w-4" />}
                disabled={isLoading}
              />
              {errors.loginId && (
                <p className="text-sm text-destructive">{errors.loginId}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
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
          </CardContent>

          <CardFooter className="flex flex-col gap-4 p-6 pt-0">
            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:underline font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;

import { createContext, useContext, useState, ReactNode } from "react";
import { Heart, Shield, Wallet, Plane, GraduationCap, Dumbbell, Car, Home, Gift, Coffee } from "lucide-react";

export interface Benefit {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
  enrolled: boolean;
  value?: string;
  coverage?: string;
  details: string[];
}

interface BenefitsContextType {
  benefits: Benefit[];
  enrollBenefit: (id: string) => void;
  unenrollBenefit: (id: string) => void;
  addBenefit: (benefit: Omit<Benefit, "id">) => void;
  updateBenefit: (id: string, updates: Partial<Benefit>) => void;
  deleteBenefit: (id: string) => void;
  getBenefit: (id: string) => Benefit | undefined;
}

const initialBenefits: Benefit[] = [
  {
    id: "1",
    name: "Health Insurance",
    category: "Insurance",
    description: "Comprehensive medical, dental, and vision coverage for you and your family",
    iconName: "Heart",
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
    iconName: "Shield",
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
    iconName: "Wallet",
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
    iconName: "Plane",
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
    iconName: "GraduationCap",
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
    iconName: "Dumbbell",
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
    iconName: "Car",
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
    description: "Set up your perfect home workspace",
    iconName: "Home",
    enrolled: true,
    value: "$1,000 one-time",
    coverage: "Claimed",
    details: [
      "$1,000 home office setup allowance",
      "$100 monthly internet reimbursement",
      "Ergonomic equipment options",
      "Tech equipment upgrades"
    ]
  },
];

const BenefitsContext = createContext<BenefitsContextType | undefined>(undefined);

export function BenefitsProvider({ children }: { children: ReactNode }) {
  const [benefits, setBenefits] = useState<Benefit[]>(initialBenefits);

  const enrollBenefit = (id: string) => {
    setBenefits(prev => prev.map(b => b.id === id ? { ...b, enrolled: true, coverage: "Enrolled" } : b));
  };

  const unenrollBenefit = (id: string) => {
    setBenefits(prev => prev.map(b => b.id === id ? { ...b, enrolled: false, coverage: undefined } : b));
  };

  const addBenefit = (benefit: Omit<Benefit, "id">) => {
    const newBenefit: Benefit = {
      ...benefit,
      id: `b${Date.now()}`,
    };
    setBenefits(prev => [...prev, newBenefit]);
  };

  const updateBenefit = (id: string, updates: Partial<Benefit>) => {
    setBenefits(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBenefit = (id: string) => {
    setBenefits(prev => prev.filter(b => b.id !== id));
  };

  const getBenefit = (id: string) => benefits.find(b => b.id === id);

  return (
    <BenefitsContext.Provider value={{ 
      benefits, 
      enrollBenefit, 
      unenrollBenefit, 
      addBenefit, 
      updateBenefit, 
      deleteBenefit, 
      getBenefit 
    }}>
      {children}
    </BenefitsContext.Provider>
  );
}

export function useBenefits() {
  const context = useContext(BenefitsContext);
  if (!context) {
    throw new Error("useBenefits must be used within a BenefitsProvider");
  }
  return context;
}

export const iconMap: Record<string, any> = {
  Heart,
  Shield,
  Wallet,
  Plane,
  GraduationCap,
  Dumbbell,
  Car,
  Home,
  Gift,
  Coffee
};

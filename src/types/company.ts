
// Import types but rename them to avoid conflicts
import { ExpenseData as ExpenseDataType, Department as DepartmentType, Category as CategoryType } from '@/services/mockData/types';

// Re-export the imported types with new names to avoid conflicts
export type ImportedExpenseData = ExpenseDataType;
export type ImportedDepartment = DepartmentType;
export type ImportedCategory = CategoryType;

export interface Company {
  id: string;
  name: string;
  logo: string;
}

export interface DashboardOverviewProps {
  data?: ExpenseData[];
}

export interface DashboardReportsProps {
  data?: ExpenseData[];
}

export interface DashboardAnalyticsProps {
  data?: ExpenseData[];
}

export interface ExpenseData {
  id: string;
  amount: number;
  category: string;
  department: string;
  date: string;
  description: string;
  paymentMethod: string;
  status: 'pending' | 'approved' | 'rejected';
  vendor: string;
  approvedBy?: string;
  receipt?: string;
}

export interface Department {
  id: string;
  name: string;
  budget: number;
  actualSpend: number;
  managerName: string;
}

export interface Category {
  id: string;
  name: string;
  budget: number;
  actualSpend: number;
}

export interface MonthlyExpense {
  month: string;
  amount: number;
}

// Add the missing CompanyData interface
export interface CompanyData {
  id: string;
  name: string;
  logo: string;
  industry: string;
  founded: number;
  employees: number;
  annualRevenue: number;
  headquarters: {
    city: string;
    province: string;
    country: string;
  };
  description: string;
  departments: { name: string; budget: number; actualSpend: number }[];
  ceo: string;
  website: string;
  quarterlyData: {
    quarter: string;
    revenue: number;
    expenses: number;
    profit: number;
    employeeCount: number;
    customerSatisfaction: number;
    marketShare: number;
  }[];
  departmentMetrics: DepartmentMetric[];
  financialMetrics: {
    revenueYTD: number;
    expensesYTD: number;
    cashFlow: number;
    debtToEquityRatio: number;
    currentRatio: number;
    returnOnAssets: number;
    returnOnEquity: number;
    profitMargin: number;
  };
  savingsOpportunities: SavingsOpportunity[];
}

export interface DepartmentMetric {
  name: string;
  budget: number;
  actualSpend: number;
  headcount: number;
  projectsCompleted: number;
  efficiency: number;
}

export interface SavingsOpportunity {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  implementationCost: number;
  timeToImplement: string;
  riskLevel: string;
  priority: string;
}

export interface MetricsData {
  revenue: number;
  expenses: number;
  profit: number;
  growth: number;
}

export interface ScenarioAnalysisProps {
  data?: ExpenseData[];
  className?: string; // Added className property
}

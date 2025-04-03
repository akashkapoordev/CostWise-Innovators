
// Common type definitions used across mock data files
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

export interface BudgetData {
  id: string;
  category: string;
  department: string;
  budgetAmount: number;
  actualAmount: number;
  period: string;
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

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  date: string;
  isRead: boolean;
  actionRequired: boolean;
}

export interface CostSavingRecommendation {
  id: string;
  title: string;
  description: string;
  estimatedSavings: number;
  effort: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  category: string;
  status: 'Pending' | 'In Progress' | 'Implemented';
}

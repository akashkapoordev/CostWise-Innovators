
import { Department, MonthlyExpense } from './types';

// Mock departments
export const departments: Department[] = [
  { id: '1', name: 'Engineering', budget: 125000, actualSpend: 118750, managerName: 'Jennifer Lee' },
  { id: '2', name: 'Marketing', budget: 85000, actualSpend: 89250, managerName: 'Michael Chen' },
  { id: '3', name: 'Sales', budget: 110000, actualSpend: 104500, managerName: 'David Wilson' },
  { id: '4', name: 'HR', budget: 65000, actualSpend: 63050, managerName: 'Sarah Johnson' },
  { id: '5', name: 'IT', budget: 95000, actualSpend: 90250, managerName: 'Robert Kumar' },
  { id: '6', name: 'Operations', budget: 75000, actualSpend: 72000, managerName: 'Lisa Patel' }
];

// Monthly expenses for trend charts
export const monthlyExpensesByDepartment: Record<string, MonthlyExpense[]> = {
  'Engineering': [
    { month: 'Jan', amount: 9500 },
    { month: 'Feb', amount: 10200 },
    { month: 'Mar', amount: 9800 },
    { month: 'Apr', amount: 10500 },
    { month: 'May', amount: 10100 },
    { month: 'Jun', amount: 9900 },
    { month: 'Jul', amount: 9700 },
    { month: 'Aug', amount: 9600 },
    { month: 'Sep', amount: 9800 },
    { month: 'Oct', amount: 10300 },
    { month: 'Nov', amount: 10200 },
    { month: 'Dec', amount: 9700 }
  ],
  'Marketing': [
    { month: 'Jan', amount: 7200 },
    { month: 'Feb', amount: 7100 },
    { month: 'Mar', amount: 7500 },
    { month: 'Apr', amount: 7300 },
    { month: 'May', amount: 7600 },
    { month: 'Jun', amount: 7400 },
    { month: 'Jul', amount: 7450 },
    { month: 'Aug', amount: 7350 },
    { month: 'Sep', amount: 7500 },
    { month: 'Oct', amount: 7800 },
    { month: 'Nov', amount: 8200 },
    { month: 'Dec', amount: 7850 }
  ],
  'Sales': [
    { month: 'Jan', amount: 8700 },
    { month: 'Feb', amount: 8500 },
    { month: 'Mar', amount: 8900 },
    { month: 'Apr', amount: 8600 },
    { month: 'May', amount: 8800 },
    { month: 'Jun', amount: 8700 },
    { month: 'Jul', amount: 8500 },
    { month: 'Aug', amount: 8600 },
    { month: 'Sep', amount: 8700 },
    { month: 'Oct', amount: 8900 },
    { month: 'Nov', amount: 9000 },
    { month: 'Dec', amount: 8800 }
  ],
  'HR': [
    { month: 'Jan', amount: 5200 },
    { month: 'Feb', amount: 5100 },
    { month: 'Mar', amount: 5300 },
    { month: 'Apr', amount: 5250 },
    { month: 'May', amount: 5350 },
    { month: 'Jun', amount: 5300 },
    { month: 'Jul', amount: 5200 },
    { month: 'Aug', amount: 5250 },
    { month: 'Sep', amount: 5300 },
    { month: 'Oct', amount: 5350 },
    { month: 'Nov', amount: 5400 },
    { month: 'Dec', amount: 5350 }
  ],
  'IT': [
    { month: 'Jan', amount: 7600 },
    { month: 'Feb', amount: 7500 },
    { month: 'Mar', amount: 7700 },
    { month: 'Apr', amount: 7650 },
    { month: 'May', amount: 7550 },
    { month: 'Jun', amount: 7500 },
    { month: 'Jul', amount: 7450 },
    { month: 'Aug', amount: 7400 },
    { month: 'Sep', amount: 7550 },
    { month: 'Oct', amount: 7650 },
    { month: 'Nov', amount: 7700 },
    { month: 'Dec', amount: 7600 }
  ],
  'Operations': [
    { month: 'Jan', amount: 6000 },
    { month: 'Feb', amount: 5900 },
    { month: 'Mar', amount: 6100 },
    { month: 'Apr', amount: 6050 },
    { month: 'May', amount: 6000 },
    { month: 'Jun', amount: 5950 },
    { month: 'Jul', amount: 6000 },
    { month: 'Aug', amount: 6050 },
    { month: 'Sep', amount: 6100 },
    { month: 'Oct', amount: 6150 },
    { month: 'Nov', amount: 6200 },
    { month: 'Dec', amount: 6150 }
  ]
};

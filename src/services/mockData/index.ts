
// Export the alerts data
export { alerts } from './alerts';

// Export types
export * from './types';

// Export mock data
export { departments, monthlyExpensesByDepartment } from './departments';
export { categories } from './categories';
export { expenses } from './expenses';
export { budgetVsActual } from './budget';
export { costSavingRecommendations } from './savings';

// Create a mock costTrends data for the CostTrendsChart component
export const costTrends = [
  { month: 'Jan', total: 44000, isProjected: false },
  { month: 'Feb', total: 43000, isProjected: false },
  { month: 'Mar', total: 45500, isProjected: false },
  { month: 'Apr', total: 47500, isProjected: false },
  { month: 'May', total: 46800, isProjected: false },
  { month: 'Jun', total: 48900, isProjected: false },
  { month: 'Jul', total: 50200, isProjected: false },
  { month: 'Aug', total: 49500, isProjected: false },
  { month: 'Sep', total: 52000, isProjected: false },
  { month: 'Oct', total: 54500, isProjected: true },
  { month: 'Nov', total: 56000, isProjected: true },
  { month: 'Dec', total: 58500, isProjected: true }
];

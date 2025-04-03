
import { CostSavingRecommendation } from './types';

// Mock cost saving recommendations
export const costSavingRecommendations: CostSavingRecommendation[] = [
  {
    id: '1',
    title: 'Consolidate SaaS Subscriptions',
    description: 'Identify and eliminate duplicate or underutilized software subscriptions across departments.',
    estimatedSavings: 18500,
    effort: 'Medium',
    impact: 'High',
    category: 'Software & Tools',
    status: 'In Progress'
  },
  {
    id: '2',
    title: 'Implement Virtual Meetings Policy',
    description: 'Reduce non-essential travel by leveraging video conferencing for internal meetings.',
    estimatedSavings: 24000,
    effort: 'Low',
    impact: 'Medium',
    category: 'Travel',
    status: 'Implemented'
  },
  {
    id: '3',
    title: 'Negotiate Vendor Contracts',
    description: 'Review and renegotiate top vendor contracts to secure better terms and volume discounts.',
    estimatedSavings: 35000,
    effort: 'High',
    impact: 'High',
    category: 'Professional Services',
    status: 'Pending'
  },
  {
    id: '4',
    title: 'Optimize Cloud Resources',
    description: 'Right-size cloud instances and implement auto-scaling to match actual resource needs.',
    estimatedSavings: 16200,
    effort: 'Medium',
    impact: 'Medium',
    category: 'IT Infrastructure',
    status: 'In Progress'
  },
  {
    id: '5',
    title: 'Paperless Office Initiative',
    description: 'Reduce printing costs by implementing fully digital document workflows.',
    estimatedSavings: 8500,
    effort: 'Low',
    impact: 'Low',
    category: 'Office Supplies',
    status: 'Implemented'
  },
  {
    id: '6',
    title: 'Energy Efficiency Improvements',
    description: 'Implement smart lighting and HVAC controls to reduce facility energy consumption.',
    estimatedSavings: 12000,
    effort: 'Medium',
    impact: 'Medium',
    category: 'Facilities & Rent',
    status: 'Pending'
  }
];

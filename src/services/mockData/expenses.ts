
import { ExpenseData } from './types';

// Mock expenses data with added vendor field to ensure type compatibility
export const expenses: ExpenseData[] = [
  {
    id: '1',
    amount: 1250.35,
    category: 'Software & Tools',
    department: 'Engineering',
    date: '2023-03-15',
    description: 'Annual SaaS subscription',
    paymentMethod: 'Credit Card',
    status: 'approved',
    vendor: 'Adobe Systems',
    approvedBy: 'John Smith',
    receipt: 'receipt-001.pdf'
  },
  {
    id: '2',
    amount: 875.50,
    category: 'Travel',
    department: 'Sales',
    date: '2023-03-10',
    description: 'Client meeting - flight tickets',
    paymentMethod: 'Corporate Card',
    status: 'approved',
    vendor: 'Delta Airlines',
    approvedBy: 'Jane Cooper',
    receipt: 'receipt-002.pdf'
  },
  {
    id: '3',
    amount: 350.00,
    category: 'Office Supplies',
    department: 'Operations',
    date: '2023-03-05',
    description: 'Office furniture',
    paymentMethod: 'Credit Card',
    status: 'pending',
    vendor: 'Office Depot',
    approvedBy: undefined
  },
  {
    id: '4',
    amount: 1800.00,
    category: 'Professional Services',
    department: 'Marketing',
    date: '2023-03-02',
    description: 'SEO consulting services',
    paymentMethod: 'Bank Transfer',
    status: 'approved',
    vendor: 'Digital Marketing Inc.',
    approvedBy: 'Mark Wilson',
    receipt: 'receipt-004.pdf'
  },
  {
    id: '5',
    amount: 450.25,
    category: 'Salaries',
    department: 'Human Resources',
    date: '2023-02-28',
    description: 'Contractor payment',
    paymentMethod: 'Bank Transfer',
    status: 'approved',
    vendor: 'Freelancer Ltd.',
    approvedBy: 'Sarah Johnson'
  },
  {
    id: '6',
    amount: 2500.00,
    category: 'Marketing & Advertising',
    department: 'Marketing',
    date: '2023-02-25',
    description: 'Social media campaign',
    paymentMethod: 'Credit Card',
    status: 'rejected',
    vendor: 'Meta Platforms Inc.',
    approvedBy: undefined
  },
  {
    id: '7',
    amount: 635.80,
    category: 'Training & Development',
    department: 'Engineering',
    date: '2023-02-20',
    description: 'Online course subscription',
    paymentMethod: 'Credit Card',
    status: 'approved',
    vendor: 'Coursera',
    approvedBy: 'John Smith',
    receipt: 'receipt-007.pdf'
  },
  {
    id: '8',
    amount: 9500.00,
    category: 'Facilities & Rent',
    department: 'Operations',
    date: '2023-02-15',
    description: 'Office space rent - March',
    paymentMethod: 'Bank Transfer',
    status: 'approved',
    vendor: 'Commercial Properties LLC',
    approvedBy: 'David Miller',
    receipt: 'receipt-008.pdf'
  },
  {
    id: '9',
    amount: 780.45,
    category: 'Software & Tools',
    department: 'Engineering',
    date: '2023-02-10',
    description: 'Development tools subscription',
    paymentMethod: 'Credit Card',
    status: 'pending',
    vendor: 'JetBrains',
    approvedBy: undefined
  },
  {
    id: '10',
    amount: 1250.00,
    category: 'Travel',
    department: 'Executive',
    date: '2023-02-05',
    description: 'Conference attendance - accommodation',
    paymentMethod: 'Corporate Card',
    status: 'approved',
    vendor: 'Marriott Hotels',
    approvedBy: 'Jane Cooper',
    receipt: 'receipt-010.pdf'
  }
];

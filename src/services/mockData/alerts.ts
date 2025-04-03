
import { Alert } from './types';

// Generate alerts for the notification system
export const alerts: Alert[] = [
  {
    id: '1',
    title: 'Budget Threshold Exceeded',
    message: 'Marketing department has exceeded their quarterly advertising budget by 6%.',
    type: 'warning',
    date: '2023-10-18T09:30:00Z',
    isRead: false,
    actionRequired: true
  },
  {
    id: '2',
    title: 'New Expense Report',
    message: 'New expense report submitted by David Wilson from Sales department for approval.',
    type: 'info',
    date: '2023-10-17T14:45:00Z',
    isRead: true,
    actionRequired: true
  },
  {
    id: '3',
    title: 'Cost Saving Opportunity',
    message: 'IT department has identified potential annual savings of $12,000 by consolidating software licenses.',
    type: 'success',
    date: '2023-10-16T11:20:00Z',
    isRead: true,
    actionRequired: false
  },
  {
    id: '4',
    title: 'Expense Policy Violation',
    message: 'Travel expense submitted without proper documentation. Action required.',
    type: 'error',
    date: '2023-10-15T16:10:00Z',
    isRead: true,
    actionRequired: true
  },
  {
    id: '5',
    title: 'Monthly Report Available',
    message: 'September cost analysis report is now available for review.',
    type: 'info',
    date: '2023-10-10T08:00:00Z',
    isRead: true,
    actionRequired: false
  }
];

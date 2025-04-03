
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BudgetComparisonChart from '@/components/dashboard/BudgetComparisonChart';
import { expenses } from '@/services/mockData';
import { DashboardReportsProps } from '@/types/company';

const DashboardReports: React.FC<DashboardReportsProps> = ({ data }) => {
  // Use passed data or fallback to mock data
  const expenseData = data || expenses;
  
  return (
    <Card className="border-none shadow-md animate-fade-in">
      <CardHeader>
        <CardTitle>Expense Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {expenseData.slice(0, 8).map((expense) => (
                  <div key={expense.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">{expense.department} • {expense.category}</p>
                      <p className="text-xs text-muted-foreground">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${expense.amount.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        expense.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : expense.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Budget vs. Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <BudgetComparisonChart title="Budget vs. Actual" />
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardReports;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseData } from '@/types/company';

interface ExpenseSummaryCardsProps {
  expenses: ExpenseData[];
  formatCurrency: (amount: number) => string;
}

export const ExpenseSummaryCards = ({ expenses, formatCurrency }: ExpenseSummaryCardsProps) => {
  // Calculate summary stats
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const approvedAmount = expenses
    .filter(expense => expense.status === 'approved')
    .reduce((sum, expense) => sum + expense.amount, 0);
  const pendingAmount = expenses
    .filter(expense => expense.status === 'pending')
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(totalAmount)}</div>
          <p className="text-sm text-muted-foreground">{expenses.length} expense records</p>
        </CardContent>
      </Card>
      
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Approved Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-costwise-green">{formatCurrency(approvedAmount)}</div>
          <p className="text-sm text-muted-foreground">
            {expenses.filter(e => e.status === 'approved').length} records
          </p>
        </CardContent>
      </Card>
      
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Pending Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-500">{formatCurrency(pendingAmount)}</div>
          <p className="text-sm text-muted-foreground">
            {expenses.filter(e => e.status === 'pending').length} records
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

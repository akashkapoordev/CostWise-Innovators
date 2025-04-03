
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BudgetComparisonChart from '@/components/dashboard/BudgetComparisonChart';
import { departments, categories } from '@/services/mockData';
import DepartmentSpendTable from '@/components/dashboard/DepartmentSpendTable';

const BudgetAnalysisPage = () => {
  // Calculate total budget and actual spend
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
  const totalActual = departments.reduce((sum, dept) => sum + dept.actualSpend, 0);
  const variance = totalActual - totalBudget;
  const variancePercent = ((variance / totalBudget) * 100).toFixed(1);
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-costwise-darkblue">Budget Analysis</h1>
        <p className="text-muted-foreground">
          Compare budgeted amounts against actual spending across departments and categories.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalBudget.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalActual.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${variance > 0 ? 'text-costwise-red' : 'text-costwise-green'}`}>
              {variance > 0 ? '+' : ''}{variance.toLocaleString()} ({variancePercent}%)
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-costwise-darkblue">Budget Comparison</CardTitle>
          <CardDescription>Visual comparison of budget vs. actual spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <BudgetComparisonChart title="Budget vs. Actual" />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Department Budgets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {departments.map((dept) => (
                <li key={dept.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{dept.name}</p>
                      <p className="text-sm font-medium">
                        ${dept.actualSpend.toLocaleString()} / ${dept.budget.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                      <div 
                        className={`h-2 rounded-full ${
                          dept.actualSpend > dept.budget ? 'bg-costwise-red' : 'bg-costwise-green'
                        }`}
                        style={{ width: `${Math.min((dept.actualSpend / dept.budget) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((dept.actualSpend / dept.budget) * 100)}% of budget
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Category Budgets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{category.name}</p>
                      <p className="text-sm font-medium">
                        ${category.actualSpend.toLocaleString()} / ${category.budget.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                      <div 
                        className={`h-2 rounded-full ${
                          category.actualSpend > category.budget ? 'bg-costwise-red' : 'bg-costwise-blue'
                        }`}
                        style={{ width: `${Math.min((category.actualSpend / category.budget) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((category.actualSpend / category.budget) * 100)}% of budget
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <DepartmentSpendTable 
        title="Department Spending Analysis" 
        description="Detailed breakdown of departmental spending against budgets"
        className="border-none shadow-md"
      />
    </div>
  );
};

export default BudgetAnalysisPage;

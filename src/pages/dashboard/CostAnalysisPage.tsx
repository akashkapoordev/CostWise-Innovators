
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CostChart from '@/components/dashboard/CostChart';
import CostDistribution from '@/components/dashboard/CostDistribution';
import CostTrendsChart from '@/components/dashboard/CostTrendsChart';
import { categories } from '@/services/mockData';

const CostAnalysisPage = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-costwise-darkblue">Cost Analysis</h1>
        <p className="text-muted-foreground">
          Analyze your organization's spending patterns and identify cost-saving opportunities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-costwise-darkblue">Monthly Expense Trends</CardTitle>
            <CardDescription>Track your spending over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <CostChart title="Monthly Expense Trends" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-costwise-darkblue">Expense Distribution</CardTitle>
            <CardDescription>See where your money is going</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <CostDistribution title="Expense Distribution" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-costwise-darkblue">Category Spending Trends</CardTitle>
          <CardDescription>Analyze spending across different categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <CostTrendsChart title="Category Spending Trends" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-costwise-darkblue">Spending by Category</CardTitle>
          <CardDescription>Detailed breakdown of expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="border shadow-sm">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-base">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Budget</span>
                    <span className="font-medium">${category.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Actual</span>
                    <span className="font-medium">${category.actualSpend.toLocaleString()}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Usage</span>
                      <span className={category.actualSpend > category.budget ? "text-costwise-red font-medium" : "text-costwise-green font-medium"}>
                        {Math.round((category.actualSpend / category.budget) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${category.actualSpend > category.budget ? "bg-costwise-red" : "bg-costwise-green"}`}
                        style={{ width: `${Math.min((category.actualSpend / category.budget) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAnalysisPage;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CostTrendsChart from '@/components/dashboard/CostTrendsChart';
import SavingsOpportunities from '@/components/dashboard/SavingsOpportunities';
import { departments } from '@/services/mockData';
import { DashboardAnalyticsProps } from '@/types/company';

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ data }) => {
  return (
    <Card className="border-none shadow-md animate-fade-in">
      <CardHeader>
        <CardTitle>Cost Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cost Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <CostTrendsChart title="Cost Forecast" />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Top Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {departments.slice(0, 5).map((dept, i) => (
                    <li key={dept.id} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-costwise-blue/10 text-costwise-blue">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{dept.name}</p>
                        <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                          <div 
                            className="h-2 rounded-full bg-costwise-blue" 
                            style={{ width: `${(dept.actualSpend / departments[0].actualSpend) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${dept.actualSpend.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{Math.round((dept.actualSpend / dept.budget) * 100)}% of budget</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Saving Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <SavingsOpportunities title="Saving Recommendations" showAll={true} />
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAnalytics;

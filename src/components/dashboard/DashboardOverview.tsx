
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import CostChart from '@/components/dashboard/CostChart';
import CostDistribution from '@/components/dashboard/CostDistribution';
import DepartmentSpendTable from '@/components/dashboard/DepartmentSpendTable';
import SavingsOpportunities from '@/components/dashboard/SavingsOpportunities';
import { DollarSign, PieChart, TrendingUp } from 'lucide-react';
import { DashboardOverviewProps } from '@/types/company';

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Expenses"
          value={548750}
          valuePrefix="$"
          icon={<DollarSign className="h-5 w-5 text-blue-600" />}
          change={2.5}
          trend="up"
          description="from last month"
          className="bg-gradient-to-br from-blue-50 to-white"
        />

        <StatCard
          title="Budget Status"
          value="On Track"
          icon={<PieChart className="h-5 w-5 text-green-600" />}
          change={12}
          trend="down"
          description="under budget"
          className="bg-gradient-to-br from-green-50 to-white"
        />

        <StatCard
          title="Saving Opportunities"
          value={42500}
          valuePrefix="$"
          icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
          description="8 areas identified"
          className="bg-gradient-to-br from-purple-50 to-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-costwise-darkblue">Monthly Expense Trends</CardTitle>
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
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <CostDistribution title="Expense Distribution" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-md col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-costwise-darkblue">Department Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <DepartmentSpendTable title="Department Spending" />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-costwise-darkblue">Saving Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <SavingsOpportunities title="Saving Opportunities" limit={3} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;

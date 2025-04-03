
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardOverview from './DashboardOverview';
import DashboardReports from './DashboardReports';
import DashboardAnalytics from './DashboardAnalytics';
import { ExpenseData } from '@/types/company';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  data?: ExpenseData[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab, data }) => {
  return (
    <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Financial Dashboard</h2>
        <TabsList className="bg-white border shadow-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">Reports</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">Analytics</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview">
        <DashboardOverview data={data} />
      </TabsContent>

      <TabsContent value="reports">
        <DashboardReports data={data} />
      </TabsContent>

      <TabsContent value="analytics">
        <DashboardAnalytics data={data} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;

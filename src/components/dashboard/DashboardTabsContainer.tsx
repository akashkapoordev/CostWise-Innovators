
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardReports from '@/components/dashboard/DashboardReports';
import DashboardAnalytics from '@/components/dashboard/DashboardAnalytics';
import AlertsNotificationsPanel from '@/components/dashboard/AlertsNotificationsPanel';
import ScenarioAnalysis from '@/components/dashboard/ScenarioAnalysis';
import PredictiveAnalytics from '@/components/dashboard/PredictiveAnalytics';
import { ExpenseData } from '@/types/company';

interface DashboardTabsContainerProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  filteredData: ExpenseData[];
}

const DashboardTabsContainer: React.FC<DashboardTabsContainerProps> = ({
  activeTab,
  handleTabChange,
  filteredData
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview data={filteredData} />;
      case "reports":
        return <DashboardReports data={filteredData} />;
      case "analytics":
        return <DashboardAnalytics data={filteredData} />;
      case "alerts":
        return <AlertsNotificationsPanel />;
      case "scenario":
        return <ScenarioAnalysis data={filteredData} />;
      case "predictive":
        return <PredictiveAnalytics data={filteredData} />;
      default:
        return <DashboardOverview data={filteredData} />;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="bg-white border shadow-sm w-full justify-start overflow-x-auto">
        <TabsTrigger value="overview" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
          Overview
        </TabsTrigger>
        <TabsTrigger value="reports" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
          Reports
        </TabsTrigger>
        <TabsTrigger value="analytics" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="alerts" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
          Alerts & Notifications
        </TabsTrigger>
        <TabsTrigger value="scenario" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
          Scenario Analysis
        </TabsTrigger>
        <TabsTrigger value="predictive" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
          Predictive Analytics
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </Tabs>
  );
};

export default DashboardTabsContainer;

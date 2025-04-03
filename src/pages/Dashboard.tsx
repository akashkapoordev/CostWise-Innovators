
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCompany, setSelectedCompany] = useState("costwise"); // Default company
  const navigate = useNavigate();
  
  const companies = [
    { id: "costwise", name: "CostWise Innovators", logo: "/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png" },
    { id: "acme", name: "Acme Corporation", logo: "/placeholder.svg" },
    { id: "globex", name: "Globex Industries", logo: "/placeholder.svg" }
  ];

  const currentCompany = companies.find(c => c.id === selectedCompany) || companies[0];

  // Navigate to the dashboard layout which provides a more comprehensive interface
  const goToFullDashboard = () => {
    navigate('/dashboard-layout');
  };

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader 
        selectedCompany={currentCompany}
        companies={companies}
        onCompanyChange={handleCompanyChange}
        goToFullDashboard={goToFullDashboard}
      />
      
      <main className="flex-grow max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <DashboardTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

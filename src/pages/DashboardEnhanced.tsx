
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import DashboardActions from '@/components/dashboard/DashboardActions';
import DashboardTabsContainer from '@/components/dashboard/DashboardTabsContainer';
import { 
  departments, 
  categories, 
  expenses 
} from '@/services/mockData';
import { toast } from '@/components/ui/use-toast';
import { useFilteredData } from '@/hooks/useFilteredData';

const DashboardEnhanced = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCompany, setSelectedCompany] = useState("costwise"); // Default company
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Use our new custom hook for filtering logic
  const {
    filteredData,
    searchTerm,
    selectedDepartment,
    selectedCategory,
    dateRange,
    setSearchTerm,
    setSelectedDepartment,
    setSelectedCategory,
    setDateRange
  } = useFilteredData({
    data: expenses,
    departmentData: departments,
    categoryData: categories
  });
  
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
    toast(`Switched to ${companies.find(c => c.id === companyId)?.name}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Handle refresh button
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      toast("Data refreshed successfully");
    }, 800);
  };

  // Handle export functionality
  const handleExport = () => {
    toast("Exporting data to CSV...");
    // In a real app, this would trigger a download
    setTimeout(() => {
      toast("Export completed successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader 
        selectedCompany={currentCompany}
        companies={companies}
        onCompanyChange={handleCompanyChange}
        goToFullDashboard={goToFullDashboard}
      />
      
      <main className="flex-grow max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <DashboardFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          
          <div className="flex justify-end">
            <DashboardActions 
              isLoading={isLoading}
              handleRefresh={handleRefresh}
              handleExport={handleExport}
            />
          </div>
        </div>
        
        <DashboardTabsContainer 
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          filteredData={filteredData}
        />
      </main>
    </div>
  );
};

export default DashboardEnhanced;

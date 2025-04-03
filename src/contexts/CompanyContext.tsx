
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { CompanyContextType } from './CompanyContextTypes';
import { useCompanyData } from '@/hooks/useCompanyData';

// Create context with default values
const CompanyContext = createContext<CompanyContextType>({
  companies: [],
  loading: true,
  error: null,
  refreshData: async () => {},
  selectedCompany: null,
  selectCompany: async () => {},
  compareCompanies: async () => [],
  competitors: [],
  isDemoMode: false,
  setIsDemoMode: () => {},
  demoCompanyId: null
});

// Provider component
export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    companies, 
    loading, 
    error, 
    fetchCompanies, 
    selectedCompany, 
    selectCompany,
    compareCompanies,
    competitors,
    isDemoMode,
    setIsDemoMode,
    demoCompanyId
  } = useCompanyData();

  // Load companies on mount
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Function to refresh data
  const refreshData = async () => {
    await fetchCompanies();
  };

  return (
    <CompanyContext.Provider value={{ 
      companies, 
      loading, 
      error, 
      refreshData, 
      selectedCompany, 
      selectCompany,
      compareCompanies,
      competitors,
      isDemoMode,
      setIsDemoMode,
      demoCompanyId
    }}>
      {children}
    </CompanyContext.Provider>
  );
};

// Custom hook for using the company context
export const useCompanies = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompanies must be used within a CompanyProvider');
  }
  return context;
};


import { useState, useCallback, useEffect } from 'react';
import { CompanyData } from '@/types/company';
import { mockCompanies } from '@/data/mockCompanies';
import { fetchCompanies as apiFetchCompanies, fetchCompanyDetails } from '@/services/api';
import { fetchRealCompanies } from '@/services/realCompanyService';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Helper to check if we're on the home page
const isHomePage = () => {
  return window.location.pathname === '/' || 
         window.location.pathname === '/index.html';
};

export const useCompanyData = () => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
  const [competitors, setCompetitors] = useState<CompanyData[]>([]);
  const [realCompaniesLoaded, setRealCompaniesLoaded] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoCompanyId, setDemoCompanyId] = useState<string | null>(null);
  
  // Get the authenticated user to check if they're logged in as a company
  const { user } = useAuth();

  // Function to fetch companies
  const fetchCompanies = useCallback(async () => {
    console.log('Fetching companies...');
    console.log('Demo mode:', isDemoMode, 'Demo company ID:', demoCompanyId);
    
    setLoading(true);
    setError(null);
    
    try {
      // Start with mock data
      let allCompanies = [...mockCompanies];
      console.log('Companies loaded from mock data:', mockCompanies);
      
      // Try to fetch from API (skipping this in our implementation since it's failing)
      try {
        const apiCompanies = await apiFetchCompanies();
        if (apiCompanies && apiCompanies.length > 0) {
          allCompanies = [...apiCompanies];
          console.log('Companies loaded from API:', apiCompanies);
        }
      } catch (apiError) {
        console.log('API fetch failed, continuing with mock data');
      }
      
      // Add real companies
      if (!isDemoMode) {
        try {
          console.log('Fetching real company data...');
          const realCompanies = await fetchRealCompanies();
          
          if (realCompanies && realCompanies.length > 0) {
            console.log('Real companies loaded:', realCompanies);
            allCompanies = [...allCompanies, ...realCompanies];
            setRealCompaniesLoaded(true);
            
            // Only show success toast if not on home page
            if (!isHomePage()) {
              toast.success('Real company data loaded successfully');
            }
          } else {
            console.warn('No real companies data received');
          }
        } catch (realCompanyError) {
          console.error('Failed to load real companies:', realCompanyError);
        }
      }
      
      // Ensure all company websites have proper URL format
      allCompanies = allCompanies.map(company => ({
        ...company,
        website: company.website.includes('://') ? company.website : `https://${company.website}`
      }));

      // If in demo mode, filter to show only the selected demo company
      if (isDemoMode && demoCompanyId) {
        console.log(`Filtering for demo company with ID: ${demoCompanyId}`);
        const demoCompany = allCompanies.find(c => c.id === demoCompanyId);
        if (demoCompany) {
          console.log('Demo company found:', demoCompany);
          setCompanies([demoCompany]);
          setSelectedCompany(demoCompany);
        } else {
          console.error('Demo company not found');
          setError('Demo company not found');
          setCompanies([]);
        }
      } 
      // If logged in as a company, only show that company's data
      else if (user?.companyId && !isDemoMode) {
        console.log(`Filtering for user's company with ID: ${user.companyId}`);
        const userCompany = allCompanies.find(c => c.id === user.companyId);
        if (userCompany) {
          console.log('User company found:', userCompany);
          setCompanies([userCompany]);
          setSelectedCompany(userCompany);
        } else {
          console.error('User company not found');
          setError('Your company data not found');
          setCompanies([]);
        }
      } 
      // Otherwise, show all companies (this should only happen for admin users)
      else {
        setCompanies(allCompanies);
      }
    } catch (err) {
      console.error('Error fetching companies:', err);
      
      // Fallback to mock data on error
      if (isDemoMode && demoCompanyId) {
        const demoCompany = mockCompanies.find(c => c.id === demoCompanyId);
        if (demoCompany) {
          console.log('Falling back to mock demo company:', demoCompany);
          setCompanies([demoCompany]);
          setSelectedCompany(demoCompany);
        } else {
          setError('Demo company not found. Using sample data instead.');
          setCompanies([]);
        }
      } else if (user?.companyId) {
        const userCompany = mockCompanies.find(c => c.id === user.companyId);
        if (userCompany) {
          console.log('Falling back to mock user company:', userCompany);
          setCompanies([userCompany]);
          setSelectedCompany(userCompany);
        } else {
          setError('Your company data not found. Using sample data instead.');
          setCompanies([]);
        }
      } else {
        setCompanies(mockCompanies);
        setError('Failed to load companies. Using sample data instead.');
      }
      
      // Only show error toast if not on home page
      if (!isHomePage()) {
        toast.error('Failed to load companies. Using sample data instead.');
      }
    } finally {
      setLoading(false);
    }
  }, [isDemoMode, demoCompanyId, user?.companyId]);

  // Function to select a company by ID
  const selectCompany = useCallback(async (id: string, isDemo = false) => {
    console.log(`Selecting company with ID: ${id}, isDemo: ${isDemo}`);
    setLoading(true);
    
    if (isDemo) {
      setIsDemoMode(true);
      setDemoCompanyId(id);
      
      // When setting demo mode, we'll refetch companies
      try {
        // Find company in mock data since demo always uses mock
        const demoCompany = mockCompanies.find(c => c.id === id);
        
        if (demoCompany) {
          // Ensure company website has http/https prefix
          if (demoCompany.website && !demoCompany.website.startsWith('http://') && !demoCompany.website.startsWith('https://')) {
            demoCompany.website = `https://${demoCompany.website}`;
          }
          
          console.log('Selected demo company:', demoCompany);
          setCompanies([demoCompany]);
          setSelectedCompany(demoCompany);
          setCompetitors([]); // No competitors in demo mode
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error selecting demo company:', err);
        
        // Only show error toast if not on home page
        if (!isHomePage()) {
          toast.error('Failed to select demo company');
        }
      }
    }
    
    try {
      // First check if we already have the company in our state
      let company = companies.find(c => c.id === id);
      
      // If not found in existing companies, try to fetch from API
      if (!company) {
        company = await fetchCompanyDetails(id);
      }
      
      if (company) {
        // Ensure company website has http/https prefix
        if (company.website && !company.website.startsWith('http://') && !company.website.startsWith('https://')) {
          company = {
            ...company,
            website: `https://${company.website}`
          };
        }
        
        setSelectedCompany(company);
        console.log('Selected company:', company);
        
        // Find competitors (companies in the same industry)
        // In demo mode or when logged in as a company, don't show competitors as they should be private
        if (isDemo || user?.companyId) {
          setCompetitors([]);
        } else {
          const industryCompetitors = companies.filter(
            c => c.industry === company?.industry && c.id !== company?.id
          );
          setCompetitors(industryCompetitors);
          console.log('Competitors:', industryCompetitors);
        }
      } else {
        console.error(`Company with ID ${id} not found`);
        setError(`Company with ID ${id} not found`);
        
        // Only show error toast if not on home page
        if (!isHomePage()) {
          toast.error(`Company with ID ${id} not found`);
        }
      }
    } catch (err) {
      console.error('Error selecting company:', err);
      setError('Failed to select company');
      
      // Only show error toast if not on home page
      if (!isHomePage()) {
        toast.error('Failed to select company');
      }
    } finally {
      setLoading(false);
    }
  }, [companies, user?.companyId]);

  // Function to compare multiple companies
  const compareCompanies = useCallback(async (companyIds: string[]) => {
    console.log(`Comparing companies with IDs: ${companyIds.join(', ')}`);
    setLoading(true);
    
    try {
      const companiesToCompare: CompanyData[] = [];
      
      for (const id of companyIds) {
        // First check if we already have the company in our state
        let company = companies.find(c => c.id === id);
        
        // If not found in existing companies, try to fetch from API
        if (!company) {
          company = await fetchCompanyDetails(id);
        }
        
        if (company) {
          companiesToCompare.push(company);
        } else {
          console.error(`Company with ID ${id} not found for comparison`);
          
          // Only show error toast if not on home page
          if (!isHomePage()) {
            toast.error(`Company with ID ${id} not found for comparison`);
          }
        }
      }
      
      console.log('Companies for comparison:', companiesToCompare);
      return companiesToCompare;
    } catch (err) {
      console.error('Error comparing companies:', err);
      setError('Failed to compare companies');
      
      // Only show error toast if not on home page
      if (!isHomePage()) {
        toast.error('Failed to compare companies');
      }
      
      return [];
    } finally {
      setLoading(false);
    }
  }, [companies]);

  // Load companies on mount
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // If the user or demo mode changes, refetch companies
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies, user?.companyId, isDemoMode, demoCompanyId]);

  return {
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
  };
};

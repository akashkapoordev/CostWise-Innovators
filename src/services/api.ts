
import { CompanyData, MetricsData } from '../types/company';
import { toast } from 'sonner';

const API_URL = 'http://localhost:5000/api';

// Helper to check if we're on the home page
const isHomePage = () => {
  return window.location.pathname === '/' || 
         window.location.pathname === '/index.html';
};

export const fetchCompanies = async (): Promise<CompanyData[]> => {
  try {
    const response = await fetch(`${API_URL}/companies`);
    if (!response.ok) {
      throw new Error('Failed to fetch companies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching companies:', error);
    
    // Only show toast if not on home page
    if (!isHomePage()) {
      toast.error('Failed to fetch companies. Using mock data instead.');
    }
    
    return [];
  }
};

export const fetchCompanyDetails = async (id: string): Promise<CompanyData | null> => {
  try {
    const response = await fetch(`${API_URL}/companies/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch company details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching company details:', error);
    
    // Only show toast if not on home page
    if (!isHomePage()) {
      toast.error('Failed to fetch company details. Using cached data if available.');
    }
    
    return null;
  }
};

export const fetchCompanyMetrics = async (companyId: string): Promise<MetricsData | null> => {
  try {
    const response = await fetch(`${API_URL}/metrics/${companyId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch company metrics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching company metrics:', error);
    
    // Only show toast if not on home page
    if (!isHomePage()) {
      toast.error('Failed to fetch company metrics');
    }
    
    return null;
  }
};

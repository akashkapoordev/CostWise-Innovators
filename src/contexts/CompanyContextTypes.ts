
import { CompanyData } from '@/types/company';

export interface CompanyContextType {
  companies: CompanyData[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  selectedCompany: CompanyData | null;
  selectCompany: (id: string, isDemo?: boolean) => Promise<void>;
  compareCompanies: (companyIds: string[]) => Promise<CompanyData[]>;
  competitors: CompanyData[];
  isDemoMode: boolean;
  setIsDemoMode: (isDemoMode: boolean) => void;
  demoCompanyId: string | null;
}

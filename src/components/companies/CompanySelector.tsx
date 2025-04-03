
import React from 'react';
import { CompanyData } from '@/types/company';

interface CompanySelectorProps {
  companies: CompanyData[];
  selectedCompanies: string[];
  onToggleCompany: (companyId: string) => void;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({ 
  companies, 
  selectedCompanies, 
  onToggleCompany 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {companies.map((company) => (
        <button
          key={company.id}
          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
            selectedCompanies.includes(company.id)
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => onToggleCompany(company.id)}
          disabled={selectedCompanies.length === 1 && selectedCompanies.includes(company.id)}
        >
          {company.name}
        </button>
      ))}
    </div>
  );
};

export default CompanySelector;

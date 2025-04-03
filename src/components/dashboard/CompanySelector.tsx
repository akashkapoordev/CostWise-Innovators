
import React from 'react';
import { toast } from '@/components/ui/use-toast';

interface CompanyOption {
  id: string;
  name: string;
  logo: string;
}

interface CompanySelectorProps {
  selectedCompany: CompanyOption;
  companies: CompanyOption[];
  onCompanyChange: (companyId: string) => void;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  selectedCompany,
  companies,
  onCompanyChange
}) => {
  return (
    <div className="flex items-center">
      <img 
        src={selectedCompany.logo}
        alt={`${selectedCompany.name} Logo`}
        className="h-16 mr-4 transition-all duration-300 hover:scale-105" 
      />
      <div>
        <h1 className="text-2xl font-bold text-costwise-blue hidden sm:block">{selectedCompany.name}</h1>
        <div className="flex space-x-2 mt-1">
          {companies.map(company => (
            <button 
              key={company.id}
              onClick={() => onCompanyChange(company.id)}
              className={`h-2 w-2 rounded-full transition-all ${
                company.id === selectedCompany.id 
                  ? 'bg-costwise-blue scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Switch to ${company.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanySelector;

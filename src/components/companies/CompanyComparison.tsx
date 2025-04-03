
import React, { useState } from 'react';
import { CompanyData } from '@/types/company';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CompanySelector from './CompanySelector';
import MetricSelector from './MetricSelector';
import RevenueChart from './charts/RevenueChart';
import FinancialsChart from './charts/FinancialsChart';
import CompanyRadarChart from './charts/CompanyRadarChart';
import CompanyCard from './CompanyCard';
import { getCompanyColor } from './utils/comparisonUtils';

interface CompanyComparisonProps {
  companies: CompanyData[];
}

const CompanyComparison: React.FC<CompanyComparisonProps> = ({ companies }) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(
    companies.slice(0, Math.min(3, companies.length)).map(c => c.id)
  );
  
  const [metric, setMetric] = useState('revenue');
  
  const filteredCompanies = companies.filter(company => 
    selectedCompanies.includes(company.id)
  );
  
  const handleCompanyToggle = (companyId: string) => {
    if (selectedCompanies.includes(companyId)) {
      // Don't allow deselecting if only one company is selected
      if (selectedCompanies.length > 1) {
        setSelectedCompanies(selectedCompanies.filter(id => id !== companyId));
      }
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanySelector 
            companies={companies}
            selectedCompanies={selectedCompanies}
            onToggleCompany={handleCompanyToggle}
          />
          
          <div className="mt-6">
            <MetricSelector
              metric={metric}
              onMetricChange={setMetric}
            />
            
            {metric === 'revenue' && (
              <RevenueChart 
                filteredCompanies={filteredCompanies}
                getCompanyColor={getCompanyColor}
              />
            )}
            
            {metric === 'financials' && (
              <FinancialsChart 
                filteredCompanies={filteredCompanies}
                getCompanyColor={getCompanyColor}
              />
            )}
            
            {metric === 'overall' && (
              <CompanyRadarChart 
                filteredCompanies={filteredCompanies}
                getCompanyColor={getCompanyColor}
              />
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredCompanies.map((company) => (
          <CompanyCard 
            key={company.id}
            company={company}
            filteredCompanies={filteredCompanies}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyComparison;

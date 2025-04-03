
import React from 'react';
import { CompanyData } from '@/types/company';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CompanyCardProps {
  company: CompanyData;
  filteredCompanies: CompanyData[];
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, filteredCompanies }) => {
  return (
    <Card key={company.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{company.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Annual Revenue</p>
              <p className="font-medium">${(company.annualRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profit Margin</p>
              <p className="font-medium">{company.financialMetrics?.profitMargin.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Return on Equity</p>
              <p className="font-medium">{company.financialMetrics?.returnOnEquity.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Employees</p>
              <p className="font-medium">{company.employees.toLocaleString()}</p>
            </div>
          </div>
          
          {company.quarterlyData && company.quarterlyData.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Latest Quarter Revenue</p>
              <p className="font-medium">${(company.quarterlyData[company.quarterlyData.length - 1].revenue / 1000000).toFixed(1)}M</p>
              <div className="w-full bg-gray-100 h-2 rounded-full mt-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ 
                    width: `${(company.quarterlyData[company.quarterlyData.length - 1].revenue / 
                      Math.max(...filteredCompanies.map(c => 
                        c.quarterlyData[c.quarterlyData.length - 1].revenue
                      ))) * 100}%` 
                  }}
                />
              </div>
            </div>
          )}
          
          {company.quarterlyData && company.quarterlyData.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Market Share</p>
              <p className="font-medium">{company.quarterlyData[company.quarterlyData.length - 1].marketShare.toFixed(1)}%</p>
              <div className="w-full bg-gray-100 h-2 rounded-full mt-1">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ 
                    width: `${(company.quarterlyData[company.quarterlyData.length - 1].marketShare / 
                      Math.max(...filteredCompanies.map(c => 
                        c.quarterlyData[c.quarterlyData.length - 1].marketShare
                      ))) * 100}%` 
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;

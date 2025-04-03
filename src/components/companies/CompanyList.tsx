
import React from 'react';
import { CompanyData } from '@/types/company';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, DollarSign, ExternalLink } from 'lucide-react';

interface CompanyListProps {
  companies: CompanyData[];
  onSelectCompany: (id: string) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({ companies, onSelectCompany }) => {
  if (companies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No companies found</p>
      </div>
    );
  }

  const handleWebsiteVisit = (website: string) => {
    // Ensure website has http/https prefix
    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      {companies.map(company => (
        <Card key={company.id} className="transition-all hover:border-primary">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{company.name}</CardTitle>
                <CardDescription>{company.description}</CardDescription>
              </div>
              <Badge>{company.industry}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {company.headquarters.city}, {company.headquarters.province}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                Founded {company.founded}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                {company.employees.toLocaleString()} employees
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="mr-1 h-4 w-4" />
                ${(company.annualRevenue / 1000000).toFixed(1)}M annual revenue
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto">
                {company.quarterlyData.slice(0, 4).map((quarter, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs text-muted-foreground">{quarter.quarter}</p>
                    <p className="font-medium">${(quarter.revenue / 1000000).toFixed(1)}M</p>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => handleWebsiteVisit(company.website)}
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Website
                </Button>
                <Button 
                  size="sm"
                  className="text-xs"
                  onClick={() => onSelectCompany(company.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CompanyList;

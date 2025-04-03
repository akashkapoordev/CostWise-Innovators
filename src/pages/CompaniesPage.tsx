
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompanies } from '@/contexts/CompanyContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Search, Building, BarChart4 } from 'lucide-react';
import CompanyList from '@/components/companies/CompanyList';
import CompanyComparison from '@/components/companies/CompanyComparison';

const CompaniesPage: React.FC = () => {
  console.log('CompaniesPage rendered');
  const { companies, loading, error, refreshData } = useCompanies();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('CompaniesPage useEffect running');
    console.log('Companies data:', companies);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [companies, loading, error]);

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.headquarters.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    console.log('Refreshing companies data');
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const handleViewCompanyDetails = (companyId: string) => {
    navigate(`/dashboard-layout/company/${companyId}`);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="border shadow-sm">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Skeleton className="h-16 w-16 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="mt-4"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (companies.length === 0) {
      return (
        <Card>
          <CardContent className="pt-6 text-center">
            <Building className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No companies found</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="list">Company List</TabsTrigger>
          <TabsTrigger value="compare">Compare Companies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <CompanyList 
            companies={filteredCompanies} 
            onSelectCompany={handleViewCompanyDetails} 
          />
        </TabsContent>
        
        <TabsContent value="compare">
          <CompanyComparison companies={companies} />
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Companies</h1>
          <p className="text-muted-foreground">
            View and analyze {companies.length} companies
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search companies..." 
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </span>
          </Button>
          
          <Button onClick={() => navigate('/dashboard-layout/analysis')}>
            <BarChart4 className="h-4 w-4 mr-2" />
            Analysis
          </Button>
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default CompaniesPage;

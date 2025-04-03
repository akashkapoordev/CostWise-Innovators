
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCompanies } from '@/contexts/CompanyContext';
import { fetchCompanyDetails } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Globe, Users, DollarSign, BarChart4, PieChart, TrendingUp, BarChart2 } from 'lucide-react';
import { CompanyData } from '@/types/company';
import { useAuth } from '@/contexts/AuthContext';
import CompanyOverview from '@/components/companies/CompanyOverview';
import CompanyFinancials from '@/components/companies/CompanyFinancials';
import CompanyDepartments from '@/components/companies/CompanyDepartments';
import CompanySavings from '@/components/companies/CompanySavings';

const CompanyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { companies, selectCompany, selectedCompany, competitors } = useCompanies();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCompany = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Check if the company is already in our context
        if (selectedCompany?.id === id) {
          setLoading(false);
          return;
        }
        
        // Try to find it in the existing companies array
        const existing = companies.find(c => c.id === id);
        if (existing) {
          await selectCompany(id);
          setLoading(false);
          return;
        }
        
        // If not found, fetch it from the API
        const company = await fetchCompanyDetails(id);
        if (company) {
          await selectCompany(id);
        } else {
          setError('Company not found');
        }
      } catch (err) {
        setError('Failed to load company details');
      } finally {
        setLoading(false);
      }
    };
    
    loadCompany();
  }, [id, selectCompany, companies, selectedCompany]);

  const handleViewComparison = () => {
    navigate('/dashboard-layout/company-comparison');
  };

  const handleWebsiteVisit = (website: string) => {
    // Ensure website has http/https prefix
    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
            <Skeleton className="h-64 w-full mt-8" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !selectedCompany) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error || 'Company not found'}</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard-layout/companies')}
              className="mt-4"
            >
              View All Companies
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if viewing own company (for company users)
  const isOwnCompany = user?.companyId === id;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedCompany.name}</h1>
            <p className="text-muted-foreground">{selectedCompany.industry}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleWebsiteVisit(selectedCompany.website)}
          >
            <Globe className="h-4 w-4 mr-2" />
            Website
          </Button>
          
          {isOwnCompany && competitors.length > 0 && (
            <Button variant="default" onClick={handleViewComparison}>
              <BarChart2 className="h-4 w-4 mr-2" />
              Compare with Competitors
            </Button>
          )}
          
          <Button variant="default" onClick={() => setActiveTab('financials')}>
            <BarChart4 className="h-4 w-4 mr-2" />
            Financials
          </Button>
        </div>
      </div>
      
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Company Details</CardTitle>
          <CardDescription>
            Founded in {selectedCompany.founded} • {selectedCompany.headquarters.city}, {selectedCompany.headquarters.province}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Annual Revenue</p>
                    <p className="text-2xl font-bold">${(selectedCompany.annualRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-100">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Profit Margin</p>
                    <p className="text-2xl font-bold">{selectedCompany.financialMetrics.profitMargin.toFixed(1)}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-100">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Employees</p>
                    <p className="text-2xl font-bold">{selectedCompany.employees.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 border-amber-100">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-600">Departments</p>
                    <p className="text-2xl font-bold">{selectedCompany.departmentMetrics.length}</p>
                  </div>
                  <PieChart className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white border shadow-sm w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview">
                Overview
              </TabsTrigger>
              <TabsTrigger value="financials">
                Financials
              </TabsTrigger>
              <TabsTrigger value="departments">
                Departments
              </TabsTrigger>
              <TabsTrigger value="savings">
                Savings
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="overview">
                <CompanyOverview company={selectedCompany} />
              </TabsContent>
              
              <TabsContent value="financials">
                <CompanyFinancials company={selectedCompany} />
              </TabsContent>
              
              <TabsContent value="departments">
                <CompanyDepartments company={selectedCompany} />
              </TabsContent>
              
              <TabsContent value="savings">
                <CompanySavings company={selectedCompany} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailPage;

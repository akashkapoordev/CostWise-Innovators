
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCompanies } from '@/contexts/CompanyContext';
import { ArrowLeft, Building, PlusCircle } from 'lucide-react';
import CompanyComparison from '@/components/companies/CompanyComparison';
import { CompanyData } from '@/types/company';
import { toast } from 'sonner';

const CompanyComparisonPage: React.FC = () => {
  const { user } = useAuth();
  const { companies, selectedCompany, competitors, compareCompanies } = useCompanies();
  const [comparisonData, setComparisonData] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadComparisonData = async () => {
      if (!selectedCompany) return;
      
      setLoading(true);
      try {
        // Start with the user's company
        const initialComparisonData = [selectedCompany];
        
        // Add top 2 competitors by revenue
        const topCompetitors = [...competitors]
          .sort((a, b) => b.annualRevenue - a.annualRevenue)
          .slice(0, 2);
        
        if (topCompetitors.length > 0) {
          initialComparisonData.push(...topCompetitors);
        }
        
        setComparisonData(initialComparisonData);
      } catch (error) {
        console.error("Error loading comparison data:", error);
        toast.error("Failed to load comparison data");
      } finally {
        setLoading(false);
      }
    };
    
    loadComparisonData();
  }, [selectedCompany, competitors]);

  // Go back to company detail
  const handleBack = () => {
    if (user?.companyId) {
      navigate(`/dashboard-layout/company/${user.companyId}`);
    } else {
      navigate('/dashboard-layout/companies');
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Company Comparison</h1>
            <p className="text-muted-foreground">
              {selectedCompany ? `Comparing ${selectedCompany.name} with competitors` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
      
      {loading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-64">
              <p>Loading comparison data...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {comparisonData.length > 0 ? (
            <CompanyComparison companies={comparisonData} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Companies to Compare</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No company data available for comparison.</p>
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="mt-4"
                >
                  <Building className="h-4 w-4 mr-2" />
                  View Company Details
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default CompanyComparisonPage;

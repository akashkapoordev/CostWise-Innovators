
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Building2, Lock } from 'lucide-react';
import { useCompanies } from '@/contexts/CompanyContext';

const CompanyLogin = () => {
  const [companyId, setCompanyId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginAsCompany } = useAuth();
  const { setIsDemoMode } = useCompanies();
  const navigate = useNavigate();

  const handleCompanyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (companyId && password) {
        // Ensure demo mode is off when logging in as a real company
        setIsDemoMode(false);
        
        // Use the specialized loginAsCompany function for company credentials
        const success = await loginAsCompany(companyId, password);
        
        if (success) {
          // Navigate directly to company detail page
          navigate(`/dashboard-layout/company/${companyId}`);
        }
      } else {
        toast.error('Please enter both company ID and password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleCompanyLogin} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="companyId" className="text-sm font-medium">Company ID</label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            id="companyId" 
            type="text" 
            className="pl-10"
            placeholder="your-company-id" 
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="companyPassword" className="text-sm font-medium">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            id="companyPassword" 
            type="password" 
            className="pl-10"
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-costwise-blue hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Access Company Dashboard'}
      </Button>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Need company access? Contact your administrator</p>
      </div>
    </form>
  );
};

export default CompanyLogin;

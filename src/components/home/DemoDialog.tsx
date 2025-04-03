
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCompanies } from '@/contexts/CompanyContext';
import { toast } from 'sonner';
import DemoCompanyCard from './DemoCompanyCard';
import PricingCards from './PricingCards';

interface DemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoDialog: React.FC<DemoDialogProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { selectCompany } = useCompanies();

  const handleDemoAccess = async (companyId: string) => {
    try {
      console.log(`Starting demo access for company ID: ${companyId}`);
      
      // Show loading toast first
      toast.loading('Loading demo data...', { id: 'demo-loading' });
      
      // Select the demo company with demo flag
      await selectCompany(companyId, true);
      
      // Navigate to dashboard
      navigate('/dashboard', { 
        state: { 
          isDemoAccess: true,
          demoCompanyId: companyId
        } 
      });
      
      // Close the dialog after navigation is initiated
      onOpenChange(false);
      
      // Dismiss loading toast and show success toast
      setTimeout(() => {
        toast.dismiss('demo-loading');
        toast.success('Welcome to the CostWise Demo!');
      }, 500);
    } catch (error) {
      console.error('Error accessing demo:', error);
      toast.error('Error loading demo data. Please try again.');
    }
  };

  const demoCompanies = [
    {
      id: '1',
      title: 'Maple Tech Solutions',
      description: 'Technology company specializing in AI',
      badgeText: 'Demo 1',
      stats: [
        { label: '450 employees' },
        { label: '$75M annual revenue' }
      ]
    },
    {
      id: '2',
      title: 'Northern Resources Inc.',
      description: 'Energy sector with focus on renewables',
      badgeText: 'Demo 2',
      stats: [
        { label: '1,200 employees' },
        { label: '$250M annual revenue' }
      ]
    },
    {
      id: '3',
      title: 'Atlantic Shipping Co.',
      description: 'Shipping and logistics company',
      badgeText: 'Demo 3',
      stats: [
        { label: '850 employees' },
        { label: '$120M annual revenue' }
      ]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Try CostWise Demo</DialogTitle>
          <DialogDescription>
            Choose a demo company to explore CostWise features
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-2">
          {demoCompanies.map(company => (
            <DemoCompanyCard
              key={company.id}
              id={company.id}
              title={company.title}
              description={company.description}
              badgeText={company.badgeText}
              stats={company.stats}
              onAccess={handleDemoAccess}
            />
          ))}
          
          <PricingCards />
          
          <p className="text-xs text-center text-muted-foreground">
            These are demo companies with sample data. No real data is used.
          </p>
        </div>
        
        <DialogFooter className="flex sm:justify-start">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DemoDialog;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface DashboardActionsProps {
  isLoading: boolean;
  handleRefresh: () => void;
  handleExport: () => void;
}

const DashboardActions: React.FC<DashboardActionsProps> = ({
  isLoading,
  handleRefresh,
  handleExport
}) => {
  return (
    <div className="flex gap-2 ml-auto">
      <Button 
        variant="outline" 
        className="gap-2" 
        onClick={handleRefresh}
        disabled={isLoading}
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        <span className="hidden sm:inline">
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 text-xs"
        onClick={handleExport}
      >
        <Download className="h-3 w-3 mr-1" />
        Export
      </Button>
    </div>
  );
};

export default DashboardActions;

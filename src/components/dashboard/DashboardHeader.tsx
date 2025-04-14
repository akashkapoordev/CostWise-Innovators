
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Bell, Settings, User, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { alerts } from '@/services/mockData';

interface CompanyOption {
  id: string;
  name: string;
  logo: string;
}

interface DashboardHeaderProps {
  selectedCompany: CompanyOption;
  companies: CompanyOption[];
  onCompanyChange: (companyId: string) => void;
  goToFullDashboard: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedCompany,
  companies,
  onCompanyChange,
  goToFullDashboard,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const unreadAlerts = alerts.filter(alert => !alert.isRead).length;

  const handleNotificationsClick = () => {
    toast("Notifications", {
      description: (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {alerts.slice(0, 3).map((alert) => (
            <div 
              key={alert.id} 
              className={`p-2 rounded-md text-sm ${
                alert.type === 'warning' 
                  ? 'bg-amber-50 border-l-2 border-amber-500' 
                  : alert.type === 'error'
                  ? 'bg-red-50 border-l-2 border-red-500'
                  : alert.type === 'success'
                  ? 'bg-green-50 border-l-2 border-green-500'
                  : 'bg-blue-50 border-l-2 border-blue-500'
              } ${!alert.isRead ? 'font-medium' : ''}`}
            >
              <div className="font-medium">{alert.title}</div>
              <div>{alert.message}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(alert.date).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ),
    });
  };

  const openSettings = () => {
    toast("Settings", {
      description: "Opening settings panel"
    });
  };

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
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
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-700 bg-gray-100 py-2 px-3 rounded-full">
            <User size={16} className="text-costwise-blue" />
            <span>Welcome, {user?.name || 'User'}</span>
          </div>
          <Button 
            variant="outline-primary"
            onClick={goToFullDashboard}
            className="text-sm font-medium hidden sm:flex"
            size="sm"
          >
            Full Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full relative bg-white"
              onClick={handleNotificationsClick}
            >
              <Bell size={20} />
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-costwise-red text-[10px] text-white">{unreadAlerts}</span>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full bg-white"
              onClick={openSettings}
            >
              <Settings size={20} />
            </Button>
            <Button 
              variant="outline-primary" 
              onClick={logout}
              className="text-sm font-medium"
              size="sm"
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

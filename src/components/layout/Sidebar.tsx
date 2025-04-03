
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

type SidebarProps = {
  open: boolean;
  navItems: NavItem[];
  isActive: (href: string) => boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ open, navItems, isActive }) => {
  const { user } = useAuth();
  const isRealCompany = user?.companyId && parseInt(user.companyId) >= 100;

  return (
    <aside
      className={cn(
        "bg-white h-screen shadow-md transition-all duration-300 overflow-hidden fixed md:relative z-10 flex flex-col",
        open ? "w-64" : "w-0 md:w-20"
      )}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-center mb-8 h-16">
          {open ? (
            <h1 className="text-xl font-bold text-costwise-blue">CostWise</h1>
          ) : (
            <span className="text-xl font-bold text-costwise-blue md:block hidden">CW</span>
          )}
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center py-3 px-4 rounded-md transition-colors",
                  active 
                    ? "bg-costwise-light-blue text-costwise-blue font-medium" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5" />
                {open && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
        
        {!isRealCompany && open && (
          <div className="mt-auto mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-1">Demo Account</h3>
            <p className="text-sm text-blue-600 mb-3">Upgrade to access premium features and real company data</p>
            <Button 
              variant="default" 
              size="sm" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/subscription'}
            >
              Upgrade Now
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

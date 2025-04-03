
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useMobile } from '@/hooks/useMobile';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Wallet, TrendingDown, BarChart3, Network, Upload } from 'lucide-react';

const DashboardLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobile();
  const [open, setOpen] = useState(!isMobile);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setOpen(!open);
  };

  const navItems = [
    { 
      name: 'Expenses', 
      href: '/dashboard-layout/expenses', 
      icon: Wallet 
    },
    { 
      name: 'Cost Analysis', 
      href: '/dashboard-layout/cost-analysis', 
      icon: TrendingDown 
    },
    { 
      name: 'Budget Analysis', 
      href: '/dashboard-layout/budget-analysis', 
      icon: BarChart3 
    },
    { 
      name: 'Departments', 
      href: '/dashboard-layout/departments', 
      icon: Network 
    },
    { 
      name: 'Data Import', 
      href: '/dashboard-layout/data-import', 
      icon: Upload
    }
  ];

  const isActive = (href: string) => {
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onSidebarToggle={handleSidebarToggle} />
      
      <div className="flex flex-1">
        <Sidebar 
          open={open}
          navItems={navItems}
          isActive={isActive}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

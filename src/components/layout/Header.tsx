
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, User, Bell, Search, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { alerts } from '@/services/mockData';
import { toast } from 'sonner';

type HeaderProps = {
  onSidebarToggle: () => void;
};

export const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadAlerts = alerts.filter(alert => !alert.isRead).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isRealCompany = user?.companyId && parseInt(user.companyId) >= 100;

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

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative hidden md:flex items-center">
          <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 pl-9 pr-4 py-2 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-costwise-blue focus:border-transparent"
          />
        </div>
        
        {isRealCompany && (
          <Badge className="ml-4 bg-green-500 hover:bg-green-600" variant="secondary">
            Premium Account
          </Badge>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={handleNotificationsClick}
        >
          <Bell className="h-5 w-5" />
          {unreadAlerts > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-costwise-red rounded-full" />
          )}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                <AvatarFallback className="bg-costwise-blue text-white">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start p-2 mb-2 border-b">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                <AvatarFallback className="bg-costwise-blue text-white">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{user?.name || 'User'}</p>
                <p className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</p>
                {isRealCompany && (
                  <Badge variant="outline" className="mt-1 text-xs bg-green-100 border-green-300 text-green-800">
                    Premium
                  </Badge>
                )}
              </div>
            </div>
            
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

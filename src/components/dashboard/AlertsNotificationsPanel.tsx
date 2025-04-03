import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Check, Clock, AlertTriangle, Info, X } from 'lucide-react';
import { alerts as initialAlerts, Alert as AlertType } from '@/services/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

interface AlertsNotificationsPanelProps {
  className?: string;
}

const AlertsNotificationsPanel: React.FC<AlertsNotificationsPanelProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [notificationSettings, setNotificationSettings] = useState({
    budgetAlerts: true,
    costIncreaseAlerts: true,
    savingsOpportunities: true,
    systemUpdates: false,
    emailNotifications: true,
    pushNotifications: false,
    dailyDigest: true,
    weeklyReport: true
  });
  const [alerts, setAlerts] = useState<AlertType[]>(initialAlerts);

  const handleToggleChange = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  // Filter alerts based on the active tab
  const filteredAlerts = alerts.filter(alert => {
    if (activeTab === 'all') return true;
    return alert.type === activeTab;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };
  
  // Function to toggle read/unread status
  const toggleReadStatus = (alertId: string) => {
    const updatedAlerts = alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: !alert.isRead } : alert
    );
    
    setAlerts(updatedAlerts);
    
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
      toast(`Alert marked as ${alert.isRead ? 'unread' : 'read'}`);
    }
  };

  // Function to save notification settings
  const saveSettings = () => {
    toast('Notification settings saved successfully');
  };

  // Function to reset notification settings
  const resetSettings = () => {
    setNotificationSettings({
      budgetAlerts: true,
      costIncreaseAlerts: true,
      savingsOpportunities: true,
      systemUpdates: false,
      emailNotifications: true,
      pushNotifications: false,
      dailyDigest: true,
      weeklyReport: true
    });
    toast('Notification settings reset to default');
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alerts & Notifications
        </CardTitle>
        <CardDescription>Configure and view system alerts and notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="alerts" className="flex-1">Active Alerts</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">Notification Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts" className="space-y-4 pt-4">
            <div className="flex gap-2 mb-4">
              <TabsList>
                <TabsTrigger 
                  value="all" 
                  onClick={() => setActiveTab('all')}
                  className={activeTab === 'all' ? 'bg-primary text-primary-foreground' : ''}
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="info" 
                  onClick={() => setActiveTab('info')}
                  className={activeTab === 'info' ? 'bg-blue-500 text-white' : ''}
                >
                  Info
                </TabsTrigger>
                <TabsTrigger 
                  value="warning" 
                  onClick={() => setActiveTab('warning')}
                  className={activeTab === 'warning' ? 'bg-amber-500 text-white' : ''}
                >
                  Warning
                </TabsTrigger>
                <TabsTrigger 
                  value="error" 
                  onClick={() => setActiveTab('error')}
                  className={activeTab === 'error' ? 'bg-red-500 text-white' : ''}
                >
                  Error
                </TabsTrigger>
                <TabsTrigger 
                  value="success" 
                  onClick={() => setActiveTab('success')}
                  className={activeTab === 'success' ? 'bg-green-500 text-white' : ''}
                >
                  Success
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto space-y-3">
              {filteredAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-md text-sm border-l-4 ${
                    alert.type === 'warning' 
                      ? 'bg-amber-50 border-amber-500' 
                      : alert.type === 'error'
                      ? 'bg-red-50 border-red-500'
                      : alert.type === 'success'
                      ? 'bg-green-50 border-green-500'
                      : 'bg-blue-50 border-blue-500'
                  } ${!alert.isRead ? 'font-medium' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      {getAlertIcon(alert.type)}
                      <div>
                        <div className="font-medium">{alert.title}</div>
                        <div>{alert.message}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.date).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleReadStatus(alert.id)}
                    >
                      Mark as {alert.isRead ? 'unread' : 'read'}
                    </Button>
                    {alert.actionRequired && (
                      <Badge variant="outline" className="bg-costwise-blue text-white">
                        Action Required
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Alert Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 py-1">Budget</Badge>
                      <span className="text-sm">Budget threshold alerts</span>
                    </div>
                    <Switch 
                      checked={notificationSettings.budgetAlerts} 
                      onCheckedChange={() => handleToggleChange('budgetAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-100 text-red-800 py-1">Cost</Badge>
                      <span className="text-sm">Sudden cost increase alerts</span>
                    </div>
                    <Switch 
                      checked={notificationSettings.costIncreaseAlerts} 
                      onCheckedChange={() => handleToggleChange('costIncreaseAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800 py-1">Savings</Badge>
                      <span className="text-sm">Savings opportunity alerts</span>
                    </div>
                    <Switch 
                      checked={notificationSettings.savingsOpportunities} 
                      onCheckedChange={() => handleToggleChange('savingsOpportunities')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 py-1">System</Badge>
                      <span className="text-sm">System update notifications</span>
                    </div>
                    <Switch 
                      checked={notificationSettings.systemUpdates} 
                      onCheckedChange={() => handleToggleChange('systemUpdates')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">Notification Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email notifications</span>
                    <Switch 
                      checked={notificationSettings.emailNotifications} 
                      onCheckedChange={() => handleToggleChange('emailNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push notifications</span>
                    <Switch 
                      checked={notificationSettings.pushNotifications} 
                      onCheckedChange={() => handleToggleChange('pushNotifications')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">Summary Reports</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily digest</span>
                    <Switch 
                      checked={notificationSettings.dailyDigest} 
                      onCheckedChange={() => handleToggleChange('dailyDigest')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weekly summary report</span>
                    <Switch 
                      checked={notificationSettings.weeklyReport} 
                      onCheckedChange={() => handleToggleChange('weeklyReport')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={resetSettings}>Reset to Default</Button>
                <Button onClick={saveSettings}>Save Settings</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AlertsNotificationsPanel;

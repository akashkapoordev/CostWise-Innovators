
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { departments } from '@/services/mockData';
import DepartmentSpendTable from '@/components/dashboard/DepartmentSpendTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const DepartmentsPage = () => {
  // Calculate department statistics
  const totalDepartments = departments.length;
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
  const totalSpend = departments.reduce((sum, dept) => sum + dept.actualSpend, 0);
  const overBudgetCount = departments.filter(dept => dept.actualSpend > dept.budget).length;
  
  // Get colors for departments
  const getDepartmentColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-amber-100 text-amber-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-cyan-100 text-cyan-800',
      'bg-rose-100 text-rose-800'
    ];
    return colors[index % colors.length];
  };

  // Function to get manager initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-costwise-darkblue">Departments</h1>
        <p className="text-muted-foreground">
          Manage departments, track their budgets, and monitor spending.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalDepartments}</div>
            <p className="text-sm text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${totalBudget.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Allocated across departments</p>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${totalSpend.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              {Math.round((totalSpend / totalBudget) * 100)}% of total budget
            </p>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Over Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-costwise-red">
              {overBudgetCount}
            </div>
            <p className="text-sm text-muted-foreground">
              Departments exceeding budget
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="bg-white border shadow-sm mb-6">
          <TabsTrigger value="table" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
            Table View
          </TabsTrigger>
          <TabsTrigger value="cards" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
            Card View
          </TabsTrigger>
          <TabsTrigger value="managers" className="data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
            Department Managers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="table" className="animate-fade-in">
          <DepartmentSpendTable 
            title="Department Spending" 
            description="Comprehensive view of all department budgets and actual spending"
            className="border-none shadow-md"
          />
        </TabsContent>
        
        <TabsContent value="cards" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => {
              const variance = dept.actualSpend - dept.budget;
              const percentUsed = Math.round((dept.actualSpend / dept.budget) * 100);
              
              return (
                <Card key={dept.id} className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${dept.actualSpend > dept.budget ? 'bg-costwise-red' : 'bg-costwise-green'}`}></span>
                        <CardTitle className="text-base">{dept.name}</CardTitle>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDepartmentColor(index)}`}>
                        {dept.id}
                      </span>
                    </div>
                    <CardDescription>Manager: {dept.managerName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Budget</p>
                          <p className="text-lg font-medium">${dept.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Actual</p>
                          <p className="text-lg font-medium">${dept.actualSpend.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Budget Used</span>
                          <span className={`text-sm font-medium ${percentUsed > 100 ? 'text-costwise-red' : ''}`}>
                            {percentUsed}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              percentUsed > 100 ? 'bg-costwise-red' : 'bg-costwise-green'
                            }`}
                            style={{ width: `${Math.min(percentUsed, 100)}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Variance</p>
                        <p className={`text-sm font-medium ${variance > 0 ? 'text-costwise-red' : 'text-costwise-green'}`}>
                          {variance > 0 ? '+' : ''}${Math.abs(variance).toLocaleString()}
                          {' '}
                          ({((variance / dept.budget) * 100).toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="managers" className="animate-fade-in">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Department Managers</CardTitle>
              <CardDescription>Contact information for all department heads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept, index) => (
                  <div key={dept.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://i.pravatar.cc/100?u=${dept.id}`} alt={dept.managerName} />
                      <AvatarFallback className={getDepartmentColor(index)}>
                        {getInitials(dept.managerName)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <p className="font-medium">{dept.managerName}</p>
                      <p className="text-sm text-muted-foreground">Manager, {dept.name}</p>
                      <div className="mt-2 flex items-center text-sm">
                        <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <a href={`mailto:${dept.managerName.toLowerCase().replace(' ', '.')}@costwise.com`} className="text-costwise-blue hover:underline">
                          {dept.managerName.toLowerCase().replace(' ', '.')}@costwise.com
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartmentsPage;

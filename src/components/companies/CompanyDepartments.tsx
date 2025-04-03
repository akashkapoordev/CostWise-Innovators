
import React from 'react';
import { CompanyData, DepartmentMetric } from '@/types/company';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

interface CompanyDepartmentsProps {
  company: CompanyData;
}

const CompanyDepartments: React.FC<CompanyDepartmentsProps> = ({ company }) => {
  const { departmentMetrics } = company;
  
  // Sort departments by budget size for display
  const sortedDepartments = [...departmentMetrics].sort((a, b) => b.budget - a.budget);
  
  // Calculate budget utilization
  const departmentBudgetData = departmentMetrics.map(dept => ({
    name: dept.name,
    budget: dept.budget / 1000,  // Convert to thousands
    actual: dept.actualSpend / 1000,
    utilization: (dept.actualSpend / dept.budget) * 100
  }));
  
  // Data for pie chart
  const departmentSizeData = departmentMetrics.map(dept => ({
    name: dept.name,
    value: dept.headcount
  }));
  
  // Data for efficiency chart
  const efficiencyData = departmentMetrics.map(dept => ({
    name: dept.name,
    efficiency: dept.efficiency,
    projects: dept.projectsCompleted
  }));
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  
  // Get status color based on budget utilization
  const getUtilizationColor = (utilization: number) => {
    if (utilization > 110) return 'text-red-600';
    if (utilization > 100) return 'text-amber-600';
    if (utilization > 90) return 'text-green-600';
    return 'text-blue-600';
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {sortedDepartments.map((dept, i) => {
                const utilization = (dept.actualSpend / dept.budget) * 100;
                return (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{dept.name}</span>
                      <span className={`text-sm font-medium ${getUtilizationColor(utilization)}`}>
                        {utilization.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={utilization} 
                        className="h-2" 
                        indicatorClassName={
                          utilization > 110 ? 'bg-red-600' : 
                          utilization > 100 ? 'bg-amber-500' : 
                          utilization > 90 ? 'bg-green-500' : 
                          'bg-blue-600'
                        }
                      />
                      <span className="text-xs text-muted-foreground min-w-[90px] text-right">
                        ${(dept.actualSpend / 1000).toFixed(0)}k / ${(dept.budget / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget vs. Actual Spending (in $k)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={{
                  budget: { label: "Budget", color: "rgba(59, 130, 246, 0.7)" },
                  actual: { label: "Actual", color: "rgba(239, 68, 68, 0.7)" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={departmentBudgetData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" tickFormatter={(value) => `$${value}k`} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="budget" fill="var(--color-budget)" name="Budget" />
                    <Bar dataKey="actual" fill="var(--color-actual)" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Headcount Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentSizeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {departmentSizeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} employees`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Headcount</TableHead>
                <TableHead>Projects Completed</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead className="text-right">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDepartments.map((dept, i) => {
                const variance = dept.actualSpend - dept.budget;
                const variancePercent = (variance / dept.budget) * 100;
                
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    <TableCell>{dept.headcount}</TableCell>
                    <TableCell>{dept.projectsCompleted}</TableCell>
                    <TableCell>{dept.efficiency.toFixed(1)}%</TableCell>
                    <TableCell>${(dept.budget / 1000).toFixed(0)}k</TableCell>
                    <TableCell>${(dept.actualSpend / 1000).toFixed(0)}k</TableCell>
                    <TableCell className={`text-right ${variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {variance > 0 ? '+' : ''}{(variance / 1000).toFixed(0)}k ({variancePercent.toFixed(1)}%)
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Department Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer 
              config={{
                efficiency: { label: "Efficiency", color: "rgba(59, 130, 246, 0.7)" },
                projects: { label: "Projects", color: "rgba(34, 197, 94, 0.7)" }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={efficiencyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" label={{ value: 'Efficiency %', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Projects Completed', angle: 90, position: 'insideRight' }} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="efficiency" fill="var(--color-efficiency)" name="Efficiency %" />
                  <Bar yAxisId="right" dataKey="projects" fill="var(--color-projects)" name="Projects Completed" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDepartments;

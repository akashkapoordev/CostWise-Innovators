
import React from 'react';
import { CompanyData } from '@/types/company';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

interface CompanyFinancialsProps {
  company: CompanyData;
}

const CompanyFinancials: React.FC<CompanyFinancialsProps> = ({ company }) => {
  const { financialMetrics, quarterlyData } = company;
  
  const revenueExpenseData = quarterlyData.map(q => ({
    name: q.quarter,
    revenue: q.revenue / 1000000, // Convert to millions for display
    expenses: q.expenses / 1000000,
    profit: q.profit / 1000000
  }));
  
  const profitMarginData = quarterlyData.map(q => ({
    name: q.quarter,
    value: ((q.revenue - q.expenses) / q.revenue) * 100 // Calculate profit margin %
  }));
  
  const financialRatioData = [
    { name: 'Return on Equity', value: financialMetrics.returnOnEquity },
    { name: 'Return on Assets', value: financialMetrics.returnOnAssets },
    { name: 'Profit Margin', value: financialMetrics.profitMargin },
    { name: 'Debt-to-Equity', value: financialMetrics.debtToEquityRatio * 10 } // Scale up for visibility
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Revenue & Expenses (in $M)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer 
                config={{
                  revenue: { label: "Revenue", color: "rgba(59, 130, 246, 0.7)" },
                  expenses: { label: "Expenses", color: "rgba(239, 68, 68, 0.7)" },
                  profit: { label: "Profit", color: "rgba(34, 197, 94, 0.7)" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueExpenseData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}M`} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--color-revenue)" 
                      fill="var(--color-revenue)" 
                      stackId="1"
                      name="Revenue"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="var(--color-expenses)" 
                      fill="var(--color-expenses)" 
                      stackId="2"
                      name="Expenses"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="var(--color-profit)" 
                      fill="var(--color-profit)" 
                      stackId="3"
                      name="Profit"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Profit Margin % Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer 
                config={{
                  value: { label: "Profit Margin", color: "rgba(34, 197, 94, 0.7)" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={profitMarginData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-value)" 
                      fill="var(--color-value)" 
                      name="Profit Margin"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Financial Metrics Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Revenue YTD</TableCell>
                  <TableCell className="text-right">${(financialMetrics.revenueYTD / 1000000).toFixed(1)}M</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Expenses YTD</TableCell>
                  <TableCell className="text-right">${(financialMetrics.expensesYTD / 1000000).toFixed(1)}M</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Profit YTD</TableCell>
                  <TableCell className="text-right">${((financialMetrics.revenueYTD - financialMetrics.expensesYTD) / 1000000).toFixed(1)}M</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Profit Margin</TableCell>
                  <TableCell className="text-right">{financialMetrics.profitMargin.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cash Flow</TableCell>
                  <TableCell className="text-right">${(financialMetrics.cashFlow / 1000000).toFixed(1)}M</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Return on Assets (ROA)</TableCell>
                  <TableCell className="text-right">{financialMetrics.returnOnAssets.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Return on Equity (ROE)</TableCell>
                  <TableCell className="text-right">{financialMetrics.returnOnEquity.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Debt to Equity Ratio</TableCell>
                  <TableCell className="text-right">{financialMetrics.debtToEquityRatio.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Current Ratio</TableCell>
                  <TableCell className="text-right">{financialMetrics.currentRatio.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Financial Ratios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={financialRatioData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {financialRatioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => {
                      if (typeof value === 'number') {
                        return `${value.toFixed(1)}%`;
                      }
                      return value;
                    }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyFinancials;

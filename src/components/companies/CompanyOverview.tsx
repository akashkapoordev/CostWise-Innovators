
import React from 'react';
import { CompanyData } from '@/types/company';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, DollarSign, Briefcase } from 'lucide-react';

interface CompanyOverviewProps {
  company: CompanyData;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({ company }) => {
  const quarterlyRevenueData = company.quarterlyData.map(q => ({
    name: q.quarter,
    revenue: q.revenue / 1000000, // Convert to millions
    expenses: q.expenses / 1000000,
    profit: q.profit / 1000000
  }));

  const marketShareData = company.quarterlyData.map(q => ({
    name: q.quarter,
    marketShare: q.marketShare,
    satisfaction: q.customerSatisfaction * 10 // Scale up for better visualization
  }));

  const handleWebsiteVisit = (website: string) => {
    // Ensure website has http/https prefix
    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Headquarters:</span> {company.headquarters.city}, {company.headquarters.province}, {company.headquarters.country}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Founded:</span> {company.founded}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Employees:</span> {company.employees.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Annual Revenue:</span> ${(company.annualRevenue / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">CEO:</span> {company.ceo}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Industry</h3>
                <Badge className="mb-3">{company.industry}</Badge>
                
                <h3 className="text-sm font-medium mt-4 mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{company.description}</p>
                
                <h3 className="text-sm font-medium mt-4 mb-2">Website</h3>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleWebsiteVisit(company.website);
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {company.website}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Profit Margin</p>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full mr-2">
                    <div 
                      className="h-2 bg-green-500 rounded-full" 
                      style={{ width: `${company.financialMetrics.profitMargin}%` }} 
                    />
                  </div>
                  <span className="text-sm font-medium">{company.financialMetrics.profitMargin.toFixed(1)}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Return on Equity</p>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full mr-2">
                    <div 
                      className="h-2 bg-blue-500 rounded-full" 
                      style={{ width: `${Math.min(company.financialMetrics.returnOnEquity, 100)}%` }} 
                    />
                  </div>
                  <span className="text-sm font-medium">{company.financialMetrics.returnOnEquity.toFixed(1)}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Debt to Equity</p>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full mr-2">
                    <div 
                      className="h-2 bg-yellow-500 rounded-full" 
                      style={{ width: `${Math.min(company.financialMetrics.debtToEquityRatio * 50, 100)}%` }} 
                    />
                  </div>
                  <span className="text-sm font-medium">{company.financialMetrics.debtToEquityRatio.toFixed(2)}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Current Ratio</p>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full mr-2">
                    <div 
                      className="h-2 bg-purple-500 rounded-full" 
                      style={{ width: `${Math.min(company.financialMetrics.currentRatio * 35, 100)}%` }} 
                    />
                  </div>
                  <span className="text-sm font-medium">{company.financialMetrics.currentRatio.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Performance</CardTitle>
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
                  <BarChart data={quarterlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}M`} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
                    <Bar dataKey="expenses" fill="var(--color-expenses)" name="Expenses" />
                    <Bar dataKey="profit" fill="var(--color-profit)" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Market Share & Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer 
                config={{
                  marketShare: { label: "Market Share", color: "rgba(59, 130, 246, 0.7)" },
                  satisfaction: { label: "Customer Satisfaction", color: "rgba(34, 197, 94, 0.7)" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketShareData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `${value}%`} />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="marketShare" 
                      stroke="var(--color-marketShare)" 
                      activeDot={{ r: 8 }} 
                      name="Market Share"
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="satisfaction" 
                      stroke="var(--color-satisfaction)" 
                      name="Customer Satisfaction (x10)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyOverview;

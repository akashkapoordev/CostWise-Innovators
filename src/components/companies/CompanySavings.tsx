
import React from 'react';
import { CompanyData, SavingsOpportunity } from '@/types/company';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';

interface CompanySavingsProps {
  company: CompanyData;
}

const CompanySavings: React.FC<CompanySavingsProps> = ({ company }) => {
  const { savingsOpportunities } = company;
  
  // Calculate ROI for each opportunity
  const opportunitiesWithROI = savingsOpportunities.map(opp => {
    const roi = (opp.potentialSavings / opp.implementationCost) - 1;
    return {
      ...opp,
      roi: roi * 100 // as percentage
    };
  }).sort((a, b) => b.roi - a.roi);
  
  // Data for savings and implementation cost chart
  const savingsData = opportunitiesWithROI.map(opp => ({
    name: opp.title.replace(' Optimization', ''),
    savings: opp.potentialSavings / 1000, // to thousands
    cost: opp.implementationCost / 1000,
    roi: opp.roi
  }));
  
  // Data for ROI vs time to implement scatter plot
  const roiVsTimeData = opportunitiesWithROI.map(opp => {
    const timeInMonths = parseInt(opp.timeToImplement.split(' ')[0]);
    return {
      name: opp.title.replace(' Optimization', ''),
      x: timeInMonths,
      y: opp.roi,
      z: opp.potentialSavings / 10000, // Size based on potential savings
      risk: opp.riskLevel,
      priority: opp.priority
    };
  });
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#22c55e';
      default: return '#3b82f6';
    }
  };
  
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'outline';
      default: return 'secondary';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Savings Opportunities Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opportunity</TableHead>
                <TableHead>Potential Savings</TableHead>
                <TableHead>Implementation Cost</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunitiesWithROI.map((opp, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{opp.title}</TableCell>
                  <TableCell>${opp.potentialSavings.toLocaleString()}</TableCell>
                  <TableCell>${opp.implementationCost.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">{opp.roi.toFixed(0)}%</TableCell>
                  <TableCell>{opp.timeToImplement}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`
                      ${opp.riskLevel === 'High' ? 'border-red-500 text-red-600 bg-red-50' : 
                        opp.riskLevel === 'Medium' ? 'border-amber-500 text-amber-600 bg-amber-50' : 
                        'border-green-500 text-green-600 bg-green-50'}
                    `}>
                      {opp.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(opp.priority)}>
                      {opp.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings vs. Implementation Cost (in $k)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={{
                  savings: { label: "Potential Savings", color: "rgba(34, 197, 94, 0.7)" },
                  cost: { label: "Implementation Cost", color: "rgba(239, 68, 68, 0.7)" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={savingsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}k`} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="savings" fill="var(--color-savings)" name="Potential Savings" />
                    <Bar dataKey="cost" fill="var(--color-cost)" name="Implementation Cost" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ROI vs. Implementation Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name="Time" 
                      unit=" months" 
                      label={{ value: 'Implementation Time (months)', position: 'bottom', offset: 0 }} 
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name="ROI" 
                      unit="%" 
                      label={{ value: 'ROI %', angle: -90, position: 'insideLeft' }} 
                    />
                    <ZAxis type="number" dataKey="z" range={[60, 120]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={
                      (props) => {
                        if (!props.active || !props.payload || props.payload.length === 0) {
                          return null;
                        }
                        const data = props.payload[0].payload;
                        return (
                          <div className="bg-white p-2 border rounded shadow-sm">
                            <p className="font-medium">{data.name}</p>
                            <p>ROI: {data.y.toFixed(0)}%</p>
                            <p>Time: {data.x} months</p>
                            <p>Risk Level: {data.risk}</p>
                            <p>Priority: {data.priority}</p>
                            <p>Savings: ${(data.z * 10000).toLocaleString()}</p>
                          </div>
                        );
                      }
                    } />
                    <Scatter name="Opportunities" data={roiVsTimeData}>
                      {
                        roiVsTimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getRiskColor(entry.risk)} />
                        ))
                      }
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="flex justify-around mt-4">
              <div className="flex items-center">
                <span className="w-3 h-3 inline-block bg-red-500 rounded-full mr-1"></span>
                <span className="text-xs">High Risk</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 inline-block bg-amber-500 rounded-full mr-1"></span>
                <span className="text-xs">Medium Risk</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 inline-block bg-green-500 rounded-full mr-1"></span>
                <span className="text-xs">Low Risk</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs">(Bubble size = Savings amount)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Opportunity Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunitiesWithROI.map((opp, i) => (
              <Card key={i} className="border shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{opp.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{opp.description}</p>
                    </div>
                    <Badge variant={getPriorityBadgeVariant(opp.priority)}>{opp.priority} Priority</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Potential Savings</p>
                      <p className="font-medium">${opp.potentialSavings.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Implementation Cost</p>
                      <p className="font-medium">${opp.implementationCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <p className="font-medium">{opp.roi.toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time to Implement</p>
                      <p className="font-medium">{opp.timeToImplement}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <p className="text-sm text-muted-foreground mr-2">Risk Level:</p>
                    <Badge variant="outline" className={`
                      ${opp.riskLevel === 'High' ? 'border-red-500 text-red-600 bg-red-50' : 
                        opp.riskLevel === 'Medium' ? 'border-amber-500 text-amber-600 bg-amber-50' : 
                        'border-green-500 text-green-600 bg-green-50'}
                    `}>
                      {opp.riskLevel}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySavings;

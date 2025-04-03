
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { costTrends } from '@/services/mockData';
import { useState, useEffect } from 'react';

interface CostTrendsChartProps {
  title: string;
  description?: string;
  className?: string;
}

const CostTrendsChart = ({
  title,
  description,
  className,
}: CostTrendsChartProps) => {
  const [timeRange, setTimeRange] = useState('all');
  const [filteredData, setFilteredData] = useState(costTrends);
  
  // Process data based on selected time range
  useEffect(() => {
    const getFilteredData = () => {
      switch (timeRange) {
        case '3m':
          return costTrends.slice(-9).slice(0, 3); // Last 3 months of actual data
        case '6m':
          return costTrends.slice(-12).slice(0, 6); // Last 6 months of actual data
        case 'ytd':
          return costTrends.filter(d => !d.isProjected); // All historical data
        case 'all':
        default:
          return costTrends; // All data including projections
      }
    };
    
    const newData = getFilteredData();
    console.log(`Filtered data for ${timeRange}:`, newData);
    setFilteredData(newData);
  }, [timeRange]);
  
  // Check if data exists
  if (!filteredData || filteredData.length === 0) {
    console.log("No data available for the chart");
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Create separate datasets for actual and projected data
  const actualData = filteredData.map(item => 
    item.isProjected ? { ...item, total: null } : item
  );
  
  const projectedData = filteredData.map(item => 
    item.isProjected ? item : { ...item, total: null }
  );

  console.log("Chart data:", { 
    raw: filteredData, 
    actualData, 
    projectedData, 
    timeRange,
    hasActualData: actualData.some(item => item.total !== null),
    hasProjectedData: projectedData.some(item => item.total !== null)
  });

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
          <ToggleGroupItem value="3m" size="sm">3M</ToggleGroupItem>
          <ToggleGroupItem value="6m" size="sm">6M</ToggleGroupItem>
          <ToggleGroupItem value="ytd" size="sm">YTD</ToggleGroupItem>
          <ToggleGroupItem value="all" size="sm">All</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`} 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Amount']}
                labelStyle={{ fontWeight: 'bold' }}
                contentStyle={{ 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                }}
              />
              
              {/* Actual data line */}
              <Line 
                type="monotone" 
                dataKey="total" 
                data={actualData}
                strokeWidth={2}
                stroke="#0EA5E9"
                dot={(props) => {
                  if (!props || props.payload?.total === null) return null;
                  return (
                    <circle 
                      cx={props.cx} 
                      cy={props.cy} 
                      r={4} 
                      fill="#0EA5E9" 
                    />
                  );
                }}
                activeDot={(props) => {
                  if (!props || props.payload?.total === null) return null;
                  return (
                    <circle 
                      cx={props.cx} 
                      cy={props.cy} 
                      r={6} 
                      fill="#0EA5E9" 
                      stroke="white" 
                      strokeWidth={2}
                    />
                  );
                }}
                connectNulls={false}
                name="Actual"
              />
              
              {/* Projected data line */}
              <Line 
                type="monotone" 
                dataKey="total" 
                data={projectedData}
                strokeWidth={2}
                stroke="#64748B"
                strokeDasharray="5 5"
                dot={(props) => {
                  if (!props || props.payload?.total === null) return null;
                  return (
                    <circle 
                      cx={props.cx} 
                      cy={props.cy} 
                      r={4} 
                      fill="#fff" 
                      stroke="#64748B" 
                      strokeWidth={2} 
                    />
                  );
                }}
                activeDot={(props) => {
                  if (!props || props.payload?.total === null) return null;
                  return (
                    <circle 
                      cx={props.cx} 
                      cy={props.cy} 
                      r={6} 
                      fill="#64748B" 
                      stroke="white" 
                      strokeWidth={2}
                    />
                  );
                }}
                connectNulls={false}
                name="Projected"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostTrendsChart;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ExpenseData } from '@/types/company';
import { categories } from '@/services/mockData';
import ForecastSummary from './ForecastSummary';
import KeyDriversFactors from './KeyDriversFactors';

interface CostForecastTabProps {
  data?: ExpenseData[];
}

const CostForecastTab: React.FC<CostForecastTabProps> = ({ data }) => {
  const [forecastPeriod, setForecastPeriod] = useState('6months');
  const [confidenceLevel, setConfidenceLevel] = useState('medium');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Generate forecast data
  const generateForecastData = () => {
    const currentDate = new Date();
    let data = [];
    
    // Historical data (past 6 months)
    for (let i = 5; i >= 0; i--) {
      const month = new Date(currentDate);
      month.setMonth(currentDate.getMonth() - i);
      
      data.push({
        date: month.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        actual: 450000 + Math.random() * 100000,
        forecast: null,
        upper: null,
        lower: null,
        isHistorical: true
      });
    }
    
    // Forecast data (future months)
    const forecastMonths = forecastPeriod === '3months' ? 3 : forecastPeriod === '6months' ? 6 : 12;
    const trend = forecastPeriod === '12months' ? 1.2 : 1.1; // Higher trend for longer forecast
    
    // Confidence interval ranges based on selected level
    const confidenceRange = 
      confidenceLevel === 'low' ? 0.15 : 
      confidenceLevel === 'medium' ? 0.10 : 0.05;
    
    const lastActual = data[data.length - 1].actual;
    
    for (let i = 1; i <= forecastMonths; i++) {
      const month = new Date(currentDate);
      month.setMonth(currentDate.getMonth() + i);
      
      const forecastBase = lastActual * Math.pow(trend, i / 12) * (1 + (Math.random() * 0.06 - 0.03));
      const upper = forecastBase * (1 + confidenceRange);
      const lower = forecastBase * (1 - confidenceRange);
      
      data.push({
        date: month.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        actual: null,
        forecast: forecastBase,
        upper: upper,
        lower: lower,
        isHistorical: false
      });
    }
    
    return data;
  };
  
  const forecastData = generateForecastData();
  
  // Format currency
  const formatCurrency = (value: number | null) => {
    if (value === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Forecast Period</label>
            <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="12months">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground">Confidence</label>
            <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Confidence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (85%)</SelectItem>
                <SelectItem value="medium">Medium (90%)</SelectItem>
                <SelectItem value="high">High (95%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h3 className="text-sm font-medium mb-4">Cost Forecast</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`}
                domain={[300000, 700000]}
              />
              <Tooltip 
                formatter={(value: number | null) => [value ? formatCurrency(value) : 'N/A', 'Amount']}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="upper" 
                name="Upper Bound" 
                stroke="transparent" 
                fill="#0EA5E9" 
                fillOpacity={0.1} 
              />
              <Area 
                type="monotone" 
                dataKey="lower" 
                name="Lower Bound" 
                stroke="transparent" 
                fill="#0EA5E9" 
                fillOpacity={0.1} 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                name="Actual Cost" 
                stroke="#64748b" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                name="Forecasted Cost" 
                stroke="#0EA5E9" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ForecastSummary forecastData={forecastData} forecastPeriod={forecastPeriod} formatCurrency={formatCurrency} />
        <KeyDriversFactors />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Forecast
        </Button>
      </div>
    </>
  );
};

export default CostForecastTab;

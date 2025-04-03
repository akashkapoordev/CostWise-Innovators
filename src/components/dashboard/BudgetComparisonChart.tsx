
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import { budgetVsActual } from '@/services/mockData';

interface BudgetComparisonProps {
  title: string;
  description?: string;
  className?: string;
}

const BudgetComparisonChart = ({
  title,
  description,
  className,
}: BudgetComparisonProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  
  // Process data based on selected department
  const processedData = selectedDepartment === 'All'
    ? budgetVsActual.reduce((acc, item) => {
        const existing = acc.find(x => x.category === item.category);
        if (existing) {
          existing.budgetAmount += item.budgetAmount;
          existing.actualAmount += item.actualAmount;
        } else {
          acc.push({
            category: item.category,
            budgetAmount: item.budgetAmount,
            actualAmount: item.actualAmount,
          });
        }
        return acc;
      }, [] as { category: string; budgetAmount: number; actualAmount: number }[])
    : budgetVsActual
        .filter(item => item.department === selectedDepartment)
        .map(item => ({
          category: item.category,
          budgetAmount: item.budgetAmount,
          actualAmount: item.actualAmount,
        }));

  // Calculate if the actual amount exceeds the budget for each category
  const dataWithStatus = processedData.map(item => ({
    ...item,
    status: item.actualAmount > item.budgetAmount ? 'over' : 'under'
  }));

  // Get unique departments for the select dropdown
  const uniqueDepartments = ['All', ...new Set(budgetVsActual.map(item => item.department))];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Select 
          value={selectedDepartment} 
          onValueChange={setSelectedDepartment}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {uniqueDepartments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataWithStatus}
              margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
              barGap={10}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#f0f0f0' }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`} 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelStyle={{ fontWeight: 'bold' }}
                contentStyle={{ 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => (
                  <span style={{ color: value === 'budgetAmount' ? '#64748B' : '#0EA5E9', fontSize: 12 }}>
                    {value === 'budgetAmount' ? 'Budget' : 'Actual'}
                  </span>
                )}
              />
              <Bar 
                dataKey="budgetAmount" 
                name="budgetAmount" 
                fill="#64748B" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="actualAmount" 
                name="actualAmount" 
                radius={[4, 4, 0, 0]}
              >
                {dataWithStatus.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.status === 'over' ? '#EF4444' : '#10B981'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetComparisonChart;

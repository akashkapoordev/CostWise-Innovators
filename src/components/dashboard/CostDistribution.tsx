
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { categories, departments } from '@/services/mockData';
import { useState } from 'react';

interface CostDistributionProps {
  title: string;
  description?: string;
  className?: string;
}

const CostDistribution = ({
  title,
  description,
  className,
}: CostDistributionProps) => {
  const [viewBy, setViewBy] = useState('department');
  
  const data = viewBy === 'department'
    ? departments.map((dept) => ({
        name: dept.name,
        value: dept.actualSpend,
      }))
    : categories.map((cat) => ({
        name: cat.name,
        value: cat.actualSpend,
      }));
  
  // Custom colors for the pie chart
  const COLORS = [
    '#0EA5E9', '#38BDF8', '#7DD3FC', '#BAE6FD', '#0284C7', 
    '#0369A1', '#075985', '#0C4A6E', '#082F49', '#164E63'
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Calculate total spend for percentage calculation
  const totalSpend = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Select value={viewBy} onValueChange={setViewBy}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="View by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="department">Department</SelectItem>
            <SelectItem value="category">Category</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `${formatCurrency(value)} (${((value / totalSpend) * 100).toFixed(1)}%)`,
                  'Amount'
                ]}
                contentStyle={{ 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                }}
              />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{ fontSize: '12px' }}
                formatter={(value, entry, index) => (
                  <span style={{ color: COLORS[index % COLORS.length], fontWeight: 500 }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostDistribution;

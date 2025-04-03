
import React from 'react';
import { CompanyData } from '@/types/company';
import { ChartContainer } from '@/components/ui/chart';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface RevenueChartProps {
  filteredCompanies: CompanyData[];
  getCompanyColor: (index: number) => string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ filteredCompanies, getCompanyColor }) => {
  const revenueComparisonData = filteredCompanies.length > 0 && filteredCompanies[0]?.quarterlyData ? 
    filteredCompanies[0]?.quarterlyData.map((_, qIndex) => {
      const quarterData: any = {
        name: filteredCompanies[0].quarterlyData[qIndex].quarter
      };
      
      filteredCompanies.forEach(company => {
        if (company.quarterlyData && company.quarterlyData[qIndex]) {
          quarterData[company.name] = company.quarterlyData[qIndex].revenue / 1000000; // Convert to millions
        }
      });
      
      return quarterData;
    }) : [];

  return (
    <div className="h-[400px] w-full">
      <ChartContainer config={{}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueComparisonData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis 
              tickFormatter={(value) => `$${value}M`} 
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip 
              formatter={(value: any) => [`$${value}M`, 'Revenue']} 
              labelFormatter={(label) => `Quarter: ${label}`}
            />
            <Legend wrapperStyle={{ paddingTop: 20 }} />
            {filteredCompanies.map((company, index) => (
              <Bar 
                key={company.id} 
                dataKey={company.name} 
                fill={getCompanyColor(index)} 
                name={company.name}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default RevenueChart;

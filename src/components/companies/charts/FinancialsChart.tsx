
import React from 'react';
import { CompanyData } from '@/types/company';
import { ChartContainer } from '@/components/ui/chart';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface FinancialsChartProps {
  filteredCompanies: CompanyData[];
  getCompanyColor: (index: number) => string;
}

const FinancialsChart: React.FC<FinancialsChartProps> = ({ filteredCompanies, getCompanyColor }) => {
  const getFinancialData = () => {
    const metrics = [
      { name: 'Profit Margin (%)', key: 'profitMargin' },
      { name: 'Return on Equity (%)', key: 'returnOnEquity' },
      { name: 'Return on Assets (%)', key: 'returnOnAssets' },
      { name: 'Debt to Equity Ratio', key: 'debtToEquityRatio' },
      { name: 'Current Ratio', key: 'currentRatio' }
    ];
    
    return metrics.map(m => {
      const data: any = { metric: m.name };
      
      filteredCompanies.forEach(company => {
        if (company.financialMetrics && company.financialMetrics[m.key as keyof typeof company.financialMetrics] !== undefined) {
          data[company.name] = company.financialMetrics[m.key as keyof typeof company.financialMetrics];
        }
      });
      
      return data;
    });
  };

  return (
    <div className="h-[400px] w-full">
      <ChartContainer config={{}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getFinancialData()}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis 
              type="category" 
              dataKey="metric" 
              tick={{ fontSize: 12 }} 
              width={140}
            />
            <Tooltip />
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

export default FinancialsChart;

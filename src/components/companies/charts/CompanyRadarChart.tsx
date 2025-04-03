
import React from 'react';
import { CompanyData } from '@/types/company';
import { ChartContainer } from '@/components/ui/chart';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ResponsiveContainer, Legend, Tooltip
} from 'recharts';

interface CompanyRadarChartProps {
  filteredCompanies: CompanyData[];
  getCompanyColor: (index: number) => string;
}

const CompanyRadarChart: React.FC<CompanyRadarChartProps> = ({ 
  filteredCompanies, 
  getCompanyColor 
}) => {
  const getRadarData = () => {
    if (filteredCompanies.length === 0) return [];
    
    // Normalize metrics to 0-100 scale for radar chart
    const normalizeValue = (value: number, max: number, min: number = 0) => {
      return ((value - min) / (max - min)) * 100;
    };
    
    const metrics = [
      {
        name: 'Revenue',
        key: 'annualRevenue',
        max: Math.max(...filteredCompanies.map(c => c.annualRevenue || 0))
      },
      {
        name: 'Profit Margin',
        key: 'profitMargin',
        max: Math.max(...filteredCompanies.map(c => (c.financialMetrics?.profitMargin || 0)))
      },
      {
        name: 'ROE',
        key: 'returnOnEquity',
        max: Math.max(...filteredCompanies.map(c => (c.financialMetrics?.returnOnEquity || 0)))
      },
      {
        name: 'Employees',
        key: 'employees',
        max: Math.max(...filteredCompanies.map(c => c.employees || 0))
      },
      {
        name: 'Market Share',
        key: 'marketShare',
        max: Math.max(...filteredCompanies.map(c => {
          const lastQuarter = c.quarterlyData?.[c.quarterlyData.length - 1];
          return lastQuarter?.marketShare || 0;
        }))
      }
    ];
    
    return filteredCompanies.map(company => {
      const lastQuarter = company.quarterlyData?.[company.quarterlyData.length - 1];
      
      const data: any = { 
        name: company.name,
        Revenue: normalizeValue(company.annualRevenue || 0, metrics[0].max || 1),
        'Profit Margin': normalizeValue(company.financialMetrics?.profitMargin || 0, metrics[1].max || 1),
        ROE: normalizeValue(company.financialMetrics?.returnOnEquity || 0, metrics[2].max || 1),
        Employees: normalizeValue(company.employees || 0, metrics[3].max || 1),
        'Market Share': normalizeValue(lastQuarter?.marketShare || 0, metrics[4].max || 1)
      };
      
      return data;
    });
  };

  return (
    <div className="h-[400px] w-full">
      <ChartContainer config={{}}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart 
            outerRadius={150} 
            data={getRadarData().length > 0 ? getRadarData()[0] : {}}
            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            {filteredCompanies.map((company, index) => (
              <Radar
                key={company.id}
                name={company.name}
                dataKey={company.name}
                stroke={getCompanyColor(index)}
                fill={getCompanyColor(index)}
                fillOpacity={0.6}
              />
            ))}
            <Legend wrapperStyle={{ paddingTop: 20 }} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="text-center text-sm text-muted-foreground mt-2">
        *All metrics normalized to 0-100 scale for comparison
      </div>
    </div>
  );
};

export default CompanyRadarChart;


import React from 'react';

interface CorrelationItem {
  name: string;
  strength: string;
  color: string;
  percentage: number;
}

const CostCorrelationAnalysis: React.FC = () => {
  const correlations: CorrelationItem[] = [
    {
      name: 'Marketing Spend vs. Revenue',
      strength: 'Strong Positive',
      color: 'text-costwise-green',
      percentage: 85
    },
    {
      name: 'IT Spend vs. Productivity',
      strength: 'Moderate Positive',
      color: 'text-costwise-blue',
      percentage: 65
    },
    {
      name: 'Admin Costs vs. Company Size',
      strength: 'Moderate Positive',
      color: 'text-costwise-blue',
      percentage: 60
    },
    {
      name: 'Training Costs vs. Turnover',
      strength: 'Strong Negative',
      color: 'text-costwise-red',
      percentage: 80
    }
  ];

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-sm font-medium mb-3">Cost Correlation Analysis</h3>
      <div className="space-y-3">
        {correlations.map((correlation, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm">
              <span>{correlation.name}</span>
              <span className={`font-medium ${correlation.color}`}>{correlation.strength}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full mt-1">
              <div 
                className={`h-2 ${correlation.color.replace('text-', 'bg-')} rounded-full`} 
                style={{ width: `${correlation.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostCorrelationAnalysis;

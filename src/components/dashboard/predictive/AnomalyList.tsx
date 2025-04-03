
import React from 'react';
import { Button } from '@/components/ui/button';

interface Anomaly {
  id: number;
  date: string;
  category: string;
  department: string;
  amount: number;
  expected: number;
  variance: number;
}

interface AnomalyListProps {
  anomalies: Anomaly[];
}

const AnomalyList: React.FC<AnomalyListProps> = ({ anomalies }) => {
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
    <div className="space-y-4">
      {anomalies.map(anomaly => (
        <div key={anomaly.id} className="border-b pb-4 last:border-0 last:pb-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{anomaly.category} Expense ({anomaly.department})</div>
              <div className="text-sm text-muted-foreground">{anomaly.date}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">{formatCurrency(anomaly.amount)}</div>
              <div className="text-sm text-red-600">+{anomaly.variance}% above expected</div>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="text-xs text-muted-foreground mb-1">Expected vs. Actual</div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-costwise-blue rounded-full" style={{ width: '100%' }}></div>
              <div className="h-2 bg-red-500 rounded-full mt-1" style={{ width: `${100 + anomaly.variance}%` }}></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Expected: {formatCurrency(anomaly.expected)}</span>
              <span>Actual: {formatCurrency(anomaly.amount)}</span>
            </div>
          </div>
          
          <div className="mt-3 flex gap-2">
            <Button variant="outline" size="sm">Investigate</Button>
            <Button variant="ghost" size="sm">Ignore</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnomalyList;

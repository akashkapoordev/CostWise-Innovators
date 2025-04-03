
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExpenseData } from '@/types/company';
import AnomalyList from './AnomalyList';
import AnomalySettings from './AnomalySettings';

interface AnomalyDetectionTabProps {
  data?: ExpenseData[];
}

const AnomalyDetectionTab: React.FC<AnomalyDetectionTabProps> = ({ data }) => {
  // Generate anomaly data
  const generateAnomalyData = () => {
    return [
      { id: 1, date: 'Mar 12, 2023', category: 'Technology', department: 'Engineering', amount: 28500, expected: 15000, variance: 90 },
      { id: 2, date: 'Apr 03, 2023', category: 'Marketing', department: 'Marketing', amount: 42000, expected: 30000, variance: 40 },
      { id: 3, date: 'May 17, 2023', category: 'Travel', department: 'Sales', amount: 18700, expected: 12000, variance: 55.8 },
      { id: 4, date: 'Jun 22, 2023', category: 'Consulting', department: 'Operations', amount: 35000, expected: 20000, variance: 75 },
    ];
  };
  
  const anomalyData = generateAnomalyData();
  
  return (
    <>
      <div className="border rounded-md p-4">
        <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Detected Cost Anomalies
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          The system has detected unusual spending patterns that deviate significantly from historical trends
        </p>
        
        <AnomalyList anomalies={anomalyData} />
      </div>
      
      <AnomalySettings />
    </>
  );
};

export default AnomalyDetectionTab;

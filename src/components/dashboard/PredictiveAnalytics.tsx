
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp } from 'lucide-react';
import { ExpenseData } from '@/types/company';
import CostForecastTab from '@/components/dashboard/predictive/CostForecastTab';
import AnomalyDetectionTab from '@/components/dashboard/predictive/AnomalyDetectionTab';
import AiInsightsTab from '@/components/dashboard/predictive/AiInsightsTab';

export interface PredictiveAnalyticsProps {
  data?: ExpenseData[];
  className?: string;
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ className, data }) => {
  const [activeTab, setActiveTab] = useState('forecast');
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Predictive Cost Analytics
        </CardTitle>
        <CardDescription>Forecast future costs and identify spending patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="forecast" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="forecast" className="flex-1">Cost Forecast</TabsTrigger>
            <TabsTrigger value="anomalies" className="flex-1">Anomaly Detection</TabsTrigger>
            <TabsTrigger value="insights" className="flex-1">AI Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="forecast" className="space-y-4 pt-4">
            <CostForecastTab data={data} />
          </TabsContent>
          
          <TabsContent value="anomalies" className="space-y-4 pt-4">
            <AnomalyDetectionTab data={data} />
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4 pt-4">
            <AiInsightsTab data={data} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PredictiveAnalytics;

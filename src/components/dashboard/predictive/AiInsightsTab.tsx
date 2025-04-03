
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { ExpenseData } from '@/types/company';
import InsightCard, { InsightType } from './InsightCard';
import CostCorrelationAnalysis from './CostCorrelationAnalysis';
import RecommendedActions, { ActionItem } from './RecommendedActions';

interface AiInsightsTabProps {
  data?: ExpenseData[];
}

const AiInsightsTab: React.FC<AiInsightsTabProps> = ({ data }) => {
  const insights = [
    {
      id: 1,
      type: 'pattern' as InsightType,
      title: 'Seasonal Spending Pattern Detected',
      description: 'Marketing expenses show consistent increases during Q2 and Q4 each year. Consider budget adjustments to account for this pattern.',
    },
    {
      id: 2,
      type: 'saving' as InsightType,
      title: 'Cost Saving Opportunity',
      description: 'Technology subscriptions show duplicate services with similar functionality. Potential annual savings of $42,500 by consolidating vendors.',
    },
    {
      id: 3,
      type: 'risk' as InsightType,
      title: 'Budget Risk Alert',
      description: 'Operations department is trending 15% above budget for Q3. At current pace, will exceed annual budget by $78,000.',
    },
    {
      id: 4,
      type: 'trend' as InsightType,
      title: 'Long-term Trend Analysis',
      description: 'Travel expenses have decreased 35% compared to pre-pandemic levels while productivity metrics remain stable. Consider maintaining hybrid approach.',
    }
  ];
  
  const recommendedActions: ActionItem[] = [
    {
      id: 1,
      description: 'Review and consolidate technology subscriptions to eliminate duplicative services',
      priority: 'high',
    },
    {
      id: 2,
      description: 'Implement budget controls for Operations department to address potential overrun',
      priority: 'high',
    },
    {
      id: 3,
      description: 'Adjust Q2 and Q4 Marketing budgets to account for recurring seasonal spending patterns',
      priority: 'medium',
    },
    {
      id: 4,
      description: 'Increase investment in employee training based on correlation with reduced turnover costs',
      priority: 'low',
    }
  ];
  
  return (
    <>
      <div className="border rounded-md p-4">
        <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          AI-Generated Insights
        </h3>
        
        <div className="space-y-4">
          {insights.map(insight => (
            <InsightCard 
              key={insight.id} 
              title={insight.title} 
              description={insight.description} 
              type={insight.type}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CostCorrelationAnalysis />
        <RecommendedActions 
          actions={recommendedActions}
          showViewAll={true}
          onViewAll={() => console.log('View all actions clicked')}
        />
      </div>
    </>
  );
};

export default AiInsightsTab;

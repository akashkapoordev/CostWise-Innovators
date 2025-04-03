
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { costSavingRecommendations, CostSavingRecommendation } from '@/services/mockData';
import { ChevronRight } from 'lucide-react';

interface SavingsOpportunitiesProps {
  title: string;
  description?: string;
  className?: string;
  limit?: number;
  recommendations?: CostSavingRecommendation[];
  showAll?: boolean;
}

const SavingsOpportunities = ({
  title,
  description,
  className,
  limit = 3,
  recommendations = costSavingRecommendations,
  showAll = false,
}: SavingsOpportunitiesProps) => {
  // Sort by estimated savings, highest first
  const sortedRecommendations = [...recommendations]
    .sort((a, b) => b.estimatedSavings - a.estimatedSavings)
    .slice(0, showAll ? recommendations.length : limit);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Get effort badge color
  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get impact badge color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'High':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-costwise-blue bg-opacity-10 text-costwise-blue';
      case 'Implemented':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedRecommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className={getEffortColor(rec.effort)}>
                      Effort: {rec.effort}
                    </Badge>
                    <Badge variant="outline" className={getImpactColor(rec.impact)}>
                      Impact: {rec.impact}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(rec.status)}>
                      {rec.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right min-w-[100px]">
                  <div className="text-costwise-green font-bold">
                    {formatCurrency(rec.estimatedSavings)}
                  </div>
                  <div className="text-xs text-muted-foreground">Est. savings</div>
                </div>
              </div>
            </div>
          ))}
          
          <Button variant="ghost" className="w-full mt-2 text-costwise-blue">
            View all opportunities
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsOpportunities;

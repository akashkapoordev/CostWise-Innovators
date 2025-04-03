
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export interface ActionItem {
  id: number | string;
  description: string;
  priority?: 'high' | 'medium' | 'low';
  status?: 'pending' | 'in-progress' | 'completed';
  onAction?: () => void;
  actionLabel?: string;
}

export interface RecommendedActionsProps {
  actions?: ActionItem[];
  title?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  className?: string;
  showNumbers?: boolean;
  maxItems?: number;
}

const RecommendedActions: React.FC<RecommendedActionsProps> = ({
  actions = [],
  title = 'Recommended Actions',
  showViewAll = false,
  onViewAll,
  className,
  showNumbers = true,
  maxItems
}) => {
  const displayActions = maxItems ? actions.slice(0, maxItems) : actions;
  
  // Get color based on priority
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className={cn("border rounded-md p-4", className)}>
      <h3 className="text-sm font-medium mb-3">{title}</h3>
      {displayActions.length > 0 ? (
        <ul className="space-y-2 text-sm">
          {displayActions.map((action, index) => (
            <li key={action.id} className="flex items-start gap-2">
              {showNumbers && (
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  getPriorityColor(action.priority)
                )}>
                  {typeof action.id === 'number' ? action.id : index + 1}
                </div>
              )}
              <div className="flex-1">
                <div>{action.description}</div>
                {action.onAction && action.actionLabel && (
                  <button 
                    onClick={action.onAction}
                    className="mt-1 text-xs text-primary hover:underline focus:outline-none"
                  >
                    {action.actionLabel}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No actions recommended at this time.</p>
      )}
      
      {showViewAll && actions.length > (maxItems || 0) && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-3 text-costwise-blue text-xs" 
          onClick={onViewAll}
        >
          View all actions
          <ChevronRight size={14} className="ml-1" />
        </Button>
      )}
    </div>
  );
};

export default RecommendedActions;

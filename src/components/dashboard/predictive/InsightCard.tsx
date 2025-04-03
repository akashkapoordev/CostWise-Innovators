
import React from 'react';
import { cn } from '@/lib/utils';

export type InsightType = 'pattern' | 'saving' | 'risk' | 'trend' | 'default';

export interface InsightCardProps {
  title: string;
  description: string;
  type?: InsightType;
  className?: string;
  titleColor?: string;
  icon?: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  showBorder?: boolean;
}

const getInsightStyle = (type: InsightType) => {
  switch (type) {
    case 'pattern':
      return {
        container: 'bg-costwise-blue bg-opacity-5 border-costwise-blue border-opacity-20',
        title: 'text-costwise-blue'
      };
    case 'saving':
      return {
        container: 'bg-green-50 border-green-200',
        title: 'text-green-700'
      };
    case 'risk':
      return {
        container: 'bg-amber-50 border-amber-200',
        title: 'text-amber-700'
      };
    case 'trend':
      return {
        container: 'bg-purple-50 border-purple-200',
        title: 'text-purple-700'
      };
    default:
      return {
        container: 'bg-blue-50 border-blue-200',
        title: 'text-blue-700'
      };
  }
};

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  description, 
  type = 'default',
  className,
  titleColor,
  icon,
  onAction,
  actionLabel,
  showBorder = true,
}) => {
  const styles = getInsightStyle(type);
  
  return (
    <div 
      className={cn(
        'rounded-md p-3', 
        showBorder ? 'border' : '',
        styles.container,
        className
      )}
    >
      <div className="flex items-start gap-2">
        {icon && (
          <div className="mt-0.5 flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <div className={cn('font-medium mb-1', titleColor || styles.title)}>
            {title}
          </div>
          <p className="text-sm text-gray-700">{description}</p>
          
          {onAction && actionLabel && (
            <button 
              onClick={onAction}
              className="mt-2 text-xs font-medium text-primary hover:underline focus:outline-none"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;

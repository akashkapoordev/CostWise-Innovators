
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  change,
  trend = 'neutral',
  description,
  className,
  valuePrefix = '',
  valueSuffix = '',
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">
              {valuePrefix}{typeof value === 'number' ? value.toLocaleString() : value}{valueSuffix}
            </h3>
            
            {(change !== undefined || description) && (
              <div className="flex items-center mt-1">
                {change !== undefined && (
                  <div 
                    className={cn(
                      "flex items-center text-xs font-medium mr-2",
                      trend === 'up' ? 'text-costwise-green' : trend === 'down' ? 'text-costwise-red' : 'text-muted-foreground'
                    )}
                  >
                    {trend === 'up' ? (
                      <ArrowUpIcon className="mr-1 h-3 w-3" />
                    ) : trend === 'down' ? (
                      <ArrowDownIcon className="mr-1 h-3 w-3" />
                    ) : null}
                    {Math.abs(change)}%
                  </div>
                )}
                {description && (
                  <p className="text-xs text-muted-foreground">{description}</p>
                )}
              </div>
            )}
          </div>
          <div className="p-2 rounded-full bg-primary/10">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;

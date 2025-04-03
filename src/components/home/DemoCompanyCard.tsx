
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface DemoCompanyCardProps {
  id: string;
  title: string;
  description: string;
  badgeText: string;
  stats: { label: string }[];
  onAccess: (id: string) => void;
}

const DemoCompanyCard: React.FC<DemoCompanyCardProps> = ({
  id,
  title,
  description,
  badgeText,
  stats,
  onAccess
}) => {
  return (
    <Card className="transition-all hover:shadow-lg hover:border-blue-300 relative overflow-hidden group">
      {/* Blue highlight effect on hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-lg pointer-events-none" />
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{badgeText}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <ul className="space-y-2">
          {stats.map((stat, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-sm">{stat.label}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full gap-2 bg-costwise-blue hover:bg-blue-700 transition-all"
          onClick={() => onAccess(id)}
        >
          Access Demo
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DemoCompanyCard;

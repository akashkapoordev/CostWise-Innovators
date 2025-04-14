
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
import { motion } from 'framer-motion';

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
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="transition-all hover:shadow-lg hover:border-costwise-blue relative overflow-hidden h-full flex flex-col">
        {/* Blue accent bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-costwise-blue" />
        
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{title}</CardTitle>
            <Badge className="bg-costwise-blue hover:bg-blue-600 text-white text-xs">{badgeText}</Badge>
          </div>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2 flex-grow">
          <ul className="space-y-1">
            {stats.map((stat, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                <span className="text-xs">{stat.label}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full gap-1"
            onClick={() => onAccess(id)}
            size="sm"
          >
            Access Demo
            <ArrowRight className="w-3 h-3" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DemoCompanyCard;

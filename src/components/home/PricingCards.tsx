
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingCards: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="text-center"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <h3 className="text-base font-semibold text-costwise-darkblue mb-4">Ready to get started with your own company?</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-blue-200 transition-all hover:shadow-lg h-full flex flex-col">
            <CardHeader className="pb-2 space-y-1">
              <CardTitle className="text-base">Standard Plan</CardTitle>
              <div className="flex items-end">
                <span className="text-xl font-bold">$499</span>
                <span className="text-xs text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <ul className="space-y-1 text-left">
                <li className="flex items-start">
                  <CheckIcon className="h-3 w-3 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs">Full cost analysis dashboard</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-3 w-3 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs">Up to 5 departments</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-3 w-3 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs">Basic AI recommendations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                size="sm"
                onClick={() => window.open('https://costwise.com/subscribe/standard', '_blank')}
              >
                Subscribe <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-costwise-blue transition-all hover:shadow-xl h-full flex flex-col">
            <CardHeader className="pb-2 bg-blue-50 rounded-t-lg space-y-1">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Enterprise Plan</CardTitle>
                <Badge className="bg-costwise-blue text-white text-xs">Popular</Badge>
              </div>
              <div className="flex items-end">
                <span className="text-xl font-bold">$1,299</span>
                <span className="text-xs text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <ul className="space-y-1 text-left">
                <li className="flex items-start">
                  <CheckIcon className="h-3 w-3 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs">Advanced cost analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-3 w-3 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs">Unlimited departments</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-3 w-3 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs">Advanced AI cost optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-3 w-3 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs">Dedicated support team</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                size="sm"
                onClick={() => window.open('https://costwise.com/subscribe/enterprise', '_blank')}
              >
                Subscribe <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PricingCards;

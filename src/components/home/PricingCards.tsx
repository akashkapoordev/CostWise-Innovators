
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

const PricingCards: React.FC = () => {
  return (
    <div className="text-center mt-6 pt-4 border-t border-gray-200">
      <h3 className="text-base font-semibold text-costwise-darkblue mb-4">Ready to get started with your own company?</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Standard Plan</CardTitle>
            <div className="flex items-end">
              <span className="text-2xl font-bold">$499</span>
              <span className="text-sm text-muted-foreground ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckIcon className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Full cost analysis dashboard</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Up to 5 departments</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Basic AI recommendations</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full border-costwise-blue text-costwise-blue"
              onClick={() => window.open('https://costwise.com/subscribe/standard', '_blank')}
            >
              Subscribe <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-costwise-blue">
          <CardHeader className="pb-2 bg-blue-50 rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Enterprise Plan</CardTitle>
              <Badge className="bg-costwise-blue">Popular</Badge>
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold">$1,299</span>
              <span className="text-sm text-muted-foreground ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckIcon className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Advanced cost analytics</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Unlimited departments</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Advanced AI cost optimization</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Dedicated support team</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-costwise-blue hover:bg-blue-700"
              onClick={() => window.open('https://costwise.com/subscribe/enterprise', '_blank')}
            >
              Subscribe <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PricingCards;

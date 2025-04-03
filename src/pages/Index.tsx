import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  ArrowRight, 
  LogIn, 
  Shield, 
  CheckCircle, 
  CreditCard, 
  BarChart3, 
  LightbulbIcon, 
  Coins, 
  TrendingDown,
  Zap,
  LineChart
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import DemoDialog from '@/components/home/DemoDialog';

const Index = () => {
  const [showDemoDialog, setShowDemoDialog] = useState(false);

  const handleTryDemo = () => {
    setShowDemoDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Gradient Background */}
      <div className="relative pt-24 pb-32 flex content-center items-center justify-center bg-gradient-to-r from-blue-600 to-costwise-blue overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png')] opacity-5 bg-center bg-no-repeat"></div>
        <div className="container max-w-6xl mx-auto px-4 z-10">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 px-4 ml-auto mr-auto text-center lg:text-left">
              <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
                Cut Your Cloud Costs by up to 65%
              </h1>
              <p className="text-xl mb-8 text-white/90">
                CostWise helps you analyze, optimize, and reduce your company's expenses 
                with powerful AI-driven insights and benchmarking against industry peers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={handleTryDemo} size="lg" className="bg-white text-costwise-blue hover:bg-white/90 gap-2">
                  Try Demo
                  <ArrowRight />
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
                  <Link to="/login">
                    <Building className="h-5 w-5" />
                    Company Login
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 ml-auto mr-auto mt-12 lg:mt-0">
              <div className="relative">
                <img 
                  src="/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png" 
                  alt="CostWise Dashboard Preview" 
                  className="max-w-full mx-auto rounded-lg shadow-2xl border border-white/20" 
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                  <Badge className="bg-green-500 text-white">Up to 65% Savings</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 mb-3">Why CostWise?</Badge>
            <h2 className="text-3xl font-bold mb-4 text-costwise-darkblue">Maximize Your Cost Efficiency</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform gives you complete visibility and control over your costs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-costwise-blue/10 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-costwise-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-costwise-darkblue">Cost Analytics</h3>
              <p className="text-gray-600">
                Comprehensive cost analysis across departments, projects, and categories with interactive dashboards.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-costwise-blue/10 rounded-full flex items-center justify-center mb-6">
                <LineChart className="h-6 w-6 text-costwise-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-costwise-darkblue">Benchmark Analysis</h3>
              <p className="text-gray-600">
                Compare your cost structure against industry peers to identify competitive advantages and areas for improvement.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-costwise-blue/10 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-costwise-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-costwise-darkblue">Smart Recommendations</h3>
              <p className="text-gray-600">
                AI-powered recommendations to reduce costs and optimize spending across your organization.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-800 mb-3">The Process</Badge>
            <h2 className="text-3xl font-bold mb-4 text-costwise-darkblue">How CostWise Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform analyzes your spending to find optimization opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-costwise-blue">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              <p className="text-gray-600 text-sm">
                Integrate with your existing systems to import cost data
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-costwise-blue">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyze</h3>
              <p className="text-gray-600 text-sm">
                Our AI analyzes spending patterns and identifies inefficiencies
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-costwise-blue">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Optimize</h3>
              <p className="text-gray-600 text-sm">
                Receive actionable recommendations to reduce costs
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-costwise-blue">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Save</h3>
              <p className="text-gray-600 text-sm">
                Implement changes and track savings over time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 mb-3">Results</Badge>
            <h2 className="text-3xl font-bold mb-4 text-costwise-darkblue">Real Business Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of businesses that use CostWise to achieve significant cost savings
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm">
              <div className="flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-6">
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-costwise-darkblue mb-2">25-65%</h3>
              <p className="text-gray-600">Average cost reduction across all departments</p>
            </div>
            
            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm">
              <div className="flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mb-6">
                <LightbulbIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-costwise-darkblue mb-2">100+</h3>
              <p className="text-gray-600">Cost optimization opportunities identified per company</p>
            </div>
            
            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm">
              <div className="flex items-center justify-center h-16 w-16 bg-purple-100 rounded-full mb-6">
                <Coins className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-costwise-darkblue mb-2">$2.5M+</h3>
              <p className="text-gray-600">Average annual savings for enterprise customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-costwise-blue text-white">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to optimize your business costs?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Start your journey to significant cost savings today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleTryDemo} size="lg" className="bg-white text-costwise-blue hover:bg-white/90 gap-2">
              Try Demo
              <ArrowRight />
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
              <Link to="/login">
                <LogIn className="h-5 w-5" />
                Login to Your Account
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png" 
                alt="CostWise Logo" 
                className="h-8" 
              />
            </div>
            <div className="text-gray-600 text-sm">
              © 2023 CostWise Innovators. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Dialog - imported as a separate component */}
      <DemoDialog open={showDemoDialog} onOpenChange={setShowDemoDialog} />
    </div>
  );
};

export default Index;

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
  LineChart,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import DemoDialog from '@/components/home/DemoDialog';
import { motion } from 'framer-motion';

const Index = () => {
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleTryDemo = () => {
    setShowDemoDialog(true);
  };

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation bar that becomes sticky on scroll */}
      <header className={`fixed w-full z-30 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png" 
              alt="CostWise Logo" 
              className="h-10" 
            />
            <span className={`ml-2 font-bold text-lg ${scrolled ? 'text-costwise-darkblue' : 'text-costwise-darkblue'}`}>CostWise</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={scrollToFeatures} 
              variant="outline-primary" 
              className="bg-white/80 hover:bg-white border border-costwise-blue text-costwise-blue"
            >
              Features
            </Button>
            <Button 
              onClick={scrollToResults} 
              variant="outline-primary" 
              className="bg-white/80 hover:bg-white border border-costwise-blue text-costwise-blue"
            >
              Results
            </Button>
            <Button onClick={handleTryDemo} className="bg-costwise-blue hover:bg-blue-600 gap-2 text-white">
              Try Demo
            </Button>
            <Button 
              asChild 
              variant="outline-primary" 
              className="bg-white/80 hover:bg-white border border-costwise-blue text-costwise-blue gap-2"
            >
              <Link to="/login">
                <LogIn className="h-5 w-5" />
                Login
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Gradient Background */}
      <div className="relative pt-32 pb-32 flex content-center items-center justify-center bg-gradient-to-r from-blue-700 to-costwise-blue overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png')] opacity-5 bg-center bg-no-repeat"></div>
        <motion.div 
          className="container max-w-6xl mx-auto px-4 z-10"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 px-4 ml-auto mr-auto text-center lg:text-left">
              <motion.h1 
                className="text-5xl font-bold leading-tight mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Cut Your Costs by up to <span className="text-yellow-300">65%</span>
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                CostWise helps you analyze, optimize, and reduce your company's expenses 
                with powerful AI-driven insights and benchmarking against industry peers.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Button onClick={handleTryDemo} size="lg" className="bg-white text-costwise-blue hover:bg-white/90 gap-2 font-medium">
                  Try Demo
                  <ArrowRight />
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2 border-white bg-white/20 text-white hover:bg-white/30 font-medium">
                  <Link to="/login">
                    <Building className="h-5 w-5" />
                    Company Login
                  </Link>
                </Button>
              </motion.div>
            </div>
            <motion.div 
              className="w-full lg:w-1/2 px-4 ml-auto mr-auto mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
              <div className="relative">
                <img 
                  src="/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png" 
                  alt="CostWise Dashboard Preview" 
                  className="max-w-full mx-auto rounded-xl shadow-2xl border border-white/20 hover:shadow-blue-500/30 transition-all duration-500" 
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                  <Badge className="bg-green-500 text-white">Up to 65% Savings</Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white" onClick={scrollToResults} />
        </div>
      </div>

      {/* Value Proposition Section */}
      <motion.div 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        ref={featuresRef}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 mb-3">Why CostWise?</Badge>
            <h2 className="text-3xl font-bold mb-4 text-costwise-darkblue">Maximize Your Cost Efficiency</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform gives you complete visibility and control over your costs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-100"
              variants={itemVariant}
            >
              <div className="h-12 w-12 bg-costwise-blue/10 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-costwise-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-costwise-darkblue">Cost Analytics</h3>
              <p className="text-gray-600">
                Comprehensive cost analysis across departments, projects, and categories with interactive dashboards.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-100"
              variants={itemVariant}
            >
              <div className="h-12 w-12 bg-costwise-blue/10 rounded-full flex items-center justify-center mb-6">
                <LineChart className="h-6 w-6 text-costwise-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-costwise-darkblue">Benchmark Analysis</h3>
              <p className="text-gray-600">
                Compare your cost structure against industry peers to identify competitive advantages and areas for improvement.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-100"
              variants={itemVariant}
            >
              <div className="h-12 w-12 bg-costwise-blue/10 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-costwise-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-costwise-darkblue">Smart Recommendations</h3>
              <p className="text-gray-600">
                AI-powered recommendations to reduce costs and optimize spending across your organization.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-blue-100 text-blue-800 mb-3">The Process</Badge>
            <h2 className="text-3xl font-bold mb-4 text-costwise-darkblue">How CostWise Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform analyzes your spending to find optimization opportunities
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-4 gap-8 relative"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Connecting line */}
            <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-costwise-blue via-blue-400 to-costwise-blue hidden md:block"></div>
            
            <motion.div className="text-center relative z-10" variants={itemVariant}>
              <div className="h-16 w-16 bg-costwise-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200/50">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              <p className="text-gray-600 text-sm">
                Integrate with your existing systems to import cost data
              </p>
            </motion.div>
            
            <motion.div className="text-center relative z-10" variants={itemVariant}>
              <div className="h-16 w-16 bg-costwise-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200/50">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyze</h3>
              <p className="text-gray-600 text-sm">
                Our AI analyzes spending patterns and identifies inefficiencies
              </p>
            </motion.div>
            
            <motion.div className="text-center relative z-10" variants={itemVariant}>
              <div className="h-16 w-16 bg-costwise-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200/50">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Optimize</h3>
              <p className="text-gray-600 text-sm">
                Receive actionable recommendations to reduce costs
              </p>
            </motion.div>
            
            <motion.div className="text-center relative z-10" variants={itemVariant}>
              <div className="h-16 w-16 bg-costwise-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200/50">
                <span className="text-xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Save</h3>
              <p className="text-gray-600 text-sm">
                Implement changes and track savings over time
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Results Section */}
      <div className="py-20 bg-white" ref={resultsRef}>
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-blue-100 text-blue-800 mb-3">Results</Badge>
            <h2 className="text-3xl font-bold mb-4 text-costwise-darkblue">Real Business Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of businesses that use CostWise to achieve significant cost savings
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-green-200"
              variants={itemVariant}
            >
              <div className="flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-6">
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-costwise-darkblue mb-2">25-65%</h3>
              <p className="text-gray-600">Average cost reduction across all departments</p>
            </motion.div>
            
            <motion.div 
              className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200"
              variants={itemVariant}
            >
              <div className="flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mb-6">
                <LightbulbIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-costwise-darkblue mb-2">100+</h3>
              <p className="text-gray-600">Cost optimization opportunities identified per company</p>
            </motion.div>
            
            <motion.div 
              className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-purple-200"
              variants={itemVariant}
            >
              <div className="flex items-center justify-center h-16 w-16 bg-purple-100 rounded-full mb-6">
                <Coins className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-costwise-darkblue mb-2">$2.5M+</h3>
              <p className="text-gray-600">Average annual savings for enterprise customers</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-costwise-blue text-white">
        <motion.div 
          className="container max-w-6xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to optimize your business costs?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Start your journey to significant cost savings today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleTryDemo} size="lg" className="bg-white text-costwise-blue hover:bg-white/90 gap-2">
              Try Demo
              <ArrowRight />
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline-primary" 
              className="gap-2 border-white bg-transparent text-white hover:bg-white/10"
            >
              <Link to="/login">
                <LogIn className="h-5 w-5" />
                Login to Your Account
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-10 border-t border-gray-100">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <img 
                src="/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png" 
                alt="CostWise Logo" 
                className="h-10" 
              />
              <span className="ml-2 font-bold text-lg text-costwise-darkblue">CostWise</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline-primary" 
                className="bg-white hover:bg-white border border-costwise-blue text-costwise-blue"
                onClick={() => window.open('#', '_blank')}
              >
                Contact Us
              </Button>
              <Button 
                variant="outline-primary"
                className="bg-white hover:bg-white border border-costwise-blue text-costwise-blue"
                onClick={() => window.open('#', '_blank')}
              >
                About Us
              </Button>
            </div>
            <div className="text-gray-600 text-sm mt-4 md:mt-0">
              © 2025 CostWise Innovators. All rights reserved.
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

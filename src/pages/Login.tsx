
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CompanyLogin from '@/components/login/CompanyLogin';
import { ChevronLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4 flex items-center gap-1" 
        onClick={() => navigate('/')}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Home
      </Button>
      
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-costwise-darkblue">
              Company Login
            </CardTitle>
            <CardDescription>
              Access your company dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <CompanyLogin />
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 text-sm text-muted-foreground max-w-md">
        <h3 className="font-medium mb-4 text-center">Available Company Credentials:</h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-blue-50 p-3 rounded border border-blue-100">
            <p className="font-medium text-lg mb-2">Real Company Credentials</p>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Apple Inc. (ID: 100)</span>
                <span className="font-mono text-gray-600">aapl2024</span>
              </li>
              <li className="flex justify-between">
                <span>Microsoft (ID: 101)</span>
                <span className="font-mono text-gray-600">msft2024</span>
              </li>
              <li className="flex justify-between">
                <span>Alphabet (ID: 102)</span>
                <span className="font-mono text-gray-600">googl2024</span>
              </li>
              <li className="flex justify-between">
                <span>Amazon (ID: 103)</span>
                <span className="font-mono text-gray-600">amzn2024</span>
              </li>
              <li className="flex justify-between">
                <span>Meta (ID: 104)</span>
                <span className="font-mono text-gray-600">meta2024</span>
              </li>
              <li className="flex justify-between">
                <span>Tesla (ID: 105)</span>
                <span className="font-mono text-gray-600">tsla2024</span>
              </li>
              <li className="flex justify-between">
                <span>NVIDIA (ID: 106)</span>
                <span className="font-mono text-gray-600">nvda2024</span>
              </li>
              <li className="flex justify-between">
                <span>JPMorgan Chase (ID: 107)</span>
                <span className="font-mono text-gray-600">jpm2024</span>
              </li>
              <li className="flex justify-between">
                <span>Visa (ID: 108)</span>
                <span className="font-mono text-gray-600">visa2024</span>
              </li>
              <li className="flex justify-between">
                <span>Walmart (ID: 109)</span>
                <span className="font-mono text-gray-600">wmt2024</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-center text-xs">CostWise Optimization Dashboard © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Login;

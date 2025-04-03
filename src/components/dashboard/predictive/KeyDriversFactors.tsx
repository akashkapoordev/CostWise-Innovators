
import React from 'react';

const KeyDriversFactors: React.FC = () => {
  return (
    <div className="border rounded-md p-4 col-span-1 lg:col-span-2">
      <h3 className="text-sm font-medium">Key Drivers & Factors</h3>
      <div className="mt-3 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-costwise-blue rounded-full"></div>
            <span className="text-sm">Seasonal Patterns</span>
          </div>
          <span className="text-sm font-medium">High Impact</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-costwise-green rounded-full"></div>
            <span className="text-sm">Vendor Price Increases</span>
          </div>
          <span className="text-sm font-medium">Medium Impact</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-costwise-red rounded-full"></div>
            <span className="text-sm">New Project Initiatives</span>
          </div>
          <span className="text-sm font-medium">High Impact</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm">Operational Changes</span>
          </div>
          <span className="text-sm font-medium">Low Impact</span>
        </div>
      </div>
    </div>
  );
};

export default KeyDriversFactors;


import React from 'react';

const AnomalySettings: React.FC = () => {
  return (
    <div className="border rounded-md p-4">
      <h3 className="text-sm font-medium mb-4">Anomaly Detection Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm mb-2">Sensitivity Threshold</div>
          <div className="flex items-center gap-2">
            <div className="text-sm">Low</div>
            <div className="flex-1 h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-costwise-blue rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="text-sm">High</div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Adjusts how sensitive the system is to detecting anomalies
          </div>
        </div>
        
        <div>
          <div className="text-sm mb-2">Alert Threshold</div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">30%</div>
            <div className="text-xs text-muted-foreground">
              Minimum variance required to trigger an anomaly alert
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalySettings;

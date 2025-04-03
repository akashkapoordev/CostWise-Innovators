
import React from 'react';

interface ForecastDataItem {
  date: string;
  actual: number | null;
  forecast: number | null;
  upper: number | null;
  lower: number | null;
  isHistorical: boolean;
}

interface ForecastSummaryProps {
  forecastData: ForecastDataItem[];
  forecastPeriod: string;
  formatCurrency: (value: number | null) => string;
}

const ForecastSummary: React.FC<ForecastSummaryProps> = ({ 
  forecastData, 
  forecastPeriod, 
  formatCurrency 
}) => {
  return (
    <div className="border rounded-md p-4">
      <h3 className="text-sm font-medium">Forecast Summary</h3>
      <div className="mt-3 space-y-3">
        <div>
          <div className="text-xs text-muted-foreground">
            Current Monthly Average
          </div>
          <div className="text-lg font-semibold">
            {formatCurrency(forecastData.filter(d => d.isHistorical).reduce((sum, item) => sum + (item.actual || 0), 0) / 6)}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground">
            Forecasted Monthly Average
          </div>
          <div className="text-lg font-semibold text-costwise-blue">
            {formatCurrency(forecastData.filter(d => !d.isHistorical).reduce((sum, item) => sum + (item.forecast || 0), 0) / forecastData.filter(d => !d.isHistorical).length)}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground">
            Projected Growth Rate
          </div>
          <div className="text-lg font-semibold text-amber-600">
            +{(forecastPeriod === '12months' ? 1.2 : 1.1 - 1) * 100}% annually
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastSummary;

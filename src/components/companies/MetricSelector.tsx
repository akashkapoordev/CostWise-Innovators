
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MetricSelectorProps {
  metric: string;
  onMetricChange: (value: string) => void;
}

const MetricSelector: React.FC<MetricSelectorProps> = ({ metric, onMetricChange }) => {
  return (
    <Select value={metric} onValueChange={onMetricChange}>
      <SelectTrigger className="w-[250px] mb-4">
        <SelectValue placeholder="Select metric to compare" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="revenue">Quarterly Revenue</SelectItem>
        <SelectItem value="financials">Financial Metrics</SelectItem>
        <SelectItem value="overall">Overall Comparison</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default MetricSelector;

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRightLeft, Save, Download, Play, PlusCircle } from 'lucide-react';
import { departments, categories } from '@/services/mockData';
import { ExpenseData, ScenarioAnalysisProps } from '@/types/company';

const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({ data, className }) => {
  const [scenarioName, setScenarioName] = useState('Budget Cut Scenario');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [budgetReductionPercent, setBudgetReductionPercent] = useState(10);
  const [headcountReductionPercent, setHeadcountReductionPercent] = useState(5);
  const [vendorCostReductionPercent, setVendorCostReductionPercent] = useState(15);
  const [operationalEfficiencyPercent, setOperationalEfficiencyPercent] = useState(8);
  
  // Generate dummy scenario data
  const generateScenarioData = () => {
    const baselineData = [
      { month: 'Jan', baseline: 500000, scenario: 500000 * (1 - budgetReductionPercent / 100) },
      { month: 'Feb', baseline: 520000, scenario: 520000 * (1 - budgetReductionPercent / 100) },
      { month: 'Mar', baseline: 490000, scenario: 490000 * (1 - budgetReductionPercent / 100) },
      { month: 'Apr', baseline: 530000, scenario: 530000 * (1 - budgetReductionPercent / 100) },
      { month: 'May', baseline: 550000, scenario: 550000 * (1 - budgetReductionPercent / 100) },
      { month: 'Jun', baseline: 580000, scenario: 580000 * (1 - budgetReductionPercent / 100) },
    ];
    
    return baselineData;
  };
  
  const scenarioData = generateScenarioData();
  
  // Calculate total savings
  const totalBaseline = scenarioData.reduce((sum, item) => sum + item.baseline, 0);
  const totalScenario = scenarioData.reduce((sum, item) => sum + item.scenario, 0);
  const totalSavings = totalBaseline - totalScenario;
  const savingsPercentage = (totalSavings / totalBaseline) * 100;
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5" />
          Scenario Analysis
        </CardTitle>
        <CardDescription>Model and compare different cost optimization scenarios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="configure" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="configure" className="flex-1">Configure Scenario</TabsTrigger>
            <TabsTrigger value="results" className="flex-1">Scenario Results</TabsTrigger>
            <TabsTrigger value="comparison" className="flex-1">Scenario Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="configure" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Scenario Name</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Department Focus</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md p-4 space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium">Budget Reduction</label>
                      <span className="text-sm font-medium">{budgetReductionPercent}%</span>
                    </div>
                    <Slider 
                      value={[budgetReductionPercent]} 
                      onValueChange={(value) => setBudgetReductionPercent(value[0])}
                      min={0}
                      max={30}
                      step={1}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium">Headcount Reduction</label>
                      <span className="text-sm font-medium">{headcountReductionPercent}%</span>
                    </div>
                    <Slider 
                      value={[headcountReductionPercent]} 
                      onValueChange={(value) => setHeadcountReductionPercent(value[0])}
                      min={0}
                      max={20}
                      step={1}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium">Vendor Cost Reduction</label>
                      <span className="text-sm font-medium">{vendorCostReductionPercent}%</span>
                    </div>
                    <Slider 
                      value={[vendorCostReductionPercent]} 
                      onValueChange={(value) => setVendorCostReductionPercent(value[0])}
                      min={0}
                      max={30}
                      step={1}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium">Operational Efficiency Gain</label>
                      <span className="text-sm font-medium">{operationalEfficiencyPercent}%</span>
                    </div>
                    <Slider 
                      value={[operationalEfficiencyPercent]} 
                      onValueChange={(value) => setOperationalEfficiencyPercent(value[0])}
                      min={0}
                      max={20}
                      step={1}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Category Impact Distribution</h3>
                  <div className="space-y-3">
                    {categories.slice(0, 6).map(category => (
                      <div key={category.id}>
                        <div className="flex justify-between text-sm">
                          <span>{category.name}</span>
                          <span>{Math.round(Math.random() * 25)}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full mt-1">
                          <div 
                            className="h-2 bg-costwise-blue rounded-full" 
                            style={{ width: `${Math.round(Math.random() * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Implementation Timeline</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Q1 2023</span>
                    <span className="text-sm">Q4 2023</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full">
                    <div className="h-2 bg-costwise-green rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Planning</span>
                    <span>Implementation</span>
                    <span>Review</span>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Risk Assessment</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-red-50 rounded-md">
                      <div className="text-red-600 font-medium">High</div>
                      <div className="text-xs">Operational Risk</div>
                    </div>
                    <div className="text-center p-2 bg-amber-50 rounded-md">
                      <div className="text-amber-600 font-medium">Medium</div>
                      <div className="text-xs">Financial Risk</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-md">
                      <div className="text-green-600 font-medium">Low</div>
                      <div className="text-xs">Compliance Risk</div>
                    </div>
                    <div className="text-center p-2 bg-amber-50 rounded-md">
                      <div className="text-amber-600 font-medium">Medium</div>
                      <div className="text-xs">Stakeholder Risk</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline">Reset Scenario</Button>
              <div className="space-x-2">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save Scenario
                </Button>
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Run Scenario
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="border rounded-md p-4 text-center space-y-2">
                <div className="text-sm text-muted-foreground">Total Projected Savings</div>
                <div className="text-2xl font-bold text-costwise-green">{formatCurrency(totalSavings)}</div>
                <div className="text-sm text-costwise-green">{savingsPercentage.toFixed(1)}% reduction</div>
              </div>
              
              <div className="border rounded-md p-4 text-center space-y-2">
                <div className="text-sm text-muted-foreground">Implementation Time</div>
                <div className="text-2xl font-bold">9 months</div>
                <div className="text-sm">3 phases</div>
              </div>
              
              <div className="border rounded-md p-4 text-center space-y-2">
                <div className="text-sm text-muted-foreground">ROI</div>
                <div className="text-2xl font-bold text-costwise-blue">285%</div>
                <div className="text-sm">18-month timeline</div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-4">Cost Projection Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scenarioData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis 
                      tickFormatter={(value) => `$${value / 1000}k`}
                      domain={[400000, 600000]}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Amount']}
                      labelStyle={{ fontWeight: 'bold' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="baseline" 
                      name="Baseline" 
                      stroke="#64748b" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="scenario" 
                      name="Scenario" 
                      stroke="#0EA5E9" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Impact by Department</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {departments.map(dept => (
                    <div key={dept.id}>
                      <div className="flex justify-between text-sm">
                        <span>{dept.name}</span>
                        <span>{formatCurrency(dept.budget * (budgetReductionPercent / 100))}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full mt-1">
                        <div 
                          className="h-2 bg-costwise-blue rounded-full" 
                          style={{ width: `${budgetReductionPercent * 3}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Implementation Considerations</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">!</div>
                    <div>Budget reductions may impact project timelines for the Engineering department</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">!</div>
                    <div>Headcount reductions should be paired with operational efficiency improvements</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-green-100 text-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                    <div>Vendor cost negotiations could potentially yield higher savings than estimated</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-red-100 text-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">×</div>
                    <div>Customer satisfaction metrics should be closely monitored during implementation</div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end pt-4 space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Scenario
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-4 pt-4">
            <div className="flex justify-between mb-4">
              <h3 className="text-sm font-medium">Comparing Scenarios</h3>
              <Button variant="outline" size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Scenario
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-4 py-2 text-left text-sm font-medium">Scenario</th>
                    <th className="border px-4 py-2 text-left text-sm font-medium">Total Savings</th>
                    <th className="border px-4 py-2 text-left text-sm font-medium">Implementation Time</th>
                    <th className="border px-4 py-2 text-left text-sm font-medium">Risk Level</th>
                    <th className="border px-4 py-2 text-left text-sm font-medium">ROI</th>
                    <th className="border px-4 py-2 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 text-sm font-medium">Budget Cut Scenario</td>
                    <td className="border px-4 py-2 text-sm">{formatCurrency(totalSavings)}</td>
                    <td className="border px-4 py-2 text-sm">9 months</td>
                    <td className="border px-4 py-2 text-sm">
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Medium</span>
                    </td>
                    <td className="border px-4 py-2 text-sm">285%</td>
                    <td className="border px-4 py-2 text-sm">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 text-sm font-medium">Operational Efficiency</td>
                    <td className="border px-4 py-2 text-sm">{formatCurrency(totalSavings * 0.8)}</td>
                    <td className="border px-4 py-2 text-sm">6 months</td>
                    <td className="border px-4 py-2 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Low</span>
                    </td>
                    <td className="border px-4 py-2 text-sm">210%</td>
                    <td className="border px-4 py-2 text-sm">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 text-sm font-medium">Vendor Renegotiation</td>
                    <td className="border px-4 py-2 text-sm">{formatCurrency(totalSavings * 1.2)}</td>
                    <td className="border px-4 py-2 text-sm">12 months</td>
                    <td className="border px-4 py-2 text-sm">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
                    </td>
                    <td className="border px-4 py-2 text-sm">325%</td>
                    <td className="border px-4 py-2 text-sm">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="border rounded-md p-4 mt-4">
              <h3 className="text-sm font-medium mb-4">Comparative Savings Analysis</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" type="category" allowDuplicatedCategory={false} />
                    <YAxis 
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Amount']}
                      labelStyle={{ fontWeight: 'bold' }}
                    />
                    <Legend />
                    <Line 
                      data={[
                        { month: 'Jan', value: 50000 },
                        { month: 'Feb', value: 55000 },
                        { month: 'Mar', value: 49000 },
                        { month: 'Apr', value: 59000 },
                        { month: 'May', value: 62000 },
                        { month: 'Jun', value: 65000 },
                      ]} 
                      type="monotone" 
                      dataKey="value" 
                      name="Budget Cut" 
                      stroke="#0EA5E9" 
                      strokeWidth={2} 
                    />
                    <Line 
                      data={[
                        { month: 'Jan', value: 40000 },
                        { month: 'Feb', value: 45000 },
                        { month: 'Mar', value: 42000 },
                        { month: 'Apr', value: 48000 },
                        { month: 'May', value: 52000 },
                        { month: 'Jun', value: 54000 },
                      ]} 
                      type="monotone" 
                      dataKey="value" 
                      name="Operational Efficiency" 
                      stroke="#10B981" 
                      strokeWidth={2} 
                    />
                    <Line 
                      data={[
                        { month: 'Jan', value: 60000 },
                        { month: 'Feb', value: 65000 },
                        { month: 'Mar', value: 68000 },
                        { month: 'Apr', value: 70000 },
                        { month: 'May', value: 72000 },
                        { month: 'Jun', value: 75000 },
                      ]} 
                      type="monotone" 
                      dataKey="value" 
                      name="Vendor Renegotiation" 
                      stroke="#8B5CF6" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="flex justify-end pt-4 space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Comparison
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScenarioAnalysis;

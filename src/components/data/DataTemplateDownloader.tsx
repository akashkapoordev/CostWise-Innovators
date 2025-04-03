
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Download, 
  FileSpreadsheet, 
  Building, 
  DollarSign, 
  ChartBar 
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const DataTemplateDownloader: React.FC = () => {
  const templates = [
    {
      id: 'company',
      name: 'Company Data Template',
      description: 'Template for company information including industry, revenue, and employee data',
      icon: <Building className="h-5 w-5" />,
      fileName: 'company_data_template.csv'
    },
    {
      id: 'expense',
      name: 'Expense Data Template',
      description: 'Template for expense records including categories, departments, and amounts',
      icon: <DollarSign className="h-5 w-5" />,
      fileName: 'expense_data_template.csv'
    },
    {
      id: 'budget',
      name: 'Budget Data Template',
      description: 'Template for budget allocations by department and category',
      icon: <ChartBar className="h-5 w-5" />,
      fileName: 'budget_data_template.csv'
    }
  ];

  const handleDownload = (templateId: string, fileName: string) => {
    // In a real app, this would fetch the template file from the server
    // For this example, we'll create simple CSV templates on the fly
    let csvContent = '';
    
    switch (templateId) {
      case 'company':
        csvContent = 'id,name,industry,founded,city,province,country,employees,annualRevenue,ceo,website\n' +
                    'ABC123,Acme Corporation,Technology,2005,Toronto,Ontario,Canada,500,10000000,John Smith,acmecorp.com\n' +
                    'XYZ456,XYZ Industries,Manufacturing,1995,Vancouver,British Columbia,Canada,750,15000000,Jane Doe,xyzindustries.com';
        break;
      case 'expense':
        csvContent = 'id,date,description,amount,department,category,status,paymentMethod,vendor,companyId\n' +
                    'EXP001,2023-06-15,Office supplies,350.25,Operations,Office Supplies,approved,credit card,Staples,ABC123\n' +
                    'EXP002,2023-06-20,Software license,1200.00,IT,Software & Tools,approved,bank transfer,Adobe,ABC123';
        break;
      case 'budget':
        csvContent = 'id,category,department,budgetAmount,actualAmount,period,companyId\n' +
                    'BUD001,Salaries,Engineering,150000,145000,Q3 2023,ABC123\n' +
                    'BUD002,Software & Tools,IT,25000,23500,Q3 2023,ABC123';
        break;
    }
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Template "${fileName}" downloaded successfully`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card key={template.id} className="flex flex-col h-full">
          <CardContent className="flex flex-col flex-grow pt-6">
            <div className="flex gap-3 items-start mb-3">
              <div className="rounded-full p-2 bg-primary/10 text-primary">
                {template.icon}
              </div>
              <div>
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mt-4">
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{template.fileName}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleDownload(template.id, template.fileName)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DataTemplateDownloader;

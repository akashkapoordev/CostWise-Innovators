
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  XCircle,
  Building,
  DollarSign,
  ChartBar
} from 'lucide-react';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { parseCompanyData, parseExpenseData, parseBudgetData } from '@/services/importDataService';

type FileUploadType = 'company' | 'expense' | 'budget';

const DataFileUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileType, setFileType] = useState<FileUploadType>('company');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm({
    defaultValues: {
      fileType: 'company',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check if file is CSV or Excel
      if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        toast.error('Please upload a CSV or Excel file');
        return;
      }
      
      setSelectedFile(file);
      setUploadStatus('idle');
      setUploadProgress(0);
    }
  };

  const handleTypeChange = (type: FileUploadType) => {
    setFileType(type);
    form.setValue('fileType', type);
  };

  const processFile = async (file: File, type: FileUploadType) => {
    setIsUploading(true);
    setUploadStatus('processing');
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress > 95 ? 95 : progress);
      if (progress >= 95) clearInterval(interval);
    }, 100);
    
    try {
      // Read the file
      const content = await readFileContent(file);
      
      // Process the file based on type
      let result;
      switch (type) {
        case 'company':
          result = await parseCompanyData(content, file.name);
          break;
        case 'expense':
          result = await parseExpenseData(content, file.name);
          break;
        case 'budget':
          result = await parseBudgetData(content, file.name);
          break;
      }
      
      clearInterval(interval);
      setUploadProgress(100);
      
      // Success!
      setTimeout(() => {
        setUploadStatus('success');
        setIsUploading(false);
        toast.success(`Data successfully imported`);
      }, 500);
      
    } catch (error) {
      clearInterval(interval);
      console.error('Error processing file:', error);
      setUploadStatus('error');
      setIsUploading(false);
      toast.error('Error processing file. Please check the format and try again.');
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      // Read as text (for CSV) or binary string (for Excel)
      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    });
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    processFile(selectedFile, fileType);
  };

  const fileTypeIcons = {
    company: <Building className="h-5 w-5" />,
    expense: <DollarSign className="h-5 w-5" />,
    budget: <ChartBar className="h-5 w-5" />
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'processing':
        return null;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`cursor-pointer transition-all ${fileType === 'company' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
          onClick={() => handleTypeChange('company')}>
          <CardContent className="flex items-center gap-3 p-4">
            <Building className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">Company Data</h3>
              <p className="text-xs text-muted-foreground">Upload company information</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all ${fileType === 'expense' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
          onClick={() => handleTypeChange('expense')}>
          <CardContent className="flex items-center gap-3 p-4">
            <DollarSign className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">Expense Data</h3>
              <p className="text-xs text-muted-foreground">Upload expense records</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all ${fileType === 'budget' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
          onClick={() => handleTypeChange('budget')}>
          <CardContent className="flex items-center gap-3 p-4">
            <ChartBar className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">Budget Data</h3>
              <p className="text-xs text-muted-foreground">Upload budget allocations</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Form {...form}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <FormLabel>Upload {fileType} data file (CSV or Excel)</FormLabel>
              {getStatusIcon()}
            </div>
            
            <div className="flex gap-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="flex-1"
                disabled={isUploading}
              />
              <Button 
                type="button" 
                onClick={handleSubmit}
                disabled={!selectedFile || isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
          
          {selectedFile && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4" />
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </div>
              
              {uploadStatus === 'processing' && (
                <div className="space-y-1">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{uploadProgress}% - Processing file...</p>
                </div>
              )}
              
              {uploadStatus === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  Error processing file. Please check the format and try again.
                </div>
              )}
              
              {uploadStatus === 'success' && (
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <CheckCircle2 className="h-4 w-4" />
                  File processed successfully
                </div>
              )}
            </div>
          )}
          
          <div className="text-sm border border-muted p-3 rounded-md bg-muted/50 mt-4">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              {fileTypeIcons[fileType]} {fileType.charAt(0).toUpperCase() + fileType.slice(1)} Data Guidelines
            </h4>
            {fileType === 'company' && (
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Include company name, ID, industry, and founded date</li>
                <li>Specify headquarters location (city, province, country)</li>
                <li>Include number of employees and annual revenue</li>
                <li>Provide website URL and CEO name</li>
              </ul>
            )}
            {fileType === 'expense' && (
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Each expense must have a category, department, and amount</li>
                <li>Include date, description, and payment method</li>
                <li>Specify vendor and approval status</li>
                <li>Include company ID to associate with the right company</li>
              </ul>
            )}
            {fileType === 'budget' && (
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Specify budget category, department, and allocated amount</li>
                <li>Include budget period (e.g., Q3 2023)</li>
                <li>If actual expenses are known, include those values</li>
                <li>Include company ID to associate with the right company</li>
              </ul>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DataFileUploader;

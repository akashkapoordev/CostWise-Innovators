
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Database, FileSpreadsheet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DataFileUploader from '@/components/data/DataFileUploader';
import DataTemplateDownloader from '@/components/data/DataTemplateDownloader';

const DataImportPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  
  const handleBack = () => {
    navigate('/dashboard-layout');
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Data Management</h1>
            <p className="text-muted-foreground">
              Import and manage your organization's data
            </p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
          <TabsTrigger value="templates">Download Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Company Data
              </CardTitle>
              <CardDescription>
                Upload your organization's data to analyze expenses and budgets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataFileUploader />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Download Data Templates
              </CardTitle>
              <CardDescription>
                Download template files to help format your data correctly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTemplateDownloader />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataImportPage;

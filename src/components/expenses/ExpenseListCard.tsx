
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ExpenseFilters } from './ExpenseFilters';
import { ExpenseTable } from './ExpenseTable';
import { ExpenseData } from '@/types/company';

interface ExpenseListCardProps {
  expenses: ExpenseData[];
  searchTerm: string;
  selectedDepartment: string;
  selectedCategory: string;
  statusFilter: string;
  setSearchTerm: (term: string) => void;
  setSelectedDepartment: (department: string) => void;
  setSelectedCategory: (category: string) => void;
  setStatusFilter: (status: string) => void;
  departments: Array<{ id: string; name: string }>;
  categories: Array<{ id: string; name: string }>;
  exportToCSV: () => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

export const ExpenseListCard = ({
  expenses,
  searchTerm,
  selectedDepartment,
  selectedCategory,
  statusFilter,
  setSearchTerm,
  setSelectedDepartment,
  setSelectedCategory,
  setStatusFilter,
  departments,
  categories,
  exportToCSV,
  formatCurrency,
  formatDate,
}: ExpenseListCardProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>Expense Records</CardTitle>
            <CardDescription>View and filter all expense transactions</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ExpenseFilters
            searchTerm={searchTerm}
            selectedDepartment={selectedDepartment}
            selectedCategory={selectedCategory}
            statusFilter={statusFilter}
            setSearchTerm={setSearchTerm}
            setSelectedDepartment={setSelectedDepartment}
            setSelectedCategory={setSelectedCategory}
            setStatusFilter={setStatusFilter}
            departments={departments}
            categories={categories}
          />
          
          <ExpenseTable
            expenses={expenses}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        </div>
      </CardContent>
    </Card>
  );
};

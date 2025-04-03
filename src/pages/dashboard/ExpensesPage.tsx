import React, { useState } from 'react';
import { expenses, departments, categories } from '@/services/mockData';
import { useFilteredData } from '@/hooks/useFilteredData';
import { ExpenseSummaryCards } from '@/components/expenses/ExpenseSummaryCards';
import { ExpenseListCard } from '@/components/expenses/ExpenseListCard';

const ExpensesPage = () => {
  // Use our custom hook for data filtering
  const {
    filteredData,
    searchTerm,
    selectedDepartment,
    selectedCategory,
    setSearchTerm,
    setSelectedDepartment,
    setSelectedCategory
  } = useFilteredData({
    data: expenses,
    departmentData: departments,
    categoryData: categories
  });
  
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Apply status filter (keeping this separate as it's specific to this page)
  const filteredByStatus = statusFilter === 'all' 
    ? filteredData 
    : filteredData.filter(expense => expense.status === statusFilter);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    // Headers for CSV
    const headers = ['ID', 'Date', 'Description', 'Department', 'Category', 'Amount', 'Status'];
    
    // Data rows
    const data = filteredByStatus.map(expense => [
      expense.id,
      formatDate(expense.date),
      expense.description,
      expense.department,
      expense.category,
      expense.amount.toString(),
      expense.status
    ]);
    
    // Combine into CSV content
    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');
    
    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-costwise-darkblue">Expenses</h1>
        <p className="text-muted-foreground">
          View and manage all expenses across your organization.
        </p>
      </div>
      
      <ExpenseSummaryCards 
        expenses={filteredByStatus}
        formatCurrency={formatCurrency}
      />
      
      <ExpenseListCard
        expenses={filteredByStatus}
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
        exportToCSV={exportToCSV}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
    </div>
  );
};

export default ExpensesPage;

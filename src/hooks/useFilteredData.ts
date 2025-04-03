
import { useState, useEffect } from 'react';
import { ExpenseData } from '@/types/company';

interface UseFilteredDataProps {
  data: ExpenseData[];
  searchTerm?: string;
  departmentId?: string;
  categoryId?: string;
  dateRange?: string;
  departmentData?: Array<{ id: string; name: string }>;
  categoryData?: Array<{ id: string; name: string }>;
}

interface UseFilteredDataReturn {
  filteredData: ExpenseData[];
  setSearchTerm: (term: string) => void;
  setSelectedDepartment: (department: string) => void;
  setSelectedCategory: (category: string) => void;
  setDateRange: (range: string) => void;
  searchTerm: string;
  selectedDepartment: string;
  selectedCategory: string;
  dateRange: string;
}

/**
 * Custom hook to handle expense data filtering
 * This centralizes filtering logic to be reused across the application
 */
export const useFilteredData = ({
  data,
  searchTerm: initialSearchTerm = '',
  departmentId: initialDepartmentId = 'all',
  categoryId: initialCategoryId = 'all',
  dateRange: initialDateRange = 'last30days',
  departmentData = [],
  categoryData = [],
}: UseFilteredDataProps): UseFilteredDataReturn => {
  // State for filter criteria
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartmentId);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filteredData, setFilteredData] = useState<ExpenseData[]>(data);

  // Apply search filter
  useEffect(() => {
    if (!data) return;
    
    let filtered = [...data];
    
    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(expense => 
        expense.description.toLowerCase().includes(lowercaseSearch) ||
        expense.department.toLowerCase().includes(lowercaseSearch) ||
        expense.category.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // Apply department and category filters
  useEffect(() => {
    if (!data) return;
    
    let filtered = [...data];
    
    // Apply department filter
    if (selectedDepartment !== 'all') {
      const departmentName = departmentData.find(d => d.id === selectedDepartment)?.name?.toLowerCase();
      if (departmentName) {
        filtered = filtered.filter(expense => 
          expense.department.toLowerCase() === departmentName
        );
      }
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      const categoryName = categoryData.find(c => c.id === selectedCategory)?.name?.toLowerCase();
      if (categoryName) {
        filtered = filtered.filter(expense => 
          expense.category.toLowerCase() === categoryName
        );
      }
    }
    
    // Apply search filter on top of department/category filters
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(expense => 
        expense.description.toLowerCase().includes(lowercaseSearch) ||
        expense.department.toLowerCase().includes(lowercaseSearch) ||
        expense.category.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Date range filtering would go here
    // For now it's just a placeholder as the original code didn't implement it
    
    setFilteredData(filtered);
  }, [selectedDepartment, selectedCategory, searchTerm, data, departmentData, categoryData]);

  return {
    filteredData,
    setSearchTerm,
    setSelectedDepartment,
    setSelectedCategory,
    setDateRange,
    searchTerm,
    selectedDepartment,
    selectedCategory,
    dateRange
  };
};


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Department, departments as mockDepartments } from '@/services/mockData';
import { AlertTriangle, Download, TrendingDown, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface DepartmentSpendTableProps {
  title: string;
  description?: string;
  className?: string;
  departments?: Department[];
  limit?: number;
}

const DepartmentSpendTable = ({
  title,
  description,
  className,
  departments: deptList = mockDepartments,
  limit,
}: DepartmentSpendTableProps) => {
  const [sortBy, setSortBy] = useState<'name' | 'variance' | 'budget' | 'actual'>('variance');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter departments by search term
  const filteredDepartments = deptList.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.managerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort departments based on current sort criteria
  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'budget':
        comparison = a.budget - b.budget;
        break;
      case 'actual':
        comparison = a.actualSpend - b.actualSpend;
        break;
      case 'variance':
      default:
        const aVariance = a.actualSpend - a.budget;
        const bVariance = b.actualSpend - b.budget;
        comparison = bVariance - aVariance;
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Apply limit if provided
  const displayDepartments = limit ? sortedDepartments.slice(0, limit) : sortedDepartments;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const calculateVariance = (dept: Department) => {
    const variance = dept.actualSpend - dept.budget;
    const percentVariance = (variance / dept.budget) * 100;
    return {
      value: variance,
      percent: percentVariance.toFixed(1),
      isOverBudget: variance > 0
    };
  };

  const handleSort = (column: 'name' | 'variance' | 'budget' | 'actual') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (column: 'name' | 'variance' | 'budget' | 'actual') => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  // Function to handle CSV export
  const exportToCSV = () => {
    // Header row
    const headers = ['Department', 'Manager', 'Budget', 'Actual', 'Variance', 'Variance %'];
    
    // Data rows
    const data = sortedDepartments.map(dept => {
      const variance = calculateVariance(dept);
      return [
        dept.name,
        dept.managerName,
        dept.budget.toString(),
        dept.actualSpend.toString(),
        variance.value.toString(),
        `${variance.percent}%`
      ];
    });
    
    // Combine headers and data
    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[200px] h-8 text-sm"
          />
          <Button variant="outline" size="sm" className="h-8" onClick={exportToCSV}>
            <Download size={14} className="mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-muted/30"
                onClick={() => handleSort('name')}
              >
                Department {getSortIcon('name')}
              </TableHead>
              <TableHead>Manager</TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-muted/30"
                onClick={() => handleSort('budget')}
              >
                Budget {getSortIcon('budget')}
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-muted/30"
                onClick={() => handleSort('actual')}
              >
                Actual {getSortIcon('actual')}
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-muted/30"
                onClick={() => handleSort('variance')}
              >
                Variance {getSortIcon('variance')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayDepartments.length > 0 ? (
              displayDepartments.map((dept) => {
                const variance = calculateVariance(dept);
                
                return (
                  <TableRow key={dept.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    <TableCell>{dept.managerName}</TableCell>
                    <TableCell className="text-right">{formatCurrency(dept.budget)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(dept.actualSpend)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        {variance.isOverBudget ? (
                          <>
                            <TrendingUp className="mr-1 h-4 w-4 text-costwise-red" />
                            <span className="text-costwise-red">
                              {formatCurrency(variance.value)} ({variance.percent}%)
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="mr-1 h-4 w-4 text-costwise-green" />
                            <span className="text-costwise-green">
                              {formatCurrency(variance.value)} ({variance.percent}%)
                            </span>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertTriangle className="h-8 w-8 mb-2" />
                    <p>No departments found{searchTerm ? ` matching "${searchTerm}"` : ''}</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DepartmentSpendTable;

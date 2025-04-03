
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { CompanyProvider } from '@/contexts/CompanyContext';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import DashboardEnhanced from '@/pages/DashboardEnhanced';
import DashboardLayout from '@/layouts/DashboardLayout';
import CompanyDetailPage from '@/pages/CompanyDetailPage';
import ExpensesPage from '@/pages/dashboard/ExpensesPage';
import CostAnalysisPage from '@/pages/dashboard/CostAnalysisPage';
import BudgetAnalysisPage from '@/pages/dashboard/BudgetAnalysisPage';
import DepartmentsPage from '@/pages/dashboard/DepartmentsPage';
import NotFound from '@/pages/NotFound';
import DataImportPage from '@/pages/DataImportPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CompanyProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-enhanced" element={<DashboardEnhanced />} />
            
            {/* Dashboard Layout Routes */}
            <Route path="/dashboard-layout" element={<DashboardLayout />}>
              <Route index element={<Navigate to="expenses" />} />
              <Route path="company/:id" element={<CompanyDetailPage />} />
              <Route path="data-import" element={<DataImportPage />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="cost-analysis" element={<CostAnalysisPage />} />
              <Route path="budget-analysis" element={<BudgetAnalysisPage />} />
              <Route path="departments" element={<DepartmentsPage />} />
            </Route>
            
            {/* Add a direct route for demo access */}
            <Route path="/demo/:id" element={<Navigate to="/dashboard-layout" />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-right" expand={true} richColors closeButton />
        </CompanyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

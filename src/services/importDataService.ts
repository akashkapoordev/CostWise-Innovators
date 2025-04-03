
import { CompanyData, ExpenseData } from '@/types/company';
import { BudgetData } from '@/services/mockData/types';

/**
 * Parse raw data (CSV or Excel) into CompanyData objects
 */
export const parseCompanyData = async (
  fileContent: string, 
  fileName: string
): Promise<CompanyData[]> => {
  console.log(`Parsing company data from ${fileName}...`);
  
  try {
    // For this example, we'll parse CSV data
    // In a real implementation, you'd need to handle Excel files too
    const companies: CompanyData[] = [];
    
    // Parse CSV (simple implementation)
    const lines = fileContent.split('\n');
    const headers = lines[0].split(',');
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      
      const values = lines[i].split(',');
      const company: any = {};
      
      // Map CSV columns to CompanyData properties
      headers.forEach((header, index) => {
        const value = values[index]?.trim();
        
        switch (header.trim()) {
          case 'id':
          case 'name':
          case 'industry':
          case 'logo':
          case 'ceo':
          case 'website':
            company[header.trim()] = value;
            break;
          case 'founded':
          case 'employees':
          case 'annualRevenue':
            company[header.trim()] = Number(value);
            break;
          case 'city':
          case 'province':
          case 'country':
            company.headquarters = company.headquarters || {};
            company.headquarters[header.trim()] = value;
            break;
        }
      });
      
      // Add default values for any missing required fields
      if (!company.logo) company.logo = '/placeholder.svg';
      if (!company.departments) company.departments = [];
      if (!company.quarterlyData) company.quarterlyData = [];
      if (!company.departmentMetrics) company.departmentMetrics = [];
      if (!company.financialMetrics) {
        company.financialMetrics = {
          revenueYTD: 0,
          expensesYTD: 0,
          cashFlow: 0,
          debtToEquityRatio: 0,
          currentRatio: 0,
          returnOnAssets: 0,
          returnOnEquity: 0,
          profitMargin: 0
        };
      }
      if (!company.savingsOpportunities) company.savingsOpportunities = [];
      
      // Ensure website has http/https
      if (company.website && !company.website.includes('://')) {
        company.website = `https://${company.website}`;
      }
      
      companies.push(company as CompanyData);
    }
    
    console.log(`Successfully parsed ${companies.length} companies`);
    return companies;
    
  } catch (error) {
    console.error('Error parsing company data:', error);
    throw new Error('Failed to parse company data. Please check the file format.');
  }
};

/**
 * Parse raw data (CSV or Excel) into ExpenseData objects
 */
export const parseExpenseData = async (
  fileContent: string, 
  fileName: string
): Promise<ExpenseData[]> => {
  console.log(`Parsing expense data from ${fileName}...`);
  
  try {
    // For this example, we'll parse CSV data
    const expenses: ExpenseData[] = [];
    
    // Parse CSV (simple implementation)
    const lines = fileContent.split('\n');
    const headers = lines[0].split(',');
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      
      const values = lines[i].split(',');
      const expense: any = {};
      
      // Map CSV columns to ExpenseData properties
      headers.forEach((header, index) => {
        const value = values[index]?.trim();
        
        switch (header.trim()) {
          case 'id':
          case 'date':
          case 'description':
          case 'department':
          case 'category':
          case 'status':
          case 'paymentMethod':
          case 'vendor':
          case 'approvedBy':
          case 'receipt':
          case 'companyId':
            expense[header.trim()] = value;
            break;
          case 'amount':
            expense[header.trim()] = Number(value);
            break;
        }
      });
      
      expenses.push(expense as ExpenseData);
    }
    
    console.log(`Successfully parsed ${expenses.length} expenses`);
    return expenses;
    
  } catch (error) {
    console.error('Error parsing expense data:', error);
    throw new Error('Failed to parse expense data. Please check the file format.');
  }
};

/**
 * Parse raw data (CSV or Excel) into BudgetData objects
 */
export const parseBudgetData = async (
  fileContent: string, 
  fileName: string
): Promise<BudgetData[]> => {
  console.log(`Parsing budget data from ${fileName}...`);
  
  try {
    // For this example, we'll parse CSV data
    const budgets: BudgetData[] = [];
    
    // Parse CSV (simple implementation)
    const lines = fileContent.split('\n');
    const headers = lines[0].split(',');
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      
      const values = lines[i].split(',');
      const budget: any = {};
      
      // Map CSV columns to BudgetData properties
      headers.forEach((header, index) => {
        const value = values[index]?.trim();
        
        switch (header.trim()) {
          case 'id':
          case 'category':
          case 'department':
          case 'period':
          case 'companyId':
            budget[header.trim()] = value;
            break;
          case 'budgetAmount':
          case 'actualAmount':
            budget[header.trim()] = Number(value);
            break;
        }
      });
      
      budgets.push(budget as BudgetData);
    }
    
    console.log(`Successfully parsed ${budgets.length} budget items`);
    return budgets;
    
  } catch (error) {
    console.error('Error parsing budget data:', error);
    throw new Error('Failed to parse budget data. Please check the file format.');
  }
};

// In a real implementation, you would also have functions to:
// 1. Save the imported data to your database
// 2. Validate the data before saving
// 3. Handle error cases and data inconsistencies
// 4. Update existing data if IDs match

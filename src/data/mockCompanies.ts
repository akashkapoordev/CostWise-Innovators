
import { CompanyData } from '@/types/company';

// Sample company data (this would typically come from an API)
export const mockCompanies: CompanyData[] = [
  {
    id: '1',
    name: 'Maple Tech Solutions',
    logo: '/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png',
    industry: 'Technology',
    founded: 2010,
    employees: 450,
    annualRevenue: 75000000,
    headquarters: {
      city: 'Toronto',
      province: 'Ontario',
      country: 'Canada'
    },
    description: 'A leading Canadian tech company specializing in AI and machine learning solutions.',
    departments: [
      { name: 'Engineering', budget: 15000000, actualSpend: 14500000 },
      { name: 'Marketing', budget: 8000000, actualSpend: 8200000 },
      { name: 'Sales', budget: 12000000, actualSpend: 11300000 },
      { name: 'Operations', budget: 10000000, actualSpend: 9800000 },
    ],
    ceo: 'Michael Thompson',
    website: 'mapletechsolutions.ca',
    quarterlyData: [
      {
        quarter: 'Q1 2023',
        revenue: 18750000,
        expenses: 15000000,
        profit: 3750000,
        employeeCount: 450,
        customerSatisfaction: 4.2,
        marketShare: 8.5
      },
      {
        quarter: 'Q2 2023',
        revenue: 19250000,
        expenses: 15500000,
        profit: 3750000,
        employeeCount: 460,
        customerSatisfaction: 4.3,
        marketShare: 8.7
      }
    ],
    departmentMetrics: [
      {
        name: 'Engineering',
        budget: 15000000,
        actualSpend: 14500000,
        headcount: 200,
        projectsCompleted: 15,
        efficiency: 92
      },
      {
        name: 'Marketing',
        budget: 8000000,
        actualSpend: 8200000,
        headcount: 50,
        projectsCompleted: 8,
        efficiency: 87
      }
    ],
    financialMetrics: {
      revenueYTD: 38000000,
      expensesYTD: 30500000,
      cashFlow: 7500000,
      debtToEquityRatio: 0.32,
      currentRatio: 2.1,
      returnOnAssets: 12.5,
      returnOnEquity: 18.2,
      profitMargin: 19.7
    },
    savingsOpportunities: [
      {
        id: 'sav-001',
        title: 'Cloud Cost Optimization',
        description: 'Reduce cloud spending through rightsizing and reserved instances',
        potentialSavings: 800000,
        implementationCost: 150000,
        timeToImplement: '3 months',
        riskLevel: 'Low',
        priority: 'High'
      },
      {
        id: 'sav-002',
        title: 'Software License Consolidation',
        description: 'Consolidate redundant software licenses across departments',
        potentialSavings: 500000,
        implementationCost: 75000,
        timeToImplement: '2 months',
        riskLevel: 'Low',
        priority: 'Medium'
      }
    ]
  },
  {
    id: '2',
    name: 'Northern Resources Inc.',
    logo: '/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png',
    industry: 'Energy',
    founded: 1985,
    employees: 1200,
    annualRevenue: 250000000,
    headquarters: {
      city: 'Calgary',
      province: 'Alberta',
      country: 'Canada'
    },
    description: 'A major player in the Canadian energy sector with a focus on renewable energy solutions.',
    departments: [
      { name: 'Production', budget: 80000000, actualSpend: 78500000 },
      { name: 'R&D', budget: 20000000, actualSpend: 19300000 },
      { name: 'HR', budget: 5000000, actualSpend: 4950000 },
      { name: 'Administration', budget: 15000000, actualSpend: 16200000 },
    ],
    ceo: 'Sarah Williams',
    website: 'northernresources.ca',
    quarterlyData: [
      {
        quarter: 'Q1 2023',
        revenue: 62500000,
        expenses: 51000000,
        profit: 11500000,
        employeeCount: 1200,
        customerSatisfaction: 4.0,
        marketShare: 15.2
      },
      {
        quarter: 'Q2 2023',
        revenue: 63100000,
        expenses: 52000000,
        profit: 11100000,
        employeeCount: 1190,
        customerSatisfaction: 3.9,
        marketShare: 15.0
      }
    ],
    departmentMetrics: [
      {
        name: 'Production',
        budget: 80000000,
        actualSpend: 78500000,
        headcount: 650,
        projectsCompleted: 12,
        efficiency: 94
      },
      {
        name: 'R&D',
        budget: 20000000,
        actualSpend: 19300000,
        headcount: 120,
        projectsCompleted: 5,
        efficiency: 88
      }
    ],
    financialMetrics: {
      revenueYTD: 125600000,
      expensesYTD: 103000000,
      cashFlow: 22600000,
      debtToEquityRatio: 0.48,
      currentRatio: 1.9,
      returnOnAssets: 8.7,
      returnOnEquity: 14.3,
      profitMargin: 17.8
    },
    savingsOpportunities: [
      {
        id: 'sav-003',
        title: 'Energy Efficiency Program',
        description: 'Implement energy-saving measures across facilities',
        potentialSavings: 5000000,
        implementationCost: 1800000,
        timeToImplement: '12 months',
        riskLevel: 'Medium',
        priority: 'High'
      },
      {
        id: 'sav-004',
        title: 'Supply Chain Optimization',
        description: 'Streamline logistics and reduce warehousing costs',
        potentialSavings: 3500000,
        implementationCost: 900000,
        timeToImplement: '6 months',
        riskLevel: 'Medium',
        priority: 'High'
      }
    ]
  },
  {
    id: '3',
    name: 'Atlantic Shipping Co.',
    logo: '/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png',
    industry: 'Transportation',
    founded: 1972,
    employees: 850,
    annualRevenue: 120000000,
    headquarters: {
      city: 'Halifax',
      province: 'Nova Scotia',
      country: 'Canada'
    },
    description: 'A reliable shipping and logistics company serving eastern Canada and international routes.',
    departments: [
      { name: 'Logistics', budget: 30000000, actualSpend: 29700000 },
      { name: 'Fleet Management', budget: 45000000, actualSpend: 43100000 },
      { name: 'Customer Service', budget: 8000000, actualSpend: 7650000 },
      { name: 'Finance', budget: 6000000, actualSpend: 5950000 },
    ],
    ceo: 'Robert Johnston',
    website: 'atlanticshipping.ca',
    quarterlyData: [
      {
        quarter: 'Q1 2023',
        revenue: 30000000,
        expenses: 25500000,
        profit: 4500000,
        employeeCount: 850,
        customerSatisfaction: 4.1,
        marketShare: 12.3
      },
      {
        quarter: 'Q2 2023',
        revenue: 29800000,
        expenses: 25200000,
        profit: 4600000,
        employeeCount: 845,
        customerSatisfaction: 4.2,
        marketShare: 12.2
      }
    ],
    departmentMetrics: [
      {
        name: 'Logistics',
        budget: 30000000,
        actualSpend: 29700000,
        headcount: 200,
        projectsCompleted: 18,
        efficiency: 93
      },
      {
        name: 'Fleet Management',
        budget: 45000000,
        actualSpend: 43100000,
        headcount: 350,
        projectsCompleted: 22,
        efficiency: 91
      }
    ],
    financialMetrics: {
      revenueYTD: 59800000,
      expensesYTD: 50700000,
      cashFlow: 9100000,
      debtToEquityRatio: 0.41,
      currentRatio: 2.0,
      returnOnAssets: 9.8,
      returnOnEquity: 15.5,
      profitMargin: 15.3
    },
    savingsOpportunities: [
      {
        id: 'sav-005',
        title: 'Fleet Modernization',
        description: 'Replace older vessels with fuel-efficient models',
        potentialSavings: 3500000,
        implementationCost: 12000000,
        timeToImplement: '24 months',
        riskLevel: 'High',
        priority: 'Medium'
      },
      {
        id: 'sav-006',
        title: 'Route Optimization',
        description: 'Implement AI-based route planning to reduce fuel consumption',
        potentialSavings: 1800000,
        implementationCost: 400000,
        timeToImplement: '4 months',
        riskLevel: 'Low',
        priority: 'High'
      }
    ]
  },
];

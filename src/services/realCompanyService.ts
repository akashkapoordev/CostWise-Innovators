
import { CompanyData } from '@/types/company';
import { toast } from 'sonner';

// Static mock data for real companies since the API is having issues
const MOCK_REAL_COMPANIES: Array<{
  symbol: string;
  companyName: string;
  industry: string;
  sector: string;
  country: string;
  description: string;
  ceo: string;
  employees: number;
  marketCap: number;
  price: number;
  exchange: string;
  image: string;
  website: string;
}> = [
  {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    industry: 'Technology',
    sector: 'Consumer Electronics',
    country: 'US',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    ceo: 'Tim Cook',
    employees: 164000,
    marketCap: 3000000000000,
    price: 189.84,
    exchange: 'NASDAQ',
    image: 'https://financialmodelingprep.com/image-stock/AAPL.png',
    website: 'https://www.apple.com'
  },
  {
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    industry: 'Technology',
    sector: 'Software',
    country: 'US',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
    ceo: 'Satya Nadella',
    employees: 221000,
    marketCap: 2800000000000,
    price: 376.04,
    exchange: 'NASDAQ',
    image: 'https://financialmodelingprep.com/image-stock/MSFT.png',
    website: 'https://www.microsoft.com'
  },
  {
    symbol: 'GOOGL',
    companyName: 'Alphabet Inc.',
    industry: 'Technology',
    sector: 'Internet Content & Information',
    country: 'US',
    description: 'Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.',
    ceo: 'Sundar Pichai',
    employees: 156000,
    marketCap: 1800000000000,
    price: 143.96,
    exchange: 'NASDAQ',
    image: 'https://financialmodelingprep.com/image-stock/GOOGL.png',
    website: 'https://abc.xyz'
  },
  {
    symbol: 'AMZN',
    companyName: 'Amazon.com, Inc.',
    industry: 'Consumer Cyclical',
    sector: 'Internet Retail',
    country: 'US',
    description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions through online and physical stores in North America and internationally.',
    ceo: 'Andy Jassy',
    employees: 1540000,
    marketCap: 1700000000000,
    price: 177.23,
    exchange: 'NASDAQ',
    image: 'https://financialmodelingprep.com/image-stock/AMZN.png',
    website: 'https://www.amazon.com'
  },
  {
    symbol: 'META',
    companyName: 'Meta Platforms, Inc.',
    industry: 'Technology',
    sector: 'Internet Content & Information',
    country: 'US',
    description: 'Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, and wearables worldwide.',
    ceo: 'Mark Zuckerberg',
    employees: 86482,
    marketCap: 1200000000000,
    price: 470.00,
    exchange: 'NASDAQ',
    image: 'https://financialmodelingprep.com/image-stock/META.png',
    website: 'https://about.meta.com'
  },
  {
    symbol: 'TSLA',
    companyName: 'Tesla, Inc.',
    industry: 'Consumer Cyclical',
    sector: 'Auto Manufacturers',
    country: 'US',
    description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.',
    ceo: 'Elon Musk',
    employees: 127855,
    marketCap: 750000000000,
    price: 177.00,
    exchange: 'NASDAQ',
    image: 'https://financialmodelingprep.com/image-stock/TSLA.png',
    website: 'https://www.tesla.com'
  },
  {
    symbol: 'NVDA',
    companyName: 'NVIDIA Corporation',
    industry: 'Technology',
    sector: 'Semiconductors',
    country: 'US',
    description: 'NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally.',
    ceo: 'Jensen Huang',
    employees: 26196,
    marketCap: 2000000000000,
    price: 860.00,
    exchange: 'NASDAQ',
    image: 'https://financialmodelingprep.com/image-stock/NVDA.png',
    website: 'https://www.nvidia.com'
  },
  {
    symbol: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    industry: 'Financial Services',
    sector: 'Banks',
    country: 'US',
    description: 'JPMorgan Chase & Co. operates as a financial services company worldwide.',
    ceo: 'Jamie Dimon',
    employees: 293723,
    marketCap: 500000000000,
    price: 198.48,
    exchange: 'NYSE',
    image: 'https://financialmodelingprep.com/image-stock/JPM.png',
    website: 'https://www.jpmorganchase.com'
  },
  {
    symbol: 'V',
    companyName: 'Visa Inc.',
    industry: 'Financial Services',
    sector: 'Credit Services',
    country: 'US',
    description: 'Visa Inc. operates as a payments technology company worldwide.',
    ceo: 'Ryan McInerney',
    employees: 26500,
    marketCap: 510000000000,
    price: 280.60,
    exchange: 'NYSE',
    image: 'https://financialmodelingprep.com/image-stock/V.png',
    website: 'https://www.visa.com'
  },
  {
    symbol: 'WMT',
    companyName: 'Walmart Inc.',
    industry: 'Consumer Defensive',
    sector: 'Discount Stores',
    country: 'US',
    description: 'Walmart Inc. engages in the operation of retail, wholesale, and other units worldwide.',
    ceo: 'Doug McMillon',
    employees: 2100000,
    marketCap: 420000000000,
    price: 60.80,
    exchange: 'NYSE',
    image: 'https://financialmodelingprep.com/image-stock/WMT.png',
    website: 'https://www.walmart.com'
  },
];

// Simplified function to return mock data instead of actually fetching
export const fetchRealCompanyProfiles = async () => {
  try {
    console.log('Providing mock real company data');
    return MOCK_REAL_COMPANIES;
  } catch (error) {
    console.error('Error in mock real company data:', error);
    toast.error('Error loading real company data');
    return [];
  }
};

// Convert API company profiles to our application's CompanyData format
export const convertToCompanyData = (
  profiles: typeof MOCK_REAL_COMPANIES[0][], 
  startId = 100
): CompanyData[] => {
  return profiles.map((profile, index) => {
    const id = (startId + index).toString();
    const revenue = profile.marketCap * 0.25; // Estimated revenue based on market cap
    
    return {
      id,
      name: profile.companyName,
      logo: profile.image || '/lovable-uploads/b3a534bf-4071-4546-b334-e34fadc7d337.png',
      industry: profile.industry || profile.sector || 'Technology',
      founded: new Date().getFullYear() - Math.floor(Math.random() * 30) - 10, // Random founding year
      employees: profile.employees || Math.floor(Math.random() * 50000) + 1000,
      annualRevenue: revenue,
      headquarters: {
        city: profile.country === 'US' ? 'New York' : 'Toronto',
        province: profile.country === 'US' ? 'NY' : 'Ontario',
        country: profile.country === 'US' ? 'United States' : 'Canada'
      },
      description: profile.description || `A leading company in the ${profile.industry || profile.sector} sector.`,
      departments: [
        { name: 'Engineering', budget: revenue * 0.15, actualSpend: revenue * 0.14 },
        { name: 'Marketing', budget: revenue * 0.1, actualSpend: revenue * 0.11 },
        { name: 'Sales', budget: revenue * 0.2, actualSpend: revenue * 0.19 },
        { name: 'Operations', budget: revenue * 0.12, actualSpend: revenue * 0.11 },
      ],
      ceo: profile.ceo || 'Unknown',
      website: profile.website || `${profile.symbol.toLowerCase()}.com`,
      quarterlyData: [
        {
          quarter: 'Q1 2023',
          revenue: revenue * 0.23,
          expenses: revenue * 0.18,
          profit: revenue * 0.05,
          employeeCount: profile.employees || 5000,
          customerSatisfaction: 4.0 + Math.random(),
          marketShare: 5 + Math.random() * 15
        },
        {
          quarter: 'Q2 2023',
          revenue: revenue * 0.25,
          expenses: revenue * 0.19,
          profit: revenue * 0.06,
          employeeCount: (profile.employees || 5000) * 1.02,
          customerSatisfaction: 4.0 + Math.random(),
          marketShare: 5 + Math.random() * 15
        }
      ],
      departmentMetrics: [
        {
          name: 'Engineering',
          budget: revenue * 0.15,
          actualSpend: revenue * 0.14,
          headcount: Math.floor((profile.employees || 5000) * 0.3),
          projectsCompleted: Math.floor(Math.random() * 20) + 10,
          efficiency: Math.floor(Math.random() * 15) + 80
        },
        {
          name: 'Marketing',
          budget: revenue * 0.1,
          actualSpend: revenue * 0.11,
          headcount: Math.floor((profile.employees || 5000) * 0.15),
          projectsCompleted: Math.floor(Math.random() * 10) + 5,
          efficiency: Math.floor(Math.random() * 15) + 80
        }
      ],
      financialMetrics: {
        revenueYTD: revenue * 0.48,
        expensesYTD: revenue * 0.37,
        cashFlow: revenue * 0.11,
        debtToEquityRatio: 0.2 + Math.random() * 0.6,
        currentRatio: 1.5 + Math.random() * 1.5,
        returnOnAssets: 5 + Math.random() * 15,
        returnOnEquity: 10 + Math.random() * 20,
        profitMargin: 10 + Math.random() * 25,
      },
      savingsOpportunities: [
        {
          id: `sav-${id}-001`,
          title: 'Cloud Infrastructure Optimization',
          description: 'Reduce cloud costs through resource optimization and reserved instances',
          potentialSavings: revenue * 0.02,
          implementationCost: revenue * 0.005,
          timeToImplement: '3 months',
          riskLevel: 'Low',
          priority: 'High'
        },
        {
          id: `sav-${id}-002`,
          title: 'Software License Consolidation',
          description: 'Consolidate redundant software licenses across departments',
          potentialSavings: revenue * 0.01,
          implementationCost: revenue * 0.002,
          timeToImplement: '2 months',
          riskLevel: 'Low',
          priority: 'Medium'
        }
      ]
    };
  });
};

// Function to fetch real company data and convert to CompanyData
export const fetchRealCompanies = async (): Promise<CompanyData[]> => {
  try {
    const profiles = await fetchRealCompanyProfiles();
    
    if (profiles.length === 0) {
      throw new Error('No real company data available');
    }
    
    return convertToCompanyData(profiles);
  } catch (error) {
    console.error('Error processing real company data:', error);
    return [];
  }
};

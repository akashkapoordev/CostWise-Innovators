
const faker = require('faker');

// Set locale to Canada
faker.locale = 'en_CA';

// List of common Canadian industries
const CANADIAN_INDUSTRIES = [
  'Energy & Resources',
  'Financial Services',
  'Technology',
  'Manufacturing',
  'Retail',
  'Healthcare',
  'Agriculture',
  'Transportation',
  'Mining',
  'Forestry'
];

// List of Canadian provinces
const CANADIAN_PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan'
];

// Random Canadian city by province
function getRandomCity(province) {
  const citiesByProvince = {
    'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
    'British Columbia': ['Vancouver', 'Victoria', 'Kelowna', 'Surrey'],
    'Manitoba': ['Winnipeg', 'Brandon', 'Steinbach'],
    'New Brunswick': ['Saint John', 'Moncton', 'Fredericton'],
    'Newfoundland and Labrador': ['St. John\'s', 'Mount Pearl', 'Corner Brook'],
    'Nova Scotia': ['Halifax', 'Dartmouth', 'Sydney'],
    'Ontario': ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton', 'London'],
    'Prince Edward Island': ['Charlottetown', 'Summerside'],
    'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
    'Saskatchewan': ['Saskatoon', 'Regina', 'Prince Albert']
  };
  
  const cities = citiesByProvince[province];
  return cities[Math.floor(Math.random() * cities.length)];
}

// Generate quarterly data for a year
function generateQuarterlyData() {
  const currentYear = new Date().getFullYear();
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  
  return quarters.map(quarter => {
    const revenue = faker.datatype.number({ min: 500000, max: 10000000 });
    const expenses = faker.datatype.number({ min: 300000, max: revenue * 0.9 });
    const profit = revenue - expenses;
    
    return {
      quarter: `${quarter} ${currentYear}`,
      revenue,
      expenses,
      profit,
      employeeCount: faker.datatype.number({ min: 50, max: 1000 }),
      customerSatisfaction: faker.datatype.float({ min: 3.0, max: 5.0, precision: 0.1 }),
      marketShare: faker.datatype.float({ min: 1.0, max: 30.0, precision: 0.1 })
    };
  });
}

// Generate department metrics
function generateDepartmentMetrics() {
  const departments = ['Marketing', 'Sales', 'Engineering', 'HR', 'Finance', 'Operations'];
  
  return departments.map(department => {
    const budget = faker.datatype.number({ min: 100000, max: 2000000 });
    const actualSpend = faker.datatype.number({ min: budget * 0.7, max: budget * 1.2 });
    
    return {
      name: department,
      budget,
      actualSpend,
      headcount: faker.datatype.number({ min: 5, max: 100 }),
      projectsCompleted: faker.datatype.number({ min: 1, max: 20 }),
      efficiency: faker.datatype.float({ min: 60, max: 100, precision: 0.1 })
    };
  });
}

// Generate financial metrics
function generateFinancialMetrics() {
  return {
    revenueYTD: faker.datatype.number({ min: 2000000, max: 50000000 }),
    expensesYTD: faker.datatype.number({ min: 1500000, max: 40000000 }),
    cashFlow: faker.datatype.number({ min: -2000000, max: 10000000 }),
    debtToEquityRatio: faker.datatype.float({ min: 0.1, max: 3.0, precision: 0.01 }),
    currentRatio: faker.datatype.float({ min: 0.8, max: 3.0, precision: 0.01 }),
    returnOnAssets: faker.datatype.float({ min: 1, max: 25, precision: 0.1 }),
    returnOnEquity: faker.datatype.float({ min: 5, max: 35, precision: 0.1 }),
    profitMargin: faker.datatype.float({ min: 5, max: 30, precision: 0.1 })
  };
}

// Generate savings opportunities
function generateSavingsOpportunities() {
  const areas = ['Vendor Consolidation', 'Cloud Optimization', 'Travel Expenses', 'Software Licenses', 'Energy Efficiency', 'Process Automation'];
  const count = faker.datatype.number({ min: 2, max: 5 });
  
  return Array.from({ length: count }, () => {
    const area = areas[Math.floor(Math.random() * areas.length)];
    const potentialSavings = faker.datatype.number({ min: 10000, max: 500000 });
    
    return {
      id: faker.datatype.uuid(),
      title: `${area} Optimization`,
      description: `Potential savings through ${area.toLowerCase()} improvements and strategic changes.`,
      potentialSavings,
      implementationCost: potentialSavings * faker.datatype.float({ min: 0.1, max: 0.5, precision: 0.01 }),
      timeToImplement: faker.datatype.number({ min: 1, max: 12 }) + ' months',
      riskLevel: faker.random.arrayElement(['Low', 'Medium', 'High']),
      priority: faker.random.arrayElement(['Low', 'Medium', 'High'])
    };
  });
}

// Generate a complete Canadian company profile
function generateCompanyProfile() {
  const id = faker.datatype.uuid();
  const province = CANADIAN_PROVINCES[Math.floor(Math.random() * CANADIAN_PROVINCES.length)];
  const city = getRandomCity(province);
  const industry = CANADIAN_INDUSTRIES[Math.floor(Math.random() * CANADIAN_INDUSTRIES.length)];
  
  // Generate a Canadian company name
  let companyName;
  const nameFormat = faker.random.number({ min: 1, max: 3 });
  
  if (nameFormat === 1) {
    companyName = `${faker.company.companyName()} Canada`;
  } else if (nameFormat === 2) {
    companyName = `Canadian ${faker.company.companyName()}`;
  } else {
    companyName = `${city} ${faker.company.companyName()}`;
  }
  
  // Generate a plausible founding date (between 1900 and 2020)
  const foundingYear = faker.datatype.number({ min: 1900, max: 2020 });
  
  return {
    id,
    name: companyName,
    logo: `/company-logos/${id}.png`, // Placeholder for company logos
    industry,
    founded: foundingYear,
    headquarters: {
      city,
      province,
      country: 'Canada'
    },
    description: faker.company.catchPhrase(),
    employees: faker.datatype.number({ min: 50, max: 10000 }),
    annualRevenue: faker.datatype.number({ min: 1000000, max: 1000000000 }),
    ceo: faker.name.findName(),
    website: faker.internet.domainName(),
    quarterlyData: generateQuarterlyData(),
    departmentMetrics: generateDepartmentMetrics(),
    financialMetrics: generateFinancialMetrics(),
    savingsOpportunities: generateSavingsOpportunities()
  };
}

// Generate multiple company profiles
function generateCompanyData(count = 4) {
  return Array.from({ length: count }, generateCompanyProfile);
}

module.exports = {
  generateCompanyData
};

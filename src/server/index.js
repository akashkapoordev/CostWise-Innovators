
const express = require('express');
const cors = require('cors');
const { generateCompanyData } = require('./data-generator');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Setup the database
const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

// Initialize DB with data if empty
async function initializeDb() {
  await db.read();
  db.data ||= { companies: [] };
  
  // If no companies exist, generate random Canadian company data
  if (db.data.companies.length === 0) {
    console.log('Generating initial company data...');
    const companies = generateCompanyData(4); // Generate 4 Canadian companies
    db.data.companies = companies;
    await db.write();
    console.log('Database initialized with random company data');
  }
}

// API Routes
app.get('/api/companies', async (req, res) => {
  await db.read();
  res.json(db.data.companies);
});

app.get('/api/companies/:id', async (req, res) => {
  await db.read();
  const company = db.data.companies.find(c => c.id === req.params.id);
  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
});

app.get('/api/metrics/:companyId', async (req, res) => {
  await db.read();
  const company = db.data.companies.find(c => c.id === req.params.companyId);
  if (company) {
    res.json({
      financialMetrics: company.financialMetrics,
      departmentMetrics: company.departmentMetrics,
      quarterlyData: company.quarterlyData
    });
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
});

// Start server
async function startServer() {
  try {
    await initializeDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();

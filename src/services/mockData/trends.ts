
// Generate trends for six months in the past and predict six months into the future
export const generateCostTrends = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  // Past 6 months + current month
  const pastMonths = months.slice(Math.max(0, currentMonth - 6), currentMonth + 1);
  // Future 6 months (might need to loop back to January)
  const futureMonths = [];
  for (let i = 1; i <= 6; i++) {
    const monthIndex = (currentMonth + i) % 12;
    futureMonths.push(months[monthIndex]);
  }
  
  // Generate past data with some randomness
  const pastData = pastMonths.map((month, index) => ({
    month,
    total: 120000 + Math.floor(Math.random() * 20000 - 10000), // Base value with +/- 10k variation
    isProjected: false
  }));
  
  // Calculate average month-to-month change
  let totalChange = 0;
  for (let i = 1; i < pastData.length; i++) {
    totalChange += pastData[i].total - pastData[i-1].total;
  }
  const avgChange = totalChange / (pastData.length - 1);
  
  // Generate future projections with a slight upward trend and some randomness
  const lastActualValue = pastData[pastData.length - 1].total;
  const futureData = futureMonths.map((month, index) => ({
    month,
    total: lastActualValue + avgChange * (index + 1) + Math.floor(Math.random() * 8000 - 4000), // Trending with randomness
    isProjected: true
  }));
  
  return [...pastData, ...futureData];
};

// Export a cost trends array with past and projected data
export const costTrends = generateCostTrends();


// Utility functions for company comparison

// Get color for charts based on index
export const getCompanyColor = (index: number): string => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  return colors[index % colors.length];
};

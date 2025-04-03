
/**
 * Utility functions for formatting data in the application
 */

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param locale - The locale to use for formatting (default: en-US)
 * @param currency - The currency to use (default: USD)
 * @returns A formatted currency string
 */
export const formatCurrency = (
  amount: number, 
  locale = 'en-US', 
  currency = 'USD'
): string => {
  return new Intl.NumberFormat(locale, { 
    style: 'currency', 
    currency 
  }).format(amount);
};

/**
 * Format a date string to a localized date format
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (default: en-US)
 * @param options - Additional options for date formatting
 * @returns A formatted date string
 */
export const formatDate = (
  dateString: string, 
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
): string => {
  return new Date(dateString).toLocaleDateString(locale, options);
};

/**
 * Format a percentage value
 * @param value - The decimal value to format as percentage
 * @param decimalPlaces - Number of decimal places to display (default: 1)
 * @returns A formatted percentage string
 */
export const formatPercentage = (
  value: number,
  decimalPlaces = 1
): string => {
  return `${(value * 100).toFixed(decimalPlaces)}%`;
};

/**
 * Format a number with comma separators and optional decimal places
 * @param num - The number to format
 * @param decimalPlaces - Number of decimal places to display (default: 0)
 * @returns A formatted number string
 */
export const formatNumber = (
  num: number,
  decimalPlaces = 0
): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
};

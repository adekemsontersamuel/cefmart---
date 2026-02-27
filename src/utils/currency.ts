/**
 * Formats a number as Naira currency
 * @param amount - The amount to format
 * @returns Formatted currency string with Naira symbol
 */
export const formatNaira = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2 
  })}`;
};

/**
 * Formats a number as Naira currency without the symbol
 * @param amount - The amount to format
 * @returns Formatted number string
 */
export const formatAmount = (amount: number): string => {
  return amount.toLocaleString('en-NG', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2 
  });
};
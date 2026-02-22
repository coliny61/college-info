// =============================================================================
// Formatting Utilities
// =============================================================================

/**
 * Format a number with thousands separators. Numbers at or above 1,000,000
 * are abbreviated with "M" suffix.
 *
 * @example
 * formatNumber(1000)    // "1,000"
 * formatNumber(1500000) // "1.5M"
 * formatNumber(2000000) // "2M"
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    const millions = num / 1_000_000;
    // Remove trailing zero after decimal (e.g., 2.0 → "2", 1.5 → "1.5")
    return `${parseFloat(millions.toFixed(1))}M`;
  }
  return num.toLocaleString('en-US');
}

/**
 * Format a number as US currency.
 *
 * @example
 * formatCurrency(35000) // "$35,000"
 * formatCurrency(1250)  // "$1,250"
 */
export function formatCurrency(num: number): string {
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/**
 * Format a decimal value as a percentage string.
 *
 * @example
 * formatPercentage(0.85)  // "85%"
 * formatPercentage(0.123) // "12%"
 */
export function formatPercentage(decimal: number): string {
  return `${Math.round(decimal * 100)}%`;
}

/**
 * Format a win-loss record.
 *
 * @example
 * formatRecord(12, 1) // "12-1"
 */
export function formatRecord(wins: number, losses: number): string {
  return `${wins}-${losses}`;
}

/**
 * Format an SAT score. Validates range (400-1600) and returns the string
 * representation. Returns "N/A" for out-of-range values.
 *
 * @example
 * formatSAT(1200) // "1200"
 * formatSAT(200)  // "N/A"
 */
export function formatSAT(score: number): string {
  if (score < 400 || score > 1600) {
    return 'N/A';
  }
  return score.toString();
}

/**
 * Truncate text to a maximum length with an ellipsis.
 * Returns the original text if it is shorter than `maxLength`.
 *
 * @example
 * truncateText("Hello World", 5) // "Hello..."
 * truncateText("Hi", 10)         // "Hi"
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
}

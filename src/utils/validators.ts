// =============================================================================
// Validation Utilities
// =============================================================================

/**
 * Validate an email address using a standard regex pattern.
 *
 * @example
 * isValidEmail("user@example.com") // true
 * isValidEmail("not-an-email")     // false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate a password meets minimum length requirements (6 characters).
 *
 * @example
 * isValidPassword("abc123") // true
 * isValidPassword("abc")    // false
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Validate a display name.
 * - Minimum 2 characters.
 * - Only letters, spaces, and hyphens are allowed.
 *
 * @example
 * isValidName("Marcus Johnson")   // true
 * isValidName("Mary-Jane Watson") // true
 * isValidName("A")                // false
 * isValidName("Name@123")         // false
 */
export function isValidName(name: string): boolean {
  if (name.length < 2) return false;
  const nameRegex = /^[a-zA-Z\s-]+$/;
  return nameRegex.test(name);
}

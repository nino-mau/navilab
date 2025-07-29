/**
 * Capitalize first character of a string
 */
export function capitalizeFirstChar(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

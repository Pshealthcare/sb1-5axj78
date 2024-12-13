/**
 * Formats a person's name with title
 */
export const formatFullName = (title: string, firstName: string, lastName: string, middleName?: string): string => {
  return [title, firstName, middleName, lastName].filter(Boolean).join(' ').trim();
};

/**
 * Formats a person's name without title
 */
export const formatName = (firstName: string, lastName: string, middleName?: string): string => {
  return [firstName, middleName, lastName].filter(Boolean).join(' ').trim();
};

/**
 * Gets initials from a person's name
 */
export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};
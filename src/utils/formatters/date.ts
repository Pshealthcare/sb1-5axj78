import { format, isValid, parseISO } from 'date-fns';

/**
 * Formats a date string to the specified format
 */
export const formatDate = (date: string | Date, formatString: string = 'dd-MMM-yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      throw new Error('Invalid date');
    }
    return format(dateObj, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return format(new Date(), formatString);
  }
};

/**
 * Formats a date string to a human-readable format
 */
export const formatDateHuman = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      throw new Error('Invalid date');
    }
    return format(dateObj, 'MMMM do, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return format(new Date(), 'MMMM do, yyyy');
  }
};

/**
 * Formats a date string to include time
 */
export const formatDateTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      throw new Error('Invalid date');
    }
    return format(dateObj, 'dd-MMM-yyyy HH:mm');
  } catch (error) {
    console.error('Error formatting date:', error);
    return format(new Date(), 'dd-MMM-yyyy HH:mm');
  }
};
import { removeAuthUser } from './storage';

export const clearSession = () => {
  removeAuthUser();
  // Clear any other session-related data
  sessionStorage.clear();
};

export const getSessionTimeout = (): number => {
  return 30 * 60 * 1000; // 30 minutes in milliseconds
};
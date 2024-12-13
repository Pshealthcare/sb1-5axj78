const AUTH_KEY = 'auth_user';

export const saveAuthUser = (user: any) => {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving auth user:', error);
  }
};

export const getAuthUser = () => {
  try {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting auth user:', error);
    return null;
  }
};

export const removeAuthUser = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error('Error removing auth user:', error);
  }
};
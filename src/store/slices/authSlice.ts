import { User } from '../../types';
import { saveAuthUser, removeAuthUser } from '../../utils/auth/storage';

export interface AuthState {
  currentUser: User | null;
}

export interface AuthActions {
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setCurrentUser: (user: User | null) => void;
  changePassword: (userId: string, currentPassword: string, newPassword: string) => boolean;
}

export const createAuthSlice = (set: any, get: any) => ({
  currentUser: null,

  setCurrentUser: (user: User | null) => {
    if (user) {
      saveAuthUser(user);
    } else {
      removeAuthUser();
    }
    set({ currentUser: user });
  },

  login: (username: string, password: string) => {
    const { users, setCurrentUser } = get();
    const user = users.find(
      (u: User) => u.username === username && u.password === password
    );
    
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  },

  logout: () => {
    const { setCurrentUser } = get();
    setCurrentUser(null);
  },

  changePassword: (userId: string, currentPassword: string, newPassword: string) => {
    const { users } = get();
    const user = users.find((u: User) => u.id === userId && u.password === currentPassword);
    
    if (user) {
      const updatedUsers = users.map((u: User) =>
        u.id === userId ? { ...u, password: newPassword } : u
      );
      set({ users: updatedUsers });
      return true;
    }
    return false;
  }
});
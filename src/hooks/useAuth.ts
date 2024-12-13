import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { clearSession } from '../utils/auth/session';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useStore();

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    clearSession();
    navigate('/login');
  }, [navigate, setCurrentUser]);

  return { handleLogout };
};
import { useState, useEffect } from 'react';

interface NotificationOptions {
  duration?: number;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export const useNotification = () => {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationOptions['type'];
    visible: boolean;
  } | null>(null);

  useEffect(() => {
    if (notification?.visible) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message: string, options: NotificationOptions = {}) => {
    const { type = 'info' } = options;
    setNotification({ message, type, visible: true });

    // Play notification sound
    const audio = new Audio('/notification.mp3');
    audio.play().catch(console.error);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    showNotification,
    hideNotification
  };
};
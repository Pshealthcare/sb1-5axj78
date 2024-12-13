export const STORE_NAME = 'healthcare-storage';
export const STORE_VERSION = 1;

export const DEFAULT_SETTINGS = {
  general: {
    hospitalName: 'PS Healthcare',
    address: 'Galaxy Erela Shop no4, Mhalunge, Pune 411045',
    contactNumber: '+1 234 567 8900',
    email: 'info@pshealthcare.com',
  },
  security: {
    passwordExpiryDays: 90,
    sessionTimeoutMinutes: 30,
    enforceStrongPasswords: true,
    twoFactorAuth: false,
  },
  backup: {
    autoBackupFrequency: 'daily',
    encryptBackups: true,
  }
} as const;
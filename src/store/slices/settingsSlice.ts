import { Settings } from '../../types';

const defaultSettings: Settings = {
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
  },
};

export interface SettingsState {
  settings: Settings;
}

export interface SettingsActions {
  updateSettings: (settings: Settings) => void;
}

export const createSettingsSlice = (set: any) => ({
  settings: defaultSettings,
  updateSettings: (settings: Settings) => set({ settings })
});
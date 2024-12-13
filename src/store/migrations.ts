import { StoreState } from './types';

export const migrations = {
  0: (state: Partial<StoreState>) => ({
    ...state,
    paymentHistory: [],
    settings: {
      ...state.settings,
      general: {
        ...state.settings?.general,
        hospitalName: 'PS Healthcare',
        address: 'Galaxy Erela Shop no4, Mhalunge, Pune 411045',
        contactNumber: '+1 234 567 8900',
        email: 'info@pshealthcare.com',
      }
    }
  }),
  1: (state: Partial<StoreState>) => ({
    ...state,
    settings: {
      ...state.settings,
      security: {
        ...state.settings?.security,
        passwordExpiryDays: 90,
        sessionTimeoutMinutes: 30,
        enforceStrongPasswords: true,
        twoFactorAuth: false,
      }
    }
  })
};
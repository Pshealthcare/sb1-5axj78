import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createUserSlice } from './slices/userSlice';
import { createPatientSlice } from './slices/patientSlice';
import { createSettingsSlice } from './slices/settingsSlice';
import { createPaymentSlice } from './slices/paymentSlice';
import { createAppointmentSlice } from './slices/appointmentSlice';
import { createAuthSlice } from './slices/authSlice';
import { STORE_NAME, STORE_VERSION } from './constants';
import { migrations } from './migrations';
import type { StoreState } from './types';

const createStore = (set: any, get: any) => ({
  ...createUserSlice(set, get),
  ...createPatientSlice(set, get),
  ...createSettingsSlice(set),
  ...createPaymentSlice(set, get),
  ...createAppointmentSlice(set, get),
  ...createAuthSlice(set, get)
});

export const useStore = create<StoreState>()(
  persist(
    createStore,
    {
      name: STORE_NAME,
      version: STORE_VERSION,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        let state = persistedState;
        
        for (let v = version; v <= STORE_VERSION; v++) {
          if (migrations[v]) {
            state = migrations[v](state);
          }
        }
        
        return Promise.resolve(state);
      }
    }
  )
);
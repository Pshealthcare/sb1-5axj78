import { UserState, UserActions } from './slices/userSlice';
import { PatientState, PatientActions } from './slices/patientSlice';
import { SettingsState, SettingsActions } from './slices/settingsSlice';
import { PaymentState, PaymentActions } from './slices/paymentSlice';
import { AppointmentState, AppointmentActions } from './slices/appointmentSlice';
import { AuthState, AuthActions } from './slices/authSlice';

export type StoreState = UserState & 
  PatientState & 
  SettingsState & 
  PaymentState & 
  AppointmentState &
  AuthState &
  UserActions & 
  PatientActions & 
  SettingsActions & 
  PaymentActions & 
  AppointmentActions &
  AuthActions;

export interface StoreMigrations {
  [key: number]: (state: Partial<StoreState>) => Partial<StoreState>;
}
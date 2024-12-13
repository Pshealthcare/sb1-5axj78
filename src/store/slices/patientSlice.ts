import { Patient, Invoice, Test, Report } from '../../types';

export interface PatientState {
  patients: Patient[];
  currentPatient: Patient | null;
  tests: Test[];
  invoices: Invoice[];
  reports: Report[];
}

export interface PatientActions {
  addPatient: (patient: Patient) => void;
  removePatient: (prn: string) => void;
  setCurrentPatient: (patient: Patient | null) => void;
  addTest: (test: Test) => void;
  removeTest: (testCode: string) => void;
  addInvoice: (invoice: Invoice) => void;
  addReport: (report: Report) => void;
  updateReport: (report: Report) => void;
  removeReport: (reportId: string) => void;
  getPatientByMobile: (mobile: string) => Patient | undefined;
  getPatientByPRN: (prn: string) => Patient | undefined;
}

export const createPatientSlice = (set: any, get: any) => ({
  patients: [],
  currentPatient: null,
  tests: [],
  invoices: [],
  reports: [],

  addPatient: (patient: Patient) => 
    set((state: PatientState) => ({ 
      patients: [...state.patients, patient],
      currentPatient: patient 
    })),

  removePatient: (prn: string) =>
    set((state: PatientState) => ({
      patients: state.patients.filter(patient => patient.prn !== prn),
      invoices: state.invoices.filter(invoice => invoice.patientId !== prn),
      reports: state.reports.filter(report => report.patientId !== prn)
    })),

  setCurrentPatient: (patient: Patient | null) =>
    set({ currentPatient: patient }),

  addTest: (test: Test) =>
    set((state: PatientState) => ({ 
      tests: [...state.tests, test] 
    })),

  removeTest: (testCode: string) =>
    set((state: PatientState) => ({ 
      tests: state.tests.filter(test => test.code !== testCode) 
    })),

  addInvoice: (invoice: Invoice) =>
    set((state: PatientState) => ({ 
      invoices: [...state.invoices, invoice] 
    })),

  addReport: (report: Report) =>
    set((state: PatientState) => ({
      reports: [...state.reports, report]
    })),

  updateReport: (report: Report) =>
    set((state: PatientState) => ({
      reports: state.reports.map(r => r.id === report.id ? report : r)
    })),

  removeReport: (reportId: string) =>
    set((state: PatientState) => ({
      reports: state.reports.filter(report => report.id !== reportId)
    })),

  getPatientByMobile: (mobile: string) => {
    const { patients } = get();
    return patients.find((p: Patient) => p.mobileNumber === mobile);
  },

  getPatientByPRN: (prn: string) => {
    const { patients } = get();
    return patients.find((p: Patient) => p.prn === prn);
  }
});
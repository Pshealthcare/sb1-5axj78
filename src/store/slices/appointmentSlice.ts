import { Appointment, AppointmentSlot } from '../../types/appointment';

export interface AppointmentState {
  appointments: Appointment[];
  slots: AppointmentSlot[];
}

export interface AppointmentActions {
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  cancelAppointment: (appointmentId: string) => void;
  addSlot: (slot: AppointmentSlot) => void;
  removeSlot: (slotId: string) => void;
  getAppointmentsByPatient: (patientId: string) => Appointment[];
  getAppointmentsByDoctor: (doctorId: string) => Appointment[];
  getAvailableSlots: (doctorId: string, date: string) => AppointmentSlot[];
}

export const createAppointmentSlice = (set: any, get: any) => ({
  appointments: [],
  slots: [],

  addAppointment: (appointment: Appointment) =>
    set((state: AppointmentState) => ({
      appointments: [...state.appointments, appointment],
      slots: state.slots.map(slot =>
        slot.doctorId === appointment.doctorId &&
        slot.date === appointment.date &&
        slot.time === appointment.time
          ? { ...slot, isBooked: true }
          : slot
      )
    })),

  updateAppointment: (appointment: Appointment) =>
    set((state: AppointmentState) => ({
      appointments: state.appointments.map(app =>
        app.id === appointment.id ? appointment : app
      )
    })),

  cancelAppointment: (appointmentId: string) =>
    set((state: AppointmentState) => ({
      appointments: state.appointments.map(app =>
        app.id === appointmentId ? { ...app, status: 'cancelled' } : app
      ),
      slots: state.slots.map(slot => {
        const appointment = state.appointments.find(a => a.id === appointmentId);
        if (appointment &&
            slot.doctorId === appointment.doctorId &&
            slot.date === appointment.date &&
            slot.time === appointment.time) {
          return { ...slot, isBooked: false };
        }
        return slot;
      })
    })),

  addSlot: (slot: AppointmentSlot) =>
    set((state: AppointmentState) => ({
      slots: [...state.slots, slot]
    })),

  removeSlot: (slotId: string) =>
    set((state: AppointmentState) => ({
      slots: state.slots.filter(slot => slot.id !== slotId)
    })),

  getAppointmentsByPatient: (patientId: string) => {
    const { appointments } = get();
    return appointments.filter((app: Appointment) => app.patientId === patientId);
  },

  getAppointmentsByDoctor: (doctorId: string) => {
    const { appointments } = get();
    return appointments.filter((app: Appointment) => app.doctorId === doctorId);
  },

  getAvailableSlots: (doctorId: string, date: string) => {
    const { slots } = get();
    return slots.filter(
      (slot: AppointmentSlot) =>
        slot.doctorId === doctorId &&
        slot.date === date &&
        !slot.isBooked
    );
  }
});
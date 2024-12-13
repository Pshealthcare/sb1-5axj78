export interface Patient {
  prn: string;
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  gender: string;
  mobileNumber: string;
  address: string;
  registrationDate: string;
  registeredBy: string;
}
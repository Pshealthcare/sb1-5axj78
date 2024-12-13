export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'staff';
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  designation: string;
  contactNumber: string;
  email: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  contactNumber: string;
  email: string;
}
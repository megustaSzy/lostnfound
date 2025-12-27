export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  notelp: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

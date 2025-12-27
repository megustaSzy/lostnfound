import { api } from "@/lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
    token: string;
    refreshToken: string;
  };
}


export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post("/api/auth/login", payload);
  return res.data;
}

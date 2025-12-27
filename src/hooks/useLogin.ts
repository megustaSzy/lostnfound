import { useState } from "react";
import { login } from "@/services/authService";
import { AxiosError } from "axios";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  const submitLogin = async (payload: { email: string; password: string }) => {
    setLoading(true);

    try {
      const res = await login(payload);
      return res;
    } catch (err) {
      let message = "Login gagal. Silakan coba lagi.";

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          message = "Email atau password salah";
        }
      }

      throw new Error(message);
    } finally {
      setLoading(false); // ⬅️ INI PENTING
    }
  };

  return { submitLogin, loading };
}

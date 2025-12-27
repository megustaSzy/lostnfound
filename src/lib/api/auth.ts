import { api } from "../api";
import { ApiError } from "@/error/ApiError";
import { SignupFormData, User } from "@/types/auth";

interface RegisterResponse {
  user: User;
  message: string;
}

export async function submitRegister(
  data: SignupFormData
): Promise<RegisterResponse> {
  try {
    const res = await api.post("/api/auth/register", data);
    return res.data as RegisterResponse;
  } catch (err: unknown) {
    let message = "Gagal melakukan registrasi.";

    if (err instanceof Error && "response" in err) {
      const axiosErr = err as any;
      message = axiosErr.response?.data?.message ?? message;
      throw new ApiError(message, axiosErr.response?.status ?? 500);
    }

    throw new ApiError(message, 500);
  }
}

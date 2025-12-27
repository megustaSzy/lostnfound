import { api } from "@/lib/api";
import { User } from "@/types/user";

export type UpdateUserPayload = Partial<{
  name: string;
  email: string;
  password: string;
  notelp: string;
  role: string;
}>;

export async function patchUser(
  id: number,
  payload: UpdateUserPayload
): Promise<User> {
  const res = await api.patch(`/api/users/${id}`, payload);
  return res.data.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/api/users/${id}`);
}

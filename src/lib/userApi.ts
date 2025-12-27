import { api } from "@/lib/api";
import { User } from "@/hooks/useUser";

export async function getAllUsers(): Promise<User[]> {
  const res = await api.get<{ users: User[] }>("/api/users");
  return res.data.users;
}

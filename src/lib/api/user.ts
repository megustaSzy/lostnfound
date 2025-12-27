import { api } from "../api";
import { User } from "@/types/user";

interface GetUsersResponse {
  users: User[];
}

export async function fetchUsers(): Promise<User[]> {
  const res = await api.get<GetUsersResponse>("/api/users");
  return res.data.users;
}

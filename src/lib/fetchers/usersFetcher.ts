// lib/fetchers/usersFetcher.ts
import { api } from "@/lib/api";
import { UserResponse } from "@/types/user";

export const usersFetcher = (url: string): Promise<UserResponse> =>
  api.get(url).then((res) => res.data.data);

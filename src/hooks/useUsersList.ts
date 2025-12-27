"use client";

import useSWR from "swr";
import { fetchUsers } from "@/lib/api/user";
import { User } from "@/types/user";

export function useUsersList() {
  const { data, error, isValidating } = useSWR<User[]>(
    "/api/users",
    fetchUsers,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3000, // optimal
    }
  );

  return {
    users: data,
    error,
    isValidating,
    isLoading: !data && !error,
  };
}

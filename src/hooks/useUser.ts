"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";

export interface User {
  id: number;
  name: string;
  email: string;
  notelp: string;
  role: "Admin" | "User";
  imageUrl?: string;
  imagePublicId?: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const abortRef = useRef<AbortController | null>(null);

  const fetchUser = async () => {
    // Batalkan request sebelumnya (jika ada)
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

    try {
      const res = await api.get<{
        success: boolean;
        message: string;
        data: User;
      }>("/api/users/profile", {
        signal: controller.signal,
      });

      setUser(res.data.data);
    } catch (err: any) {
      // Abaikan error akibat abort
      if (err.name !== "CanceledError" && err.name !== "AbortError") {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    return () => {
      // Abort saat unmount
      abortRef.current?.abort();
    };
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  return { user, loading, refreshUser };
}

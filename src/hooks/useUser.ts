"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { authEvent } from "@/lib/authEvents";
import { User } from "@/types/user";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const fetchUser = async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await api.get("/api/users/profile", {
        signal: controller.signal,
      });

      setUser(res.data.data);
    } catch (err: any) {
      if (err.name !== "CanceledError" && err.name !== "AbortError") {
        setUser(null);
      }
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleLogout = () => {
      abortRef.current?.abort();
      setUser(null);
      setInitialized(true);
    };

    authEvent.addEventListener("logout", handleLogout);

    return () => {
      abortRef.current?.abort();
      authEvent.removeEventListener("logout", handleLogout);
    };
  }, []);

  return {
    user,
    loading: !initialized,
    refreshUser: fetchUser,
  };
}

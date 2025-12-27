"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.role === "Admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    }
  }, [user, loading, router]);

  // Ganti div biasa dengan fullscreen loader
  return <FullscreenLoader message="Memeriksa sesi pengguna..." />;
}

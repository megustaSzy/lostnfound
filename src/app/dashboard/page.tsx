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
        router.replace("/login"); 
      } else if (user.role === "Admin") {
        router.replace("/dashboard/admin");
      } else {
        router.replace("/dashboard/user");
      }
    }
  }, [user, loading, router]);

  // Loader tetap ditampilkan selama cek user
  return <FullscreenLoader message="Memeriksa sesi pengguna..." />;
}

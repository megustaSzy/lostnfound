"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";

export function withAuth<P extends object = object>(
  Component: React.ComponentType<P>
) {
  return function ProtectedComponent(props: P) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [loading, user, router]);

    // pakai FullscreenLoader
    if (loading || !user) {
      return (
        <FullscreenLoader
          message="Memuat data pengguna..."
          validating={false}
        />
      );
    }

    return <Component {...props} />;
  };
}

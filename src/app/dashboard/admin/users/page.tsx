"use client";

import { useState } from "react";
import useSWR from "swr";
import { useUser } from "@/hooks/useUser";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { UsersCard } from "@/components/admin/users/UsersCard";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { Pagination } from "@/components/admin/users/Pagination";
import { UnauthenticatedAlert } from "@/components/errors/UnauthenticatedAlert";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";
import { usersFetcher } from "@/lib/fetchers/usersFetcher";

export default function UsersPage() {
  const { user, loading } = useUser();
  const [page, setPage] = useState(1);
  const limit = 10;

  const swrKey = user ? `/api/users?page=${page}&limit=${limit}` : null;

  const { data, error, isLoading } = useSWR(swrKey, usersFetcher, {
    revalidateOnFocus: false,
  });

  if (loading) {
    return <FullscreenLoader message="Memuat data user..." />;
  }

  if (!user) {
    return <UnauthenticatedAlert />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        role={user.role}
        user={{ name: user.name, email: user.email }}
      />
      <SidebarInset>
        <SiteHeader />

        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Pengguna
            </h1>
            <p className="text-muted-foreground">
              Kelola dan pantau semua pengguna terdaftar
            </p>
          </div>

          <UsersCard>
            <UsersTable
              users={data?.items ?? []}
              currentPage={data?.current_page ?? 1}
              limit={data?.limit && data.limit > 0 ? data.limit : 10}
              isLoading={isLoading}
              error={error}
              swrKey={swrKey!}
            />

            {data && data.total_pages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={data.current_page}
                  totalPages={data.total_pages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </UsersCard>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

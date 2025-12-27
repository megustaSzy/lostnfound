// app/dashboard/admin/users/page.tsx
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
  const { user, loading: userLoading } = useUser();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error } = useSWR(
    `/api/users?page=${page}&limit=${limit}`,
    usersFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (userLoading) return <FullscreenLoader validating={false} />;
  if (!user) return <UnauthenticatedAlert />;

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
              limit={data?.limit && data.limit > 0 ? data.limit : 10} // jangan sampai 0
              isLoading={!data && !error}
              error={error}
            />

            {data && data.total_pages > 1 ? (
              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={data.current_page > 0 ? data.current_page : 1}
                  totalPages={data.total_pages}
                  onPageChange={setPage}
                />
              </div>
            ) : null}
          </UsersCard>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

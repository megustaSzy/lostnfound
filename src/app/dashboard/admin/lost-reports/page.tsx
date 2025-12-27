"use client";

import { useUser } from "@/hooks/useUser";
import LostReportsTable from "@/components/admin/lost-reports/LostReportsTable";

import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";

export default function LostReportsPage() {
  const { user, loading } = useUser();

  // Loading user
  if (loading) {
    return <FullscreenLoader message="Memuat data user..." />;
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Tidak ada akses. Silakan login kembali.
        </p>
      </div>
    );
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
      {/* Sidebar */}
      <AppSidebar
        role={user.role}
        user={{
          name: user.name,
          email: user.email,
        }}
      />

      <SidebarInset>
        {/* Header */}
        <SiteHeader />

        {/* MAIN CONTENT */}
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Laporan Hilang
            </h1>
            <p className="text-muted-foreground">
              Kelola dan tinjau semua laporan barang hilang
            </p>
          </div>

          <LostReportsTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

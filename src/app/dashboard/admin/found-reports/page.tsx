"use client";

import { useUser } from "@/hooks/useUser";
import FoundReportAdminTable from "@/components/admin/FoundReportAdminTable";

import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";
import { UnauthenticatedAlert } from "@/components/errors/UnauthenticatedAlert";

export default function FoundReportsAdminPage() {
  const { user, loading } = useUser();

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
        user={{
          name: user.name,
          email: user.email,
        }}
      />

      <SidebarInset>
        <SiteHeader />

        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              Laporan Ditemukan
            </h1>
            <p className="text-slate-500">
              Kelola dan tinjau semua laporan barang yang ditemukan
            </p>
          </div>

          <FoundReportAdminTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

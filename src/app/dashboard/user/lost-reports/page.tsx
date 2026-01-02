"use client";

import LostReportTable from "@/components/user/lost-reports/LostReportTable";
import { useUser } from "@/hooks/useUser";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";

import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";
import { UnauthenticatedAlert } from "@/components/errors/UnauthenticatedAlert";

export default function LostReportsPage() {
  const { user, loading } = useUser();

  if (loading) {
    return <FullscreenLoader message="Memuat data pengguna..." />;
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
              Laporan Hilang Saya
            </h1>
            <p className="text-muted-foreground">
              Kelola dan pantau laporan barang hilang Anda
            </p>
          </div>

          <LostReportTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

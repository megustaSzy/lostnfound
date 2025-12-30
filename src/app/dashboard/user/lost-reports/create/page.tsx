"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";

import LostReportForm from "@/components/user/lost-reports/LostReportForm";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";

import { useUser } from "@/hooks/useUser";

export default function LostReportCreatePage() {
  const { user, loading: userLoading } = useUser();

  if (userLoading || !user) {
    return (
      <FullscreenLoader
        message={
          userLoading
            ? "Memuat data pengguna..."
            : "Tidak ada akses. Silakan login kembali."
        }
      />
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
      <AppSidebar
        role={user.role}
        user={{ name: user.name, email: user.email }}
      />

      <SidebarInset>
        <SiteHeader />

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Buat Laporan Hilang
            </h1>
            <p className="text-sm text-muted-foreground">
              Lengkapi informasi barang yang hilang untuk diproses admin
            </p>
          </div>

          {/* Form */}
          <LostReportForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

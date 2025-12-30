"use client";

import { useUser } from "@/hooks/useUser";
import useSWR from "swr";

import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";

import { adminDashboardFetcher } from "@/lib/fetchers/adminDashboardFetcher";

import { StatsCards } from "@/components/dashboard/admin/StatsCards";
import { ReportsChart } from "@/components/dashboard/admin/ReportsCharts";
import { SummaryCard } from "@/components/dashboard/admin/SummaryCard";

export default function AdminDashboard() {
  const { user, loading: userLoading } = useUser();
  const { data, isLoading } = useSWR(
    "/api/dashboard/admin",
    adminDashboardFetcher
  );

  if (userLoading || isLoading) {
    return <FullscreenLoader message="Memuat dashboard admin..." />;
  }

  if (!user) {
    return <FullscreenLoader message="Anda harus login..." />;
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

        <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard Admin
            </h1>
            <p className="text-muted-foreground">
              Pantau dan kelola seluruh aktivitas sistem
            </p>
          </div>

          {/* Stats */}
          <StatsCards lost={data.lost} found={data.found} user={data.user} />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportsChart
              lost={data.lost}
              found={data.found}
              user={data.user}
            />
            <SummaryCard lost={data.lost} found={data.found} user={data.user} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

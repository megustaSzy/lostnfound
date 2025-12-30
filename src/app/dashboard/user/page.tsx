"use client";

import { useUser } from "@/hooks/useUser";
import useSWR from "swr";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";

import { FileSearch, CheckCircle2 } from "lucide-react";
import { userDashboardFetcher } from "@/lib/fetchers/userDashboardFetcher";

import { StatsCards } from "@/components/dashboard/user/StatsCards";
import { ReportsChart } from "@/components/dashboard/user/ReportsChart";
import { SummaryCard } from "@/components/dashboard/user/SummaryCard";

export default function UserDashboard() {
  const { user, loading: userLoading } = useUser();

  const { data } = useSWR(
    user ? "/api/dashboard/user" : null,
    userDashboardFetcher
  );

  if (userLoading || !user || !data) {
    return <FullscreenLoader message="Memuat dashboard user..." />;
  }

  const statsData = [
    {
      title: "Laporan Hilang Saya",
      value: data.myLost,
      icon: FileSearch,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      gradient: "from-orange-400 to-orange-600",
      bgGradient: "bg-gradient-to-br from-orange-50 to-orange-100",
    },
    {
      title: "Laporan Ditemukan",
      value: data.found,
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      gradient: "from-emerald-400 to-emerald-600",
      bgGradient: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    },
  ];

  const chartData = [
    { name: "Hilang Saya", jumlah: data.myLost, fill: "#f97316" },
    { name: "Ditemukan", jumlah: data.found, fill: "#10b981" },
  ];

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
              Dashboard Saya
            </h1>
            <p className="text-muted-foreground">
              Pantau laporan hilang dan perkembangan penemuan barang
            </p>
          </div>

          <StatsCards statsData={statsData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportsChart chartData={chartData} />
            <SummaryCard
              totalReports={data.myLost + data.found}
              foundReports={data.found}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

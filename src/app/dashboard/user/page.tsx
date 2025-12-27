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

  const isDashboardLoading = userLoading || !user || !data;

  if (isDashboardLoading) {
    return <FullscreenLoader message="Memuat dashboard user..." />;
  }

  const statsData = [
    {
      title: "Laporan Hilang Saya",
      value: data.myLost,
      icon: FileSearch,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Laporan Ditemukan",
      value: data.found,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      iconColor: "text-emerald-600",
    },
  ];

  const chartData = [
    { name: "Hilang Saya", jumlah: data.myLost, fill: "#f97316" },
    { name: "Ditemukan", jumlah: data.found, fill: "#10b981" },
  ];

  const totalReports = data.myLost + data.found;

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

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-black">Dashboard User</h1>
            <p className="text-slate-600 text-lg">
              Pantau laporan hilang Anda dan statistik terkait
            </p>
          </div>

          <StatsCards statsData={statsData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportsChart chartData={chartData} />
            <SummaryCard
              totalReports={totalReports}
              foundReports={data.found}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

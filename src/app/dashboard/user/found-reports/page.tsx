"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useFoundReports } from "@/hooks/useFoundReports";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";

import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";
import { UnauthenticatedAlert } from "@/components/errors/UnauthenticatedAlert";

import FoundReportsUserTable from "@/components/found-reports/FoundReportsTable";
import { FoundReportsDetailDialog } from "@/components/found-reports/FoundReportsDetailDialog";

import { FoundReportUser } from "@/types/found";

export default function UserFoundReportPage() {
  const { user, loading } = useUser();
  const [page, setPage] = useState(1);
  const limit = 10;

  const shouldFetch = !!user && !loading;
  const { data, error, isLoading } = useFoundReports(shouldFetch, page, limit);

  const [selectedReport, setSelectedReport] = useState<FoundReportUser | null>(
    null
  );

  if (loading) {
    return (
      <FullscreenLoader
        validating={false}
        message="Memuat data laporan user..."
      />
    );
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
          {/* Header Section */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Laporan Barang Ditemukan
            </h1>
            <p className="text-muted-foreground">
              Kelola dan pantau laporan barang ditemukan yang Anda buat
            </p>
          </div>

          {/* Table Component */}
          <FoundReportsUserTable
            data={data?.items}
            error={error}
            isLoading={isLoading}
            onSelectReport={setSelectedReport}
            currentPage={data?.current_page}
            limit={data?.limit}
            onPageChange={setPage}
            totalPages={data?.total_pages}
          />
        </div>

        <FoundReportsDetailDialog
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}

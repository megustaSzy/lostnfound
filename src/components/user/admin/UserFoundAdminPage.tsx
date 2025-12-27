"use client";

import useSWR from "swr";
import { api } from "@/lib/api";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";
import AdminFoundTable from "@/components/user/admin/AdminFoundTable";
import AdminFoundDetailModal from "@/components/user/admin/AdminFoundDetailModal";

import { AdminFoundReport } from "@/types/foundReports";

const fetcher = (url: string) =>
  api.get(url).then((res) => res.data.data as AdminFoundReport[]);

export default function UserFoundAdminPage() {
  const { data, error, isValidating } = useSWR(
    "/found/foundreports/admin",
    fetcher
  );
  const [selectedReport, setSelectedReport] = useState<AdminFoundReport | null>(
    null
  );
  const isLoading = !data && !error;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Laporan Penemuan Barang</CardTitle>
        <CardDescription>Barang yang ditemukan oleh admin</CardDescription>
      </CardHeader>

      <CardContent className="relative">
        {(isLoading || isValidating) && (
          <FullscreenLoader
            validating={isValidating}
            message={isLoading ? "Memuat..." : "Memperbarui..."}
          />
        )}

        {error ? (
          <p className="text-red-600">Gagal memuat laporan.</p>
        ) : isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : data && data.length > 0 ? (
          <AdminFoundTable data={data} onSelectReport={setSelectedReport} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-semibold">Belum ada laporan penemuan</p>
            <p className="text-sm text-muted-foreground">
              Laporan dari admin akan muncul di sini
            </p>
          </div>
        )}
      </CardContent>

      <AdminFoundDetailModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </Card>
  );
}

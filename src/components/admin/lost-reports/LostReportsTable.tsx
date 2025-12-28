"use client";

import useSWR from "swr";
import { useState } from "react";
import { lostReportsFetcher } from "@/lib/fetchers/lostReportsFetcher";
import {
  LostReportAdmin,
  LostReportsPagination,
} from "@/types/lostReportAdmin";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Check, X, MapPin, FileSearch } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { LostReportsDetailDialog } from "./LostReportsDetailDialog";
import { LostReportsConfirmDialog } from "./LostReportsConfirmDialog";
import { LostReportsStatusBadge } from "./LostReportsStatusBadge";
import { Pagination } from "../users/Pagination";
import { api } from "@/lib/api";
import { mutate as globalMutate } from "swr";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default function LostReportsTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isValidating, mutate } = useSWR<
    LostReportsPagination,
    Error
  >(`/api/lost?page=${page}&limit=${limit}`, lostReportsFetcher, {
    revalidateOnFocus: false,
  });

  const [loadingAction, setLoadingAction] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<LostReportAdmin | null>(
    null
  );
  const [confirmAction, setConfirmAction] = useState<{
    id: number;
    status: "APPROVED" | "REJECTED";
  } | null>(null);

  const showSkeleton = !data || isValidating;

  async function handleStatus(id: number, status: "APPROVED" | "REJECTED") {
    setLoadingAction(id);
    try {
      await api.patch(`/api/lost/${id}/status`, { status });

      mutate(
        (prev) =>
          prev
            ? {
                ...prev,
                items: prev.items.map((r) =>
                  r.id === id ? { ...r, status } : r
                ),
              }
            : prev,
        false
      );

      globalMutate(
        "/api/lost/me",
        (prev: any) =>
          prev?.map((r: any) => (r.id === id ? { ...r, status } : r)),
        false
      );
    } finally {
      setLoadingAction(null);
      setConfirmAction(null);
    }
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <p className="text-destructive">Gagal memuat laporan.</p>
        </CardContent>
      </Card>
    );
  }

  if (showSkeleton) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  // Empty state tetap pakai Card
  if (!data || data.items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daftar Laporan</CardTitle>
          <CardDescription>Tinjau laporan pengguna</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-14 text-center">
          <FileSearch className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">
            Belum ada laporan kehilangan
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Laporan</CardTitle>
          <CardDescription>Tinjau laporan pengguna</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                {/* ===== TABLE HEADER ===== */}
                <TableHeader>
                  <TableRow className="bg-gray-50 border-b border-gray-200">
                    <TableHead className="w-[60px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      No
                    </TableHead>
                    <TableHead className="min-w-[200px] text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Barang
                    </TableHead>
                    <TableHead className="min-w-[200px] text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Lokasi
                    </TableHead>
                    <TableHead className="min-w-[180px] text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Pelapor
                    </TableHead>
                    <TableHead className="w-[140px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Tanggal
                    </TableHead>
                    <TableHead className="w-[120px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="w-[140px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {/* ===== TABLE BODY ===== */}
                <TableBody className="divide-y divide-gray-200">
                  {data.items.map((r, i) => (
                    <TableRow
                      key={r.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* No */}
                      <TableCell className="px-4 py-4 text-center text-sm font-medium text-gray-900">
                        {(data.current_page - 1) * data.limit + (i + 1)}
                      </TableCell>

                      {/* Barang */}
                      <TableCell className="px-4 py-4">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                          {r.namaBarang}
                        </p>
                      </TableCell>

                      {/* Lokasi */}
                      <TableCell className="px-4 py-4">
                        <div className="flex items-start gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-gray-400 mt-0.5 shrink-0" />
                          <span className="text-xs text-gray-600 leading-tight line-clamp-2">
                            {r.lokasiHilang}
                          </span>
                        </div>
                      </TableCell>

                      {/* Pelapor */}
                      <TableCell className="px-4 py-4">
                        <p className="text-sm font-medium text-gray-900 leading-tight">
                          {r.user?.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {r.user?.email}
                        </p>
                      </TableCell>

                      {/* Tanggal */}
                      <TableCell className="px-4 py-4 text-center">
                        <p className="text-xs font-medium text-gray-600">
                          {r.tanggal
                            ? formatDate(r.tanggal)
                            : r.createdAt
                            ? formatDate(r.createdAt)
                            : "-"}
                        </p>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-4 py-4 text-center">
                        <LostReportsStatusBadge status={r.status} />
                      </TableCell>

                      {/* Aksi */}
                      <TableCell className="px-4 py-4">
                        <div className="flex justify-center gap-1.5">
                          {r.status === "PENDING" && (
                            <>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 hover:bg-green-50 hover:border-green-300"
                                disabled={loadingAction === r.id}
                                onClick={() =>
                                  setConfirmAction({
                                    id: r.id,
                                    status: "APPROVED",
                                  })
                                }
                              >
                                {loadingAction === r.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                                ) : (
                                  <Check className="h-4 w-4 text-green-600" />
                                )}
                              </Button>

                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 hover:bg-red-50 hover:border-red-300"
                                disabled={loadingAction === r.id}
                                onClick={() =>
                                  setConfirmAction({
                                    id: r.id,
                                    status: "REJECTED",
                                  })
                                }
                              >
                                {loadingAction === r.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-600" />
                                )}
                              </Button>
                            </>
                          )}

                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 hover:bg-blue-50 hover:border-blue-300"
                            onClick={() => setSelectedReport(r)}
                          >
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          {data.total_pages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={data.current_page ?? 1}
                totalPages={data.total_pages ?? 1}
                onPageChange={setPage}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <LostReportsDetailDialog
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
      <LostReportsConfirmDialog
        action={confirmAction}
        onCancel={() => setConfirmAction(null)}
        onConfirm={() =>
          confirmAction && handleStatus(confirmAction.id, confirmAction.status)
        }
      />
    </>
  );
}

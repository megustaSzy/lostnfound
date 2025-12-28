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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-center">No</TableHead>
                  <TableHead className="text-center">Barang</TableHead>
                  <TableHead className="text-center">Lokasi</TableHead>
                  <TableHead className="text-center">Pelapor</TableHead>
                  <TableHead className="text-center">Tanggal</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.items.map((r, i) => (
                  <TableRow
                    key={r.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      {(data.current_page - 1) * data.limit + (i + 1)}
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-sm">{r.namaBarang}</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{r.lokasiHilang}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <p className="font-medium">{r.user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.user?.email}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.tanggal
                        ? formatDate(r.tanggal)
                        : r.createdAt
                        ? formatDate(r.createdAt)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <LostReportsStatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        {r.status === "PENDING" && (
                          <>
                            <Button
                              size="icon"
                              variant="outline"
                              disabled={loadingAction === r.id}
                              onClick={() =>
                                setConfirmAction({
                                  id: r.id,
                                  status: "APPROVED",
                                })
                              }
                            >
                              {loadingAction === r.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              disabled={loadingAction === r.id}
                              onClick={() =>
                                setConfirmAction({
                                  id: r.id,
                                  status: "REJECTED",
                                })
                              }
                            >
                              {loadingAction === r.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </Button>
                          </>
                        )}
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => setSelectedReport(r)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

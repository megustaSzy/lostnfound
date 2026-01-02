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

  /* ================= ERROR ================= */
  if (error) {
    return (
      <Card>
        <CardContent>
          <p className="text-destructive text-sm">Gagal memuat laporan.</p>
        </CardContent>
      </Card>
    );
  }

  /* ================= SKELETON ================= */
  if (showSkeleton) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  /* ================= EMPTY ================= */
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

  /* ================= TABLE ================= */
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Laporan</CardTitle>
          <CardDescription>Tinjau laporan pengguna</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table className="table-fixed w-full text-sm">
              <TableHeader>
                <TableRow className="bg-muted/50 border-b">
                  <TableHead className="w-[50px] text-center text-xs font-semibold uppercase text-muted-foreground">
                    No
                  </TableHead>
                  <TableHead className="w-[130px] text-center text-xs font-semibold uppercase text-muted-foreground">
                    Barang
                  </TableHead>
                  <TableHead className="w-[150px] text-center text-xs font-semibold uppercase text-muted-foreground">
                    Lokasi
                  </TableHead>
                  <TableHead className="w-[170px] text-center text-xs font-semibold uppercase text-muted-foreground">
                    Pelapor
                  </TableHead>
                  <TableHead className="w-[140px] text-center text-xs font-semibold uppercase text-muted-foreground">
                    Tanggal
                  </TableHead>
                  <TableHead className="w-[110px] text-center text-xs font-semibold uppercase text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="w-[130px] text-center text-xs font-semibold uppercase text-muted-foreground">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.items.map((r, i) => (
                  <TableRow key={r.id} className="border-b">
                    {/* NO */}
                    <TableCell className="text-center font-medium">
                      {(data.current_page - 1) * data.limit + (i + 1)}
                    </TableCell>

                    {/* BARANG */}
                    <TableCell className="align-top text-left">
                      <p className="font-medium text-sm break-words line-clamp-2 text-center">
                        {r.namaBarang}
                      </p>
                    </TableCell>

                    {/* LOKASI */}
                    <TableCell className="text-center align-top">
                      <div className="flex justify-center items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="line-clamp-1 break-all">
                          {r.lokasiHilang}
                        </span>
                      </div>
                    </TableCell>

                    {/* PELAPOR */}
                    <TableCell className="text-center align-top">
                      <p className="font-medium">{r.user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {r.user?.email}
                      </p>
                    </TableCell>

                    {/* TANGGAL */}
                    <TableCell className="text-center">
                      {formatDate(r.tanggal ?? r.createdAt)}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="text-center">
                      <LostReportsStatusBadge status={r.status} />
                    </TableCell>

                    {/* AKSI */}
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center gap-2">
                        {r.status === "PENDING" && (
                          <>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 hover:border-green-400"
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
                                <Check className="h-4 w-4 text-green-600" />
                              )}
                            </Button>

                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 hover:border-red-400"
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
                                <X className="h-4 w-4 text-red-600" />
                              )}
                            </Button>
                          </>
                        )}

                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
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

          {data.total_pages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={data.current_page}
                totalPages={data.total_pages}
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

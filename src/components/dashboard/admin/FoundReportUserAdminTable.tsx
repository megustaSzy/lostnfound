"use client";

import useSWR from "swr";
import { useState } from "react";
import { adminFoundFetcher } from "@/lib/fetchers/adminFoundFetcher";
import {
  AdminFoundReport,
  AdminFoundReportsPagination,
} from "@/types/foundReports";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { FileSearch, MapPin, Eye } from "lucide-react";
import { Pagination } from "@/components/admin/users/Pagination";
import { FoundReportUserAdminDialog } from "@/components/dashboard/admin/FoundReportUserAdminDialog";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default function FoundReportUserAdminTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isValidating } = useSWR<
    AdminFoundReportsPagination,
    Error
  >(
    `/api/found/foundreports/admin?page=${page}&limit=${limit}`,
    adminFoundFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
      shouldRetryOnError: false,
    }
  );

  const [selectedReport, setSelectedReport] = useState<AdminFoundReport | null>(
    null
  );
  const isInitialLoading = !data && !error;

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-destructive">Gagal memuat data laporan.</p>
      </div>
    );
  }

  const getStatusBadge = (status?: string) => {
    const variants = {
      PENDING: { variant: "secondary" as const, label: "Pending" },
      CLAIMED: { variant: "default" as const, label: "Ditemukan" },
      APPROVED: { variant: "default" as const, label: "Disetujui" },
      REJECTED: { variant: "destructive" as const, label: "Ditolak" },
    };
    return (
      variants[status as keyof typeof variants] || {
        variant: "secondary",
        label: status || "Unknown",
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Laporan Penemuan</CardTitle>
        <CardDescription>
          Laporan barang yang telah ditemukan oleh admin
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isInitialLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : data && data.items.length > 0 ? (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="table-fixed w-full">
                {/* ===== HEADER ===== */}
                <TableHeader>
                  <TableRow className="bg-muted/50 border-b">
                    <TableHead className="w-[60px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      No
                    </TableHead>
                    <TableHead className="w-[120px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      Barang
                    </TableHead>
                    <TableHead className="w-[180px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      Deskripsi
                    </TableHead>
                    <TableHead className="w-[140px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      Lokasi
                    </TableHead>
                    <TableHead className="w-[140px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      Tanggal
                    </TableHead>
                    <TableHead className="w-[80px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="w-[100px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      Detail
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {/* ===== BODY ===== */}
                <TableBody className="divide-y">
                  {data.items.map((report, idx) => {
                    const status = getStatusBadge(report.statusFound);

                    return (
                      <TableRow
                        key={report.id}
                        className="hover:bg-muted/40 transition-colors"
                      >
                        {/* No */}
                        <TableCell className="text-center text-sm font-medium">
                          {(data.current_page - 1) * data.limit + (idx + 1)}
                        </TableCell>

                        {/* Barang */}
                        <TableCell className="text-center">
                          <p className="text-sm font-semibold line-clamp-1">
                            {report.namaBarang}
                          </p>
                        </TableCell>

                        {/* Deskripsi */}
                        <TableCell className="text-center">
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {report.deskripsi || "-"}
                          </p>
                        </TableCell>

                        {/* Lokasi */}
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="text-xs text-muted-foreground line-clamp-1">
                              {report.lokasiTemu}
                            </span>
                          </div>
                        </TableCell>

                        {/* Tanggal */}
                        <TableCell className="text-center">
                          <p className="text-xs font-medium text-muted-foreground">
                            {report.tanggal
                              ? formatDate(report.tanggal)
                              : report.createdAt
                              ? formatDate(report.createdAt)
                              : "-"}
                          </p>
                        </TableCell>

                        {/* Status */}
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Badge variant={status.variant}>
                              {status.label}
                            </Badge>
                          </div>
                        </TableCell>

                        {/* Detail */}
                        <TableCell className="text-center">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <FileSearch className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              Belum ada laporan penemuan
            </p>
          </div>
        )}

        {/* Pagination */}
        {data && data.total_pages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={data.current_page}
              totalPages={data.total_pages}
              onPageChange={setPage}
            />
          </div>
        )}
      </CardContent>

      {/* Detail Dialog */}
      <FoundReportUserAdminDialog
        selectedReport={selectedReport}
        setSelectedReport={setSelectedReport}
      />
    </Card>
  );
}

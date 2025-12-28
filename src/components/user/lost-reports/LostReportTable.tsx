"use client";

import useSWR from "swr";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { FileSearch, MapPin, Eye, PlusCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/admin/users/Pagination";

import { LostReport } from "@/types/lostReports";
import {
  lostReportsMeFetcher,
  LostReportsPagination,
} from "@/lib/fetchers/lostReportsMeFetcher";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default function LostReportTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error } = useSWR<LostReportsPagination, Error>(
    `/api/lost/me?page=${page}&limit=${limit}`,
    lostReportsMeFetcher,
    { revalidateOnFocus: false }
  );

  const [selectedReport, setSelectedReport] = useState<LostReport | null>(null);

  const isLoading = !data && !error;

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: { variant: "secondary" as const, label: "Menunggu" },
      APPROVED: { variant: "default" as const, label: "Disetujui" },
      REJECTED: { variant: "destructive" as const, label: "Ditolak" },
    };
    return variants[status as keyof typeof variants] || variants.PENDING;
  };

  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between gap-4 md:flex-row">
          <div>
            <CardTitle>Laporan Barang Hilang Saya</CardTitle>
            <CardDescription>
              Daftar semua laporan barang hilang Anda
            </CardDescription>
          </div>

          <Button asChild className="gap-2">
            <Link href="/dashboard/user/lost-reports/create">
              <PlusCircle className="h-4 w-4" />
              Buat Laporan Baru
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          {error ? (
            <div className="flex flex-col items-center py-14 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <p className="text-sm text-destructive">Gagal memuat laporan.</p>
            </div>
          ) : isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : data?.items.length ? (
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="table-fixed w-full">
                  {/* ===== HEADER ===== */}
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-gray-200">
                      <TableHead className="w-[60px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        No
                      </TableHead>
                      <TableHead className="w-[180px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Barang
                      </TableHead>
                      <TableHead className="w-[240px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Deskripsi
                      </TableHead>
                      <TableHead className="w-[200px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Lokasi
                      </TableHead>
                      <TableHead className="w-[160px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Tanggal
                      </TableHead>
                      <TableHead className="w-[120px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </TableHead>
                      <TableHead className="w-[120px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  {/* ===== BODY ===== */}
                  <TableBody className="divide-y divide-gray-200">
                    {data.items.map((report, idx) => (
                      <TableRow
                        key={report.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* No */}
                        <TableCell className="px-4 py-4 text-center text-sm font-medium text-gray-900">
                          {(data.current_page - 1) *
                            (data.limit > 0 ? data.limit : 10) +
                            (idx + 1)}
                        </TableCell>

                        {/* Barang */}
                        <TableCell className="px-4 py-4 text-center">
                          <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                            {report.namaBarang}
                          </p>
                        </TableCell>

                        {/* Deskripsi */}
                        <TableCell className="px-4 py-4 text-center">
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {report.deskripsi}
                          </p>
                        </TableCell>

                        {/* Lokasi */}
                        <TableCell className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                            <span className="text-xs text-gray-600 line-clamp-1">
                              {report.lokasiHilang}
                            </span>
                          </div>
                        </TableCell>

                        {/* Tanggal */}
                        <TableCell className="px-4 py-4 text-center">
                          <p className="text-xs font-medium text-gray-600">
                            {report.tanggal
                              ? formatDate(report.tanggal)
                              : report.createdAt
                              ? formatDate(report.createdAt)
                              : "-"}
                          </p>
                        </TableCell>

                        {/* Status */}
                        <TableCell className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <Badge
                              variant={getStatusBadge(report.status).variant}
                            >
                              {getStatusBadge(report.status).label}
                            </Badge>
                          </div>
                        </TableCell>

                        {/* Aksi */}
                        <TableCell className="px-4 py-4 text-center">
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
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-14 text-center">
              <FileSearch className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Anda belum membuat laporan barang hilang
              </p>
              <Button asChild className="gap-2">
                <Link href="/dashboard/user/lost-reports/create">
                  <PlusCircle className="h-4 w-4" />
                  Buat Laporan Pertama
                </Link>
              </Button>
            </div>
          )}

          {data && (data?.total_pages ?? 0) > 1 && (
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

      {/* Modal detail */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={(open) => !open && setSelectedReport(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Laporan</DialogTitle>
            <DialogDescription>
              Informasi lengkap laporan Anda
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6">
              {selectedReport.imageUrl && (
                <img
                  src={selectedReport.imageUrl}
                  alt={selectedReport.namaBarang}
                  className="max-h-64 mx-auto rounded-lg border"
                />
              )}
              <div className="grid gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    Nama Barang
                  </label>
                  <p className="font-semibold">{selectedReport.namaBarang}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Deskripsi
                  </label>
                  <p className="text-sm">{selectedReport.deskripsi}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p>{selectedReport.lokasiHilang}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Tanggal Hilang
                  </label>
                  <p className="text-sm">
                    {selectedReport.tanggal
                      ? formatDate(selectedReport.tanggal)
                      : "-"}
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <Badge
                    variant={getStatusBadge(selectedReport.status).variant}
                  >
                    {getStatusBadge(selectedReport.status).label}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

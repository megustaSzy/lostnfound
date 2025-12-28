"use client";

import useSWR from "swr";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileSearch, MapPin, Eye, User, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { Pagination } from "@/components/admin/users/Pagination";

import { FoundReportAdmin } from "@/types/foundReportAdmin";
import {
  foundReportsAdminFetcher,
  FoundReportsAdminPagination,
} from "@/lib/fetchers/foundReportsAdminFetcher";

export default function FoundReportAdminTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error } = useSWR<FoundReportsAdminPagination, Error>(
    `/api/found/foundreports/admin?page=${page}&limit=${limit}`,
    foundReportsAdminFetcher,
    { revalidateOnFocus: false }
  );

  const [selectedReport, setSelectedReport] = useState<FoundReportAdmin | null>(
    null
  );

  const isLoading = !data && !error;

  const reports = data?.items ?? [];
  const currentPage =
    data?.current_page && data.current_page > 0 ? data.current_page : 1;
  const totalPages =
    data?.total_pages && data.total_pages > 0 ? data.total_pages : 1;
  const rowLimit = data?.limit ?? limit;

  const getStatusBadge = (status?: string) => {
    const variants = {
      PENDING: { variant: "secondary" as const, label: "Pending" },
      CLAIMED: { variant: "default" as const, label: "Ditemukan" },
      APPROVED: { variant: "default" as const, label: "Disetujui" },
    };
    return (
      variants[status as keyof typeof variants] || {
        variant: "secondary",
        label: status || "Unknown",
      }
    );
  };

  const getNamaBarang = (r: FoundReportAdmin) =>
    r.lostReport?.namaBarang || r.namaBarang || "-";
  const getDeskripsi = (r: FoundReportAdmin) =>
    r.lostReport?.deskripsi || r.deskripsi || "-";
  const getLokasi = (r: FoundReportAdmin) =>
    r.lostReport?.lokasiHilang || r.lokasiTemu || "-";
  const getPelapor = (r: FoundReportAdmin) =>
    r.lostReport?.user?.name || "Admin";
  const getTelp = (r: FoundReportAdmin) => r.lostReport?.user?.notelp || "";
  const getAvatarLetter = (r: FoundReportAdmin) =>
    r.lostReport?.user?.name?.charAt(0).toUpperCase() || "A";

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-destructive">Gagal memuat data laporan.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Laporan Barang Ditemukan</CardTitle>
        <CardDescription>
          Tinjau laporan barang yang telah ditemukan
        </CardDescription>
      </CardHeader>

      <CardContent>
        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <FileSearch className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              Belum ada laporan barang ditemukan
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="table-fixed w-full">
                {/* ===== HEADER ===== */}
                <TableHeader>
                  <TableRow className="bg-gray-50 border-b border-gray-200">
                    <TableHead className="w-[60px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      No
                    </TableHead>
                    <TableHead className="w-[160px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Barang
                    </TableHead>
                    <TableHead className="w-[160px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Deskripsi
                    </TableHead>
                    <TableHead className="w-[120px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Lokasi
                    </TableHead>
                    <TableHead className="w-[160px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Pelapor
                    </TableHead>
                    <TableHead className="w-[120px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="w-[100px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Detail
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {/* ===== BODY ===== */}
                <TableBody className="divide-y divide-gray-200">
                  {reports.map((report, idx) => (
                    <TableRow
                      key={report.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* No */}
                      <TableCell className="px-4 py-4 text-center text-sm font-medium text-gray-900">
                        {(currentPage - 1) * rowLimit + (idx + 1)}
                      </TableCell>

                      {/* Barang */}
                      <TableCell className="px-4 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                          {getNamaBarang(report)}
                        </p>
                      </TableCell>

                      {/* Deskripsi */}
                      <TableCell className="px-4 py-4 text-center">
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {getDeskripsi(report)}
                        </p>
                      </TableCell>

                      {/* Lokasi */}
                      <TableCell className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                          <span className="text-xs text-gray-600 line-clamp-1">
                            {getLokasi(report)}
                          </span>
                        </div>
                      </TableCell>

                      {/* Pelapor */}
                      <TableCell className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {getAvatarLetter(report)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-center leading-tight">
                            <p className="text-sm font-medium text-gray-900">
                              {getPelapor(report)}
                            </p>
                            {getTelp(report) && (
                              <p className="text-xs text-gray-500">
                                {getTelp(report)}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-4 py-4 text-center">
                        <div className="flex justify-center">
                          <Badge
                            variant={getStatusBadge(report.statusFound).variant}
                          >
                            {getStatusBadge(report.statusFound).label}
                          </Badge>
                        </div>
                      </TableCell>

                      {/* Detail */}
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
        )}
      </CardContent>

      {reports.length > 0 && totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Detail Laporan</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    Nama Barang
                  </label>
                  <p className="font-semibold">
                    {getNamaBarang(selectedReport)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Deskripsi
                  </label>
                  <p className="text-sm">{getDeskripsi(selectedReport)}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p>{getLokasi(selectedReport)}</p>
                </div>
                <div className="pt-4 border-t">
                  <label className="text-sm text-muted-foreground">
                    Pelapor
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-2 items-center">
                      <User className="h-4 w-4" />
                      <span>{getPelapor(selectedReport)}</span>
                    </div>
                    {getTelp(selectedReport) && (
                      <div className="flex gap-2 items-center">
                        <Phone className="h-4 w-4" />
                        <span>{getTelp(selectedReport)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReport(null)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

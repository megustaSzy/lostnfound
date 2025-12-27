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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-center">No</TableHead>
                  <TableHead>Barang</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Pelapor</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Detail</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {reports.map((report, idx) => (
                  <TableRow
                    key={report.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      {(currentPage - 1) * rowLimit + (idx + 1)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {getNamaBarang(report)}
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate text-sm text-muted-foreground">
                      {getDeskripsi(report)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{getLokasi(report)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {getAvatarLetter(report)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="leading-tight">
                          <p className="text-sm font-medium">
                            {getPelapor(report)}
                          </p>
                          {getTelp(report) && (
                            <p className="text-xs text-muted-foreground">
                              {getTelp(report)}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={getStatusBadge(report.statusFound).variant}
                      >
                        {getStatusBadge(report.statusFound).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        variant="outline"
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

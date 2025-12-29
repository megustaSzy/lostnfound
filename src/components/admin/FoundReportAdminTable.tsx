"use client";

import useSWR, { mutate } from "swr";
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
import {
  FileSearch,
  MapPin,
  Eye,
  User,
  Phone,
  Pencil,
  Trash2,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { FoundReportAdmin } from "@/types/foundReportAdmin";
import {
  foundReportsAdminFetcher,
  FoundReportsAdminPagination,
} from "@/lib/fetchers/foundReportsAdminFetcher";
import { DeleteFoundReportAdmin } from "@/components/admin/DeleteFoundReportAdmin";
import { EditFoundReportAdmin } from "@/components/admin/EditFoundReportAdmin";
import { useEffect } from "react";
export default function FoundReportAdminTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const swrKey = `/api/found/foundreports/admin?page=${page}&limit=${limit}`;

  const { data, error } = useSWR<FoundReportsAdminPagination, Error>(
    swrKey,
    foundReportsAdminFetcher,
    { revalidateOnFocus: false }
  );

  const [selectedReport, setSelectedReport] = useState<FoundReportAdmin | null>(
    null
  );

  const [editOpen, setEditOpen] = useState(false);

  const [editReport, setEditReport] = useState<FoundReportAdmin | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteReport, setDeleteReport] = useState<FoundReportAdmin | null>(
    null
  );
  // const [isDeleting, setIsDeleting] = useState(false)

  const isLoading = !data && !error && page === 1;

  const reports = data?.items ?? [];
  const currentPage = data?.current_page ?? 1;
  const totalPages = data?.total_pages ?? 1;
  const rowLimit = data?.limit ?? limit;
  useEffect(() => {
    if (data && data.items.length === 0 && page > 1) {
      setPage(1);
    }
  }, [data, page]);

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
          <div className="rounded-lg border overflow-hidden">
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-center">No</TableHead>
                  <TableHead className="text-center">Barang</TableHead>
                  <TableHead className="text-center">Deskripsi</TableHead>
                  <TableHead className="text-center">Lokasi</TableHead>
                  <TableHead className="text-center">Pelapor</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[140px] text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {reports.map((report, idx) => (
                  <TableRow key={report.id}>
                    <TableCell className="text-center">
                      {(currentPage - 1) * rowLimit + (idx + 1)}
                    </TableCell>

                    <TableCell className="text-center font-semibold">
                      {getNamaBarang(report)}
                    </TableCell>

                    <TableCell className="text-center text-xs">
                      {getDeskripsi(report)}
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1 items-center">
                        <MapPin className="h-4 w-4" />
                        {getLokasi(report)}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {getAvatarLetter(report)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">{getPelapor(report)}</p>
                          {getTelp(report) && (
                            <p className="text-xs">{getTelp(report)}</p>
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
                      <div className="flex justify-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => setSelectedReport(report)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => {
                            setEditReport(report);
                            setEditOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => {
                            setDeleteReport(report);
                            setDeleteOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <EditFoundReportAdmin
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setEditReport(null);
        }}
        report={editReport}
        swrKey={swrKey}
      />

      <DeleteFoundReportAdmin
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeleteReport(null);
        }}
        report={deleteReport}
        swrKey={swrKey}
      />

      {/* ================= DETAIL ================= */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Detail Laporan</DialogTitle>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4">
              <p>
                <b>Barang:</b> {getNamaBarang(selectedReport)}
              </p>
              <p>
                <b>Deskripsi:</b> {getDeskripsi(selectedReport)}
              </p>
              <p>
                <b>Lokasi:</b> {getLokasi(selectedReport)}
              </p>
              <p>
                <b>Pelapor:</b> {getPelapor(selectedReport)}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setSelectedReport(null)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

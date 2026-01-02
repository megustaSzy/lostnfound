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
import { Skeleton } from "@/components/ui/skeleton";
import { FileSearch, MapPin, Eye, PlusCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/admin/users/Pagination";

import { LostReport } from "@/types/lostReports";
import {
  lostReportsMeFetcher,
  LostReportsPagination,
} from "@/lib/fetchers/lostReportsMeFetcher";
import { LostReportDialog } from "./LostReportDialog";

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
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  {/* ===== BODY ===== */}
                  <TableBody className="divide-y">
                    {data.items.map((report, idx) => (
                      <TableRow
                        key={report.id}
                        className="hover:bg-muted/40 transition-colors"
                      >
                        {/* No */}
                        <TableCell className="text-center text-sm font-medium">
                          {(data.current_page - 1) *
                            (data.limit > 0 ? data.limit : 10) +
                            (idx + 1)}
                        </TableCell>

                        {/* Barang */}
                        <TableCell className="text-center">
                          <p className="text-sm font-semibold line-clamp-1">
                            {report.namaBarang}
                          </p>
                        </TableCell>

                        {/* Deskripsi */}
                        <TableCell className="text-center">
                          <p className="text-sm font-medium text-muted-foreground break-words whitespace-normal line-clamp-2">
                            {report.deskripsi}
                          </p>
                        </TableCell>

                        {/* Lokasi */}
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm font-medium text-muted-foreground">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span className="break-words whitespace-normal line-clamp-1">
                              {report.lokasiHilang}
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
                            <Badge
                              variant={getStatusBadge(report.status).variant}
                            >
                              {getStatusBadge(report.status).label}
                            </Badge>
                          </div>
                        </TableCell>

                        {/* Aksi */}
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
      <LostReportDialog
        selectedReport={selectedReport}
        setSelectedReport={setSelectedReport}
      />
    </>
  );
}

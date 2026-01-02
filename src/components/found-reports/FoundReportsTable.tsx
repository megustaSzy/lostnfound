"use client";

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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { FileSearch, MapPin, Eye } from "lucide-react";

import { FoundReportUser } from "@/types/found";
import { Pagination } from "@/components/admin/users/Pagination";

interface Props {
  data?: FoundReportUser[];
  error?: Error;
  isLoading: boolean;
  onSelectReport: (report: FoundReportUser) => void;

  currentPage?: number;
  totalPages?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
}

export default function FoundReportsTable({
  data,
  error,
  isLoading,
  onSelectReport,
  currentPage = 1,
  totalPages = 1,
  limit = 10,
  onPageChange,
}: Props) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "Gagal mengambil data laporan"}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daftar Barang Ditemukan</CardTitle>
          <CardDescription>Sedang memuat laporan...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Barang Ditemukan</CardTitle>
        <CardDescription>
          Tinjau laporan barang yang telah ditemukan
        </CardDescription>
      </CardHeader>

      <CardContent>
        {data && data.length > 0 ? (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="table-fixed w-full">
                {/* ===== HEADER ===== */}
                <TableHeader>
                  <TableRow className="bg-muted/50 border-b">
                    <TableHead className="w-[60px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      No
                    </TableHead>

                    <TableHead className="w-[180px] text-left text-xs font-semibold uppercase text-muted-foreground">
                      Barang
                    </TableHead>

                    <TableHead className="w-[260px] text-left text-xs font-semibold uppercase text-muted-foreground">
                      Deskripsi
                    </TableHead>

                    <TableHead className="w-[200px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      Lokasi
                    </TableHead>

                    <TableHead className="w-[120px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      Status
                    </TableHead>

                    <TableHead className="w-[100px] text-center text-xs font-semibold uppercase text-muted-foreground">
                      Detail
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {/* ===== BODY ===== */}
                <TableBody className="divide-y">
                  {data.map((report, idx) => (
                    <TableRow
                      key={report.id}
                      className="hover:bg-muted/40 transition-colors align-top"
                    >
                      {/* No */}
                      <TableCell className="w-[60px] text-center text-sm font-medium align-top">
                        {(currentPage - 1) * limit + (idx + 1)}
                      </TableCell>

                      {/* Barang */}
                      <TableCell className="w-[180px] align-top">
                        <p className="text-sm font-semibold break-words whitespace-normal line-clamp-2">
                          {report.namaBarang}
                        </p>
                      </TableCell>

                      {/* Deskripsi */}
                      <TableCell className="w-[260px] align-top">
                        <p className="text-sm text-muted-foreground break-words whitespace-normal line-clamp-3">
                          {report.deskripsi || "-"}
                        </p>
                      </TableCell>

                      {/* Lokasi */}
                      <TableCell className="w-[200px] align-top">
                        <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="text-sm break-words whitespace-normal line-clamp-2">
                            {report.lokasiTemu}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="w-[120px] text-center align-top">
                        <div className="flex justify-center">
                          <Badge variant="default">Ditemukan</Badge>
                        </div>
                      </TableCell>

                      {/* Detail */}
                      <TableCell className="w-[100px] text-center align-top">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => onSelectReport(report)}
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
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <FileSearch className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Belum ada laporan barang ditemukan
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && onPageChange && (
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

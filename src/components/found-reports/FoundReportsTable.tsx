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
                    <TableHead className="w-[120px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="w-[80px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Detail
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {/* ===== BODY ===== */}
                <TableBody className="divide-y divide-gray-200">
                  {data.map((report, idx) => (
                    <TableRow
                      key={report.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* No */}
                      <TableCell className="px-4 py-4 text-center text-sm font-medium text-gray-900">
                        {(currentPage - 1) * limit + (idx + 1)}
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
                          {report.deskripsi || "-"}
                        </p>
                      </TableCell>

                      {/* Lokasi */}
                      <TableCell className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                          <span className="text-xs text-gray-600 line-clamp-1">
                            {report.lokasiTemu}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-4 py-4 text-center">
                        <div className="flex justify-center">
                          <Badge variant="default">Ditemukan</Badge>
                        </div>
                      </TableCell>

                      {/* Detail */}
                      <TableCell className="px-4 py-4 text-center">
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

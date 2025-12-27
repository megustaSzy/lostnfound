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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-center">No</TableHead>
                  <TableHead>Barang</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center w-[80px]">Detail</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((report, idx) => (
                  <TableRow key={report.id} className="hover:bg-muted/50">
                    <TableCell className="text-center font-medium">
                      {(currentPage - 1) * limit + (idx + 1)}
                    </TableCell>

                    <TableCell className="font-medium">
                      {report.namaBarang}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                      {report.deskripsi || "-"}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{report.lokasiTemu}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge variant="default">Ditemukan</Badge>
                    </TableCell>

                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        variant="outline"
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

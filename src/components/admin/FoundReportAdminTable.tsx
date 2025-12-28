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
import { FileSearch, MapPin, Eye, User, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/admin/users/Pagination";

import { FoundReportAdmin } from "@/types/foundReportAdmin";
import {
  foundReportsAdminFetcher,
  FoundReportsAdminPagination,
} from "@/lib/fetchers/foundReportsAdminFetcher";

/* ===============================
   EDIT FORM COMPONENT
================================ */
function EditFoundForm({
  report,
  onSuccess,
}: {
  report: FoundReportAdmin;
  onSuccess: () => void;
}) {
  const [status, setStatus] = useState(report.statusFound);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await fetch(`/api/found/${report.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ statusFound: status }),
      });

      onSuccess();
    } catch {
      alert("Gagal update laporan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm">Status</label>
        <select
          className="w-full border rounded p-2"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "PENDING" | "APPROVED" | "CLAIMED")
          }
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Disetujui</option>
          <option value="CLAIMED">Ditemukan</option>
        </select>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onSuccess}>
          Batal
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </DialogFooter>
    </div>
  );
}

/* ===============================
   MAIN TABLE COMPONENT
================================ */
export default function FoundReportAdminTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [selectedReport, setSelectedReport] = useState<FoundReportAdmin | null>(
    null
  );
  const [editReport, setEditReport] = useState<FoundReportAdmin | null>(null);

  const { data, error } = useSWR<FoundReportsAdminPagination>(
    `/api/found/foundreports/admin?page=${page}&limit=${limit}`,
    foundReportsAdminFetcher,
    { revalidateOnFocus: false }
  );

  const reports = data?.items ?? [];
  const currentPage = data?.current_page ?? 1;
  const totalPages = data?.total_pages ?? 1;
  const rowLimit = data?.limit ?? limit;

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus laporan ini?")) return;

    try {
      await fetch(`/api/found/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      mutate(`/api/found/foundreports/admin?page=${page}&limit=${limit}`);
    } catch {
      alert("Gagal menghapus laporan");
    }
  };

  /* ===============================
     LOADING & ERROR
  ================================ */
  if (!data && !error) {
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
        <p className="text-sm text-destructive">Gagal memuat data laporan</p>
      </div>
    );
  }

  /* ===============================
     RENDER
  ================================ */
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
          <div className="flex flex-col items-center py-14">
            <FileSearch className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              Belum ada laporan barang ditemukan
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="text-center">Barang</TableHead>
                <TableHead className="text-center">Deskripsi</TableHead>
                <TableHead className="text-center">Lokasi</TableHead>
                <TableHead className="text-center">Pelapor</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reports.map((r, i) => (
                <TableRow key={r.id}>
                  <TableCell className="text-center">
                    {(currentPage - 1) * rowLimit + i + 1}
                  </TableCell>

                  <TableCell className="text-center">
                    {r.namaBarang || "-"}
                  </TableCell>

                  <TableCell className="text-center">
                    {r.deskripsi || "-"}
                  </TableCell>

                  <TableCell className="text-center">
                    {r.lokasiTemu || "-"}
                  </TableCell>

                  <TableCell className="text-center">
                    <Avatar className="mx-auto h-8 w-8">
                      <AvatarFallback>
                        {r.lostReport?.user?.name?.[0] ?? "A"}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge>{r.statusFound}</Badge>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setSelectedReport(r)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => setEditReport(r)}
                      >
                        ✏️
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(r.id.toString())}
                      >
                        🗑️
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* DETAIL */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Laporan</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* EDIT */}
      <Dialog open={!!editReport} onOpenChange={() => setEditReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Laporan</DialogTitle>
          </DialogHeader>

          {editReport && (
            <EditFoundForm
              report={editReport}
              onSuccess={() => {
                setEditReport(null);
                mutate(
                  `/api/found/foundreports/admin?page=${page}&limit=${limit}`
                );
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

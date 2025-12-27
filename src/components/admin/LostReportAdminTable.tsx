// components/Admin/LostReportAdminTable.tsx
"use client";
import useSWR, { SWRResponse } from "swr";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Check,
  X,
  Eye,
  Loader2,
  AlertCircle,
  FileSearch,
  MapPin,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useState } from "react";

import { LostReportAdmin } from "@/types/lostReportAdmin";

const fetcher = (url: string): Promise<LostReportAdmin[]> =>
  api.get(url).then((res) => res.data.data as LostReportAdmin[]);

export default function LostReportAdminTable() {
  const {
    data,
    error,
    mutate,
    isValidating,
  }: SWRResponse<LostReportAdmin[], Error> = useSWR("/api/lost", fetcher);

  const [loadingAction, setLoadingAction] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<LostReportAdmin | null>(
    null
  );
  const [alertAction, setAlertAction] = useState<{
    id: number;
    status: "APPROVED" | "REJECTED";
  } | null>(null);

  const isLoading = !data && !error;

  const handleStatus = async (id: number, status: "APPROVED" | "REJECTED") => {
    setLoadingAction(id);
    setAlertAction(null);
    try {
      await api.patch(`/api/lost/${id}/status`, { status });
      mutate();
    } catch {
      alert("Gagal memperbarui status laporan");
    } finally {
      setLoadingAction(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: { variant: "secondary" as const, label: "Pending" },
      APPROVED: { variant: "default" as const, label: "Disetujui" },
      REJECTED: { variant: "destructive" as const, label: "Ditolak" },
    };
    return variants[status as keyof typeof variants] || variants.PENDING;
  };

  return (
    <>
      {(isLoading || isValidating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-lg bg-background p-6 shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Memuat data..." : "Memperbarui data..."}
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Daftar Laporan Barang Hilang</CardTitle>
          <CardDescription>
            Tinjau dan setujui laporan barang hilang yang diajukan pengguna
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Gagal memuat data laporan. Silakan coba lagi.
              </AlertDescription>
            </Alert>
          ) : isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : data && data.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">No</TableHead>
                    <TableHead>Barang</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Pelapor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((report, idx) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {report.imageUrl ? (
                            <Avatar className="h-12 w-12 rounded-md">
                              <AvatarImage
                                src={report.imageUrl}
                                alt={report.namaBarang}
                                className="object-cover"
                              />
                              <AvatarFallback className="rounded-md">
                                {report.namaBarang.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                              <FileSearch className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{report.namaBarang}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="truncate text-sm text-muted-foreground">
                          {report.deskripsi}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {report.lokasiHilang}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {report.user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {report.user.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {report.user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(report.status).variant}>
                          {getStatusBadge(report.status).label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          {report.status === "PENDING" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600 hover:border-green-600 transition-all duration-200 hover:scale-110"
                                onClick={() =>
                                  setAlertAction({
                                    id: report.id,
                                    status: "APPROVED",
                                  })
                                }
                                disabled={loadingAction === report.id}
                              >
                                {loadingAction === report.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-all duration-200 hover:scale-110"
                                onClick={() =>
                                  setAlertAction({
                                    id: report.id,
                                    status: "REJECTED",
                                  })
                                }
                                disabled={loadingAction === report.id}
                              >
                                {loadingAction === report.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <X className="h-4 w-4" />
                                )}
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all duration-200 hover:scale-110"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileSearch className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Belum ada laporan</h3>
              <p className="text-sm text-muted-foreground">
                Laporan barang hilang akan muncul di sini
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog Detail */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Laporan Barang Hilang</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang laporan barang hilang
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              {selectedReport.imageUrl && (
                <div className="flex justify-center">
                  <img
                    src={selectedReport.imageUrl}
                    alt={selectedReport.namaBarang}
                    className="max-h-64 rounded-lg border object-cover"
                  />
                </div>
              )}
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Nama Barang
                  </label>
                  <p className="text-lg font-semibold">
                    {selectedReport.namaBarang}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Deskripsi
                  </label>
                  <p className="text-sm">{selectedReport.deskripsi}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Lokasi Hilang
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{selectedReport.lokasiHilang}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <div className="mt-1">
                    <Badge
                      variant={getStatusBadge(selectedReport.status).variant}
                    >
                      {getStatusBadge(selectedReport.status).label}
                    </Badge>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <label className="text-sm font-medium text-muted-foreground">
                    Informasi Pelapor
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedReport.user.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedReport.user.email}
                      </span>
                    </div>

                    {selectedReport.user.notelp && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {selectedReport.user.notelp}
                        </span>
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

      {/* Alert Dialog */}
      <AlertDialog
        open={!!alertAction}
        onOpenChange={() => setAlertAction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {alertAction?.status === "APPROVED"
                ? "Setujui Laporan?"
                : "Tolak Laporan?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertAction?.status === "APPROVED"
                ? "Laporan ini akan disetujui dan ditampilkan kepada pengguna lain."
                : "Laporan ini akan ditolak dan tidak akan ditampilkan."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                alertAction && handleStatus(alertAction.id, alertAction.status)
              }
              className={
                alertAction?.status === "REJECTED"
                  ? "bg-red-600 hover:bg-red-700"
                  : ""
              }
            >
              {alertAction?.status === "APPROVED" ? "Setujui" : "Tolak"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// app/dashboard/admin/lost-reports/page.tsx

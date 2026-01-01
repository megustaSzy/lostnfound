"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LostReport } from "@/types/lostReports";

const getStatusBadge = (status: string) => {
  const variants = {
    PENDING: { variant: "secondary" as const, label: "Menunggu" },
    APPROVED: { variant: "default" as const, label: "Disetujui" },
    REJECTED: { variant: "destructive" as const, label: "Ditolak" },
  };
  return variants[status as keyof typeof variants] || variants.PENDING;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export function LostReportDialog({
  selectedReport,
  setSelectedReport,
}: {
  selectedReport: LostReport | null;
  setSelectedReport: (r: LostReport | null) => void;
}) {
  if (!selectedReport) return null;

  return (
    <Dialog
      open={!!selectedReport}
      onOpenChange={(open) => !open && setSelectedReport(null)}
    >
      <DialogContent className="max-w-xl rounded-lg p-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-bold">
            Detail Laporan
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Informasi lengkap laporan Anda
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          {/* IMAGE */}
          {selectedReport.imageUrl && (
            <div className="flex justify-center">
              <img
                src={selectedReport.imageUrl}
                alt={selectedReport.namaBarang}
                className="max-h-64 rounded-lg border object-contain"
              />
            </div>
          )}

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama Barang */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Nama Barang</p>
              <p className="font-semibold">{selectedReport.namaBarang}</p>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={getStatusBadge(selectedReport.status).variant}>
                {getStatusBadge(selectedReport.status).label}
              </Badge>
            </div>

            {/* Deskripsi */}
            <div className="md:col-span-2 space-y-1">
              <p className="text-sm text-muted-foreground">Deskripsi</p>
              <p className="text-sm leading-relaxed">
                {selectedReport.deskripsi || "-"}
              </p>
            </div>

            {/* Lokasi */}
            <div className="md:col-span-2 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{selectedReport.lokasiHilang}</span>
            </div>

            {/* Tanggal */}
            <div className="space-y-1 flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Tanggal Hilang</p>
                <p className="text-sm">
                  {selectedReport.tanggal
                    ? formatDate(selectedReport.tanggal)
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => setSelectedReport(null)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

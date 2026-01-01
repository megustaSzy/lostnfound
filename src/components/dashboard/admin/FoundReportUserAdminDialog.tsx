"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { AdminFoundReport } from "@/types/foundReports";

export function FoundReportUserAdminDialog({
  selectedReport,
  setSelectedReport,
}: {
  selectedReport: AdminFoundReport | null;
  setSelectedReport: (r: AdminFoundReport | null) => void;
}) {
  if (!selectedReport) return null;

  const status = {
    PENDING: { variant: "secondary" as const, label: "Pending" },
    CLAIMED: { variant: "default" as const, label: "Ditemukan" },
    APPROVED: { variant: "default" as const, label: "Disetujui" },
    REJECTED: { variant: "destructive" as const, label: "Ditolak" },
  }[selectedReport.statusFound] ?? {
    variant: "secondary",
    label: "Unknown",
  };

  return (
    <Dialog open onOpenChange={() => setSelectedReport(null)}>
      <DialogContent className="max-w-xl rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Detail Laporan Penemuan
          </DialogTitle>
          <DialogDescription>
            Informasi lengkap laporan yang ditampilkan di tabel
          </DialogDescription>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-5 text-sm">
          {/* Image */}
          {selectedReport.imageUrl && (
            <img
              src={selectedReport.imageUrl}
              alt={selectedReport.namaBarang}
              className="h-40 w-full object-contain rounded-md border"
            />
          )}

          {/* Nama Barang */}
          <div>
            <p className="text-muted-foreground text-xs mb-1">Nama Barang</p>
            <p className="font-semibold text-base">
              {selectedReport.namaBarang}
            </p>
          </div>

          {/* Deskripsi */}
          <div>
            <p className="text-muted-foreground text-xs mb-1">Deskripsi</p>
            <p className="leading-relaxed">{selectedReport.deskripsi || "-"}</p>
          </div>

          {/* Lokasi */}
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-xs mb-1">
                Lokasi Temuan
              </p>
              <p className="font-medium">{selectedReport.lokasiTemu}</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-muted-foreground text-xs mb-1">Status</p>
            <Badge variant={status.variant}>{status.label}</Badge>
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

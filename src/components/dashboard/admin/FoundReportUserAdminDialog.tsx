"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AdminFoundReport } from "@/types/foundReports";
import { MapPin } from "lucide-react";

export function FoundReportUserAdminDialog({
  selectedReport,
  setSelectedReport,
}: {
  selectedReport: AdminFoundReport | null;
  setSelectedReport: (r: AdminFoundReport | null) => void;
}) {
  const statusMap = {
    PENDING: { variant: "secondary" as const, label: "Pending" },
    CLAIMED: { variant: "default" as const, label: "Ditemukan" },
    APPROVED: { variant: "default" as const, label: "Disetujui" },
    REJECTED: { variant: "destructive" as const, label: "Ditolak" },
  };

  return (
    <Dialog
      open={!!selectedReport}
      onOpenChange={() => setSelectedReport(null)}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Laporan Penemuan</DialogTitle>
          <DialogDescription>
            Informasi lengkap laporan pengguna
          </DialogDescription>
        </DialogHeader>

        {selectedReport && (
          <div className="space-y-6">
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
                <Badge
                  variant={
                    statusMap[selectedReport.statusFound]?.variant ??
                    "secondary"
                  }
                >
                  {statusMap[selectedReport.statusFound]?.label ??
                    selectedReport.statusFound}
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
                <span>{selectedReport.lokasiTemu}</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

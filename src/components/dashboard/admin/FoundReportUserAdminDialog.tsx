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
import { MapPin } from "lucide-react";
import { AdminFoundReport } from "@/types/foundReports";

export function FoundReportUserAdminDialog({
  selectedReport,
  setSelectedReport,
}: {
  selectedReport: AdminFoundReport | null;
  setSelectedReport: (r: AdminFoundReport | null) => void;
}) {
  return (
    <Dialog
      open={!!selectedReport}
      onOpenChange={() => setSelectedReport(null)}
    >
      <DialogContent className="max-w-xl rounded-lg p-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-bold">
            Detail Laporan
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Informasi lengkap laporan pengguna
          </DialogDescription>
        </DialogHeader>

        {selectedReport && (
          <div className="space-y-4 text-sm">
            {selectedReport.imageUrl && (
              <img
                src={selectedReport.imageUrl}
                alt={selectedReport.namaBarang}
                className="h-32 mx-auto object-contain rounded-md border"
              />
            )}

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Nama Barang</p>
              <p className="font-semibold">{selectedReport.namaBarang}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Deskripsi</p>
              <p className="leading-relaxed">
                {selectedReport.deskripsi || "-"}
              </p>
            </div>

            <div className="space-y-1 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Lokasi</p>
                <p className="font-medium">{selectedReport.lokasiTemu}</p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={() => setSelectedReport(null)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import { MapPin, Shield } from "lucide-react";
import { FoundReportAdmin } from "@/types/foundReportAdmin";

export function FoundReportAdminDialog({
  selectedReport,
  setSelectedReport,
  getNamaBarang,
  getDeskripsi,
  getLokasi,
  getPelapor,
}: {
  selectedReport: FoundReportAdmin | null;
  setSelectedReport: (r: FoundReportAdmin | null) => void;
  getNamaBarang: (r: FoundReportAdmin) => string;
  getDeskripsi: (r: FoundReportAdmin) => string;
  getLokasi: (r: FoundReportAdmin) => string;
  getPelapor: (r: FoundReportAdmin) => string;
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
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Barang</p>
              <p className="font-semibold">{getNamaBarang(selectedReport)}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Deskripsi</p>
              <p className="leading-relaxed">
                {getDeskripsi(selectedReport) || "-"}
              </p>
            </div>

            <div className="space-y-1 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Lokasi</p>
                <p className="font-medium">
                  {getLokasi(selectedReport) || "-"}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <p className="text-sm font-semibold mb-2">Pelapor</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4" />
                <p className="font-medium text-foreground">
                  {getPelapor(selectedReport) || "-"}
                </p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="pt-2">
          <Button onClick={() => setSelectedReport(null)}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

import { FoundReportUser } from "@/types/found";

interface Props {
  report: FoundReportUser | null;
  onClose: () => void;
}

export function FoundReportsDetailDialog({ report, onClose }: Props) {
  return (
    <Dialog open={!!report} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Laporan Penemuan</DialogTitle>
          <DialogDescription>
            Informasi lengkap laporan penemuan barang
          </DialogDescription>
        </DialogHeader>

        {report && (
          <div className="space-y-6">
            {/* IMAGE (optional, kalau nanti ada) */}
            {report.imageUrl && (
              <div className="flex justify-center">
                <img
                  src={report.imageUrl}
                  alt={report.namaBarang}
                  className="max-h-64 rounded-lg border object-contain"
                />
              </div>
            )}

            {/* INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nama Barang */}
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Nama Barang</p>
                <p className="font-semibold">{report.namaBarang}</p>
              </div>

              {/* Status */}
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="default">Ditemukan</Badge>
              </div>

              {/* Deskripsi */}
              <div className="md:col-span-2 space-y-1">
                <p className="text-sm text-muted-foreground">Deskripsi</p>
                <p className="text-sm leading-relaxed">
                  {report.deskripsi || "-"}
                </p>
              </div>

              {/* Lokasi */}
              <div className="md:col-span-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{report.lokasiTemu}</span>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

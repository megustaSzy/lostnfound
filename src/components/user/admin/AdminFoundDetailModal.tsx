"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdminFoundReport } from "@/types/foundReports";

interface Props {
  report: AdminFoundReport | null;
  onClose: () => void;
}

export default function AdminFoundDetailModal({ report, onClose }: Props) {
  return (
    <Dialog open={!!report} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Laporan</DialogTitle>
        </DialogHeader>
        {report && (
          <div className="space-y-4">
            <p>
              <strong>Nama Barang:</strong> {report.namaBarang}
            </p>
            <p>
              <strong>Deskripsi:</strong> {report.deskripsi}
            </p>
            <p>
              <strong>Lokasi:</strong> {report.lokasiTemu}
            </p>
            <p>
              <strong>Status:</strong> {report.statusFound}
            </p>
            <p>
              <strong>Pelapor:</strong> Admin
            </p>
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

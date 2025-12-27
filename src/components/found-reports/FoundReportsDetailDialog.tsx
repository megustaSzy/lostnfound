"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Detail Laporan</DialogTitle>
        </DialogHeader>

        {report && (
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground">Nama Barang</p>
              <p className="font-semibold">{report.namaBarang}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Deskripsi</p>
              <p>{report.deskripsi || "-"}</p>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <p>{report.lokasiTemu}</p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-muted-foreground">Status</p>
              <Badge className="mt-2">Ditemukan</Badge>
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

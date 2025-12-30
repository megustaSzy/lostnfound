"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LostReportAdmin } from "@/types/lostReportAdmin";
import { LostReportsStatusBadge } from "./LostReportsStatusBadge";
import { MapPin, User, Mail, Phone } from "lucide-react";

export function LostReportsDetailDialog({
  report,
  onClose,
}: {
  report: LostReportAdmin | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!report} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Laporan</DialogTitle>
          <DialogDescription>
            Informasi lengkap laporan pengguna
          </DialogDescription>
        </DialogHeader>

        {report && (
          <div className="space-y-6">
            {/* IMAGE */}
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
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Nama Barang</p>
                <p className="font-semibold">{report.namaBarang}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <LostReportsStatusBadge status={report.status} />
              </div>

              <div className="md:col-span-2 space-y-1">
                <p className="text-sm text-muted-foreground">Deskripsi</p>
                <p className="text-sm leading-relaxed">
                  {report.deskripsi || "-"}
                </p>
              </div>

              <div className="md:col-span-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{report.lokasiHilang}</span>
              </div>
            </div>

            {/* PELAPOR */}
            <div className="pt-4 border-t space-y-3">
              <p className="text-sm font-semibold">Data Pelapor</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{report.user.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{report.user.email}</span>
                </div>

                {report.user.notelp && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{report.user.notelp}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

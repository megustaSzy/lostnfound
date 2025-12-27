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
              <img
                src={report.imageUrl}
                alt={report.namaBarang}
                className="max-h-64 rounded-lg border mx-auto"
              />
            )}

            {/* INFO */}
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Nama Barang
                </label>
                <p className="font-semibold">{report.namaBarang}</p>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  Deskripsi
                </label>
                <p className="text-sm">{report.deskripsi}</p>
              </div>

              <div className="flex gap-2 items-center">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p>{report.lokasiHilang}</p>
              </div>

              <LostReportsStatusBadge status={report.status} />

              <div className="pt-4 border-t">
                <label className="text-sm text-muted-foreground">Pelapor</label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2 items-center">
                    <User className="h-4 w-4" />
                    <span>{report.user.name}</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Mail className="h-4 w-4" />
                    <span>{report.user.email}</span>
                  </div>

                  {report.user.notelp && (
                    <div className="flex gap-2 items-center">
                      <Phone className="h-4 w-4" />
                      <span>{report.user.notelp}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

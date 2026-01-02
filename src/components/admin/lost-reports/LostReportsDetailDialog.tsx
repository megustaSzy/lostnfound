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
import { MapPin, User, Mail, Phone, Package, FileText } from "lucide-react";

export function LostReportsDetailDialog({
  report,
  onClose,
}: {
  report: LostReportAdmin | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!report} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detail Laporan Kehilangan
          </DialogTitle>
          <DialogDescription className="text-sm">
            Informasi lengkap laporan dari pengguna
          </DialogDescription>
        </DialogHeader>

        {report && (
          <div className="space-y-6 mt-2">
            {/* IMAGE */}
            {report.imageUrl && (
              <div className="flex justify-center bg-gray-50 rounded-lg p-4">
                <img
                  src={report.imageUrl}
                  alt={report.namaBarang}
                  className="max-h-64 rounded-lg border border-gray-200 object-contain shadow-sm"
                />
              </div>
            )}

            {/* INFO BARANG */}
            <div className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Nama Barang
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {report.namaBarang}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Status
                  </p>
                  <LostReportsStatusBadge status={report.status} />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    Deskripsi
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {report.deskripsi || "-"}
                  </p>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Lokasi Hilang
                  </p>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{report.lokasiHilang}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DATA PELAPOR */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-4 w-4" />
                Data Pelapor
              </h3>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Nama Lengkap</p>
                    <p className="text-sm font-medium text-gray-900">
                      {report.user.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                    <Mail className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">
                      {report.user.email}
                    </p>
                  </div>
                </div>

                {report.user.notelp && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100">
                      <Phone className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">No. Telepon</p>
                      <p className="text-sm font-medium text-gray-900">
                        {report.user.notelp}
                      </p>
                    </div>
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

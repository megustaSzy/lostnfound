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
import { MapPin, Shield, Package, FileText } from "lucide-react";
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
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl font-semibold">
            Detail Laporan Barang Temuan
          </DialogTitle>
          <DialogDescription className="text-sm">
            Informasi lengkap laporan dari pengguna
          </DialogDescription>
        </DialogHeader>

        {selectedReport && (
          <div className="space-y-5 mt-2">
            {/* Informasi Barang */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Informasi Barang
              </h3>

              <div className="space-y-4">
                {/* Nama Barang */}
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Nama Barang
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {getNamaBarang(selectedReport)}
                  </p>
                </div>

                {/* Deskripsi */}
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    Deskripsi
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {getDeskripsi(selectedReport) || "-"}
                  </p>
                </div>

                {/* Lokasi */}
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Lokasi Ditemukan
                  </p>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">
                      {getLokasi(selectedReport) || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Pelapor */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Data Pelapor
              </h3>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Nama Pelapor</p>
                    <p className="text-sm font-medium text-gray-900">
                      {getPelapor(selectedReport) || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button
            onClick={() => setSelectedReport(null)}
            className="w-full sm:w-auto"
          >
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

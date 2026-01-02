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
import { MapPin, Package, FileText, CheckCircle } from "lucide-react";

import { FoundReportUser } from "@/types/found";

interface Props {
  report: FoundReportUser | null;
  onClose: () => void;
}

export function FoundReportsDetailDialog({ report, onClose }: Props) {
  return (
    <Dialog open={!!report} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detail Laporan Penemuan
          </DialogTitle>
          <DialogDescription className="text-sm">
            Informasi lengkap laporan penemuan barang
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
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Informasi Barang
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nama Barang */}
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Nama Barang
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {report.namaBarang}
                  </p>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Status
                  </p>
                  <Badge
                    variant="default"
                    className="w-fit flex items-center gap-1.5"
                  >
                    <CheckCircle className="h-3 w-3" />
                    Ditemukan
                  </Badge>
                </div>

                {/* Deskripsi */}
                <div className="md:col-span-2 space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    Deskripsi
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {report.deskripsi || "-"}
                  </p>
                </div>

                {/* Lokasi */}
                <div className="md:col-span-2 space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Lokasi Ditemukan
                  </p>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{report.lokasiTemu}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

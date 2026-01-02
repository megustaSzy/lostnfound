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
import {
  MapPin,
  Calendar,
  Package,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LostReport } from "@/types/lostReports";

const getStatusBadge = (status: string) => {
  const variants = {
    PENDING: {
      variant: "secondary" as const,
      label: "Menunggu",
      icon: Clock,
    },
    APPROVED: {
      variant: "default" as const,
      label: "Disetujui",
      icon: CheckCircle,
    },
    REJECTED: {
      variant: "destructive" as const,
      label: "Ditolak",
      icon: XCircle,
    },
  };
  return variants[status as keyof typeof variants] || variants.PENDING;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export function LostReportDialog({
  selectedReport,
  setSelectedReport,
}: {
  selectedReport: LostReport | null;
  setSelectedReport: (r: LostReport | null) => void;
}) {
  if (!selectedReport) return null;

  const statusInfo = getStatusBadge(selectedReport.status);
  const StatusIcon = statusInfo.icon;

  return (
    <Dialog
      open={!!selectedReport}
      onOpenChange={(open) => !open && setSelectedReport(null)}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl font-semibold">
            Detail Laporan Kehilangan
          </DialogTitle>
          <DialogDescription className="text-sm">
            Informasi lengkap laporan Anda
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* IMAGE */}
          {selectedReport.imageUrl && (
            <div className="flex justify-center bg-gray-50 rounded-lg p-4">
              <img
                src={selectedReport.imageUrl}
                alt={selectedReport.namaBarang}
                className="max-h-64 rounded-lg border border-gray-200 object-contain shadow-sm"
              />
            </div>
          )}

          {/* INFO BARANG */}
          <div className="space-y-4">
            {/* <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Informasi Barang
            </h3> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nama Barang */}
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Nama Barang
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {selectedReport.namaBarang}
                </p>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </p>
                <Badge
                  variant={statusInfo.variant}
                  className="w-fit flex items-center gap-1.5"
                >
                  <StatusIcon className="h-3 w-3" />
                  {statusInfo.label}
                </Badge>
              </div>

              {/* Deskripsi */}
              <div className="md:col-span-2 space-y-1.5">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Deskripsi
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedReport.deskripsi || "-"}
                </p>
              </div>

              {/* Lokasi */}
              <div className="md:col-span-2 space-y-1.5">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Lokasi Hilang
                </p>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">
                    {selectedReport.lokasiHilang}
                  </span>
                </div>
              </div>

              {/* Tanggal */}
              <div className="md:col-span-2 space-y-1.5">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Tanggal Hilang
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="font-medium">
                    {selectedReport.tanggal
                      ? formatDate(selectedReport.tanggal)
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
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

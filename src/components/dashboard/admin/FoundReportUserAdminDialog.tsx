"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AdminFoundReport } from "@/types/foundReports";
import {
  MapPin,
  Package,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export function FoundReportUserAdminDialog({
  selectedReport,
  setSelectedReport,
}: {
  selectedReport: AdminFoundReport | null;
  setSelectedReport: (r: AdminFoundReport | null) => void;
}) {
  const statusMap = {
    PENDING: {
      variant: "secondary" as const,
      label: "Pending",
      icon: Clock,
      iconColor: "text-gray-500",
    },
    CLAIMED: {
      variant: "default" as const,
      label: "Ditemukan",
      icon: AlertCircle,
      iconColor: "text-blue-500",
    },
    APPROVED: {
      variant: "default" as const,
      label: "Disetujui",
      icon: CheckCircle,
      iconColor: "text-green-500",
    },
    REJECTED: {
      variant: "destructive" as const,
      label: "Ditolak",
      icon: XCircle,
      iconColor: "text-red-500",
    },
  };

  const currentStatus = statusMap[selectedReport?.statusFound ?? "PENDING"];
  const StatusIcon = currentStatus?.icon ?? Clock;

  return (
    <Dialog
      open={!!selectedReport}
      onOpenChange={() => setSelectedReport(null)}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detail Laporan Penemuan
          </DialogTitle>
          <DialogDescription className="text-sm">
            Informasi lengkap laporan dari pengguna
          </DialogDescription>
        </DialogHeader>

        {selectedReport && (
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
                    variant={currentStatus?.variant ?? "secondary"}
                    className="w-fit flex items-center gap-1.5"
                  >
                    <StatusIcon className="h-3 w-3" />
                    {currentStatus?.label ?? selectedReport.statusFound}
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
                    Lokasi Ditemukan
                  </p>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">
                      {selectedReport.lokasiTemu}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

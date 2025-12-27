"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminFoundReport } from "@/types/foundReports";

interface Props {
  data: AdminFoundReport[];
  onSelectReport: (report: AdminFoundReport) => void;
}

export default function AdminFoundTable({ data, onSelectReport }: Props) {
  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: { variant: "secondary" as const, label: "Pending" },
      CLAIMED: { variant: "default" as const, label: "Ditemukan" },
      APPROVED: { variant: "default" as const, label: "Disetujui" },
    };
    return (
      variants[status as keyof typeof variants] || {
        variant: "secondary",
        label: status || "Unknown",
      }
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Barang</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((report, idx) => (
            <TableRow key={report.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{report.namaBarang}</TableCell>
              <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                {report.deskripsi}
              </TableCell>
              <TableCell className="flex items-center gap-1 text-sm">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                {report.lokasiTemu}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusBadge(report.statusFound).variant}>
                  {getStatusBadge(report.statusFound).label}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSelectReport(report)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

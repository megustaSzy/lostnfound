import { FileSearch } from "lucide-react";

export function LostReportsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileSearch className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Belum ada laporan</h3>
      <p className="text-sm text-muted-foreground">
        Laporan barang hilang akan muncul di sini
      </p>
    </div>
  );
}

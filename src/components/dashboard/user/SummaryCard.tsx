import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, CheckCircle2 } from "lucide-react";
import { SummaryCardProps } from "@/types/card";

export const SummaryCard = ({
  totalReports,
  foundReports,
}: SummaryCardProps) => {
  const rate =
    totalReports > 0 ? Math.round((foundReports / totalReports) * 100) : 0;

  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800">Ringkasan Data</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <SummaryItem
          icon={FileSearch}
          label="Total Laporan"
          value={totalReports}
          bg="bg-orange-50"
          color="text-orange-600"
        />

        <SummaryItem
          icon={CheckCircle2}
          label="Tingkat Penemuan"
          value={`${rate}%`}
          bg="bg-emerald-50"
          color="text-emerald-600"
        />

        <p className="pt-3 text-xs text-muted-foreground border-t">
          Dashboard diperbarui secara real-time
        </p>
      </CardContent>
    </Card>
  );
};

function SummaryItem({
  icon: Icon,
  label,
  value,
  bg,
  color,
}: {
  icon: any;
  label: string;
  value: number | string;
  bg: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bg} ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
      <span className="text-xl font-semibold text-slate-900">{value}</span>
    </div>
  );
}

"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FileSearch, CheckCircle2, Users } from "lucide-react";
import { Props } from "@/types/props";

export function SummaryCard({ lost, found, user }: Props) {
  const total = lost + found;
  const rate = total > 0 ? Math.round((found / total) * 100) : 0;

  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800">Ringkasan Data</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <SummaryItem
          icon={FileSearch}
          label="Total Laporan"
          value={total}
          color="text-orange-600"
          bg="bg-orange-50"
        />

        <SummaryItem
          icon={CheckCircle2}
          label="Tingkat Penemuan"
          value={`${rate}%`}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />

        <SummaryItem
          icon={Users}
          label="Active Users"
          value={user}
          color="text-blue-600"
          bg="bg-blue-50"
        />

        <p className="pt-3 text-xs text-muted-foreground border-t">
          Dashboard diperbarui secara real-time
        </p>
      </CardContent>
    </Card>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: any;
  label: string;
  value: number | string;
  color: string;
  bg: string;
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

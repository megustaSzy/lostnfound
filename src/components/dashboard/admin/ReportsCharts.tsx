"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Props } from "@/types/props";

export function ReportsChart({ lost, found, user }: Props) {
  const data = [
    { name: "Hilang", jumlah: lost, fill: "#f97316" },
    { name: "Ditemukan", jumlah: found, fill: "#10b981" },
    { name: "Users", jumlah: user, fill: "#3b82f6" },
  ];

  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg text-slate-800">
            Statistik Laporan
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
            />
            <Bar dataKey="jumlah" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

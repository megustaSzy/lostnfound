"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileSearch, CheckCircle2, Users } from "lucide-react";
import { Props } from "@/types/props";

export function StatsCards({ lost, found, user }: Props) {
  const stats = [
    {
      title: "Laporan Hilang",
      value: lost,
      icon: FileSearch,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      bar: "bg-orange-500",
    },
    {
      title: "Laporan Ditemukan",
      value: found,
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      bar: "bg-emerald-500",
    },
    {
      title: "Total Users",
      value: user,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      bar: "bg-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((s) => {
        const Icon = s.icon;

        return (
          <Card
            key={s.title}
            className="border shadow-sm hover:shadow-md transition"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{s.value}</p>
                </div>

                <div className={`p-3 rounded-xl ${s.iconBg} ${s.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>

              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full w-1/2 ${s.bar}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

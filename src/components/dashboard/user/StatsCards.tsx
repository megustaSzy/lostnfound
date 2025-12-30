"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StatsCardsProps } from "@/types/card";

export const StatsCards = ({ statsData }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {statsData.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="border border-slate-200 shadow-sm hover:shadow-md transition bg-white"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>

              <div
                className={`p-3 rounded-xl ${stat.bgGradient} ${stat.iconColor}`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

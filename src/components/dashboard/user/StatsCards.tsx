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
            className={`relative overflow-hidden border shadow-sm
              hover:shadow-md transition bg-gradient-to-br ${stat.bgGradient}`}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl bg-white shadow ${stat.iconColor}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>

              <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
                <div
                  className={`h-full w-1/2 rounded-full bg-gradient-to-r ${stat.gradient}`}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

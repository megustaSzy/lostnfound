"use client";

import { Users } from "lucide-react";

export function UsersHeader({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daftar Users</h1>
        <p className="text-muted-foreground">Kelola dan lihat semua pengguna di sistem</p>
      </div>

      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{count} users</span>
      </div>
    </div>
  );
}

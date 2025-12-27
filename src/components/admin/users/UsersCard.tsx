"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ReactNode } from "react";

export function UsersCard({ children }: { children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Semua Pengguna</CardTitle>
        <CardDescription>Daftar lengkap pengguna yang terdaftar di sistem</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

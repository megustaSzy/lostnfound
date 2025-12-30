"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function UnauthenticatedAlert() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Akses Ditolak</AlertTitle>
        <AlertDescription>
          Anda harus login terlebih dahulu untuk mengakses halaman ini.
        </AlertDescription>
      </Alert>
    </div>
  );
}

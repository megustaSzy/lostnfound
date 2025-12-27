"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function UnauthenticatedAlert() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Anda harus login untuk mengakses halaman ini!hvuvuy</AlertDescription>
      </Alert>
    </div>
  );
}

"use client";

import { Loader2 } from "lucide-react";

interface FullscreenLoaderProps {
  validating?: boolean; // optional kalau pakai SWR isValidating
  message?: string;     // optional custom message
}

export function FullscreenLoader({ validating = false, message = "Memuat data..." }: FullscreenLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-background p-6 shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          {validating ? "Memvalidasi data..." : message}
        </p>
      </div>
    </div>
  );
}

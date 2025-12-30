"use client";

import { Loader2 } from "lucide-react";

interface FullscreenLoaderProps {
  validating?: boolean;
  message?: string;
}

export function FullscreenLoader({
  validating = false,
  message = "Memuat data...",
}: FullscreenLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-background px-8 py-6 shadow-xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-slate-500">
          {validating ? "Memvalidasi data..." : message}
        </p>
      </div>
    </div>
  );
}

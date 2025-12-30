"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

export function ProfileAlert({
  message,
}: {
  message: { type: "success" | "error"; text: string } | null;
}) {
  if (!message) return null;

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border ${
        message.type === "success"
          ? "bg-emerald-50 border-emerald-300"
          : "bg-red-50 border-red-300"
      }`}
    >
      {message.type === "success" ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      ) : (
        <AlertCircle className="h-5 w-5 text-red-600" />
      )}

      <span
        className={`text-sm font-medium ${
          message.type === "success" ? "text-emerald-700" : "text-red-700"
        }`}
      >
        {message.text}
      </span>
    </div>
  );
}

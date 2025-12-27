"use client";

import { useState } from "react";
import { Toast } from "./toast";

type ToastType = {
  title: string;
  description?: string;
  variant?: "success" | "destructive" | "default";
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = (toast: ToastType) => {
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  const ToastContainer = () => (
    <div
      className="
        fixed z-50
        top-4 right-4
        w-[calc(100%-2rem)]
        sm:w-auto
        space-y-2
      "
    >
      {toasts.map((t, i) => (
        <Toast key={i} {...t} />
      ))}
    </div>
  );

  return { toast, ToastContainer };
}

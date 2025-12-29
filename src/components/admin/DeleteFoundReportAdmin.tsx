"use client";

import { useState } from "react";
import { mutate } from "swr";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteFound } from "@/services/found";
import { FoundReportAdmin } from "@/types/foundReportAdmin";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  report: FoundReportAdmin | null;
  swrKey: string;
}

export function DeleteFoundReportAdmin({
  open,
  onOpenChange,
  report,
  swrKey,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  async function handleDelete() {
    if (!report || isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteFound(report.id);

      mutate(
        swrKey,
        (current: any) => {
          if (!current) return current;

          return {
            ...current,
            items: current.items.filter((r: any) => r.id !== report.id),
          };
        },
        false
      );

      toast({
        title: "Berhasil",
        description: "Laporan berhasil dihapus",
      });

      onOpenChange(false);

      // 🔁 revalidate background
      mutate(swrKey);
    } catch {
      toast({
        title: "Gagal",
        description: "Gagal menghapus laporan",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Laporan?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Data ini akan dihapus permanen.
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export function LostReportsConfirmDialog({
  action,
  onConfirm,
  onCancel,
}: {
  action: { id: number; status: "APPROVED" | "REJECTED" } | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog open={!!action} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action?.status === "APPROVED"
              ? "Setujui laporan?"
              : "Tolak laporan?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {action?.status === "APPROVED"
              ? "Laporan akan disetujui dan diproses."
              : "Laporan akan ditolak dan tidak dapat dikembalikan."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              action?.status === "REJECTED"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : ""
            }
          >
            {action?.status === "APPROVED" ? "Setujui" : "Tolak"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

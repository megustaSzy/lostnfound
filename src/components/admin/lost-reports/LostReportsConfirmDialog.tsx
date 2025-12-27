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
            {action?.status === "APPROVED" ? "Setujui laporan?" : "Tolak laporan?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {action?.status === "APPROVED"
              ? "Laporan akan disetujui."
              : "Laporan akan ditolak."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={action?.status === "REJECTED" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            {action?.status === "APPROVED" ? "Setujui" : "Tolak"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

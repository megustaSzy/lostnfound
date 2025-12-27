"use client";

import { useState } from "react";
import { mutate } from "swr";
import { deleteUser } from "@/services/users";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  userId: number;
  userName: string;
}

export function DeleteUserDialog({
  open,
  onOpenChange,
  userId,
  userName,
}: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  const isMatch = confirmName === userName;

  async function handleDelete() {
    if (!isMatch) return;

    try {
      setLoading(true);

      await deleteUser(userId);
      await mutate("/api/users");

      toast({
        title: "Berhasil",
        description: `User ${userName} berhasil dihapus`,
        variant: "success",
      });

      setConfirmName("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menghapus user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-red-600">Hapus User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            User{" "}
            <span className="font-semibold text-foreground">{userName}</span>{" "}
            akan dihapus secara permanen.
            <br />
            <span className="text-red-600 font-medium">
              Tindakan ini tidak dapat dibatalkan.
            </span>
          </p>

          {/* KONFIRMASI KETIK NAMA */}
          <div className="space-y-2">
            <Label htmlFor="confirm">
              Ketik{" "}
              <span className="font-semibold text-foreground">{userName}</span>{" "}
              untuk mengonfirmasi
            </Label>
            <Input
              id="confirm"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder={`Ketik "${userName}"`}
            />
            {!isMatch && confirmName && (
              <p className="text-xs text-red-500">Nama tidak cocok</p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isMatch || loading}
          >
            {loading ? "Menghapus..." : "Hapus User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

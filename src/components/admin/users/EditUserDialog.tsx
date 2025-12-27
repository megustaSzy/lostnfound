"use client";

import { useEffect, useState } from "react";
import { mutate } from "swr";
import { patchUser } from "@/services/users";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { User } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: User;
}

export function EditUserDialog({ open, onOpenChange, user }: Props) {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [notelp, setNotelp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset state setiap dialog dibuka
  useEffect(() => {
    if (open) {
      setName(user.name);
      setNotelp(user.notelp || "");
      setPassword("");
    }
  }, [open, user]);

  async function handleSubmit() {
    // 🔒 VALIDASI
    if (!name.trim()) {
      toast({
        title: "Validasi gagal",
        description: "Nama tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    if (!notelp.trim()) {
      toast({
        title: "Validasi gagal",
        description: "Nomor telepon tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      await patchUser(user.id, {
        name,
        notelp,
        ...(password && { password }),
      });

      await mutate("/api/users");

      toast({
        title: "Berhasil",
        description: "Data pengguna berhasil diperbarui",
        variant: "success",
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data pengguna",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Pengguna</DialogTitle>
        </DialogHeader>

        {/* FORM */}
        <div className="grid gap-5 py-2">
          {/* Nama */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap"
            />
          </div>

          {/* Email (READ ONLY) */}
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              value={user.email}
              disabled
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          {/* No Telp */}
          <div className="grid gap-2">
            <Label htmlFor="notelp">No. Telepon</Label>
            <Input
              id="notelp"
              value={notelp}
              onChange={(e) => setNotelp(e.target.value)}
              placeholder="08xxxxxxxxxx"
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">
              Password{" "}
              <span className="text-xs text-muted-foreground">(opsional)</span>
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kosongkan jika tidak diubah"
            />
          </div>
        </div>

        {/* ACTION */}
        <DialogFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useEffect, useState } from "react";
import { mutate } from "swr";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FoundReportAdmin } from "@/types/foundReportAdmin";
import { updateFound } from "@/services/found";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: FoundReportAdmin | null;
  swrKey: string;
}

export function EditFoundReportAdmin({
  open,
  onOpenChange,
  report,
  swrKey,
}: Props) {
  const { toast } = useToast();

  const [form, setForm] = useState({
    namaBarang: "",
    deskripsi: "",
    lokasiTemu: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (report) {
      setForm({
        namaBarang: report.namaBarang ?? "",
        deskripsi: report.deskripsi ?? "",
        lokasiTemu: report.lokasiTemu ?? "",
      });
    }
  }, [report]);

  if (!report) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await updateFound(report.id, form);

      toast({
        title: "Berhasil",
        description: "Laporan berhasil diperbarui",
      });

      mutate(swrKey);
      onOpenChange(false);
    } catch {
      toast({
        title: "Gagal",
        description: "Gagal memperbarui laporan",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setIsSubmitting(false);
        }
        onOpenChange(v);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Laporan</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="namaBarang">Nama Barang</Label>
            <Input
              id="namaBarang"
              placeholder="Nama barang"
              value={form.namaBarang}
              onChange={(e) => setForm({ ...form, namaBarang: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea
              id="deskripsi"
              placeholder="Deskripsi"
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="lokasiTemu">Lokasi Ditemukan</Label>
            <Input
              id="lokasiTemu"
              placeholder="Lokasi ditemukan"
              value={form.lokasiTemu}
              onChange={(e) => setForm({ ...form, lokasiTemu: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

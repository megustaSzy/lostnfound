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
  const { toast } = useToast(); // ✅ PINDAH KE ATAS

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
          <Input
            placeholder="Nama barang"
            value={form.namaBarang}
            onChange={(e) => setForm({ ...form, namaBarang: e.target.value })}
          />

          <Textarea
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          />

          <Input
            placeholder="Lokasi ditemukan"
            value={form.lokasiTemu}
            onChange={(e) => setForm({ ...form, lokasiTemu: e.target.value })}
          />

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

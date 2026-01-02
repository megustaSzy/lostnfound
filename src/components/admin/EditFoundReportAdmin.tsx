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
import { Label } from "@/components/ui/label";
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Laporan Barang Temuan
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Nama Barang */}
          <div className="space-y-2">
            <Label
              htmlFor="namaBarang"
              className="text-sm font-medium text-gray-700"
            >
              Nama Barang
            </Label>
            <Input
              id="namaBarang"
              placeholder="Masukkan nama barang"
              value={form.namaBarang}
              onChange={(e) => setForm({ ...form, namaBarang: e.target.value })}
              className="w-full"
              required
            />
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label
              htmlFor="deskripsi"
              className="text-sm font-medium text-gray-700"
            >
              Deskripsi
            </Label>
            <Textarea
              id="deskripsi"
              placeholder="Masukkan deskripsi barang"
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              className="w-full min-h-[100px] resize-none"
              required
            />
          </div>

          {/* Lokasi Ditemukan */}
          <div className="space-y-2">
            <Label
              htmlFor="lokasiTemu"
              className="text-sm font-medium text-gray-700"
            >
              Lokasi Ditemukan
            </Label>
            <Input
              id="lokasiTemu"
              placeholder="Masukkan lokasi ditemukan"
              value={form.lokasiTemu}
              onChange={(e) => setForm({ ...form, lokasiTemu: e.target.value })}
              className="w-full"
              required
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

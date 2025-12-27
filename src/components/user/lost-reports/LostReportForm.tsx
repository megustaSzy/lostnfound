"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useLostReportForm } from "@/hooks/useLostReportForm";

export default function LostReportForm() {
  const router = useRouter();
  const { form, loading, errorMsg, successMsg, updateField, submit } =
    useLostReportForm();

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Informasi Barang Hilang</CardTitle>
        <CardDescription className="text-sm">
          Lengkapi data barang yang hilang
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {errorMsg && (
          <Alert variant="destructive" className="text-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}

        {successMsg && (
          <Alert className="border-green-300 bg-green-50 text-green-800 text-sm">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{successMsg}</AlertDescription>
          </Alert>
        )}

        {/* Grid Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama Barang */}
          <div className="space-y-1.5">
            <Label className="text-sm">Nama Barang *</Label>
            <Input
              className="h-9 text-sm"
              value={form.namaBarang}
              onChange={(e) => updateField("namaBarang", e.target.value)}
              disabled={loading}
              placeholder="Contoh: Tas hitam"
            />
          </div>

          {/* Lokasi Hilang */}
          <div className="space-y-1.5">
            <Label className="text-sm">Lokasi Hilang *</Label>
            <Input
              className="h-9 text-sm"
              value={form.lokasiHilang}
              onChange={(e) => updateField("lokasiHilang", e.target.value)}
              disabled={loading}
              placeholder="Contoh: Parkiran motor"
            />
          </div>
        </div>

        {/* Deskripsi */}
        <div className="space-y-1.5">
          <Label className="text-sm">Deskripsi</Label>
          <Textarea
            rows={3}
            className="resize-none text-sm"
            value={form.deskripsi}
            onChange={(e) => updateField("deskripsi", e.target.value)}
            disabled={loading}
            placeholder="Detail tambahan barang..."
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm">Tanggal Hilang *</Label>
          <Input
            type="date"
            className="h-9 text-sm"
            value={form.tanggal || ""}
            onChange={(e) => updateField("tanggal", e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Action */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            className="h-9 px-6 text-sm"
            disabled={loading}
            onClick={() => router.back()}
          >
            Batal
          </Button>

          <Button
            className="h-9 px-6 text-sm gap-2"
            disabled={
              loading ||
              !form.namaBarang.trim() ||
              !form.lokasiHilang.trim() ||
              !form.tanggal?.trim()
            }
            onClick={submit}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

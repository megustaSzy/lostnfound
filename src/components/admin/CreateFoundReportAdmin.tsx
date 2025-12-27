"use client";

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
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useFoundReportForm } from "@/hooks/useFoundReportForm";

export default function CreateFoundReportAdmin() {
  const {
    data,
    updateField,
    submit,
    loading,
    errorMsg,
    successMsg,
    handleImage,
    removeImage,
    previewUrl,
  } = useFoundReportForm({
    isAdmin: true,
    redirectUrl: "/dashboard/admin/found-reports",
  });

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Informasi Barang Temuan</CardTitle>
        <CardDescription className="text-sm">
          Lengkapi data barang yang ditemukan
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ALERT ERROR */}
        {errorMsg && (
          <Alert variant="destructive" className="text-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}

        {/* ALERT SUCCESS */}
        {successMsg && (
          <Alert className="border-green-300 bg-green-50 text-green-800 text-sm">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{successMsg}</AlertDescription>
          </Alert>
        )}

        {/* GRID: Nama Barang + Lokasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Nama Barang *</Label>
            <Input
              className="h-9 text-sm"
              value={data.namaBarang}
              onChange={(e) => updateField("namaBarang", e.target.value)}
              disabled={loading}
              placeholder="Contoh: Dompet coklat"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Lokasi Ditemukan *</Label>
            <Input
              className="h-9 text-sm"
              value={data.lokasiTemu}
              onChange={(e) => updateField("lokasiTemu", e.target.value)}
              disabled={loading}
              placeholder="Contoh: Musholla lantai 2"
            />
          </div>
        </div>

        {/* DESKRIPSI FULL WIDTH */}
        <div className="space-y-1.5">
          <Label className="text-sm">Deskripsi</Label>
          <Textarea
            rows={3}
            className="resize-none text-sm"
            value={data.deskripsi}
            onChange={(e) => updateField("deskripsi", e.target.value)}
            disabled={loading}
            placeholder="Detail tambahan barang..."
          />
        </div>

        {/* TANGGAL */}
        <div className="space-y-1.5">
          <Label className="text-sm">Tanggal Ditemukan *</Label>
          <Input
            type="date"
            className="h-9 text-sm"
            value={data.tanggal}
            onChange={(e) => updateField("tanggal", e.target.value)}
            disabled={loading}
          />
        </div>

        {/* UPLOAD GAMBAR */}
        <div className="space-y-1.5">
          <Label className="text-sm">Foto Barang</Label>
          <Input
            type="file"
            accept="image/*"
            className="h-9 text-sm"
            disabled={loading}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleImage(file);
            }}
          />

          {/* Garis pemisah */}
          <hr className="border-gray-200 my-2" />

          {/* Status nama file */}
          <p className="text-xs text-gray-500">
            {previewUrl ? "File sudah dipilih" : "Tidak ada file yang dipilih"}
          </p>

          {/* PREVIEW IMAGE */}
          {previewUrl && (
            <div className="mt-2 relative w-40 space-y-2">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="h-8 px-4 text-xs"
                onClick={removeImage}
              >
                Hapus Foto
              </Button>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            className="h-9 px-6 text-sm"
            disabled={loading}
            onClick={() => history.back()}
          >
            Batal
          </Button>

          <Button
            className="h-9 px-6 text-sm gap-2"
            disabled={
              loading ||
              !data.namaBarang.trim() ||
              !data.lokasiTemu.trim() ||
              !data.tanggal?.trim()
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

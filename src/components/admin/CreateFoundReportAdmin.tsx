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
    <Card className="max-w-3xl mx-auto border shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-900">
          Informasi Barang Temuan
        </CardTitle>
        <CardDescription className="text-slate-600">
          Lengkapi data barang yang ditemukan
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ERROR */}
        {errorMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}

        {/* SUCCESS */}
        {successMsg && (
          <Alert className="border-emerald-300 bg-emerald-50 text-emerald-800">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{successMsg}</AlertDescription>
          </Alert>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-slate-700">Nama Barang *</Label>
            <Input
              value={data.namaBarang}
              onChange={(e) => updateField("namaBarang", e.target.value)}
              disabled={loading}
              placeholder="Contoh: Dompet coklat"
              className="focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-700">Lokasi Ditemukan *</Label>
            <Input
              value={data.lokasiTemu}
              onChange={(e) => updateField("lokasiTemu", e.target.value)}
              disabled={loading}
              placeholder="Contoh: Musholla lantai 2"
              className="focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-700">Deskripsi</Label>
          <Textarea
            rows={3}
            className="resize-none focus:border-blue-500 focus:ring-blue-500"
            value={data.deskripsi}
            onChange={(e) => updateField("deskripsi", e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-700">Tanggal Ditemukan *</Label>
          <Input
            type="date"
            value={data.tanggal}
            onChange={(e) => updateField("tanggal", e.target.value)}
            disabled={loading}
            className="focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-700">Foto Barang</Label>
          <Input
            type="file"
            accept="image/*"
            disabled={loading}
            onChange={(e) => handleImage(e.target.files?.[0] || null)}
          />

          <hr className="border-border my-2" />

          <p className="text-xs text-muted-foreground">
            {previewUrl ? "File sudah dipilih" : "Tidak ada file yang dipilih"}
          </p>

          {previewUrl && (
            <div className="mt-2 space-y-2 w-40">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-40 h-40 rounded-md object-cover border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeImage}
              >
                Hapus Foto
              </Button>
            </div>
          )}
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => history.back()}
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            Batal
          </Button>

          <Button
            disabled={
              loading ||
              !data.namaBarang.trim() ||
              !data.lokasiTemu.trim() ||
              !data.tanggal?.trim()
            }
            onClick={submit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

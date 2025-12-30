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
    <Card className="max-w-3xl mx-auto border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-slate-900">
          Informasi Barang Hilang
        </CardTitle>
        <CardDescription className="text-sm text-slate-600">
          Pastikan data diisi dengan benar
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Error */}
        {errorMsg && (
          <Alert variant="destructive" className="text-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}

        {/* Success */}
        {successMsg && (
          <Alert className="border-emerald-300 bg-emerald-50 text-emerald-800 text-sm">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{successMsg}</AlertDescription>
          </Alert>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama Barang */}
          <div className="space-y-1.5">
            <Label className="text-sm text-slate-700">
              Nama Barang <span className="text-red-500">*</span>
            </Label>
            <Input
              className="h-9 text-sm focus:border-blue-500 focus:ring-blue-500"
              value={form.namaBarang}
              onChange={(e) => updateField("namaBarang", e.target.value)}
              disabled={loading}
              placeholder="Contoh: Tas hitam"
            />
          </div>

          {/* Lokasi Hilang */}
          <div className="space-y-1.5">
            <Label className="text-sm text-slate-700">
              Lokasi Hilang <span className="text-red-500">*</span>
            </Label>
            <Input
              className="h-9 text-sm focus:border-blue-500 focus:ring-blue-500"
              value={form.lokasiHilang}
              onChange={(e) => updateField("lokasiHilang", e.target.value)}
              disabled={loading}
              placeholder="Contoh: Parkiran motor"
            />
          </div>
        </div>

        {/* Deskripsi */}
        <div className="space-y-1.5">
          <Label className="text-sm text-slate-700">Deskripsi</Label>
          <Textarea
            rows={3}
            className="resize-none text-sm focus:border-blue-500 focus:ring-blue-500"
            value={form.deskripsi}
            onChange={(e) => updateField("deskripsi", e.target.value)}
            disabled={loading}
            placeholder="Detail tambahan barang..."
          />
        </div>

        {/* Tanggal */}
        <div className="space-y-1.5">
          <Label className="text-sm text-slate-700">
            Tanggal Hilang <span className="text-red-500">*</span>
          </Label>
          <Input
            type="date"
            className="h-9 text-sm focus:border-blue-500 focus:ring-blue-500"
            value={form.tanggal || ""}
            onChange={(e) => updateField("tanggal", e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Action */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            className="h-9 px-6 text-sm border-blue-300 text-blue-600 hover:bg-blue-50"
            disabled={loading}
            onClick={() => router.back()}
          >
            Batal
          </Button>

          <Button
            className="h-9 px-6 text-sm gap-2 bg-blue-600 hover:bg-blue-700 text-white"
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

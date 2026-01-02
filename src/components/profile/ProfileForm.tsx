"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Lock, Save, Loader2 } from "lucide-react";

export function ProfileForm({
  formData,
  handleChange,
  handleSave,
  saving,
}: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <User className="h-5 w-5" />
          Informasi Profil
        </h2>
        <p className="text-blue-100 text-sm mt-0.5">
          Perbarui informasi akun Anda
        </p>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100">
                <User className="h-3 w-3 text-blue-600" strokeWidth={2.5} />
              </div>
              Nama Lengkap
            </Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100">
                <Mail className="h-3 w-3 text-blue-600" strokeWidth={2.5} />
              </div>
              Alamat Email
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100">
                <Phone className="h-3 w-3 text-blue-600" strokeWidth={2.5} />
              </div>
              Nomor Telepon
              <span className="text-xs font-normal text-gray-500">
                (Opsional)
              </span>
            </Label>
            <Input
              type="text"
              name="notelp"
              value={formData.notelp}
              onChange={handleChange}
              placeholder="08123456789"
              className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            />
          </div>

          <Separator className="my-6" />

          {/* Password Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Ubah Password
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Kosongkan jika tidak ingin mengubah password
                  </p>
                </div>
              </div>

              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password baru"
                className="h-11 bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 font-medium shadow-sm transition-all disabled:opacity-70"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

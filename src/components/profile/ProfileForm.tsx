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
    <div className="shadow-sm bg-white rounded-xl border">
      <div className="p-6 space-y-6">
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium text-sm flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" strokeWidth={1.5} /> Full
              Name
            </Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium text-sm flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" strokeWidth={1.5} /> Email
              Address
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium text-sm flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" strokeWidth={1.5} />{" "}
              Phone Number
            </Label>
            <Input
              type="text"
              name="notelp"
              value={formData.notelp}
              onChange={handleChange}
              placeholder="Optional"
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <Separator />

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium text-sm flex items-center gap-2">
              <Lock className="h-4 w-4 text-blue-600" strokeWidth={1.5} /> New
              Password
            </Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave empty to keep current password"
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

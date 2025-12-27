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
    <div className="shadow-md bg-white rounded-xl">
      <div className="p-6 space-y-6">
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-black font-medium text-sm flex items-center gap-2">
              <User className="h-4 w-4" strokeWidth={1.5} /> Full Name
            </Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-white border-gray-300 text-black"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-black font-medium text-sm flex items-center gap-2">
              <Mail className="h-4 w-4" strokeWidth={1.5} /> Email Address
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white border-gray-300 text-black"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label className="text-black font-medium text-sm flex items-center gap-2">
              <Phone className="h-4 w-4" strokeWidth={1.5} /> Phone Number
            </Label>
            <Input
              type="text"
              name="notelp"
              value={formData.notelp}
              onChange={handleChange}
              placeholder="Optional"
              className="bg-white border-gray-300 text-black"
            />
          </div>

          <Separator />

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-black font-medium text-sm flex items-center gap-2">
              <Lock className="h-4 w-4" strokeWidth={1.5} /> New Password
            </Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave empty to keep current password"
              className="bg-white border-gray-300 text-black"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-black text-white hover:bg-gray-900"
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

import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { FormData, MessageType } from "@/types/profile";
import { User } from "@/types/user";

export function useProfile(
  user: User | null,
  refreshUser: () => Promise<void>
) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    notelp: "",
    password: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<MessageType | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        notelp: user.notelp || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);

      const payload: Partial<FormData> = {};

      if (formData.name !== user.name) payload.name = formData.name;
      if (formData.email !== user.email) payload.email = formData.email;
      if (formData.notelp !== user.notelp) payload.notelp = formData.notelp;
      if (formData.password) payload.password = formData.password;

      await api.patch(`/api/users/${user.id}`, payload);
      await refreshUser();

      setMessage({ type: "success", text: "Profile berhasil diperbarui!" });
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setMessage({
        type: "error",
        text: error.response?.data.message || "Gagal menyimpan profile",
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    saving,
    message,
    handleChange,
    handleSave,
  };
}

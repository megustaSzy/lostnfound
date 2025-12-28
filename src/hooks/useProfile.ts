import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { FormData as ProfileFormData, MessageType } from "@/types/profile";
import { User } from "@/types/user";

export function useProfile(
  user: User | null,
  refreshUser: () => Promise<void>
) {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    notelp: "",
    password: "",
    image: null,
    imagePreview: "",
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
        image: null,
        imagePreview: user.imageUrl || "",
      });
    }
  }, [user]);

  // 🔥 KHUSUS AVATAR
  const handleAvatarChange = (file: File) => {
    setFormData((prev: any) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  // input text
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);

      const payload = new FormData();

      if (formData.name !== user.name) payload.append("name", formData.name);
      if (formData.email !== user.email)
        payload.append("email", formData.email);
      if (formData.notelp !== user.notelp)
        payload.append("notelp", formData.notelp);
      if (formData.password) payload.append("password", formData.password);
      if (formData.image) payload.append("image", formData.image);

      await api.patch(`/api/users/${user.id}`, payload);

      await refreshUser();
      setMessage({ type: "success", text: "Profile berhasil diperbarui!" });

      setFormData((prev: any) => ({
        ...prev,
        password: "",
        image: null,
      }));
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
    handleAvatarChange, 
  };
}

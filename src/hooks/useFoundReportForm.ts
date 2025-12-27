// hooks/useFoundReportForm.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createFoundReport,
  createAdminFoundReport,
} from "@/services/foundReports";
import type { CreateFoundReportPayload } from "@/types/foundReports";

interface UseFoundReportFormOptions {
  isAdmin?: boolean;
  redirectUrl?: string;
}

export function useFoundReportForm(options?: UseFoundReportFormOptions) {
  const router = useRouter();
  const { isAdmin = false, redirectUrl } = options || {};

  const defaultRedirect = isAdmin
    ? "/api/dashboard/admin/found-reports"
    : "/api/dashboard/user/found-reports";
  const finalRedirect = redirectUrl || defaultRedirect;

  const [data, setData] = useState<CreateFoundReportPayload>({
    namaBarang: "",
    deskripsi: "",
    lokasiTemu: "",
    tanggal: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function updateField<K extends keyof CreateFoundReportPayload>(
    key: K,
    value: CreateFoundReportPayload[K]
  ) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleImage(file: File | null) {
    if (!file) {
      removeImage();
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Ukuran file maksimal 5MB");
      return;
    }

    updateField("image", file);

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setErrorMsg("");
  }

  function removeImage() {
    updateField("image", null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
  }

  async function submit() {
    if (!data.namaBarang.trim()) return setErrorMsg("Nama barang harus diisi");
    if (!data.lokasiTemu.trim())
      return setErrorMsg("Lokasi ditemukan harus diisi");
    if (!data.tanggal.trim()) return setErrorMsg("Tanggal harus diisi"); // 🆕

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = isAdmin
        ? await createAdminFoundReport(data)
        : await createFoundReport(data);

      if (res.success) {
        setSuccessMsg(res.message || "Laporan berhasil ditambahkan");
        setTimeout(() => router.push(finalRedirect), 1200);
      } else {
        setErrorMsg(res.message || "Gagal membuat laporan");
      }
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.message || err?.message || "Gagal membuat laporan"
      );
    } finally {
      setLoading(false);
    }
  }

  // cleanup URL ketika component unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return {
    data,
    updateField,
    previewUrl,
    handleImage,
    removeImage,
    submit,
    loading,
    errorMsg,
    successMsg,
  };
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import {
  createLostReport,
  CreateLostReportPayload,
} from "@/services/lostReports";

interface ErrorResponse {
  message: string;
}

export function useLostReportForm() {
  const router = useRouter();

  const [form, setForm] = useState<CreateLostReportPayload>({
    namaBarang: "",
    deskripsi: "",
    lokasiHilang: "",
    tanggal: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ================= FORM =================
  function updateField<K extends keyof CreateLostReportPayload>(
    key: K,
    value: CreateLostReportPayload[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    if (!form.namaBarang.trim() || !form.lokasiHilang.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const payload = {
        ...form,
        tanggal: form.tanggal ? new Date(form.tanggal).toISOString() : null,
      };

      await createLostReport(payload);

      setSuccessMsg("Laporan berhasil dibuat!");
      setForm({ namaBarang: "", deskripsi: "", lokasiHilang: "", tanggal: "" });

      setTimeout(() => {
        router.push("/dashboard/user/lost-reports");
      }, 1200);
    } catch (err) {
      if (err instanceof AxiosError) {
        const data = err.response?.data as ErrorResponse;
        setErrorMsg(data?.message || "Gagal membuat laporan");
      } else {
        setErrorMsg("Gagal membuat laporan");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    loading,
    errorMsg,
    successMsg,
    updateField,
    submit,
  };
}

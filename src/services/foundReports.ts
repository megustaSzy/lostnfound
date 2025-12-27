import { api } from "@/lib/api";
import type { CreateFoundReportPayload } from "@/types/foundReports";

interface CreateFoundReportResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    namaBarang: string;
    deskripsi?: string;
    lokasiTemu: string;
    imageUrl?: string;
  };
}

function buildFoundReportFormData(payload: CreateFoundReportPayload) {
  const formData = new FormData();

  formData.append("namaBarang", payload.namaBarang);
  formData.append("lokasiTemu", payload.lokasiTemu);
  formData.append("tanggal", payload.tanggal);

  if (payload.deskripsi) {
    formData.append("deskripsi", payload.deskripsi);
  }

  if (payload.image) {
    formData.append("image", payload.image);
  }

  return formData;
}
export async function createAdminFoundReport(
  payload: CreateFoundReportPayload
): Promise<CreateFoundReportResponse> {
  const formData = buildFoundReportFormData(payload);

  const res = await api.post("/api/found/admin/foundreports", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return {
    success: res.status === 201 || res.status === 200,
    message: res.data?.message || "Laporan berhasil ditambahkan",
    data: {
      ...res.data?.data,
      imageUrl: res.data?.data?.imageUrl,
      imagePublicId: res.data?.data?.imagePublicId,
      tanggal: res.data?.data?.tanggal
    }
  };
}
export async function createFoundReport(
  payload: CreateFoundReportPayload
): Promise<CreateFoundReportResponse> {
  const formData = buildFoundReportFormData(payload);

  const res = await api.post("/api/found", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return {
    success: res.status === 201 || res.status === 200,
    message: res.data?.message || "Laporan berhasil ditambahkan",
    data: res.data?.data,
  };
}

import { api } from "@/lib/api";

export interface CreateLostReportPayload {
  namaBarang: string;
  deskripsi?: string;
  lokasiHilang: string;
  tanggal?: string | null;
}

interface CreateLostReportResponse {
  id: number;
}

export async function createLostReport(
  payload: CreateLostReportPayload
): Promise<number> {
  const res = await api.post<CreateLostReportResponse>("/api/lost", payload);
  return res.data.id;
}

export async function uploadLostReportImage(lostReportId: number, image: File) {
  const formData = new FormData();
  formData.append("image", image);

  await api.post(`/api/image/lost-report/${lostReportId}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

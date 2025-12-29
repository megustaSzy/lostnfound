import { api } from "@/lib/api";
interface UpdateFoundPayload {
  namaBarang: string;
  deskripsi: string;
  lokasiTemu: string;
}

export async function updateFound(
  foundId: number,
  payload: UpdateFoundPayload
) {
  const res = await api.patch(`/api/found/${foundId}`, payload);
  return res.data;
}
export async function deleteFound(foundId: number) {
  const res = await api.delete(`/api/found/${foundId}`);
  return res.data;
}

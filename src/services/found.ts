import { api } from "@/lib/api";

export async function deleteFound(foundId: number) {
  const res = await api.delete(`/api/found/${foundId}`);
  return res.data;
}

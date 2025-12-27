export interface AdminFoundReport {
  id: number;
  namaBarang: string;
  deskripsi: string;
  lokasiTemu: string;
  statusFound: "PENDING" | "CLAIMED" | "APPROVED";
}
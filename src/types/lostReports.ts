export interface CreateLostReportPayload {
  namaBarang: string;
  deskripsi?: string;
  lokasiHilang: string;
  image: File | null;
}

export interface LostReport {
  id: number;
  namaBarang: string;
  deskripsi: string;
  lokasiHilang: string;
  imageUrl?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  tanggal: string; // ⬅️ TAMBAHKAN
  createdAt?: string;
}

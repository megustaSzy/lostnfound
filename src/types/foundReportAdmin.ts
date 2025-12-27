export interface FoundReportAdmin {
  id: number;
  namaBarang?: string;
  deskripsi?: string;
  lokasiTemu?: string;
  lostReport?: {
    id: number;
    namaBarang: string;
    deskripsi: string;
    lokasiHilang: string;
    imageUrl?: string;
    user?: {
      name: string;
      notelp?: string;
    };
  };
  statusFound: "PENDING" | "CLAIMED" | "APPROVED";
}

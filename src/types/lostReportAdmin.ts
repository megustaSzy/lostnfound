export interface LostReportAdmin {
  id: number;
  namaBarang: string;
  deskripsi: string;
  lokasiHilang: string;
  imageUrl?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  tanggal: string;
  createdAt: string;

  user: {
    id: number;
    name: string;
    email: string;
    notelp?: string;
  };
}

export interface LostReportsPagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
  items: LostReportAdmin[];
  links: {
    prev: string | null;
    next: string | null;
  };
}

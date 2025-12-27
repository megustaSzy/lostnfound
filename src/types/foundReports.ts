export interface CreateFoundReportPayload {
  namaBarang: string;
  deskripsi: string;
  lokasiTemu: string;
  tanggal: string;
  image?: File | null;
  imageUrl?: string; // dari Cloudinary (di-set backend)
  imagePublicId?: string; // dari Cloudinary (di-set backend)
}

export interface ApiError {
  message: string;
}

export interface AdminFoundReport {
  id: number;
  namaBarang: string;
  deskripsi: string;
  lokasiTemu: string;
  tanggal: string;
  imageUrl?: string;
  imagePublicId?: string;
  createdAt: string;
  statusFound: "PENDING" | "CLAIMED" | "REJECTED";
  createdByAdmin: boolean;
  adminId?: number | null;
  admin?: { name: string } | null;
  lostReportId?: number | null;
}

// Benar
export interface AdminFoundReportsPagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
  items: AdminFoundReport[];
  links: {
    prev: string | null;
    next: string | null;
  };
}

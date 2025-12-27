import { api } from "@/lib/api";
import { FoundReportUser } from "@/types/found";

export interface FoundReportsPagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
  items: FoundReportUser[];
  links: {
    prev: string | null;
    next: string | null;
  };
}

/**
 * Fetcher untuk laporan ditemukan user
 */
export const foundReportsFetcher = (
  url: string
): Promise<FoundReportsPagination> =>
  api.get(url).then((res) => res.data.data as FoundReportsPagination);

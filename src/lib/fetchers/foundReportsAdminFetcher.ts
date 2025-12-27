import { api } from "@/lib/api";
import { FoundReportAdmin } from "@/types/foundReportAdmin";

export interface FoundReportsAdminPagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
  items: FoundReportAdmin[];
  links: {
    prev: string | null;
    next: string | null;
  };
}

/**
 * Fetcher untuk SWR FoundReportsAdmin
 * @param url API endpoint dengan query ?page=&limit=
 */
export const foundReportsAdminFetcher = (url: string): Promise<FoundReportsAdminPagination> =>
  api.get(url).then((res) => res.data.data as FoundReportsAdminPagination);

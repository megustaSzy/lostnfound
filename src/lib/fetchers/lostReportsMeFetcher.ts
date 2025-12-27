import { api } from "@/lib/api";
import { LostReport } from "@/types/lostReports";

export interface LostReportsPagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
  items: LostReport[];
  links: {
    prev: string | null;
    next: string | null;
  };
}

/**
 * Fetcher untuk SWR lost reports user
 */
export const lostReportsMeFetcher = (
  url: string
): Promise<LostReportsPagination> =>
  api.get(url).then((res) => res.data.data as LostReportsPagination);

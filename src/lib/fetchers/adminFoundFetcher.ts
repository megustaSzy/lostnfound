import { api } from "@/lib/api";
import { AdminFoundReportsPagination } from "@/types/foundReports";

export const adminFoundFetcher = (
  url: string
): Promise<AdminFoundReportsPagination> =>
  api.get(url).then((res) => res.data.data);

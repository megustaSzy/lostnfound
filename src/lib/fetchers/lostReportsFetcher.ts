import { api } from "@/lib/api";
import { LostReportsPagination } from "@/types/lostReportAdmin";

export const lostReportsFetcher = (
  url: string
): Promise<LostReportsPagination> => api.get(url).then((res) => res.data.data);

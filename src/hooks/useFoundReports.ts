"use client";

import useSWR from "swr";
import {
  foundReportsFetcher,
  FoundReportsPagination,
} from "@/lib/fetchers/foundReportsFetcher";

export function useFoundReports(enabled: boolean, page: number, limit: number) {
  const { data, error, isValidating } = useSWR<FoundReportsPagination, Error>(
    enabled ? `/api/found?page=${page}&limit=${limit}` : null,
    foundReportsFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
      shouldRetryOnError: false,
    }
  );

  return {
    data,
    error,
    isLoading: enabled && !data && !error,
    isValidating,
  };
}

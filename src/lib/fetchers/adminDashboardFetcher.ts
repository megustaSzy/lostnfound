// src/lib/fetchers/adminDashboardFetcher.ts
import { api } from "@/lib/api";

export const adminDashboardFetcher = () =>
  api.get("/api/dashboard/admin").then((res) => res.data.data);

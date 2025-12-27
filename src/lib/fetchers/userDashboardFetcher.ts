import { api } from "@/lib/api";

export const userDashboardFetcher = () =>
  api.get("/api/dashboard/user").then((res) => res.data.data);

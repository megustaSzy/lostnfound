import { Badge } from "@/components/ui/badge";

type StatusKey = "PENDING" | "APPROVED" | "REJECTED";

const variants: Record<
  StatusKey,
  { variant: "default" | "secondary" | "destructive"; label: string }
> = {
  PENDING: { variant: "secondary", label: "Pending" },
  APPROVED: { variant: "default", label: "Disetujui" },
  REJECTED: { variant: "destructive", label: "Ditolak" },
};

export function LostReportsStatusBadge({ status }: { status: string }) {
  const badge = variants[status as StatusKey] ?? variants.PENDING;

  return <Badge variant={badge.variant}>{badge.label}</Badge>;
}

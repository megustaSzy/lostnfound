import { Badge } from "@/components/ui/badge";

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];
type StatusKey = "PENDING" | "APPROVED" | "REJECTED";

const variants: Record<StatusKey, { variant: BadgeVariant; label: string }> = {
  PENDING: { variant: "secondary", label: "Pending" },
  APPROVED: { variant: "default", label: "Disetujui" },
  REJECTED: { variant: "destructive", label: "Ditolak" },
};

export function LostReportsStatusBadge({ status }: { status: string }) {
  const badge = variants[status as StatusKey] ?? variants.PENDING;

  return <Badge variant={badge.variant}>{badge.label}</Badge>;
}

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRow as Row,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { UserActions } from "@/components/admin/users/UsersAction";

interface UsersTableProps {
  users?: any[];
  currentPage: number;
  limit: number;
  isLoading: boolean;
  error?: any;
}

export function UsersTable({
  users,
  currentPage,
  limit,
  isLoading,
  error,
}: UsersTableProps) {
  // 🔥 Sanitization biar 0 gak muncul lagi
  const safePage = currentPage > 0 ? currentPage : 1;
  const safeLimit = limit > 0 ? limit : 10;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error instanceof Error ? error.message : "Gagal mengambil data user"}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-center">No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>No. Telp</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center w-[100px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users && users.length > 0 ? (
            users.map((u, idx) => (
              <Row key={u.id}>
                <TableCell className="text-center font-medium">
                  {(safePage - 1) * safeLimit + (idx + 1)}
                </TableCell>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {u.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {u.notelp || "-"}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      u.role.toLowerCase() === "admin" ? "default" : "secondary"
                    }
                  >
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <UserActions user={u} />
                </TableCell>
              </Row>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                Tidak ada data user
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

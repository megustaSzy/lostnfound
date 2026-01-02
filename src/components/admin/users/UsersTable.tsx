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
  swrKey: string;
}

export function UsersTable({
  users,
  currentPage,
  limit,
  isLoading,
  error,
  swrKey,
}: UsersTableProps) {
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
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          {/* HEADER */}
          <TableHeader>
            <TableRow className="bg-muted/50 border-b">
              <TableHead className="w-[60px] text-center text-xs font-semibold uppercase text-muted-foreground">
                No
              </TableHead>
              <TableHead className="w-[220px] text-center text-xs font-semibold uppercase text-muted-foreground">
                Nama
              </TableHead>
              <TableHead className="w-[240px] text-center text-xs font-semibold uppercase text-muted-foreground">
                Email
              </TableHead>
              <TableHead className="w-[120px] text-center text-xs font-semibold uppercase text-muted-foreground">
                No. Telp
              </TableHead>
              <TableHead className="w-[80px] text-center text-xs font-semibold uppercase text-muted-foreground">
                Role
              </TableHead>
              <TableHead className="w-[120px] text-center text-xs font-semibold uppercase text-muted-foreground">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody className="divide-y">
            {users && users.length > 0 ? (
              users.map((u, idx) => (
                <TableRow
                  key={u.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <TableCell className="text-center text-sm font-medium">
                    {(safePage - 1) * safeLimit + (idx + 1)}
                  </TableCell>

                  <TableCell className="text-center">
                    <p className="text-sm font-medium line-clamp-1">{u.name}</p>
                  </TableCell>

                  <TableCell className="text-center">
                    <p className="text-sm font-medium text-muted-foreground line-clamp-1">
                      {u.email}
                    </p>
                  </TableCell>

                  <TableCell className="text-center">
                    <p className="text-xs text-muted-foreground">
                      {u.notelp || "-"}
                    </p>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Badge
                        variant={
                          u.role.toLowerCase() === "admin"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {u.role}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <UserActions user={u} swrKey={swrKey} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  Tidak ada data user
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

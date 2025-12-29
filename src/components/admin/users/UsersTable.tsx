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
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          {/* ===== HEADER ===== */}
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="w-[60px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                No
              </TableHead>
              <TableHead className="w-[220px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Nama
              </TableHead>
              <TableHead className="w-[240px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </TableHead>
              <TableHead className="w-[120px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                No. Telp
              </TableHead>
              <TableHead className="w-[80px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Role
              </TableHead>
              <TableHead className="w-[120px] text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* ===== BODY ===== */}
          <TableBody className="divide-y divide-gray-200">
            {users && users.length > 0 ? (
              users.map((u, idx) => (
                <TableRow
                  key={u.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* No */}
                  <TableCell className="px-4 py-4 text-center text-sm font-medium text-gray-900">
                    {(safePage - 1) * safeLimit + (idx + 1)}
                  </TableCell>

                  {/* Nama */}
                  <TableCell className="px-4 py-4 text-center">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {u.name}
                    </p>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="px-4 py-4 text-center">
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {u.email}
                    </p>
                  </TableCell>

                  {/* No Telp */}
                  <TableCell className="px-4 py-4 text-center">
                    <p className="text-xs text-gray-600">{u.notelp || "-"}</p>
                  </TableCell>

                  {/* Role */}
                  <TableCell className="px-4 py-4 text-center">
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

                  {/* Aksi */}
                  <TableCell className="px-4 py-4 text-center">
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
                  className="h-32 text-center text-sm text-gray-500"
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { User } from "@/types/user";

import { EditUserDialog } from "@/components/admin/users/EditUserDialog";
import { DeleteUserDialog } from "@/components/admin/users/DeleteUserDialog";

export function UserActions({ user }: { user: User }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button size="icon" variant="outline" onClick={() => setEditOpen(true)}>
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="destructive"
          onClick={() => setDeleteOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <EditUserDialog open={editOpen} onOpenChange={setEditOpen} user={user} />

      <DeleteUserDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        userId={user.id}
        userName={user.name}
      />
    </>
  );
}

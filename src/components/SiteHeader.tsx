"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

export function SiteHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      // 🔥 MATIKAN STATE USER LANGSUNG
      mutate("/api/auth/me", null, false);
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      router.replace("/login"); // replace > push
    }
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-slate-200 bg-white">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 text-slate-600" />

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-600 hover:bg-slate-100"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center text-slate-700"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center text-red-600 focus:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

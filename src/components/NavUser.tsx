"use client";

import {
  IconBell,
  IconCreditCard,
  IconLogout,
  IconSparkles,
  IconUserCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavUserProps } from "@/types/props";

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                gap-3
                hover:bg-slate-100
                data-[state=open]:bg-slate-100
              "
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.imageUrl} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-slate-200 text-slate-700">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-semibold text-slate-800">
                  {user.name}
                </span>
                <span className="truncate text-xs text-slate-500">
                  {user.email}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            className="min-w-56 rounded-lg border border-slate-200"
          >
            {/* USER INFO */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.imageUrl} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-slate-200 text-slate-700">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold text-slate-800">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-slate-500">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* PRO */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-slate-700 hover:bg-slate-100">
                <IconSparkles className="mr-2 h-4 w-4 text-slate-600" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* ACCOUNT */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-slate-700 hover:bg-slate-100">
                <IconUserCircle className="mr-2 h-4 w-4 text-slate-600" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700 hover:bg-slate-100">
                <IconCreditCard className="mr-2 h-4 w-4 text-slate-600" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700 hover:bg-slate-100">
                <IconBell className="mr-2 h-4 w-4 text-slate-600" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* LOGOUT */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 hover:bg-red-50"
            >
              <IconLogout className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

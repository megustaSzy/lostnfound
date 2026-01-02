// app-sidebar.tsx
"use client";

import * as React from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, Settings, LogOut, Icon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { adminMenu, userMenu } from "@/config/menu";

import { AppSidebarProps } from "@/types/props";

export function AppSidebar({ role, user }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = role === "Admin" ? adminMenu : userMenu;
  const [clickedPath, setClickedPath] = React.useState<string | null>(null);

  const handleMenuClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();

    // Set clicked state untuk animasi
    setClickedPath(path);

    // Navigate setelah delay kecil untuk animasi terlihat
    setTimeout(() => {
      router.push(path);
      setClickedPath(null);
    }, 300);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Lost & Found
            </h2>
            <p className="text-xs text-slate-500 capitalize">{role} Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                const isClicked = clickedPath === item.path;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
    text-slate-700
    hover:bg-slate-100
    data-[active=true]:bg-slate-200
    data-[active=true]:text-slate-900
    transition-all duration-300 relative overflow-hidden
    ${isClicked ? "scale-95 bg-slate-200" : ""}
  `}
                    >
                      <Link
                        href={item.path}
                        onClick={(e) => handleMenuClick(item.path, e)}
                        className="relative"
                      >
                        {/* Ripple effect */}
                        {isClicked && (
                          <span className="absolute inset-0 animate-ping bg-primary/30 rounded-md" />
                        )}

                        <Icon
                          className={`h-4 w-4 text-slate-600 transition-transform duration-300 ${
                            isClicked ? "scale-110 rotate-12" : ""
                          }`}
                        />

                        <span
                          className={`
    text-sm font-medium
    transition-all duration-300
    ${isClicked ? "translate-x-1" : ""}
  `}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <Avatar className="h-8 w-8">
            {user?.imageUrl ? (
              <AvatarImage
                src={user.imageUrl}
                alt={user.name || "User Avatar"}
              />
            ) : (
              <AvatarFallback className="bg-slate-200 text-slate-700">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex flex-col text-sm">
            <span className="font-medium text-slate-900">
              {user?.name || "Unknown User"}
            </span>
            <span className="text-xs text-slate-500">
              {user?.email || "No email"}
            </span>

            {/* Debug imageUrl */}
            <pre className="text-xs text-red-500">
              DEBUG imageUrl: {JSON.stringify(user?.imageUrl)}
            </pre>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

// Layout wrapper component
export function DashboardLayout({
  children,
  role,
  user,
}: {
  children: React.ReactNode;
  role: "Admin" | "User";
  user?: {
    name: string;
    email: string;
    imageUrl?: string;
  };
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar role={role} user={user} />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
          </header>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

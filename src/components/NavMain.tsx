"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-3">
        {/* ===== QUICK ACTION ===== */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="
                bg-slate-900 text-white
                hover:bg-slate-800
                active:bg-slate-800
                transition-colors
                min-w-8
              "
            >
              <IconCirclePlusFilled className="h-4 w-4" />
              <span className="font-medium">Quick Create</span>
            </SidebarMenuButton>

            <Button
              size="icon"
              variant="outline"
              className="
                size-8
                border-slate-300
                text-slate-600
                hover:bg-slate-100
                hover:text-slate-900
                group-data-[collapsible=icon]:opacity-0
              "
            >
              <IconMail className="h-4 w-4" />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* ===== MAIN MENU ===== */}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className="
                  text-slate-700
                  hover:bg-slate-100
                  hover:text-slate-900
                  data-[active=true]:bg-slate-200
                  data-[active=true]:text-slate-900
                  transition-colors
                "
              >
                {item.icon && <item.icon className="h-4 w-4 text-slate-600" />}
                <span className="text-sm font-medium">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

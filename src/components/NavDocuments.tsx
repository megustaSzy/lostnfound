"use client";

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavDocuments({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: Icon;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-xs font-medium text-slate-500">
        Documents
      </SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className="
                text-slate-700
                hover:bg-slate-100
                data-[active=true]:bg-slate-200
              "
            >
              <a href={item.url} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium">{item.name}</span>
              </a>
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="
                    rounded-md
                    text-slate-500
                    hover:bg-slate-200
                    data-[state=open]:bg-slate-200
                  "
                >
                  <IconDots className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-32 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="flex items-center gap-2">
                  <IconFolder className="h-4 w-4" />
                  <span>Open</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2">
                  <IconShare3 className="h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="
                    flex items-center gap-2
                    text-red-600
                    focus:text-red-600
                    hover:bg-red-50
                  "
                >
                  <IconTrash className="h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}

        {/* MORE */}
        <SidebarMenuItem>
          <SidebarMenuButton
            className="
              text-slate-500
              hover:bg-slate-100
            "
          >
            <IconDots className="h-4 w-4 text-slate-500" />
            <span className="text-sm">More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

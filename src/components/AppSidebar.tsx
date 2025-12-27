// app-sidebar.tsx
"use client"

import * as React from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  FileText,
  Settings,
  LogOut,
  Icon
} from "lucide-react"

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
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { adminMenu, userMenu } from "@/config/menu"

import { AppSidebarProps } from "@/types/props"

export function AppSidebar({ role, user }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const menuItems = role === "Admin" ? adminMenu : userMenu
  const [clickedPath, setClickedPath] = React.useState<string | null>(null)

  const handleMenuClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault()
    
    // Set clicked state untuk animasi
    setClickedPath(path)
    
    // Navigate setelah delay kecil untuk animasi terlihat
    setTimeout(() => {
      router.push(path)
      setClickedPath(null)
    }, 300)
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Lost & Found</h2>
            <p className="text-xs text-muted-foreground capitalize">{role} Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.path
                const isClicked = clickedPath === item.path
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`
                        transition-all duration-300 relative overflow-hidden
                        ${isClicked ? 'scale-95 bg-primary/20' : 'scale-100'}
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
                        
                        <Icon className={`
                          h-4 w-4 transition-transform duration-300
                          ${isClicked ? 'scale-110 rotate-12' : 'scale-100'}
                        `} />
                        <span className={`
                          transition-all duration-300
                          ${isClicked ? 'translate-x-1' : 'translate-x-0'}
                        `}>
                          {item.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
  <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2">
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.avatar} alt={user?.name} />
      <AvatarFallback>
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>

    <div className="flex flex-col items-start text-sm">
      <span className="font-medium">
        {user?.name || "Unknown User"}
      </span>
      <span className="text-xs text-muted-foreground">
        {user?.email || "No email"}
      </span>
    </div>
  </div>
</SidebarFooter>

    </Sidebar>
  )
}

// Layout wrapper component
export function DashboardLayout({ 
  children, 
  role, 
  user 
}: { 
  children: React.ReactNode
  role: "Admin" | "User"
  user?: {
    name: string
    email: string
    avatar?: string
  }
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar role={role} user={user} />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
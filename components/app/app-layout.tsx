'use client'

import { FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import ChildrenInterface from "@/interfaces/children-interface"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar"

import { FloatingDock } from "../ui/floating-dock"
import { CardDescription, CardHeader, CardTitle } from "../ui/card"

import {
  BellIcon,
  FileVideo,
  Landmark,
  LayoutDashboard,
  LayoutDashboardIcon,
  Settings,
} from "lucide-react"

import Logo from "../shared/logo"

/* ---------------- sidebar items ---------------- */

const items = [
  { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "Library", url: "/app/library", icon: FileVideo },
  { title: "Payments", url: "/app/payments", icon: Landmark },
  { title: "Notifications", url: "/app/notifications", icon: BellIcon },
  { title: "Settings", url: "/app/settings", icon: Settings },
]

/* ---------------- floating dock items ---------------- */

const dockItems = [
  { title: "Dashboard", icon: <LayoutDashboardIcon />, href: "/app/dashboard" },
  { title: "Library", icon: <FileVideo />, href: "/app/library" },
  { title: "Payments", icon: <Landmark />, href: "/app/payments" },
  { title: "Notifications", icon: <BellIcon />, href: "/app/notifications" },
  { title: "Settings", icon: <Settings />, href: "/app/settings" },
]

/* ---------------- layout ---------------- */

const AppLayout: FC<ChildrenInterface> = ({ children }) => {
  const pathname = usePathname()
  const pageTitle = pathname.split("/").pop()?.split("-").join(" ")

  return (
    <SidebarProvider>
      {/* ---------------- Sidebar (Desktop only) ---------------- */}
      <Sidebar className="hidden md:block">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="py-7">
              <Logo width={30} textSize="xl" priority />
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-4">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* ---------------- Main Content ---------------- */}
      <main className="w-full relative pb-24 md:pb-0">
        {/* Sidebar trigger (desktop only) */}
        <div className="hidden md:block">
          <SidebarTrigger />
        </div>

        {/* Mobile header logo */}
        <div className="mx-6 mt-4 md:hidden">
          <Logo textSize="xxl" width={38} />
        </div>

        {/* Page header */}
        <div className="px-6 md:px-18 py-8 space-y-7">
          <CardHeader className="p-0">
            <CardTitle className="text-3xl capitalize-first font-semibold">
              {pageTitle}
            </CardTitle>
            <CardDescription>
              Here is showing your {pageTitle}
            </CardDescription>
          </CardHeader>

          {children}
        </div>

        {/* ---------------- Floating Dock (Mobile only) ---------------- */}
        <div className="fixed bottom-12 left-0 right-0 flex justify-center md:hidden z-50">
          <FloatingDock items={dockItems} />
        </div>
      </main>
    </SidebarProvider>
  )
}

export default AppLayout
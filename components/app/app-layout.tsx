'use client'

import ChildrenInterface from "@/interfaces/children-interface"
import { FC } from "react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { BellIcon, FileVideo, Landmark, LayoutDashboard, LayoutDashboardIcon, Settings } from "lucide-react"
import Logo from "../shared/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CardDescription, CardHeader, CardTitle } from "../ui/card"
import { FloatingDock } from "../ui/floating-dock"

const items = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Library",
    url: "/app/library",
    icon: FileVideo,
  },
  {
    title: "Payments",
    url: "/app/payments",
    icon: Landmark,
  },
  {
    title: "Notifications",
    url: "/app/notifications",
    icon: BellIcon,
  },
  {
    title: "Settings",
    url: "/app/settings",
    icon: Settings,
  },
]

const dockItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboardIcon />,
    href: "/app/dashboard",
  },
  {
    title: "Library",
    icon: <FileVideo />,
    href: "/app/library",
  },
  {
    title: "Payments",
    icon: <Landmark />,
    href: "/app/payments",
  },
  {
    title: "Notifications",
    icon: <BellIcon />,
    href: "/app/notifications",
  },
  {
    title: "Settings",
    icon: <Settings />,
    href: "/app/settings",
  },
]

const AppLayout: FC<ChildrenInterface> = ({children}) => {
    const pathname = usePathname()
  return (
    <SidebarProvider>
        <Sidebar>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel className="py-7"><Logo width={30} textSize="xxl" priority/></SidebarGroupLabel>
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
        <main className="w-full">
            <SidebarTrigger />
            <div className="px-18 py-8 space-y-7">
                <CardHeader className="p-0">
                    <CardTitle className="text-3xl capitalize font-semibold">{pathname.split('/').pop()}</CardTitle>
                    <CardDescription className="w-full">Here is showing your {pathname.split('/').pop()}</CardDescription>
                </CardHeader>
                {children}
            </div>
            <div className="fixed bottom-0 w-full flex flex-col items-center py-4 z-50">
                <div className="-translate-x-30">
                    <FloatingDock items={dockItems} />
                </div>
            </div>
        </main>
    </SidebarProvider>
  )
}

export default AppLayout
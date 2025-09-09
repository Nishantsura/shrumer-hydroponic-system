"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Sprout, Activity, BarChart3, Bell, Settings } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Colonies", href: "/colonies", icon: Sprout },
  { name: "System Status", href: "/system", icon: Activity },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-0.5 sm:space-x-1">
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              size="sm"
              className={cn(
                "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-8 sm:h-9",
                pathname === item.href && "bg-primary text-primary-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden sm:inline text-xs sm:text-sm">{item.name}</span>
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}

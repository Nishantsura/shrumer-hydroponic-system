import type React from "react"
import { Navigation } from "@/components/navigation"

interface PageHeaderProps {
  pageName: string
  children?: React.ReactNode
}

export function PageHeader({ pageName, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[60px]">
      <div className="flex-shrink-0">
        <h1 className="text-foreground flex flex-col sm:flex-row sm:items-baseline">
          <span className="text-xl sm:text-2xl font-muli font-normal">Shrumer</span>
          <span className="text-sm sm:text-base font-sans font-medium sm:ml-2 text-muted-foreground">{pageName}</span>
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        <Navigation />
        {children}
      </div>
    </div>
  )
}

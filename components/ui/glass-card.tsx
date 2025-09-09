import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "header" | "nav" | "metric"
  glow?: "none" | "neon" | "orange" | "subtle"
  children: React.ReactNode
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", glow = "none", children, ...props }, ref) => {
    const baseClasses = "rounded-xl mobile-optimized"
    
    const variantClasses = {
      default: "glass-card",
      header: "glass-header",
      nav: "glass-nav rounded-full",
      metric: "glass-card hover:scale-[1.02] transition-all duration-300"
    }
    
    const glowClasses = {
      none: "",
      neon: "glow-neon",
      orange: "glow-orange", 
      subtle: "glow-subtle"
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          glowClasses[glow],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }

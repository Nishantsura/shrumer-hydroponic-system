"use client"

import React from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedValue } from "@/components/ui/animated-value"

interface MetricCardProps {
  icon: LucideIcon
  label: string
  value: number
  unit: string
  status: "optimal" | "warning" | "critical"
  optimalRange?: string
  index: number
}

export function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  unit, 
  status, 
  optimalRange,
  index 
}: MetricCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "neon-green"
      case "warning": return "alert-orange"
      case "critical": return "chart-5"
      default: return "muted"
    }
  }

  const getStatusGlow = (status: string) => {
    switch (status) {
      case "optimal": return "subtle"
      case "warning": return "orange"
      case "critical": return "orange"
      default: return "none"
    }
  }

  const statusColor = getStatusColor(status)
  const statusGlow = getStatusGlow(status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <GlassCard 
        variant="metric"
        glow={statusGlow}
        className="p-4 h-32 flex flex-col justify-between relative overflow-hidden"
      >
        {/* Background pulse for critical metrics */}
        {status === "critical" && (
          <motion.div
            className="absolute inset-0 bg-chart-5/5 rounded-xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <motion.div
            className={`p-2 rounded-lg bg-${statusColor}/20`}
            animate={status === "warning" ? { 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            } : {}}
            transition={{ 
              duration: 1.5,
              repeat: status === "warning" ? Infinity : 0
            }}
          >
            <Icon className={`h-4 w-4 text-${statusColor}`} />
          </motion.div>
          
          {/* Status Indicator */}
          <motion.div
            className={`w-2 h-2 rounded-full bg-${statusColor}`}
            animate={status !== "optimal" ? { 
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            } : {}}
            transition={{ 
              duration: 1,
              repeat: status !== "optimal" ? Infinity : 0
            }}
          />
        </div>

        {/* Value */}
        <div className="relative z-10">
          <motion.div
            className="text-2xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
          >
            <AnimatedValue 
              value={value}
              suffix={unit}
              decimals={unit === "°C" || unit.includes("pH") ? 1 : 0}
              duration={1.2}
            />
          </motion.div>
          
          <motion.p 
            className="text-sm text-white/70 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {label}
          </motion.p>
          
          {optimalRange && (
            <motion.p 
              className={`text-xs mt-1 font-medium ${
                status === "optimal" ? "text-neon-green" : 
                status === "warning" ? "text-chart-4" : "text-alert-orange"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {status === "optimal" ? "Optimal" : `Target: ${optimalRange}`}
            </motion.p>
          )}
        </div>

        {/* Subtle gradient overlay */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${statusColor}/30 to-transparent`} />
      </GlassCard>
    </motion.div>
  )
}

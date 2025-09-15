"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Power, 
  Droplets, 
  Gauge, 
  Settings,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ColonyOverview } from "@/lib/overview-utils"

interface ColonyGridProps {
  colonies: ColonyOverview[]
}

export function ColonyGrid({ colonies }: ColonyGridProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return CheckCircle
      case "setup": return Settings
      case "maintenance": return AlertTriangle
      case "offline": return Power
      default: return Power
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active"
      case "setup": return "Setup"
      case "maintenance": return "Maintenance"
      case "offline": return "Offline"
      default: return "Unknown"
    }
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Colony Status</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colonies.map((colony, index) => {
          const StatusIcon = getStatusIcon(colony.status)
          
          return (
            <motion.div
              key={colony.id}
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
              <Link href={`/colony/${colony.id}`}>
                <GlassCard 
                  className="p-6 h-full relative overflow-hidden cursor-pointer group"
                  glow="none"
                >
                {/* Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5 bg-white/10"
                  animate={colony.status === "active" ? {
                    opacity: [0.05, 0.1, 0.05]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white mb-1">
                      {colony.name}
                    </h3>
                    <p className="text-sm text-white/70 mb-2">
                      {colony.location}
                    </p>
                    <Badge 
                      className="bg-white/20 text-white border-white/30 text-xs"
                    >
                      {getStatusText(colony.status)}
                    </Badge>
                  </div>
                  
                  <motion.div
                    className="p-2 rounded-lg bg-white/20"
                    animate={colony.hasAlerts ? {
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <StatusIcon className="h-5 w-5 text-white" />
                  </motion.div>
                </div>

                {/* Alert Indicator */}
                {colony.hasAlerts && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 mb-4 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20"
                  >
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <span className="text-xs text-orange-400 font-medium">
                      Requires attention
                    </span>
                  </motion.div>
                )}

                {/* Utilization Progress */}
                <div className="mb-4 relative z-10">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/70">Utilization</span>
                    <span className="font-semibold text-white">
                      {colony.activeSlots}/{colony.capacity}
                    </span>
                  </div>
                  <Progress 
                    value={colony.utilizationRate} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>0%</span>
                    <span className="font-medium">{colony.utilizationRate}%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Health Score */}
                {colony.avgHealthScore > 0 && (
                  <div className="mb-4 relative z-10">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-white/70">Avg Health</span>
                      <span className={`font-bold ${
                        colony.avgHealthScore >= 90 ? "text-green-400" : 
                        colony.avgHealthScore >= 70 ? "text-yellow-400" : "text-red-400"
                      }`}>
                        {colony.avgHealthScore}%
                      </span>
                    </div>
                  </div>
                )}

                {/* System Metrics */}
                <div className="grid grid-cols-3 gap-3 text-xs relative z-10">
                  {/* Power Usage */}
                  <div className="text-center">
                    <motion.div
                      className="flex items-center justify-center w-8 h-8 mx-auto mb-1 bg-blue-500/20 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Power className="h-3 w-3 text-blue-400" />
                    </motion.div>
                    <div className="font-semibold text-white">
                      {colony.systemMetrics.powerUsage}W
                    </div>
                    <div className="text-white/50">Power</div>
                  </div>

                  {/* Water Flow */}
                  <div className="text-center">
                    <motion.div
                      className="flex items-center justify-center w-8 h-8 mx-auto mb-1 bg-cyan-500/20 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Droplets className="h-3 w-3 text-cyan-400" />
                    </motion.div>
                    <div className="font-semibold text-white">
                      {colony.systemMetrics.waterFlow}L/h
                    </div>
                    <div className="text-white/50">Flow</div>
                  </div>

                  {/* Nutrients */}
                  <div className="text-center">
                    <motion.div
                      className="flex items-center justify-center w-8 h-8 mx-auto mb-1 bg-green-500/20 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Gauge className="h-3 w-3 text-green-400" />
                    </motion.div>
                    <div className="font-semibold text-white">
                      {colony.systemMetrics.nutrientLevel}%
                    </div>
                    <div className="text-white/50">Nutrients</div>
                  </div>
                </div>

                {/* Auto Mode Indicator */}
                {colony.systemMetrics.autoMode && (
                  <motion.div
                    className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* View Details Button */}
                <motion.div
                  className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <div className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                    <span>View Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </motion.div>
                </GlassCard>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

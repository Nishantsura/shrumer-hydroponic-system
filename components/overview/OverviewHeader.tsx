"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Zap, 
  Droplets, 
  Activity, 
  AlertTriangle 
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { SystemOverview } from "@/lib/overview-utils"

interface OverviewHeaderProps {
  systemData: SystemOverview
}

export function OverviewHeader({ systemData }: OverviewHeaderProps) {
  const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const getSystemStatus = () => {
    if (systemData.criticalAlertsCount > 0) {
      return { status: "Critical Issues", color: "text-red-400", bgColor: "bg-red-500/20" }
    }
    if (systemData.warningAlertsCount > 0) {
      return { status: "Needs Attention", color: "text-orange-400", bgColor: "bg-orange-500/20" }
    }
    if (systemData.avgHealthScore >= 90) {
      return { status: "Excellent", color: "text-green-400", bgColor: "bg-green-500/20" }
    }
    return { status: "Running Well", color: "text-blue-400", bgColor: "bg-blue-500/20" }
  }

  const systemStatus = getSystemStatus()

  return (
    <div className="space-y-4">
      {/* Greeting & Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="p-6 relative overflow-hidden">
          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(0,255,156,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(0,255,156,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(0,255,156,0.3) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-2xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {getTimeGreeting()}
              </motion.h1>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                System Overview
              </motion.p>
            </div>
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <Badge 
                className={`${systemStatus.bgColor} ${systemStatus.color} border-0 text-sm font-semibold px-4 py-2`}
              >
                <motion.span
                  animate={systemData.criticalAlertsCount > 0 ? {
                    scale: [1, 1.05, 1]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {systemStatus.status}
                </motion.span>
              </Badge>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {/* Total Plants */}
        <GlassCard className="p-4 text-center">
          <motion.div
            className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <span className="text-2xl">🌱</span>
          </motion.div>
          <motion.div
            className="text-2xl font-bold text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {systemData.totalPlants}
          </motion.div>
          <p className="text-sm text-white/70">Total Plants</p>
        </GlassCard>

        {/* Active Colonies */}
        <GlassCard className="p-4 text-center">
          <motion.div
            className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-500/20 rounded-full"
            whileHover={{ scale: 1.1, rotate: -5 }}
          >
            <Activity className="h-6 w-6 text-blue-400" />
          </motion.div>
          <div className="text-2xl font-bold text-white">
            {systemData.activeColonies}/{systemData.totalColonies}
          </div>
          <p className="text-sm text-white/70">Active Colonies</p>
        </GlassCard>

        {/* Health Score */}
        <GlassCard className="p-4 text-center">
          <motion.div
            className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full"
            whileHover={{ scale: 1.1 }}
          >
            <Droplets className="h-6 w-6 text-green-400" />
          </motion.div>
          <motion.div
            className={`text-2xl font-bold ${
              systemData.avgHealthScore >= 90 ? "text-green-400" : 
              systemData.avgHealthScore >= 70 ? "text-yellow-400" : "text-red-400"
            }`}
            animate={{ 
              textShadow: systemData.avgHealthScore >= 90 
                ? ["0 0 0px rgba(34,197,94,0)", "0 0 10px rgba(34,197,94,0.5)", "0 0 0px rgba(34,197,94,0)"]
                : []
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {systemData.avgHealthScore}%
          </motion.div>
          <p className="text-sm text-white/70">Avg Health</p>
        </GlassCard>

        {/* Alerts */}
        <GlassCard className="p-4 text-center">
          <motion.div
            className={`flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full ${
              systemData.alertsCount > 0 ? "bg-orange-500/20" : "bg-gray-500/20"
            }`}
            whileHover={{ scale: 1.1 }}
            animate={systemData.alertsCount > 0 ? {
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {systemData.alertsCount > 0 ? (
              <AlertTriangle className="h-6 w-6 text-orange-400" />
            ) : (
              <Zap className="h-6 w-6 text-gray-400" />
            )}
          </motion.div>
          <motion.div
            className={`text-2xl font-bold ${
              systemData.alertsCount > 0 ? "text-orange-400" : "text-green-400"
            }`}
          >
            {systemData.alertsCount}
          </motion.div>
          <p className="text-sm text-white/70">
            {systemData.alertsCount === 0 ? "No Alerts" : "Alerts"}
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}

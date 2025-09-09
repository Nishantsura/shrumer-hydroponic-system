"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Wrench,
  TrendingDown
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CROPS, COLONIES } from "@/lib/data"
import { getSystemRecommendations } from "@/lib/overview-utils"

interface Alert {
  id: string
  type: "critical" | "warning" | "info"
  title: string
  description: string
  source: string
  timestamp: string
  action?: string
}

export function AlertsPanel() {
  // Generate alerts from current system state
  const generateAlerts = (): Alert[] => {
    const alerts: Alert[] = []
    
    // Critical crop alerts
    CROPS.filter(crop => crop.status === "critical").forEach(crop => {
      alerts.push({
        id: `critical-${crop.id}`,
        type: "critical",
        title: "Critical Crop Condition",
        description: `${crop.name} requires immediate attention`,
        source: `Colony ${crop.colonyId}`,
        timestamp: "5 min ago",
        action: "Inspect Now"
      })
    })

    // Warning crop alerts
    CROPS.filter(crop => crop.status === "warning").forEach(crop => {
      alerts.push({
        id: `warning-${crop.id}`,
        type: "warning", 
        title: "Crop Needs Monitoring",
        description: `${crop.name} showing warning signs`,
        source: `Colony ${crop.colonyId}`,
        timestamp: "15 min ago",
        action: "Review Metrics"
      })
    })

    // Colony status alerts
    COLONIES.filter(colony => colony.status === "maintenance").forEach(colony => {
      alerts.push({
        id: `maintenance-${colony.id}`,
        type: "warning",
        title: "Maintenance Required",
        description: `${colony.name} needs maintenance`,
        source: colony.location,
        timestamp: "1 hour ago",
        action: "Schedule"
      })
    })

    COLONIES.filter(colony => colony.status === "offline").forEach(colony => {
      alerts.push({
        id: `offline-${colony.id}`,
        type: "critical",
        title: "Colony Offline",
        description: `${colony.name} is not responding`,
        source: colony.location,
        timestamp: "2 hours ago",
        action: "Investigate"
      })
    })

    // Environmental alerts
    CROPS.forEach(crop => {
      if (crop.metrics.ph < 5.5 || crop.metrics.ph > 6.8) {
        alerts.push({
          id: `ph-${crop.id}`,
          type: "warning",
          title: "pH Out of Range",
          description: `pH level ${crop.metrics.ph} in ${crop.name}`,
          source: `Colony ${crop.colonyId}`,
          timestamp: "30 min ago",
          action: "Adjust"
        })
      }
      
      if (crop.metrics.waterLevel < 60) {
        alerts.push({
          id: `water-${crop.id}`,
          type: "critical",
          title: "Low Water Level",
          description: `Water level ${crop.metrics.waterLevel}% in ${crop.name}`,
          source: `Colony ${crop.colonyId}`,
          timestamp: "10 min ago",
          action: "Refill"
        })
      }
    })

    return alerts.sort((a, b) => {
      if (a.type === "critical" && b.type !== "critical") return -1
      if (b.type === "critical" && a.type !== "critical") return 1
      return 0
    })
  }

  const alerts = generateAlerts()
  const recommendations = getSystemRecommendations()

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return AlertCircle
      case "warning": return AlertTriangle
      case "info": return CheckCircle
      default: return AlertTriangle
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "text-red-400 bg-red-500/20"
      case "warning": return "text-orange-400 bg-orange-500/20"
      case "info": return "text-blue-400 bg-blue-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">System Alerts</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-red-500/20 rounded-lg"
                  animate={alerts.length > 0 ? {
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white">Active Alerts</h3>
                  <p className="text-sm text-white/70">{alerts.length} items need attention</p>
                </div>
              </div>
              
              {alerts.length > 0 && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  {alerts.length}
                </Badge>
              )}
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              <AnimatePresence>
                {alerts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-400 opacity-50" />
                    <p className="text-white/70">All systems operating normally</p>
                    <p className="text-sm text-white/50">No active alerts</p>
                  </motion.div>
                ) : (
                  alerts.map((alert, index) => {
                    const AlertIcon = getAlertIcon(alert.type)
                    
                    return (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <motion.div
                            className={`p-2 rounded-lg ${getAlertColor(alert.type)}`}
                            animate={alert.type === "critical" ? {
                              scale: [1, 1.1, 1],
                              opacity: [0.8, 1, 0.8]
                            } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <AlertIcon className="h-4 w-4" />
                          </motion.div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-white text-sm">{alert.title}</h4>
                                <p className="text-xs text-white/70 mt-1">{alert.description}</p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-white/50">
                                  <span className="flex items-center gap-1">
                                    📍 {alert.source}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {alert.timestamp}
                                  </span>
                                </div>
                              </div>
                              
                              {alert.action && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs ml-3 shrink-0"
                                >
                                  {alert.action}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </AnimatePresence>
            </div>
          </GlassCard>
        </motion.div>

        {/* System Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="p-2 bg-blue-500/20 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Wrench className="h-5 w-5 text-blue-400" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white">Recommendations</h3>
                <p className="text-sm text-white/70">System optimization suggestions</p>
              </div>
            </div>

            <div className="space-y-3">
              {recommendations.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <TrendingDown className="h-12 w-12 mx-auto mb-3 text-green-400 opacity-50" />
                  <p className="text-white/70">System running optimally</p>
                  <p className="text-sm text-white/50">No recommendations at this time</p>
                </motion.div>
              ) : (
                recommendations.map((recommendation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20 hover:bg-blue-500/10 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        className="w-2 h-2 bg-blue-400 rounded-full mt-2 shrink-0"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                      <p className="text-sm text-white/80 leading-relaxed">
                        {recommendation}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}

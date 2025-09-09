"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Plus, 
  Settings, 
  BarChart3, 
  Shield, 
  Download,
  RefreshCw,
  Zap,
  Bell
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  onClick: () => void
  isPrimary?: boolean
}

export function QuickActions() {
  const handleAction = (actionId: string) => {
    console.log(`Executing action: ${actionId}`)
    // Here you would implement the actual action logic
  }

  const quickActions: QuickAction[] = [
    {
      id: "add-crop",
      title: "Add New Crop",
      description: "Start growing a new plant variety",
      icon: Plus,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      onClick: () => handleAction("add-crop"),
      isPrimary: true
    },
    {
      id: "add-colony",
      title: "Setup Colony",
      description: "Configure a new growing station",
      icon: Settings,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      onClick: () => handleAction("add-colony")
    },
    {
      id: "analytics",
      title: "View Analytics",
      description: "Detailed performance reports",
      icon: BarChart3,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      onClick: () => handleAction("analytics")
    },
    {
      id: "maintenance",
      title: "System Check",
      description: "Run diagnostic and maintenance",
      icon: Shield,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      onClick: () => handleAction("maintenance")
    },
    {
      id: "export-data",
      title: "Export Data",
      description: "Download system reports",
      icon: Download,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      onClick: () => handleAction("export-data")
    },
    {
      id: "refresh-system",
      title: "Refresh Data",
      description: "Update all sensor readings",
      icon: RefreshCw,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      onClick: () => handleAction("refresh-system")
    }
  ]

  const emergencyActions = [
    {
      id: "emergency-stop",
      title: "Emergency Stop",
      description: "Halt all automated systems",
      icon: Zap,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      onClick: () => handleAction("emergency-stop")
    },
    {
      id: "alert-all",
      title: "Send Alert",
      description: "Notify all system administrators",
      icon: Bell,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      onClick: () => handleAction("alert-all")
    }
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="p-2 bg-green-500/20 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Plus className="h-5 w-5 text-green-400" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white">System Actions</h3>
                <p className="text-sm text-white/70">Common management tasks</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.4 + (index * 0.1),
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full h-auto p-4 flex flex-col items-center gap-3 text-left ${action.bgColor} hover:bg-opacity-30 transition-all duration-300 relative overflow-hidden group`}
                      onClick={action.onClick}
                    >
                      {/* Background animation for primary action */}
                      {action.isPrimary && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent"
                          animate={{ 
                            x: ["-100%", "100%"]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      )}
                      
                      <motion.div
                        className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}
                        whileHover={{ rotate: 5 }}
                      >
                        <Icon className={`h-6 w-6 ${action.color}`} />
                      </motion.div>
                      
                      <div className="text-center relative z-10">
                        <div className={`font-medium ${action.color} text-sm mb-1`}>
                          {action.title}
                        </div>
                        <div className="text-xs text-white/60 leading-tight">
                          {action.description}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Emergency Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="p-2 bg-red-500/20 rounded-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <Shield className="h-5 w-5 text-red-400" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white">Emergency Controls</h3>
                <p className="text-sm text-white/70">Critical system overrides</p>
              </div>
            </div>

            <div className="space-y-3">
              {emergencyActions.map((action, index) => {
                const Icon = action.icon
                
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.6 + (index * 0.1)
                    }}
                  >
                    <Button
                      variant="outline"
                      className={`w-full p-4 flex items-center gap-4 text-left border-red-500/30 ${action.bgColor} hover:bg-red-500/30 transition-all duration-300 relative overflow-hidden group`}
                      onClick={action.onClick}
                    >
                      {/* Warning pulse animation */}
                      <motion.div
                        className="absolute inset-0 border-2 border-red-500/30 rounded-lg"
                        animate={{
                          opacity: [0, 0.5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                      
                      <motion.div
                        className={`p-2 rounded-lg ${action.bgColor}`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon className={`h-5 w-5 ${action.color}`} />
                      </motion.div>
                      
                      <div className="flex-1 relative z-10">
                        <div className={`font-medium ${action.color} text-sm mb-1`}>
                          {action.title}
                        </div>
                        <div className="text-xs text-white/60">
                          {action.description}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                )
              })}
            </div>

            {/* Warning message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
            >
              <p className="text-xs text-red-400 text-center">
                ⚠️ Emergency actions require confirmation
              </p>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bell, 
  Plus, 
  Grid3X3, 
  BarChart3,
  Zap
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"

interface BottomNavProps {
  alertsCount?: number
  onAlertsClick: () => void
  onAddClick: () => void
  onOverviewClick: () => void
}

export function BottomNav({ 
  alertsCount = 0, 
  onAlertsClick, 
  onAddClick, 
  onOverviewClick 
}: BottomNavProps) {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: 0.5,
        ease: "easeOut"
      }}
    >
      <GlassCard 
        variant="nav" 
        className="px-4 py-3"
      >
        <div className="flex items-center justify-between">
          {/* Left - Alerts */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onAlertsClick}
              className="relative w-12 h-12 rounded-full glass-card hover:glow-subtle transition-all duration-300"
            >
              <Bell className="h-5 w-5 text-foreground" />
              
              {/* Alert Badge */}
              <AnimatePresence>
                {alertsCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-alert-orange rounded-full flex items-center justify-center"
                  >
                    <motion.span
                      className="text-xs font-bold text-white"
                      animate={{ 
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity
                      }}
                    >
                      {alertsCount > 9 ? "9+" : alertsCount}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Center - Quick Actions */}
          <div className="flex items-center space-x-3">
            {/* Analytics */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full glass-card hover:glow-subtle transition-all duration-300"
              >
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </motion.div>

            {/* Main Add Button */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative"
            >
              <Button
                onClick={onAddClick}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-green to-chart-2 hover:from-neon-green/90 hover:to-chart-2/90 shadow-xl relative overflow-hidden"
              >
                {/* Rotating glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ 
                    background: [
                      "conic-gradient(from 0deg, transparent, rgba(0,255,156,0.3), transparent)",
                      "conic-gradient(from 360deg, transparent, rgba(0,255,156,0.3), transparent)"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.div
                  animate={{ 
                    rotate: [0, 180, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Plus className="h-6 w-6 text-primary-foreground relative z-10" />
                </motion.div>
              </Button>
              
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-neon-green"
                animate={{ 
                  scale: [1, 1.4, 1.8],
                  opacity: [0.6, 0.3, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-neon-green"
                animate={{ 
                  scale: [1, 1.4, 1.8],
                  opacity: [0.6, 0.3, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.7
                }}
              />
            </motion.div>

            {/* System Status */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full glass-card hover:glow-subtle transition-all duration-300"
              >
                <Zap className="h-4 w-4 text-muted-foreground" />
              </Button>
            </motion.div>
          </div>

          {/* Right - Overview */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onOverviewClick}
              className="w-12 h-12 rounded-full glass-card hover:glow-subtle transition-all duration-300"
            >
              <Grid3X3 className="h-5 w-5 text-foreground" />
            </Button>
          </motion.div>
        </div>

        {/* Subtle background animation */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-10"
          animate={{ 
            background: [
              "linear-gradient(45deg, transparent, rgba(0,255,156,0.1), transparent)",
              "linear-gradient(225deg, transparent, rgba(0,255,156,0.1), transparent)",
              "linear-gradient(45deg, transparent, rgba(0,255,156,0.1), transparent)"
            ]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </GlassCard>

    </motion.div>
  )
}

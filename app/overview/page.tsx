"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OverviewHeader } from "@/components/overview/OverviewHeader"
import { ColonyGrid } from "@/components/overview/ColonyGrid"
import { SystemMetrics } from "@/components/overview/SystemMetrics"
import { ProductionPipeline } from "@/components/overview/ProductionPipeline"
import { AlertsPanel } from "@/components/overview/AlertsPanel"
import { QuickActions } from "@/components/overview/QuickActions"
import { 
  getSystemOverview, 
  getColonyOverview, 
  getProductionStats, 
  getHarvestSchedule,
  getEnvironmentalSummary
} from "@/lib/overview-utils"
import { SYSTEM_METRICS } from "@/lib/data"

export default function OverviewPage() {
  // Get all the data for the overview
  const systemOverview = getSystemOverview()
  const colonyOverview = getColonyOverview()
  const productionStats = getProductionStats()
  const harvestSchedule = getHarvestSchedule()
  const environmentalData = getEnvironmentalSummary()

  return (
    <div className="min-h-screen bg-dark-charcoal bg-gradient-to-br from-dark-charcoal to-deep-green-tint">
      {/* Header with back navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 bg-dark-charcoal/80 backdrop-blur-sm border-b border-white/10"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <h1 className="text-xl font-bold text-white">System Overview</h1>
              <p className="text-sm text-white/70">Comprehensive system monitoring</p>
            </div>
          </div>
          
          {/* Live indicator */}
          <motion.div
            className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30"
            animate={{ 
              boxShadow: [
                "0 0 0px rgba(34,197,94,0)",
                "0 0 10px rgba(34,197,94,0.3)",
                "0 0 0px rgba(34,197,94,0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-xs text-green-400 font-medium">Live</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="p-4 space-y-8 pb-24">
        {/* System Overview Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <OverviewHeader systemData={systemOverview} />
        </motion.section>

        {/* Colony Status Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ColonyGrid colonies={colonyOverview} />
        </motion.section>

        {/* Environmental Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SystemMetrics 
            environmentalData={environmentalData}
            powerUsage={SYSTEM_METRICS.powerUsage}
            waterEfficiency={SYSTEM_METRICS.waterEfficiency}
          />
        </motion.section>

        {/* Production Pipeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ProductionPipeline 
            productionStats={productionStats}
            harvestSchedule={harvestSchedule}
          />
        </motion.section>

        {/* Alerts and Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AlertsPanel />
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <QuickActions />
        </motion.section>
      </div>

      {/* Floating action button for quick access */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-20 right-4 z-50"
      >
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg relative overflow-hidden group"
        >
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400"
            animate={{ 
              scale: [1, 1.5, 2],
              opacity: [0.5, 0.2, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          
          <motion.span
            className="text-2xl relative z-10"
            animate={{ 
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            🌱
          </motion.span>
        </Button>
      </motion.div>

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(0,255,156,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(0,255,156,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(0,255,156,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(0,255,156,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(0,255,156,0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

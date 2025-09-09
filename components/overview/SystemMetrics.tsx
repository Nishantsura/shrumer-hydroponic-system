"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Thermometer, 
  Droplets, 
  Zap, 
  Wind, 
  Lightbulb,
  Gauge
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Progress } from "@/components/ui/progress"
import { getEnvironmentalSummary } from "@/lib/overview-utils"

interface SystemMetricsProps {
  environmentalData: ReturnType<typeof getEnvironmentalSummary>
  powerUsage: number
  waterEfficiency: number
}

export function SystemMetrics({ environmentalData, powerUsage, waterEfficiency }: SystemMetricsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal": return "🟢"
      case "warning": return "🟡"
      case "critical": return "🔴"
      default: return "⚪"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "text-green-400"
      case "warning": return "text-yellow-400"
      case "critical": return "text-red-400"
      default: return "text-gray-400"
    }
  }

  const metrics = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: environmentalData.temperature,
      unit: "°C",
      status: environmentalData.tempStatus,
      target: "20-25°C",
      progress: Math.min(100, Math.max(0, ((environmentalData.temperature - 15) / 20) * 100))
    },
    {
      icon: Wind,
      label: "Humidity",
      value: environmentalData.humidity,
      unit: "%",
      status: environmentalData.humidityStatus,
      target: "60-75%",
      progress: environmentalData.humidity
    },
    {
      icon: Zap,
      label: "pH Level",
      value: environmentalData.ph,
      unit: " pH",
      status: environmentalData.phStatus,
      target: "6.0-6.5",
      progress: Math.min(100, Math.max(0, ((environmentalData.ph - 5) / 3) * 100))
    },
    {
      icon: Gauge,
      label: "EC/TDS",
      value: environmentalData.ec,
      unit: " ppm",
      status: "optimal",
      target: "1200-1600",
      progress: Math.min(100, Math.max(0, ((environmentalData.ec - 800) / 1200) * 100))
    },
    {
      icon: Lightbulb,
      label: "Light Intensity",
      value: environmentalData.lightIntensity,
      unit: "k lux",
      status: "optimal",
      target: "35k+ lux",
      progress: Math.min(100, (environmentalData.lightIntensity / 50) * 100)
    },
    {
      icon: Droplets,
      label: "Water Efficiency",
      value: waterEfficiency,
      unit: "%",
      status: waterEfficiency >= 90 ? "optimal" : waterEfficiency >= 75 ? "warning" : "critical",
      target: "90%+",
      progress: waterEfficiency
    }
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Environmental Metrics</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5,
                delay: 0.3 + (index * 0.1),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <GlassCard className="p-4 h-36 flex flex-col justify-between relative overflow-hidden">
                {/* Background pulse for critical metrics */}
                {metric.status === "critical" && (
                  <motion.div
                    className="absolute inset-0 bg-red-500/5 rounded-xl"
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
                    className={`p-2 rounded-lg ${
                      metric.status === "optimal" ? "bg-green-500/20" :
                      metric.status === "warning" ? "bg-yellow-500/20" : "bg-red-500/20"
                    }`}
                    animate={metric.status === "warning" ? { 
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    } : {}}
                    transition={{ 
                      duration: 1.5,
                      repeat: metric.status === "warning" ? Infinity : 0
                    }}
                  >
                    <Icon className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
                  </motion.div>
                  
                  <motion.span
                    className="text-lg"
                    animate={metric.status !== "optimal" ? { 
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ 
                      duration: 1,
                      repeat: metric.status !== "optimal" ? Infinity : 0
                    }}
                  >
                    {getStatusIcon(metric.status)}
                  </motion.span>
                </div>

                {/* Value */}
                <div className="relative z-10 text-center">
                  <motion.div
                    className={`text-xl font-bold ${getStatusColor(metric.status)}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {typeof metric.value === "number" 
                      ? metric.value.toFixed(metric.unit === "°C" || metric.unit.includes("pH") ? 1 : 0)
                      : metric.value}{metric.unit}
                  </motion.div>
                  
                  <p className="text-xs text-white/70 mt-1">{metric.label}</p>
                  
                  <p className={`text-xs mt-1 font-medium ${
                    metric.status === "optimal" ? "text-green-400" : 
                    metric.status === "warning" ? "text-yellow-400" : "text-red-400"
                  }`}>
                    {metric.status === "optimal" ? "Optimal" : `Target: ${metric.target}`}
                  </p>
                </div>

                {/* Progress indicator */}
                <div className="relative z-10 mt-2">
                  <Progress 
                    value={metric.progress} 
                    className="h-1"
                  />
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>

      {/* Power Usage Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="p-3 bg-blue-500/20 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Zap className="h-6 w-6 text-blue-400" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white text-lg">System Power Usage</h3>
                <p className="text-white/70">Total energy consumption</p>
              </div>
            </div>
            
            <div className="text-right">
              <motion.div
                className="text-3xl font-bold text-blue-400"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(59,130,246,0)",
                    "0 0 10px rgba(59,130,246,0.5)", 
                    "0 0 0px rgba(59,130,246,0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {powerUsage}W
              </motion.div>
              <p className="text-sm text-white/70">
                {powerUsage > 400 ? "High consumption" : 
                 powerUsage > 250 ? "Normal range" : "Efficient"}
              </p>
            </div>
          </div>

          {/* Power efficiency indicator */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>Power Efficiency</span>
              <span>{powerUsage <= 300 ? "Excellent" : powerUsage <= 400 ? "Good" : "Needs optimization"}</span>
            </div>
            <Progress 
              value={Math.max(0, 100 - ((powerUsage - 200) / 300) * 100)} 
              className="h-2"
            />
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

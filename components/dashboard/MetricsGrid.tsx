"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Droplets, 
  Activity, 
  Thermometer, 
  Wind, 
  Lightbulb, 
  Zap 
} from "lucide-react"
import { MetricCard } from "./MetricCard"
import { Crop } from "@/lib/data"

interface MetricsGridProps {
  crop: Crop
}

export function MetricsGrid({ crop }: MetricsGridProps) {
  // Determine status based on optimal ranges
  const getWaterStatus = (level: number) => {
    if (level >= 80) return "optimal"
    if (level >= 60) return "warning"
    return "critical"
  }

  const getPHStatus = (ph: number) => {
    if (ph >= 6.0 && ph <= 6.5) return "optimal"
    if (ph >= 5.5 && ph <= 7.0) return "warning"
    return "critical"
  }

  const getECStatus = (ec: number) => {
    if (ec >= 1200 && ec <= 1600) return "optimal"
    if (ec >= 1000 && ec <= 1800) return "warning"
    return "critical"
  }

  const getTempStatus = (temp: number) => {
    if (temp >= 20 && temp <= 25) return "optimal"
    if (temp >= 18 && temp <= 28) return "warning"
    return "critical"
  }

  const getHumidityStatus = (humidity: number) => {
    if (humidity >= 60 && humidity <= 75) return "optimal"
    if (humidity >= 50 && humidity <= 85) return "warning"
    return "critical"
  }

  const getLightStatus = (light: number) => {
    if (light >= 35000) return "optimal"
    if (light >= 25000) return "warning"
    return "critical"
  }

  const metrics = [
    {
      icon: Droplets,
      label: "Water Level",
      value: crop.metrics.waterLevel,
      unit: "%",
      status: getWaterStatus(crop.metrics.waterLevel),
      optimalRange: "80-100%"
    },
    {
      icon: Zap,
      label: "pH Level",
      value: crop.metrics.ph,
      unit: " pH",
      status: getPHStatus(crop.metrics.ph),
      optimalRange: "6.0-6.5"
    },
    {
      icon: Activity,
      label: "EC/TDS",
      value: crop.metrics.ec,
      unit: " ppm",
      status: getECStatus(crop.metrics.ec),
      optimalRange: "1200-1600"
    },
    {
      icon: Thermometer,
      label: "Temperature",
      value: crop.metrics.temperature,
      unit: "°C",
      status: getTempStatus(crop.metrics.temperature),
      optimalRange: "20-25°C"
    },
    {
      icon: Wind,
      label: "Humidity",
      value: crop.metrics.humidity,
      unit: "%",
      status: getHumidityStatus(crop.metrics.humidity),
      optimalRange: "60-75%"
    },
    {
      icon: Lightbulb,
      label: "Light Intensity",
      value: crop.metrics.lightIntensity / 1000,
      unit: "k lux",
      status: getLightStatus(crop.metrics.lightIntensity),
      optimalRange: "35k+ lux"
    }
  ]

  return (
    <div className="px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <h2 className="text-lg font-bold text-white mb-2">
          Environmental Metrics
        </h2>
        <p className="text-sm text-white/70">
          Real-time monitoring for {crop.name}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            status={metric.status as "optimal" | "warning" | "critical"}
            optimalRange={metric.optimalRange}
            index={index}
          />
        ))}
      </div>

      {/* Summary Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 text-center"
      >
        {(() => {
          const warningCount = metrics.filter(m => m.status === "warning").length
          const criticalCount = metrics.filter(m => m.status === "critical").length
          
          if (criticalCount > 0) {
            return (
              <motion.div
                className="glass-card p-3 rounded-lg bg-alert-orange/10 border border-alert-orange/20"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <p className="text-alert-orange font-medium text-sm">
                  ⚠️ {criticalCount} metric{criticalCount > 1 ? "s" : ""} need immediate attention
                </p>
              </motion.div>
            )
          }
          
          if (warningCount > 0) {
            return (
              <div className="glass-card p-3 rounded-lg bg-chart-4/10 border border-chart-4/20">
                <p className="text-chart-4 font-medium text-sm">
                  ⚡ {warningCount} metric{warningCount > 1 ? "s" : ""} need monitoring
                </p>
              </div>
            )
          }
          
          return (
            <motion.div
              className="glass-card p-3 rounded-lg bg-neon-green/10 border border-neon-green/20"
              animate={{ 
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity
              }}
            >
              <p className="text-neon-green font-medium text-sm">
                ✨ All systems optimal
              </p>
            </motion.div>
          )
        })()}
      </motion.div>
    </div>
  )
}

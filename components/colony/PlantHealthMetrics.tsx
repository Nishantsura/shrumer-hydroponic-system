"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Droplets, 
  Zap, 
  Thermometer, 
  Wind, 
  Sun, 
  Activity,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crop } from "@/lib/data"

interface PlantHealthMetricsProps {
  colonyId: string
  crops: Crop[]
}

interface MetricData {
  name: string
  value: string
  unit: string
  status: "optimal" | "warning" | "critical"
  action: string
  icon: React.ReactNode
  trend?: "up" | "down" | "stable"
}

export function PlantHealthMetrics({ colonyId, crops }: PlantHealthMetricsProps) {
  // Calculate average metrics from all crops in the colony
  const avgMetrics = crops.length > 0 ? {
    waterLevel: Math.round(crops.reduce((sum, crop) => sum + crop.metrics.waterLevel, 0) / crops.length),
    ph: Math.round((crops.reduce((sum, crop) => sum + crop.metrics.ph, 0) / crops.length) * 10) / 10,
    ec: Math.round(crops.reduce((sum, crop) => sum + crop.metrics.ec, 0) / crops.length),
    temperature: Math.round((crops.reduce((sum, crop) => sum + crop.metrics.temperature, 0) / crops.length) * 10) / 10,
    humidity: Math.round(crops.reduce((sum, crop) => sum + crop.metrics.humidity, 0) / crops.length),
    lightIntensity: Math.round(crops.reduce((sum, crop) => sum + crop.metrics.lightIntensity, 0) / crops.length)
  } : {
    waterLevel: 0, ph: 0, ec: 0, temperature: 0, humidity: 0, lightIntensity: 0
  }

  const getMetricStatus = (metric: string, value: number): "optimal" | "warning" | "critical" => {
    switch (metric) {
      case "waterLevel":
        return value >= 80 ? "optimal" : value >= 60 ? "warning" : "critical"
      case "ph":
        return value >= 6.0 && value <= 6.5 ? "optimal" : value >= 5.5 && value <= 7.0 ? "warning" : "critical"
      case "ec":
        return value >= 1200 && value <= 1600 ? "optimal" : value >= 1000 && value <= 1800 ? "warning" : "critical"
      case "temperature":
        return value >= 20 && value <= 25 ? "optimal" : value >= 18 && value <= 28 ? "warning" : "critical"
      case "humidity":
        return value >= 60 && value <= 75 ? "optimal" : value >= 50 && value <= 85 ? "warning" : "critical"
      case "lightIntensity":
        return value >= 35000 ? "optimal" : value >= 25000 ? "warning" : "critical"
      default:
        return "warning"
    }
  }

  const getActionNote = (metric: string, value: number): string => {
    switch (metric) {
      case "waterLevel":
        if (value < 60) return "Add water to reservoir immediately"
        if (value < 80) return "Monitor water levels closely"
        return "Water levels are optimal"
      case "ph":
        if (value < 5.5) return "Add pH up solution to increase pH"
        if (value > 7.0) return "Add pH down solution to decrease pH"
        if (value < 6.0) return "Slightly increase pH for optimal range"
        if (value > 6.5) return "Slightly decrease pH for optimal range"
        return "pH levels are optimal"
      case "ec":
        if (value < 1000) return "Add nutrients to increase EC"
        if (value > 1800) return "Dilute solution to reduce EC"
        if (value < 1200) return "Increase nutrient concentration"
        if (value > 1600) return "Reduce nutrient concentration"
        return "EC levels are optimal"
      case "temperature":
        if (value < 18) return "Increase temperature with heating"
        if (value > 28) return "Reduce temperature with cooling"
        if (value < 20) return "Slightly increase temperature"
        if (value > 25) return "Slightly reduce temperature"
        return "Temperature is optimal"
      case "humidity":
        if (value < 50) return "Increase humidity with misting"
        if (value > 85) return "Reduce humidity with ventilation"
        if (value < 60) return "Slightly increase humidity"
        if (value > 75) return "Slightly reduce humidity"
        return "Humidity is optimal"
      case "lightIntensity":
        if (value < 25000) return "Increase light intensity"
        if (value < 35000) return "Slightly increase light intensity"
        return "Light intensity is optimal"
      default:
        return "Monitor conditions"
    }
  }

  const metrics: MetricData[] = [
    {
      name: "Water Level",
      value: avgMetrics.waterLevel.toString(),
      unit: "%",
      status: getMetricStatus("waterLevel", avgMetrics.waterLevel),
      action: getActionNote("waterLevel", avgMetrics.waterLevel),
      icon: <Droplets className="h-5 w-5" />,
      trend: "stable"
    },
    {
      name: "pH Level",
      value: avgMetrics.ph.toString(),
      unit: "pH",
      status: getMetricStatus("ph", avgMetrics.ph),
      action: getActionNote("ph", avgMetrics.ph),
      icon: <Zap className="h-5 w-5" />,
      trend: "stable"
    },
    {
      name: "EC/TDS",
      value: avgMetrics.ec.toString(),
      unit: "ppm",
      status: getMetricStatus("ec", avgMetrics.ec),
      action: getActionNote("ec", avgMetrics.ec),
      icon: <Activity className="h-5 w-5" />,
      trend: "stable"
    },
    {
      name: "Temperature",
      value: avgMetrics.temperature.toString(),
      unit: "°C",
      status: getMetricStatus("temperature", avgMetrics.temperature),
      action: getActionNote("temperature", avgMetrics.temperature),
      icon: <Thermometer className="h-5 w-5" />,
      trend: "stable"
    },
    {
      name: "Humidity",
      value: avgMetrics.humidity.toString(),
      unit: "%",
      status: getMetricStatus("humidity", avgMetrics.humidity),
      action: getActionNote("humidity", avgMetrics.humidity),
      icon: <Wind className="h-5 w-5" />,
      trend: "stable"
    },
    {
      name: "Light Intensity",
      value: Math.round(avgMetrics.lightIntensity / 1000).toString(),
      unit: "klux",
      status: getMetricStatus("lightIntensity", avgMetrics.lightIntensity),
      action: getActionNote("lightIntensity", avgMetrics.lightIntensity),
      icon: <Sun className="h-5 w-5" />,
      trend: "stable"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-neon-green/20 text-neon-green border-neon-green/30"
      case "warning":
        return "bg-alert-orange/20 text-alert-orange border-alert-orange/30"
      case "critical":
        return "bg-chart-5/20 text-chart-5 border-chart-5/30"
      default:
        return "bg-white/10 text-white/70 border-white/20"
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3" />
      case "down":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const criticalMetrics = metrics.filter(m => m.status === "critical").length
  const warningMetrics = metrics.filter(m => m.status === "warning").length

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-neon-green" />
            Plant Health Metrics
          </CardTitle>
          <div className="flex items-center gap-2">
            {criticalMetrics > 0 && (
              <Badge className="bg-chart-5/20 text-chart-5 border-chart-5/30">
                {criticalMetrics} Critical
              </Badge>
            )}
            {warningMetrics > 0 && (
              <Badge className="bg-alert-orange/20 text-alert-orange border-alert-orange/30">
                {warningMetrics} Warning
              </Badge>
            )}
            {criticalMetrics === 0 && warningMetrics === 0 && (
              <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                All Optimal
              </Badge>
            )}
          </div>
        </div>
        <p className="text-white/70 text-sm">
          Real-time monitoring for Colony {colonyId}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                metric.status === "critical" 
                  ? "bg-chart-5/5 border-chart-5/30" 
                  : metric.status === "warning"
                  ? "bg-alert-orange/5 border-alert-orange/30"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${
                    metric.status === "optimal" ? "bg-neon-green/20" :
                    metric.status === "warning" ? "bg-alert-orange/20" :
                    "bg-chart-5/20"
                  }`}>
                    {metric.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">{metric.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-white">
                        {metric.value}
                      </span>
                      <span className="text-sm text-white/70">{metric.unit}</span>
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                </div>
                <Badge className={`${getStatusColor(metric.status)} text-xs`}>
                  {metric.status}
                </Badge>
              </div>
              
              <div className="text-xs text-white/70 leading-relaxed">
                {metric.action}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-white/70" />
            <span className="text-white/70">
              {criticalMetrics + warningMetrics > 0 
                ? `${criticalMetrics + warningMetrics} metrics need monitoring`
                : "All metrics are within optimal ranges"
              }
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

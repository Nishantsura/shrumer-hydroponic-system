"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Crop, getCropHealthColor } from "@/lib/data"

interface CropCardProps {
  crop: Crop
  isActive: boolean
  index: number
}

export function CropCard({ crop, isActive, index }: CropCardProps) {
  const healthColor = getCropHealthColor(crop.status)
  
  // Plant emoji based on stage and type
  const getPlantEmoji = (name: string, stage: string) => {
    const plantType = name.toLowerCase()
    if (plantType.includes("lettuce") || plantType.includes("spinach")) {
      return stage === "seed" ? "🌰" : stage === "seedling" ? "🌱" : "🥬"
    }
    if (plantType.includes("tomato")) {
      return stage === "seed" ? "🌰" : stage === "seedling" ? "🌱" : 
             stage === "flowering" ? "🌼" : "🍅"
    }
    if (plantType.includes("basil") || plantType.includes("herb")) {
      return stage === "seed" ? "🌰" : stage === "seedling" ? "🌱" : "🌿"
    }
    if (plantType.includes("cucumber")) {
      return stage === "seed" ? "🌰" : stage === "seedling" ? "🌱" : 
             stage === "flowering" ? "🌼" : "🥒"
    }
    return stage === "seed" ? "🌰" : stage === "seedling" ? "🌱" : "🌿"
  }

  const plantEmoji = getPlantEmoji(crop.name, crop.stage.id)

  // Smart alert system - analyze metrics for issues
  const getWaterQuality = () => {
    const { ph, ec } = crop.metrics
    if (ph >= 5.8 && ph <= 6.5 && ec >= 1000 && ec <= 1500) {
      return { status: "Optimal", color: "text-green-400" }
    } else if (ph >= 5.5 && ph <= 6.8 && ec >= 800 && ec <= 1800) {
      return { status: "Needs Adjustment", color: "text-yellow-400" }
    } else {
      return { status: "Critical", color: "text-red-400" }
    }
  }

  const getClimateStatus = () => {
    const { temperature, humidity } = crop.metrics
    return `${Math.round(temperature)}°C | ${humidity}% RH`
  }

  const getSmartAlerts = () => {
    const alerts = []
    const { ph, ec, temperature, humidity } = crop.metrics
    
    if (ph < 5.5 || ph > 6.8) alerts.push("pH low")
    if (ec < 800 || ec > 1800) alerts.push("EC off")
    if (temperature < 18 || temperature > 28) alerts.push("Temp high")
    if (humidity < 60 || humidity > 80) alerts.push("Humidity high")
    
    return alerts
  }

  const smartAlerts = getSmartAlerts()
  const waterQuality = getWaterQuality()
  const climateStatus = getClimateStatus()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.6,
        scale: isActive ? 1 : 0.95,
        y: 0
      }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="w-full max-w-sm"
    >
      <motion.div
        className="relative p-6 h-[420px] flex flex-col overflow-hidden rounded-3xl"
        style={{
          background: isActive 
            ? `linear-gradient(135deg, 
                rgba(15, 23, 42, 0.95) 0%, 
                rgba(30, 41, 59, 0.9) 50%, 
                rgba(51, 65, 85, 0.85) 100%)`
            : `linear-gradient(135deg, 
                rgba(15, 23, 42, 0.7) 0%, 
                rgba(30, 41, 59, 0.6) 50%, 
                rgba(51, 65, 85, 0.5) 100%)`,
          backdropFilter: "blur(20px)",
          border: isActive 
            ? `2px solid ${crop.status === "healthy" 
                ? "rgba(34, 197, 94, 0.4)" 
                : crop.status === "warning"
                ? "rgba(251, 146, 60, 0.4)"
                : "rgba(239, 68, 68, 0.4)"}`
            : "2px solid rgba(148, 163, 184, 0.2)",
          boxShadow: isActive 
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.4),
               0 0 0 1px rgba(255, 255, 255, 0.05),
               inset 0 1px 0 rgba(255, 255, 255, 0.1)`
            : `0 10px 25px -5px rgba(0, 0, 0, 0.2),
               0 0 0 1px rgba(255, 255, 255, 0.03)`
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        animate={{
          boxShadow: isActive 
            ? [
                `0 25px 50px -12px rgba(0, 0, 0, 0.4),
                 0 0 0 1px rgba(255, 255, 255, 0.05),
                 inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                `0 30px 60px -12px rgba(0, 0, 0, 0.5),
                 0 0 0 1px rgba(255, 255, 255, 0.08),
                 inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
                `0 25px 50px -12px rgba(0, 0, 0, 0.4),
                 0 0 0 1px rgba(255, 255, 255, 0.05),
                 inset 0 1px 0 rgba(255, 255, 255, 0.1)`
              ]
            : `0 10px 25px -5px rgba(0, 0, 0, 0.2),
               0 0 0 1px rgba(255, 255, 255, 0.03)`
        }}
        transition={{
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Animated background gradient overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-30"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, 
              ${crop.status === "healthy" 
                ? "rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1)"
                : crop.status === "warning"
                ? "rgba(251, 146, 60, 0.1), rgba(245, 158, 11, 0.1), rgba(251, 146, 60, 0.1)"
                : "rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1), rgba(239, 68, 68, 0.1)"
              })`
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Subtle inner glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: isActive 
              ? `radial-gradient(circle at 30% 20%, 
                  ${crop.status === "healthy" 
                    ? "rgba(34, 197, 94, 0.1)" 
                    : crop.status === "warning"
                    ? "rgba(251, 146, 60, 0.1)"
                    : "rgba(239, 68, 68, 0.1)"
                  } 0%, transparent 50%)`
              : "transparent"
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Top Section - Crop Name, Variety, Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-xl text-white mb-1">{crop.name}</h3>
            {crop.variety && (
              <p className="text-sm text-white/70 font-medium">{crop.variety}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {/* Smart Alert Icon */}
            {smartAlerts.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-400 text-xs">⚠️</span>
                </div>
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                  {smartAlerts.join(", ")}
                </div>
              </motion.div>
            )}
            <Badge 
              variant={crop.status === "healthy" ? "default" : "destructive"}
              className={`text-xs font-semibold ${
                crop.status === "healthy" 
                  ? "bg-green-500/20 text-green-400 border-green-500/30" 
                  : crop.status === "warning"
                  ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                  : "bg-red-500/20 text-red-400 border-red-500/30"
              }`}
            >
              {crop.status === "healthy" ? "Healthy" : 
               crop.status === "warning" ? "Warning" : "Critical"}
            </Badge>
          </div>
        </div>

        {/* Center Section - 3D Plant Illustration */}
        <div className="flex-1 flex items-center justify-center relative min-h-[140px] mb-4">
          {/* Background glow */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-${healthColor}/10 blur-2xl`}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Water droplets animation */}
          <motion.div
            className="absolute top-4 right-4 text-blue-400 text-lg"
            animate={{ 
              y: [0, -5, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💧
          </motion.div>
          
          {/* Plant Container */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={{ 
              y: [0, -3, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Plant */}
            <motion.div
              className="text-7xl mb-2 filter drop-shadow-lg"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                filter: [
                  "brightness(1) drop-shadow(0 0 20px rgba(0,255,156,0.4))",
                  "brightness(1.1) drop-shadow(0 0 25px rgba(0,255,156,0.6))",
                  "brightness(1) drop-shadow(0 0 20px rgba(0,255,156,0.4))"
                ]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {plantEmoji}
            </motion.div>
            
            {/* Growth stage indicator dots */}
            <motion.div
              className="flex space-x-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < Math.min(5, Math.floor(crop.stage.days / 14)) ? "bg-green-500" : "bg-gray-500"
                  }`}
                  animate={i < Math.min(5, Math.floor(crop.stage.days / 14)) ? { 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  } : {}}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Metrics Section - Clean 5 Key Metrics */}
        <div className="space-y-3">
          {/* Growth Stage */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70 font-medium">Growth Stage</span>
            <span className="font-semibold text-white">{crop.stage.name}</span>
          </div>
          
          {/* Days from Seed */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70 font-medium">Days from Seed</span>
            <span className="font-semibold text-green-400">{crop.daysFromSeed} days</span>
          </div>
          
          {/* Harvest Ready In */}
          {crop.nextHarvest && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70 font-medium">Harvest ready in</span>
              <span className="font-semibold text-orange-400">{crop.nextHarvest}</span>
            </div>
          )}
          
          {/* Water Quality */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70 font-medium">Water Quality</span>
            <span className={`font-semibold ${waterQuality.color}`}>{waterQuality.status}</span>
          </div>
          
          {/* Climate */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70 font-medium">Climate</span>
            <span className="font-semibold text-white">{climateStatus}</span>
          </div>
        </div>

        {/* Bottom Section - Health Score with Glowing Progress Bar */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/70 font-medium">Health Score</span>
            <span className={`font-bold text-lg ${
              crop.healthScore >= 90 ? "text-green-400" : 
              crop.healthScore >= 70 ? "text-yellow-400" : "text-red-400"
            }`}>{crop.healthScore}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className={`h-2 rounded-full ${
                crop.healthScore >= 90 ? "bg-green-500" : 
                crop.healthScore >= 70 ? "bg-yellow-500" : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${crop.healthScore}%` }}
              transition={{ duration: 2, delay: 1 }}
              style={{
                boxShadow: crop.healthScore >= 90 
                  ? "0 0 10px rgba(34, 197, 94, 0.5)" 
                  : crop.healthScore >= 70 
                  ? "0 0 10px rgba(234, 179, 8, 0.5)"
                  : "0 0 10px rgba(239, 68, 68, 0.5)"
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

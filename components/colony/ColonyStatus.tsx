"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Activity, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Colony, Crop } from "@/lib/data"

interface ColonyStatusProps {
  colony: Colony
  crops: Crop[]
}

export function ColonyStatus({ colony, crops }: ColonyStatusProps) {
  const getStatusColor = (status: Colony["status"]) => {
    switch (status) {
      case "active":
        return "bg-neon-green/20 text-neon-green border-neon-green/30"
      case "setup":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      case "maintenance":
        return "bg-alert-orange/20 text-alert-orange border-alert-orange/30"
      case "offline":
        return "bg-chart-5/20 text-chart-5 border-chart-5/30"
      default:
        return "bg-white/10 text-white/70 border-white/20"
    }
  }

  const totalPlants = crops.reduce((sum, crop) => sum + crop.plantCount, 0)
  const avgHealthScore = crops.length > 0 
    ? Math.round(crops.reduce((sum, crop) => sum + crop.healthScore, 0) / crops.length)
    : 0
  
  const utilizationRate = Math.round((colony.activeSlots / colony.capacity) * 100)

  return (
    <Card className="glass-card border-white/10">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Colony Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-white">{colony.name}</h2>
              <Badge className={`${getStatusColor(colony.status)} text-sm`}>
                {colony.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-white/70" />
                <div>
                  <p className="text-sm text-white/70">Location</p>
                  <p className="font-medium text-white">{colony.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-white/70" />
                <div>
                  <p className="text-sm text-white/70">System Type</p>
                  <p className="font-medium text-white">Grove System</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Plants */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-neon-green/20 rounded-lg mb-2 mx-auto">
                <Users className="h-6 w-6 text-neon-green" />
              </div>
              <div className="text-2xl font-bold text-white">{totalPlants}</div>
              <div className="text-sm text-white/70">Total Plants</div>
            </motion.div>

            {/* Health Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-chart-2/20 rounded-lg mb-2 mx-auto">
                <Activity className="h-6 w-6 text-chart-2" />
              </div>
              <div className="text-2xl font-bold text-white">{avgHealthScore}%</div>
              <div className="text-sm text-white/70">Health Score</div>
            </motion.div>

            {/* Utilization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-chart-1/20 rounded-lg mb-2 mx-auto">
                <div className="w-6 h-6 border-2 border-chart-1 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{utilizationRate}%</div>
              <div className="text-sm text-white/70">Utilization</div>
            </motion.div>

            {/* Power Usage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-chart-5/20 rounded-lg mb-2 mx-auto">
                <div className="w-6 h-6 border-2 border-chart-5 rounded flex items-center justify-center">
                  <div className="w-1 h-3 bg-chart-5 rounded"></div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{colony.systemMetrics.powerUsage}W</div>
              <div className="text-sm text-white/70">Power Usage</div>
            </motion.div>
          </div>
        </div>

        {/* Utilization Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">Colony Capacity</span>
            <span className="text-sm font-medium text-white">
              {colony.activeSlots} / {colony.capacity} slots
            </span>
          </div>
          <Progress 
            value={utilizationRate} 
            className="h-2 bg-white/10"
          />
        </div>
      </CardContent>
    </Card>
  )
}

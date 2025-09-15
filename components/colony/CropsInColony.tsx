"use client"

import React from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crop, getCropHealthColor } from "@/lib/data"

interface CropsInColonyProps {
  crops: Crop[]
  colonyId: string
}

export function CropsInColony({ crops, colonyId }: CropsInColonyProps) {
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

  const getStageProgress = (daysFromSeed: number, stage: string) => {
    const stageDays = {
      "seed": 0,
      "seedling": 7,
      "vegetative": 21,
      "flowering": 42,
      "fruiting": 56,
      "mature": 70
    }
    
    const currentStageDays = stageDays[stage as keyof typeof stageDays] || 0
    const nextStageDays = Object.values(stageDays).find(days => days > currentStageDays) || 70
    
    const progress = Math.min(100, Math.max(0, ((daysFromSeed - currentStageDays) / (nextStageDays - currentStageDays)) * 100))
    return Math.round(progress)
  }

  const getHealthColor = (status: Crop["status"]) => {
    switch (status) {
      case "healthy":
        return "text-neon-green"
      case "harvest-ready":
        return "text-neon-green"
      case "warning":
        return "text-alert-orange"
      case "critical":
        return "text-chart-5"
      default:
        return "text-white/70"
    }
  }

  const getStatusBadgeColor = (status: Crop["status"]) => {
    switch (status) {
      case "healthy":
        return "bg-neon-green/20 text-neon-green border-neon-green/30"
      case "harvest-ready":
        return "bg-neon-green/20 text-neon-green border-neon-green/30"
      case "warning":
        return "bg-alert-orange/20 text-alert-orange border-alert-orange/30"
      case "critical":
        return "bg-chart-5/20 text-chart-5 border-chart-5/30"
      default:
        return "bg-white/10 text-white/70 border-white/20"
    }
  }

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            Crops in Colony {colonyId}
          </CardTitle>
          <Button 
            size="sm" 
            className="bg-neon-green hover:bg-neon-green/90 text-dark-charcoal"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Crop
          </Button>
        </div>
        <p className="text-white/70 text-sm">
          {crops.length} active crop{crops.length !== 1 ? 's' : ''} in this colony
        </p>
      </CardHeader>
      <CardContent>
        {crops.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-lg font-semibold text-white mb-2">No Crops Yet</h3>
            <p className="text-white/70 mb-6">Start growing by adding your first crop to this colony</p>
            <Button className="bg-neon-green hover:bg-neon-green/90 text-dark-charcoal">
              <Plus className="h-4 w-4 mr-2" />
              Add First Crop
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crops.map((crop, index) => (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-neon-green/10">
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">
                          {getPlantEmoji(crop.name, crop.stage.id)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-sm">{crop.name}</h3>
                          {crop.variety && (
                            <p className="text-xs text-white/70">{crop.variety}</p>
                          )}
                        </div>
                      </div>
                      <Badge className={`${getStatusBadgeColor(crop.status)} text-xs`}>
                        {crop.status}
                      </Badge>
                    </div>

                    {/* Growth Stage */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/70">Growth Stage</span>
                        <span className="text-sm font-medium text-white">{crop.stage.name}</span>
                      </div>
                      <Progress 
                        value={getStageProgress(crop.daysFromSeed, crop.stage.id)} 
                        className="h-2 bg-white/10"
                      />
                      <div className="flex justify-between text-xs text-white/70 mt-1">
                        <span>Day {crop.daysFromSeed}</span>
                        <span>{crop.stage.description}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{crop.plantCount}</div>
                        <div className="text-xs text-white/70">Plants</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getHealthColor(crop.status)}`}>
                          {crop.healthScore}%
                        </div>
                        <div className="text-xs text-white/70">Health</div>
                      </div>
                    </div>

                    {/* Next Harvest */}
                    {crop.nextHarvest && (
                      <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white/70">Next Harvest:</span>
                          <span className="text-sm font-medium text-white">{crop.nextHarvest}</span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent border-white/20 text-white hover:bg-white/10"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent border-white/20 text-white hover:bg-white/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

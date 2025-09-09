"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Calendar, 
  TrendingUp, 
  Clock,
  Package
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ProductionStats, HarvestItem } from "@/lib/overview-utils"

interface ProductionPipelineProps {
  productionStats: ProductionStats
  harvestSchedule: HarvestItem[]
}

export function ProductionPipeline({ productionStats, harvestSchedule }: ProductionPipelineProps) {
  const getStageEmoji = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "seed": return "🌰"
      case "seedling": return "🌱"
      case "vegetative": return "🌿"
      case "flowering": return "🌼"
      case "fruiting": return "🍃"
      case "harvest ready": return "🌾"
      default: return "🌱"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "text-green-400 bg-green-500/20"
      case "soon": return "text-orange-400 bg-orange-500/20"
      case "upcoming": return "text-blue-400 bg-blue-500/20"
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
        <h2 className="text-xl font-bold text-white mb-4">Production Pipeline</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Stage Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="p-2 bg-green-500/20 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <TrendingUp className="h-5 w-5 text-green-400" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white">Growth Stages</h3>
                <p className="text-sm text-white/70">Current distribution</p>
              </div>
            </div>

            <div className="space-y-4">
              {productionStats.byStage.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.span
                        className="text-2xl"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      >
                        {getStageEmoji(stage.stage)}
                      </motion.span>
                      <div>
                        <div className="font-medium text-white">{stage.stage}</div>
                        <div className="text-xs text-white/70">{stage.count} plants</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-500/30">
                      {stage.percentage}%
                    </Badge>
                  </div>
                  <Progress value={stage.percentage} className="h-2" />
                </motion.div>
              ))}
            </div>

            {/* Total Production Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 pt-4 border-t border-white/10"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Total Production</span>
                <span className="font-bold text-green-400">{productionStats.totalProduction} plants</span>
              </div>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Harvest Schedule */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="p-2 bg-orange-500/20 rounded-lg"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Calendar className="h-5 w-5 text-orange-400" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white">Harvest Schedule</h3>
                <p className="text-sm text-white/70">Upcoming harvests</p>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {harvestSchedule.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-white/50"
                >
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No upcoming harvests</p>
                </motion.div>
              ) : (
                harvestSchedule.map((harvest, index) => (
                  <motion.div
                    key={harvest.cropId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="p-2 bg-green-500/20 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Package className="h-4 w-4 text-green-400" />
                      </motion.div>
                      <div>
                        <div className="font-medium text-white">
                          {harvest.cropName}
                          {harvest.variety && (
                            <span className="text-white/70 text-sm ml-1">
                              ({harvest.variety})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-white/70">
                          {harvest.colonyName} • {harvest.plantCount} plants
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={getStatusColor(harvest.status)}>
                        {harvest.daysUntilHarvest === 0 
                          ? "Today!" 
                          : harvest.daysUntilHarvest === 1 
                          ? "Tomorrow" 
                          : `${harvest.daysUntilHarvest} days`}
                      </Badge>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Harvest Summary */}
            {harvestSchedule.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <div className="grid grid-cols-3 gap-4 text-center text-xs">
                  <div>
                    <div className="font-bold text-green-400">
                      {harvestSchedule.filter(h => h.status === "ready").length}
                    </div>
                    <div className="text-white/70">Ready</div>
                  </div>
                  <div>
                    <div className="font-bold text-orange-400">
                      {harvestSchedule.filter(h => h.status === "soon").length}
                    </div>
                    <div className="text-white/70">Soon</div>
                  </div>
                  <div>
                    <div className="font-bold text-blue-400">
                      {harvestSchedule.filter(h => h.status === "upcoming").length}
                    </div>
                    <div className="text-white/70">Upcoming</div>
                  </div>
                </div>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Plant Type Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="p-2 bg-blue-500/20 rounded-lg"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-xl">🌾</span>
            </motion.div>
            <div>
              <h3 className="font-bold text-white">Crop Varieties</h3>
              <p className="text-sm text-white/70">Plant type distribution</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productionStats.byType.map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + (index * 0.1) }}
                className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="font-bold text-white text-lg mb-1">{type.count}</div>
                <div className="text-sm text-white/70 mb-2 capitalize">{type.type}</div>
                {type.varieties.length > 0 && (
                  <div className="text-xs text-white/50">
                    {type.varieties.length} varieties
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crop } from "@/lib/data"

interface HarvestScheduleProps {
  crops: Crop[]
  colonyId: string
}

interface HarvestItem {
  cropId: string
  cropName: string
  variety?: string
  daysUntilHarvest: number
  plantCount: number
  status: 'ready' | 'soon' | 'upcoming'
  healthScore: number
}

export function HarvestSchedule({ crops, colonyId }: HarvestScheduleProps) {
  const getPlantEmoji = (name: string) => {
    const plantType = name.toLowerCase()
    if (plantType.includes("lettuce") || plantType.includes("spinach")) return "🥬"
    if (plantType.includes("tomato")) return "🍅"
    if (plantType.includes("basil") || plantType.includes("herb")) return "🌿"
    if (plantType.includes("cucumber")) return "🥒"
    return "🌱"
  }

  const getHarvestItems = (): HarvestItem[] => {
    const harvestItems: HarvestItem[] = []

    crops.forEach(crop => {
      if (crop.nextHarvest) {
        const daysMatch = crop.nextHarvest.match(/(\d+)\s*days?/)
        if (daysMatch) {
          const days = parseInt(daysMatch[1])
          
          let status: 'ready' | 'soon' | 'upcoming' = 'upcoming'
          if (days <= 2) status = 'ready'
          else if (days <= 7) status = 'soon'

          harvestItems.push({
            cropId: crop.id,
            cropName: crop.name,
            variety: crop.variety,
            daysUntilHarvest: days,
            plantCount: crop.plantCount,
            status,
            healthScore: crop.healthScore
          })
        }
      }
    })

    return harvestItems.sort((a, b) => a.daysUntilHarvest - b.daysUntilHarvest)
  }

  const harvestItems = getHarvestItems()
  const readyItems = harvestItems.filter(item => item.status === 'ready')
  const soonItems = harvestItems.filter(item => item.status === 'soon')
  const upcomingItems = harvestItems.filter(item => item.status === 'upcoming')

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-neon-green/20 text-neon-green border-neon-green/30"
      case "soon":
        return "bg-alert-orange/20 text-alert-orange border-alert-orange/30"
      case "upcoming":
        return "bg-white/10 text-white/70 border-white/20"
      default:
        return "bg-white/10 text-white/70 border-white/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4" />
      case "soon":
        return <AlertTriangle className="h-4 w-4" />
      case "upcoming":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "Ready to Harvest"
      case "soon":
        return "Harvest Soon"
      case "upcoming":
        return "Upcoming"
      default:
        return "Upcoming"
    }
  }

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-neon-green" />
            Harvest Schedule
          </CardTitle>
          <div className="flex items-center gap-2">
            {readyItems.length > 0 && (
              <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                {readyItems.length} Ready
              </Badge>
            )}
            {soonItems.length > 0 && (
              <Badge className="bg-alert-orange/20 text-alert-orange border-alert-orange/30">
                {soonItems.length} Soon
              </Badge>
            )}
          </div>
        </div>
        <p className="text-white/70 text-sm">
          Upcoming harvests for Colony {colonyId}
        </p>
      </CardHeader>
      <CardContent>
        {harvestItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-white mb-2">No Harvests Scheduled</h3>
            <p className="text-white/70">Add crops to see their harvest schedule</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Ready to Harvest */}
            {readyItems.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-neon-green" />
                  Ready to Harvest ({readyItems.length})
                </h3>
                <div className="space-y-3">
                  {readyItems.map((item, index) => (
                    <motion.div
                      key={item.cropId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-neon-green/10 rounded-lg border border-neon-green/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getPlantEmoji(item.cropName)}</div>
                          <div>
                            <h4 className="font-semibold text-white">{item.cropName}</h4>
                            {item.variety && (
                              <p className="text-sm text-white/70">{item.variety}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${getStatusColor(item.status)} text-xs`}>
                              {getStatusText(item.status)}
                            </Badge>
                          </div>
                          <div className="text-sm text-white/70">
                            {item.plantCount} plants • {item.healthScore}% health
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="bg-neon-green hover:bg-neon-green/90 text-dark-charcoal">
                          Start Harvest
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                          Schedule Later
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Harvest Soon */}
            {soonItems.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-alert-orange" />
                  Harvest Soon ({soonItems.length})
                </h3>
                <div className="space-y-3">
                  {soonItems.map((item, index) => (
                    <motion.div
                      key={item.cropId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-alert-orange/10 rounded-lg border border-alert-orange/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getPlantEmoji(item.cropName)}</div>
                          <div>
                            <h4 className="font-semibold text-white">{item.cropName}</h4>
                            {item.variety && (
                              <p className="text-sm text-white/70">{item.variety}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${getStatusColor(item.status)} text-xs`}>
                              {item.daysUntilHarvest} days
                            </Badge>
                          </div>
                          <div className="text-sm text-white/70">
                            {item.plantCount} plants • {item.healthScore}% health
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Harvests */}
            {upcomingItems.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-white/70" />
                  Upcoming ({upcomingItems.length})
                </h3>
                <div className="space-y-3">
                  {upcomingItems.map((item, index) => (
                    <motion.div
                      key={item.cropId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getPlantEmoji(item.cropName)}</div>
                          <div>
                            <h4 className="font-semibold text-white">{item.cropName}</h4>
                            {item.variety && (
                              <p className="text-sm text-white/70">{item.variety}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${getStatusColor(item.status)} text-xs`}>
                              {item.daysUntilHarvest} days
                            </Badge>
                          </div>
                          <div className="text-sm text-white/70">
                            {item.plantCount} plants • {item.healthScore}% health
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

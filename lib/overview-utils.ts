import { COLONIES, CROPS, SYSTEM_METRICS, Colony, Crop } from './data'

export interface SystemOverview {
  totalPlants: number
  activeColonies: number
  totalColonies: number
  avgHealthScore: number
  waterEfficiency: number
  powerUsage: number
  alertsCount: number
  utilizationRate: number
  criticalAlertsCount: number
  warningAlertsCount: number
}

export interface ColonyOverview extends Colony {
  utilizationRate: number
  cropsCount: number
  avgHealthScore: number
  statusColor: string
  hasAlerts: boolean
}

export interface HarvestItem {
  cropId: string
  cropName: string
  variety?: string
  colonyName: string
  daysUntilHarvest: number
  plantCount: number
  status: 'ready' | 'soon' | 'upcoming'
}

export interface ProductionStats {
  byStage: {
    stage: string
    count: number
    percentage: number
  }[]
  byType: {
    type: string
    count: number
    varieties: string[]
  }[]
  totalProduction: number
}

// Get comprehensive system overview
export function getSystemOverview(): SystemOverview {
  const totalCapacity = COLONIES.reduce((sum, colony) => sum + colony.capacity, 0)
  const totalActiveSlots = COLONIES.reduce((sum, colony) => sum + colony.activeSlots, 0)
  const criticalCrops = CROPS.filter(crop => crop.status === "critical")
  const warningCrops = CROPS.filter(crop => crop.status === "warning")

  return {
    totalPlants: SYSTEM_METRICS.totalPlants,
    activeColonies: SYSTEM_METRICS.activeColonies,
    totalColonies: SYSTEM_METRICS.totalColonies,
    avgHealthScore: SYSTEM_METRICS.avgHealthScore,
    waterEfficiency: SYSTEM_METRICS.waterEfficiency,
    powerUsage: SYSTEM_METRICS.powerUsage,
    alertsCount: SYSTEM_METRICS.alertsCount,
    utilizationRate: Math.round((totalActiveSlots / totalCapacity) * 100),
    criticalAlertsCount: criticalCrops.length,
    warningAlertsCount: warningCrops.length
  }
}

// Get colony overview data
export function getColonyOverview(): ColonyOverview[] {
  return COLONIES.map(colony => {
    const colonyCrops = CROPS.filter(crop => crop.colonyId === colony.id)
    const avgHealthScore = colonyCrops.length > 0 
      ? Math.round(colonyCrops.reduce((sum, crop) => sum + crop.healthScore, 0) / colonyCrops.length)
      : 0
    
    const hasAlerts = colonyCrops.some(crop => crop.status === "warning" || crop.status === "critical")
    const utilizationRate = Math.round((colony.activeSlots / colony.capacity) * 100)

    const getStatusColor = (status: Colony["status"]) => {
      switch (status) {
        case "active": return "neon-green"
        case "setup": return "chart-4"
        case "maintenance": return "alert-orange"
        case "offline": return "chart-5"
        default: return "muted"
      }
    }

    return {
      ...colony,
      utilizationRate,
      cropsCount: colonyCrops.length,
      avgHealthScore,
      statusColor: getStatusColor(colony.status),
      hasAlerts
    }
  })
}

// Get harvest schedule
export function getHarvestSchedule(): HarvestItem[] {
  const harvestItems: HarvestItem[] = []

  CROPS.forEach(crop => {
    if (crop.nextHarvest) {
      const daysMatch = crop.nextHarvest.match(/(\d+)\s*days?/)
      if (daysMatch) {
        const days = parseInt(daysMatch[1])
        const colony = COLONIES.find(c => c.id === crop.colonyId)
        
        let status: 'ready' | 'soon' | 'upcoming' = 'upcoming'
        if (days <= 2) status = 'ready'
        else if (days <= 7) status = 'soon'

        harvestItems.push({
          cropId: crop.id,
          cropName: crop.name,
          variety: crop.variety,
          colonyName: colony?.name || 'Unknown',
          daysUntilHarvest: days,
          plantCount: crop.plantCount,
          status
        })
      }
    }
  })

  return harvestItems.sort((a, b) => a.daysUntilHarvest - b.daysUntilHarvest)
}

// Get production statistics
export function getProductionStats(): ProductionStats {
  // Group by growth stage
  const stageStats = new Map<string, number>()
  CROPS.forEach(crop => {
    const stage = crop.stage.name
    stageStats.set(stage, (stageStats.get(stage) || 0) + crop.plantCount)
  })

  const byStage = Array.from(stageStats.entries()).map(([stage, count]) => ({
    stage,
    count,
    percentage: Math.round((count / SYSTEM_METRICS.totalPlants) * 100)
  }))

  // Group by plant type
  const typeStats = new Map<string, { count: number, varieties: Set<string> }>()
  CROPS.forEach(crop => {
    const type = crop.name.split(' ')[crop.name.split(' ').length - 1] // Get last word as type
    const existing = typeStats.get(type) || { count: 0, varieties: new Set() }
    existing.count += crop.plantCount
    if (crop.variety) existing.varieties.add(crop.variety)
    typeStats.set(type, existing)
  })

  const byType = Array.from(typeStats.entries()).map(([type, data]) => ({
    type,
    count: data.count,
    varieties: Array.from(data.varieties)
  }))

  return {
    byStage,
    byType,
    totalProduction: SYSTEM_METRICS.totalPlants
  }
}

// Get environmental summary
export function getEnvironmentalSummary() {
  const allMetrics = CROPS.map(crop => crop.metrics)
  
  const avgTemp = allMetrics.reduce((sum, m) => sum + m.temperature, 0) / allMetrics.length
  const avgHumidity = allMetrics.reduce((sum, m) => sum + m.humidity, 0) / allMetrics.length
  const avgPH = allMetrics.reduce((sum, m) => sum + m.ph, 0) / allMetrics.length
  const avgEC = allMetrics.reduce((sum, m) => sum + m.ec, 0) / allMetrics.length
  const avgLight = allMetrics.reduce((sum, m) => sum + m.lightIntensity, 0) / allMetrics.length

  return {
    temperature: Math.round(avgTemp * 10) / 10,
    humidity: Math.round(avgHumidity),
    ph: Math.round(avgPH * 10) / 10,
    ec: Math.round(avgEC),
    lightIntensity: Math.round(avgLight / 1000), // Convert to klux
    tempStatus: avgTemp >= 20 && avgTemp <= 25 ? 'optimal' : avgTemp >= 18 && avgTemp <= 28 ? 'warning' : 'critical',
    humidityStatus: avgHumidity >= 60 && avgHumidity <= 75 ? 'optimal' : avgHumidity >= 50 && avgHumidity <= 85 ? 'warning' : 'critical',
    phStatus: avgPH >= 6.0 && avgPH <= 6.5 ? 'optimal' : avgPH >= 5.5 && avgPH <= 7.0 ? 'warning' : 'critical'
  }
}

// Get system recommendations
export function getSystemRecommendations(): string[] {
  const recommendations: string[] = []
  const overview = getSystemOverview()
  const envSummary = getEnvironmentalSummary()

  if (overview.utilizationRate < 70) {
    recommendations.push("Consider adding more crops to optimize colony capacity")
  }

  if (overview.avgHealthScore < 85) {
    recommendations.push("Review environmental conditions for underperforming crops")
  }

  if (envSummary.tempStatus !== 'optimal') {
    recommendations.push("Adjust temperature controls for optimal growth conditions")
  }

  if (envSummary.phStatus !== 'optimal') {
    recommendations.push("Monitor and adjust pH levels across colonies")
  }

  if (overview.powerUsage > 400) {
    recommendations.push("Consider energy optimization strategies")
  }

  return recommendations
}

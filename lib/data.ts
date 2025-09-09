export interface PlantStage {
  id: string
  name: string
  days: number
  description: string
}

export interface Crop {
  id: string
  name: string
  variety?: string
  colonyId: string
  stage: PlantStage
  daysFromSeed: number
  plantCount: number
  status: "healthy" | "warning" | "critical" | "harvest-ready"
  lastWatered: string
  nextHarvest?: string
  healthScore: number
  metrics: {
    waterLevel: number
    ph: number
    ec: number
    temperature: number
    humidity: number
    lightIntensity: number
  }
}

export interface Colony {
  id: string
  name: string
  location: string
  status: "active" | "setup" | "maintenance" | "offline"
  capacity: number
  activeSlots: number
  systemMetrics: {
    powerUsage: number
    waterFlow: number
    nutrientLevel: number
    autoMode: boolean
  }
}

// Growth stages for plants
export const PLANT_STAGES: PlantStage[] = [
  { id: "seed", name: "Seed", days: 0, description: "Germination phase" },
  { id: "seedling", name: "Seedling", days: 7, description: "Early growth" },
  { id: "vegetative", name: "Vegetative", days: 21, description: "Leaf development" },
  { id: "flowering", name: "Flowering", days: 42, description: "Flower formation" },
  { id: "fruiting", name: "Fruiting", days: 56, description: "Fruit development" },
  { id: "mature", name: "Harvest Ready", days: 70, description: "Ready for harvest" }
]

// Colony data
export const COLONIES: Colony[] = [
  {
    id: "A1",
    name: "Leafy Greens Station",
    location: "North Wing",
    status: "active",
    capacity: 24,
    activeSlots: 22,
    systemMetrics: {
      powerUsage: 145,
      waterFlow: 2.4,
      nutrientLevel: 85,
      autoMode: true
    }
  },
  {
    id: "B2", 
    name: "Fruit Production Pod",
    location: "East Wing",
    status: "active",
    capacity: 16,
    activeSlots: 14,
    systemMetrics: {
      powerUsage: 220,
      waterFlow: 3.1,
      nutrientLevel: 78,
      autoMode: true
    }
  },
  {
    id: "C3",
    name: "Herb Garden Matrix",
    location: "West Wing", 
    status: "setup",
    capacity: 36,
    activeSlots: 8,
    systemMetrics: {
      powerUsage: 95,
      waterFlow: 1.8,
      nutrientLevel: 92,
      autoMode: false
    }
  }
]

// Crop data with realistic growth progression
export const CROPS: Crop[] = [
  {
    id: "lettuce-001",
    name: "Butter Lettuce",
    variety: "Boston Bibb",
    colonyId: "A1",
    stage: PLANT_STAGES[2], // Vegetative
    daysFromSeed: 18,
    plantCount: 8,
    status: "healthy",
    lastWatered: "2 hours ago",
    nextHarvest: "12 days",
    healthScore: 94,
    metrics: {
      waterLevel: 88,
      ph: 6.2,
      ec: 1240,
      temperature: 22.5,
      humidity: 68,
      lightIntensity: 42000
    }
  },
  {
    id: "tomato-001", 
    name: "Cherry Tomato",
    variety: "Sweet 100",
    colonyId: "B2",
    stage: PLANT_STAGES[4], // Fruiting
    daysFromSeed: 58,
    plantCount: 6,
    status: "healthy",
    lastWatered: "1 hour ago",
    nextHarvest: "5 days",
    healthScore: 96,
    metrics: {
      waterLevel: 82,
      ph: 6.0,
      ec: 1580,
      temperature: 24.1,
      humidity: 72,
      lightIntensity: 48000
    }
  },
  {
    id: "basil-001",
    name: "Thai Basil",
    variety: "Siam Queen",
    colonyId: "C3", 
    stage: PLANT_STAGES[1], // Seedling
    daysFromSeed: 8,
    plantCount: 12,
    status: "healthy",
    lastWatered: "30 minutes ago", 
    nextHarvest: "25 days",
    healthScore: 89,
    metrics: {
      waterLevel: 95,
      ph: 6.4,
      ec: 1100,
      temperature: 21.8,
      humidity: 75,
      lightIntensity: 25000
    }
  },
  {
    id: "spinach-001",
    name: "Baby Spinach", 
    variety: "Space Hybrid",
    colonyId: "A1",
    stage: PLANT_STAGES[2], // Vegetative
    daysFromSeed: 16,
    plantCount: 14,
    status: "warning",
    lastWatered: "3 hours ago",
    nextHarvest: "8 days", 
    healthScore: 76,
    metrics: {
      waterLevel: 72,
      ph: 6.1,
      ec: 1320,
      temperature: 23.2,
      humidity: 65,
      lightIntensity: 38000
    }
  },
  {
    id: "cucumber-001",
    name: "Mini Cucumber",
    variety: "Patio Snacker", 
    colonyId: "B2",
    stage: PLANT_STAGES[3], // Flowering
    daysFromSeed: 45,
    plantCount: 4,
    status: "healthy",
    lastWatered: "45 minutes ago",
    nextHarvest: "15 days",
    healthScore: 91,
    metrics: {
      waterLevel: 86,
      ph: 6.3,
      ec: 1450,
      temperature: 23.8,
      humidity: 74,
      lightIntensity: 45000
    }
  }
]

// System-wide metrics
export const SYSTEM_METRICS = {
  totalPlants: CROPS.reduce((sum, crop) => sum + crop.plantCount, 0),
  activeColonies: COLONIES.filter(c => c.status === "active").length,
  totalColonies: COLONIES.length,
  avgHealthScore: Math.round(CROPS.reduce((sum, crop) => sum + crop.healthScore, 0) / CROPS.length),
  waterEfficiency: 94,
  powerUsage: COLONIES.reduce((sum, colony) => sum + colony.systemMetrics.powerUsage, 0),
  alertsCount: CROPS.filter(crop => crop.status === "warning" || crop.status === "critical").length
}

// Helper functions
export function getCropsByColony(colonyId: string): Crop[] {
  return CROPS.filter(crop => crop.colonyId === colonyId)
}

export function getColonyById(id: string): Colony | undefined {
  return COLONIES.find(colony => colony.id === id)
}

export function getCropHealthColor(status: Crop["status"]): string {
  switch (status) {
    case "healthy": return "neon-green"
    case "harvest-ready": return "neon-green" 
    case "warning": return "alert-orange"
    case "critical": return "chart-5"
    default: return "muted"
  }
}

// Shrumer App - Mock Data for Development
// This file contains realistic mock data that matches our new schema

import { 
  Colony, 
  Plant, 
  Task, 
  FamilyMember, 
  Badge, 
  Achievement, 
  Subscription, 
  NutrientPack, 
  Notification,
  AppState 
} from './schema';

// Family Members
export const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: "parent-1",
    name: "Sarah",
    role: "parent",
    avatar: "👩‍🌾",
    totalXP: 1250,
    level: 8,
    badges: [
      {
        id: "water-hero",
        name: "Water Hero",
        description: "Watered plants 50 times",
        icon: "💧",
        earnedAt: new Date("2024-01-15"),
        category: "care"
      },
      {
        id: "harvest-master",
        name: "Harvest Master",
        description: "Harvested 25 crops",
        icon: "🌾",
        earnedAt: new Date("2024-01-20"),
        category: "harvest"
      }
    ],
    achievements: [
      {
        id: "first-tomato",
        name: "First Tomato",
        description: "Grew your first tomato",
        icon: "🍅",
        earnedAt: new Date("2024-01-10"),
        xpReward: 100,
        category: "milestone"
      }
    ],
    tasksCompleted: 45,
    plantsCaredFor: 12,
    lastActive: new Date()
  },
  {
    id: "child-1",
    name: "Alex",
    role: "child",
    avatar: "🧑‍🌾",
    totalXP: 890,
    level: 6,
    badges: [
      {
        id: "plant-favorite",
        name: "Plant's Favorite",
        description: "Plants grew 20% faster under your care",
        icon: "🌱",
        earnedAt: new Date("2024-01-18"),
        category: "care"
      }
    ],
    achievements: [
      {
        id: "first-harvest",
        name: "First Harvest",
        description: "Completed your first harvest",
        icon: "🎉",
        earnedAt: new Date("2024-01-12"),
        xpReward: 50,
        category: "milestone"
      }
    ],
    tasksCompleted: 28,
    plantsCaredFor: 8,
    lastActive: new Date()
  }
];

// Plants Data
export const PLANTS: Plant[] = [
  {
    id: "plant-1",
    colonyId: "colony-1",
    species: "Lettuce",
    variety: "Butter Lettuce",
    growthStage: "vegetative",
    daysToHarvest: 12,
    healthScore: 94,
    leafHealth: 92,
    rootHealth: 96,
    nutrientUptake: 88,
    height: 15,
    leafCount: 8,
    stemThickness: 3,
    rootLength: 12,
    caretaker: "parent-1",
    lastWatered: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isPublished: true,
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    viewCount: 1200,
    likeCount: 47,
    commentCount: 12,
    careHistory: [
      {
        id: "care-1",
        plantId: "plant-1",
        type: "watered",
        performedBy: "parent-1",
        performedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        notes: "Added 200ml water",
        xpEarned: 5
      }
    ],
    avatar: "🥬",
    color: "#2EE6A8",
    plantedDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    isActive: true
  },
  {
    id: "plant-2",
    colonyId: "colony-1",
    species: "Spinach",
    variety: "Baby Spinach",
    growthStage: "vegetative",
    daysToHarvest: 8,
    healthScore: 76,
    leafHealth: 78,
    rootHealth: 74,
    nutrientUptake: 72,
    height: 12,
    leafCount: 6,
    stemThickness: 2,
    rootLength: 10,
    caretaker: "child-1",
    lastWatered: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    isPublished: false,
    careHistory: [
      {
        id: "care-2",
        plantId: "plant-2",
        type: "watered",
        performedBy: "child-1",
        performedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        notes: "Added 150ml water",
        xpEarned: 5
      }
    ],
    avatar: "🥬",
    color: "#FF6F3C",
    plantedDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
    isActive: true
  },
  {
    id: "plant-3",
    colonyId: "colony-2",
    species: "Tomato",
    variety: "Cherry Tomato",
    growthStage: "fruiting",
    daysToHarvest: 5,
    healthScore: 96,
    leafHealth: 98,
    rootHealth: 94,
    nutrientUptake: 92,
    height: 45,
    leafCount: 24,
    stemThickness: 8,
    rootLength: 35,
    caretaker: "parent-1",
    lastWatered: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    careHistory: [
      {
        id: "care-3",
        plantId: "plant-3",
        type: "watered",
        performedBy: "parent-1",
        performedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        notes: "Added 300ml water with nutrients",
        xpEarned: 8
      }
    ],
    avatar: "🍅",
    color: "#2EE6A8",
    isPublished: true,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    viewCount: 2100,
    likeCount: 89,
    commentCount: 23,
    plantedDate: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000),
    isActive: true
  },
  {
    id: "plant-4",
    colonyId: "colony-2",
    species: "Basil",
    variety: "Thai Basil",
    growthStage: "seedling",
    daysToHarvest: 25,
    healthScore: 89,
    leafHealth: 91,
    rootHealth: 87,
    nutrientUptake: 85,
    height: 5,
    leafCount: 2,
    stemThickness: 1,
    rootLength: 3,
    caretaker: "child-1",
    lastWatered: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    careHistory: [
      {
        id: "care-4",
        plantId: "plant-4",
        type: "watered",
        performedBy: "child-1",
        performedAt: new Date(Date.now() - 30 * 60 * 1000),
        notes: "Added 100ml water",
        xpEarned: 5
      }
    ],
    avatar: "🌿",
    color: "#2EE6A8",
    isPublished: false,
    plantedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    isActive: true
  }
];

// Tasks Data
export const TASKS: Task[] = [
  {
    id: "task-1",
    colonyId: "colony-1",
    plantId: "plant-2",
    title: "Refill Water Tank",
    description: "Colony A water level is low (72%)",
    type: "water",
    priority: "high",
    status: "pending",
    xpReward: 10,
    estimatedDuration: 5,
    actions: [
      {
        id: "action-1",
        title: "Add 2L water",
        description: "Fill the water tank to optimal level",
        type: "add_water",
        amount: 2,
        unit: "L",
        isCompleted: false
      }
    ]
  },
  {
    id: "task-2",
    colonyId: "colony-2",
    plantId: "plant-3",
    title: "Harvest Cherry Tomatoes",
    description: "Tomatoes are ready for harvest!",
    type: "harvest",
    priority: "medium",
    status: "pending",
    xpReward: 15,
    estimatedDuration: 10,
    actions: [
      {
        id: "action-2",
        title: "Harvest ripe tomatoes",
        description: "Pick all red, ripe tomatoes",
        type: "harvest",
        isCompleted: false
      }
    ]
  },
  {
    id: "task-3",
    colonyId: "colony-1",
    title: "Add Nutrient Pack A",
    description: "Time for weekly nutrient boost",
    type: "nutrient",
    priority: "medium",
    status: "pending",
    xpReward: 8,
    estimatedDuration: 3,
    actions: [
      {
        id: "action-3",
        title: "Add 50ml Nutrient A",
        description: "Mix with water and add to system",
        type: "add_nutrient",
        amount: 50,
        unit: "ml",
        isCompleted: false
      }
    ]
  }
];

// Colonies Data
export const COLONIES: Colony[] = [
  {
    id: "colony-1",
    name: "Kitchen Garden",
    mascot: "🥬",
    healthScore: 85,
    status: "needs_water",
    sensors: {
      waterLevel: 72,
      ph: 6.2,
      ec: 1240,
      waterTemp: 22.5,
      airTemp: 23.2,
      humidity: 68,
      lightIntensity: 42000
    },
    plants: PLANTS.filter(p => p.colonyId === "colony-1"),
    tasks: TASKS.filter(t => t.colonyId === "colony-1"),
    createdAt: new Date("2024-01-01"),
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: "colony-2",
    name: "Balcony Farm",
    mascot: "🍅",
    healthScore: 92,
    status: "healthy",
    sensors: {
      waterLevel: 86,
      ph: 6.0,
      ec: 1580,
      waterTemp: 24.1,
      airTemp: 23.8,
      humidity: 72,
      lightIntensity: 48000
    },
    plants: PLANTS.filter(p => p.colonyId === "colony-2"),
    tasks: TASKS.filter(t => t.colonyId === "colony-2"),
    createdAt: new Date("2024-01-05"),
    lastUpdated: new Date(),
    isActive: true
  }
];

// Subscription Data
export const SUBSCRIPTION: Subscription = {
  id: "sub-1",
  status: "active",
  plan: "family",
  nutrientPacks: [
    {
      id: "pack-1",
      name: "Nutrient Pack A",
      type: "A",
      remainingDoses: 3,
      totalDoses: 10,
      expiryDate: new Date("2024-03-01"),
      colonyId: "colony-1"
    },
    {
      id: "pack-2",
      name: "Nutrient Pack B",
      type: "B",
      remainingDoses: 7,
      totalDoses: 10,
      expiryDate: new Date("2024-03-01"),
      colonyId: "colony-2"
    }
  ],
  refillHistory: [
    {
      id: "order-1",
      date: new Date("2024-01-15"),
      items: [
        {
          id: "item-1",
          name: "Nutrient Pack A",
          quantity: 2,
          price: 24.99
        }
      ],
      total: 24.99,
      status: "delivered"
    }
  ],
  nextBillingDate: new Date("2024-02-15"),
  autoRenew: true
};

// Notifications Data
export const NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    type: "critical",
    title: "Water Level Low",
    message: "Kitchen Garden water tank is at 72% - refill soon!",
    colonyId: "colony-1",
    actionRequired: true,
    actionUrl: "/colony/colony-1",
    actionText: "Refill Now",
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: false
  },
  {
    id: "notif-2",
    type: "info",
    title: "Harvest Ready!",
    message: "Cherry tomatoes in Balcony Farm are ready to harvest",
    colonyId: "colony-2",
    plantId: "plant-3",
    actionRequired: true,
    actionUrl: "/plant/plant-3",
    actionText: "Harvest Now",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false
  },
  {
    id: "notif-3",
    type: "achievement",
    title: "New Badge Earned!",
    message: "Alex earned the 'Plant's Favorite' badge! 🌱",
    actionRequired: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true
  }
];

// Complete App State
export const MOCK_APP_STATE: AppState = {
  currentUser: FAMILY_MEMBERS[0],
  familyMembers: FAMILY_MEMBERS,
  colonies: COLONIES,
  selectedColony: COLONIES[0],
  tasks: TASKS,
  notifications: NOTIFICATIONS,
  subscription: SUBSCRIPTION,
  isOnboardingComplete: true,
  selectedTab: "dashboard"
};

// Helper Functions
export function getColonyById(id: string): Colony | undefined {
  return COLONIES.find(colony => colony.id === id);
}

export function getPlantById(id: string): Plant | undefined {
  return PLANTS.find(plant => plant.id === id);
}

export function getTasksByColony(colonyId: string): Task[] {
  return TASKS.filter(task => task.colonyId === colonyId);
}

export function getPlantsByColony(colonyId: string): Plant[] {
  return PLANTS.filter(plant => plant.colonyId === colonyId);
}

export function getUnreadNotifications(): Notification[] {
  return NOTIFICATIONS.filter(notification => !notification.isRead);
}

export function getHealthColor(healthScore: number): string {
  if (healthScore >= 90) return "#2EE6A8"; // Neon green
  if (healthScore >= 70) return "#FFD93D"; // Warning yellow
  if (healthScore >= 50) return "#FF6F3C"; // Alert orange
  return "#FF4757"; // Critical red
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "healthy": return "#2EE6A8";
    case "needs_water": return "#FFD93D";
    case "low_nutrients": return "#FF6F3C";
    case "warning": return "#FF6F3C";
    case "critical": return "#FF4757";
    default: return "#6C757D";
  }
}

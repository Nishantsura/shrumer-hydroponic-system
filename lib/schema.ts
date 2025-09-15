// Shrumer App - Data Schema & Type Definitions
// This file defines all the data structures used throughout the app

export interface Colony {
  id: string;
  name: string;
  mascot?: string; // Placeholder for future mascot system
  healthScore: number; // 0-100
  status: 'healthy' | 'needs_water' | 'low_nutrients' | 'warning' | 'critical';
  
  // Sensor Data
  sensors: {
    waterLevel: number; // 0-100%
    ph: number; // 5.5-6.5 optimal
    ec: number; // 1.2-2.0 optimal
    waterTemp: number; // Celsius
    airTemp: number; // Celsius
    humidity: number; // 0-100%
    lightIntensity: number; // 0-100%
  };
  
  // Plants in this colony
  plants: Plant[];
  
  // Tasks and actions
  tasks: Task[];
  
  // Metadata
  createdAt: Date;
  lastUpdated: Date;
  isActive: boolean;
}

export interface Plant {
  id: string;
  colonyId: string;
  species: string;
  variety: string; // e.g., "Cherry Tomato", "Basil"
  
  // Growth tracking
  growthStage: 'seedling' | 'vegetative' | 'flowering' | 'fruiting' | 'harvest';
  daysToHarvest: number;
  healthScore: number; // 0-100
  
  // Detailed health metrics
  leafHealth: number; // 0-100
  rootHealth: number; // 0-100
  nutrientUptake: number; // 0-100
  
  // Physical measurements
  height: number; // cm
  leafCount: number;
  stemThickness: number; // mm
  rootLength: number; // cm
  
  // Care tracking
  caretaker?: string; // Family member assigned
  lastWatered?: Date;
  lastHarvested?: Date;
  careHistory: CareEvent[];
  
  // Publishing & Social
  isPublished?: boolean;
  publishedAt?: Date;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  
  // Visual
  avatar: string; // Plant icon/emoji
  color: string; // Health ring color
  
  // Metadata
  plantedDate: Date;
  isActive: boolean;
}

export interface Task {
  id: string;
  colonyId: string;
  plantId?: string; // Optional - some tasks are colony-wide
  
  title: string;
  description: string;
  type: 'water' | 'nutrient' | 'harvest' | 'maintenance' | 'refill';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed';
  
  // Gamification
  xpReward: number;
  completedBy?: string; // Family member who completed it
  completedAt?: Date;
  
  // Timing
  dueDate?: Date;
  estimatedDuration: number; // minutes
  
  // Actions
  actions: TaskAction[];
}

export interface TaskAction {
  id: string;
  title: string;
  description: string;
  type: 'add_water' | 'add_nutrient' | 'harvest' | 'check_ph' | 'refill_tank';
  amount?: number; // e.g., 50ml, 2L
  unit?: string; // ml, L, grams, etc.
  isCompleted: boolean;
}

export interface CareEvent {
  id: string;
  plantId: string;
  type: 'watered' | 'harvested' | 'planted' | 'health_check';
  performedBy: string;
  performedAt: Date;
  notes?: string;
  xpEarned: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: 'parent' | 'child' | 'guardian';
  avatar: string;
  
  // Gamification
  totalXP: number;
  level: number;
  badges: Badge[];
  achievements: Achievement[];
  
  // Activity
  tasksCompleted: number;
  plantsCaredFor: number;
  lastActive: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: 'care' | 'harvest' | 'streak' | 'special';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  xpReward: number;
  category: 'milestone' | 'streak' | 'collection' | 'special';
}

export interface Subscription {
  id: string;
  status: 'active' | 'expired' | 'cancelled';
  plan: 'basic' | 'premium' | 'family';
  
  // Inventory
  nutrientPacks: NutrientPack[];
  refillHistory: RefillOrder[];
  
  // Billing
  nextBillingDate: Date;
  autoRenew: boolean;
}

export interface NutrientPack {
  id: string;
  name: string;
  type: 'A' | 'B' | 'C' | 'pH_up' | 'pH_down';
  remainingDoses: number;
  totalDoses: number;
  expiryDate: Date;
  colonyId?: string; // Assigned to specific colony
}

export interface RefillOrder {
  id: string;
  date: Date;
  items: RefillItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
}

export interface RefillItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  colonyId?: string;
  plantId?: string;
  
  // Actions
  actionRequired: boolean;
  actionUrl?: string;
  actionText?: string;
  
  // Metadata
  createdAt: Date;
  readAt?: Date;
  isRead: boolean;
}

export interface AppState {
  // User & Family
  currentUser: FamilyMember;
  familyMembers: FamilyMember[];
  
  // Colonies & Plants
  colonies: Colony[];
  selectedColony?: Colony;
  
  // Tasks & Gamification
  tasks: Task[];
  notifications: Notification[];
  
  // Subscriptions
  subscription: Subscription;
  
  // UI State
  isOnboardingComplete: boolean;
  selectedTab: 'dashboard' | 'colonies' | 'tasks' | 'subscriptions' | 'profile';
}

// Utility types for component props
export type ColonyCardProps = {
  colony: Colony;
  onSelect: (colony: Colony) => void;
};

export type PlantCardProps = {
  plant: Plant;
  onSelect: (plant: Plant) => void;
};

export type TaskCardProps = {
  task: Task;
  onComplete: (task: Task) => void;
};

// Navigation types
export type TabType = 'dashboard' | 'colonies' | 'tasks' | 'subscriptions' | 'profile';

export type ScreenType = 
  | 'onboarding'
  | 'dashboard' 
  | 'colony-detail'
  | 'plant-detail'
  | 'tasks'
  | 'subscriptions'
  | 'notifications'
  | 'profile';

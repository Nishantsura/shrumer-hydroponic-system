"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Plant, Colony } from '@/lib/schema';

interface PlantHeaderProps {
  plant: Plant;
  colony?: Colony;
}

export function PlantHeader({ plant, colony }: PlantHeaderProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return '#2EE6A8';
    if (score >= 60) return '#FFA500';
    return '#FF6B6B';
  };

  const getGrowthStageColor = (stage: string) => {
    switch (stage) {
      case 'seedling': return '#8B4513';
      case 'vegetative': return '#228B22';
      case 'flowering': return '#FFD700';
      case 'fruiting': return '#FF6347';
      case 'harvest': return '#32CD32';
      default: return '#666';
    }
  };

  const getDaysToHarvest = () => {
    const daysRemaining = plant.daysToHarvest;
    if (daysRemaining <= 0) return 'Ready to Harvest!';
    if (daysRemaining <= 3) return `${daysRemaining} days to harvest`;
    return `${daysRemaining} days to harvest`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="farm-tile p-4"
    >
      <div className="flex items-center gap-4 mb-4">
        {/* Plant Avatar */}
        <div className="relative">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border-4"
            style={{ 
              backgroundColor: getHealthColor(plant.healthScore) + '20',
              borderColor: getHealthColor(plant.healthScore)
            }}
          >
            {plant.avatar}
          </div>
          <div 
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: getGrowthStageColor(plant.growthStage) }}
          >
            {plant.growthStage.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Plant Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold font-poppins text-foreground mb-1">
            {plant.species}
          </h2>
          <p className="text-muted-foreground mb-2">
            {plant.variety} • Planted {plant.plantedDate.toLocaleDateString()}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Health:</span>
              <span 
                className="font-semibold"
                style={{ color: getHealthColor(plant.healthScore) }}
              >
                {plant.healthScore}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Stage:</span>
              <span 
                className="font-semibold capitalize"
                style={{ color: getGrowthStageColor(plant.growthStage) }}
              >
                {plant.growthStage}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">
            {getDaysToHarvest()}
          </div>
          <div className="text-xs text-muted-foreground">Harvest</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">
            {plant.height}cm
          </div>
          <div className="text-xs text-muted-foreground">Height</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">
            {plant.leafCount}
          </div>
          <div className="text-xs text-muted-foreground">Leaves</div>
        </div>
      </div>

      {/* Colony Info */}
      {colony && (
        <div className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border">
          <span className="text-lg">{colony.mascot}</span>
          <div>
            <div className="text-sm font-medium text-foreground">{colony.name}</div>
            <div className="text-xs text-muted-foreground">
              {colony.sensors.waterLevel}% water • pH {colony.sensors.ph}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

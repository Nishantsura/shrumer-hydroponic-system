"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plant } from '@/lib/schema';
import { getHealthColor } from '@/lib/mock-data';

interface PlantGridProps {
  plants: Plant[];
  colonyId: string;
}

export function PlantGrid({ plants, colonyId }: PlantGridProps) {
  const router = useRouter();

  const handlePlantClick = (plant: Plant) => {
    router.push(`/plant/${plant.id}`);
  };

  const getGrowthStageIcon = (stage: string) => {
    switch (stage) {
      case 'seedling': return '🌱';
      case 'sprout': return '🌿';
      case 'vegetative': return '🌿';
      case 'flowering': return '🌸';
      case 'fruiting': return '🍅';
      case 'harvest_ready': return '🌾';
      default: return '🌱';
    }
  };

  const getGrowthStageColor = (stage: string) => {
    switch (stage) {
      case 'seedling': return '#FFD93D';
      case 'sprout': return '#2EE6A8';
      case 'vegetative': return '#2EE6A8';
      case 'flowering': return '#FF6F3C';
      case 'fruiting': return '#FF6F3C';
      case 'harvest_ready': return '#2EE6A8';
      default: return '#6C757D';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold font-poppins text-foreground">
          Plants
        </h2>
        <button className="text-sm text-neon-green hover:text-neon-green/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {plants.map((plant, index) => (
          <motion.div
            key={plant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="farm-tile farm-tile-interactive p-4 cursor-pointer"
            onClick={() => handlePlantClick(plant)}
          >
            {/* Plant Avatar & Health Ring */}
            <div className="relative mb-3">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl bg-card border-2"
                   style={{ borderColor: getHealthColor(plant.healthScore) }}>
                {plant.avatar}
              </div>
              {/* Health Score Badge */}
              <div 
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: getHealthColor(plant.healthScore) }}
              >
                {plant.healthScore}
              </div>
            </div>
            
            {/* Plant Info */}
            <div className="text-center space-y-1">
              <h3 className="font-semibold text-foreground text-sm">
                {plant.species}
              </h3>
              <p className="text-xs text-muted-foreground">
                {plant.variety}
              </p>
              
              {/* Growth Stage */}
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm">{getGrowthStageIcon(plant.growthStage)}</span>
                <span 
                  className="text-xs font-medium capitalize"
                  style={{ color: getGrowthStageColor(plant.growthStage) }}
                >
                  {plant.growthStage.replace('_', ' ')}
                </span>
              </div>
              
              {/* Days to Harvest */}
              <div className="text-xs text-muted-foreground">
                {plant.daysToHarvest > 0
                  ? `${plant.daysToHarvest} days to harvest`
                  : 'Ready to harvest!'
                }
              </div>
              
              {/* Caretaker */}
              {plant.caretaker && (
                <div className="text-xs text-muted-foreground">
                  Caretaker: {plant.caretaker}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {plants.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🌱</div>
          <p className="text-muted-foreground">No plants in this colony yet.</p>
          <button className="mt-2 text-sm text-neon-green hover:text-neon-green/80 transition-colors">
            Add your first plant
          </button>
        </div>
      )}
    </div>
  );
}

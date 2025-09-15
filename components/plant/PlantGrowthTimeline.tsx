"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Plant } from '@/lib/schema';

interface PlantGrowthTimelineProps {
  plant: Plant;
}

export function PlantGrowthTimeline({ plant }: PlantGrowthTimelineProps) {
  const growthStages = [
    { stage: 'seedling', label: 'Seedling', icon: '🌱', duration: 7, completed: true },
    { stage: 'vegetative', label: 'Vegetative', icon: '🌿', duration: 21, completed: true },
    { stage: 'flowering', label: 'Flowering', icon: '🌸', duration: 14, completed: plant.growthStage === 'flowering' || plant.growthStage === 'fruiting' || plant.growthStage === 'harvest' },
    { stage: 'fruiting', label: 'Fruiting', icon: '🍅', duration: 21, completed: plant.growthStage === 'fruiting' || plant.growthStage === 'harvest' },
    { stage: 'harvest', label: 'Harvest', icon: '🌾', duration: 7, completed: plant.growthStage === 'harvest' }
  ];

  const getCurrentStageIndex = () => {
    return growthStages.findIndex(stage => stage.stage === plant.growthStage);
  };

  const getProgressPercentage = () => {
    const currentIndex = getCurrentStageIndex();
    if (currentIndex === -1) return 0;
    
    const completedStages = growthStages.slice(0, currentIndex);
    const totalCompletedDays = completedStages.reduce((sum, stage) => sum + stage.duration, 0);
    const currentStageDays = Math.min(plant.daysToHarvest, growthStages[currentIndex].duration);
    
    const totalDays = growthStages.reduce((sum, stage) => sum + stage.duration, 0);
    const progressDays = totalCompletedDays + (growthStages[currentIndex].duration - currentStageDays);
    
    return Math.round((progressDays / totalDays) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Overall Progress */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          📈 Growth Progress
        </h3>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-foreground">Overall Progress</span>
            <span className="text-muted-foreground">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-neon-green h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Days since planting:</span>
            <span className="text-foreground font-semibold ml-2">
              {Math.max(0, 70 - plant.daysToHarvest)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Days to harvest:</span>
            <span className="text-foreground font-semibold ml-2">
              {plant.daysToHarvest}
            </span>
          </div>
        </div>
      </div>

      {/* Growth Timeline */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          🌱 Growth Timeline
        </h3>
        
        <div className="space-y-4">
          {growthStages.map((stage, index) => {
            const isCurrentStage = stage.stage === plant.growthStage;
            const isCompleted = stage.completed;
            const isUpcoming = index > getCurrentStageIndex();
            
            return (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-lg border ${
                  isCurrentStage 
                    ? 'border-neon-green bg-neon-green/10' 
                    : isCompleted 
                    ? 'border-green-500/50 bg-green-500/5'
                    : 'border-border bg-card'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  isCurrentStage 
                    ? 'bg-neon-green text-dark-charcoal' 
                    : isCompleted 
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {stage.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold ${
                      isCurrentStage ? 'text-neon-green' : isCompleted ? 'text-green-500' : 'text-foreground'
                    }`}>
                      {stage.label}
                    </h4>
                    {isCurrentStage && (
                      <span className="px-2 py-1 bg-neon-green text-dark-charcoal text-xs rounded-full">
                        Current
                      </span>
                    )}
                    {isCompleted && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        ✓ Complete
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {stage.duration} days • {isUpcoming ? 'Upcoming' : isCompleted ? 'Completed' : 'In Progress'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          📏 Growth Metrics
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-foreground">{plant.height}cm</div>
            <div className="text-sm text-muted-foreground">Current Height</div>
            <div className="text-xs text-green-500 mt-1">+2cm this week</div>
          </div>
          
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-foreground">{plant.leafCount}</div>
            <div className="text-sm text-muted-foreground">Leaf Count</div>
            <div className="text-xs text-green-500 mt-1">+3 this week</div>
          </div>
          
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-foreground">{plant.stemThickness}mm</div>
            <div className="text-sm text-muted-foreground">Stem Thickness</div>
            <div className="text-xs text-green-500 mt-1">+0.5mm this week</div>
          </div>
          
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-foreground">{plant.rootLength}cm</div>
            <div className="text-sm text-muted-foreground">Root Length</div>
            <div className="text-xs text-green-500 mt-1">+1cm this week</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

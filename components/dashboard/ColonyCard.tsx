"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Colony } from '@/lib/schema';
import { getHealthColor, getStatusColor } from '@/lib/mock-data';

interface ColonyCardProps {
  colony: Colony;
  onSelect: (colony: Colony) => void;
}

export function ColonyCard({ colony, onSelect }: ColonyCardProps) {
  const { name, healthScore, status, plants, tasks, sensors } = colony;
  
  // Get urgent tasks
  const urgentTasks = tasks.filter(task => 
    task.priority === 'critical' || task.priority === 'high'
  );
  
  // Get plants ready for harvest
  const harvestReadyPlants = plants.filter(plant => 
    plant.daysToHarvest <= 3
  );

  const handleClick = () => {
    onSelect(colony);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="farm-tile farm-tile-interactive p-4 cursor-pointer"
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{colony.mascot}</div>
          <div>
            <h3 className="font-semibold font-poppins text-foreground">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {plants.length} plants • {tasks.length} tasks
            </p>
          </div>
        </div>
        
        {/* Health Score */}
        <div className="text-right">
          <div 
            className="text-2xl font-bold"
            style={{ color: getHealthColor(healthScore) }}
          >
            {healthScore}
          </div>
          <div className="text-xs text-muted-foreground">Health</div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 mb-3">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: getStatusColor(status) }}
        />
        <span className="text-sm font-medium capitalize">
          {status.replace('_', ' ')}
        </span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {sensors.waterLevel}%
          </div>
          <div className="text-xs text-muted-foreground">Water</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {sensors.ph}
          </div>
          <div className="text-xs text-muted-foreground">pH</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {sensors.ec}
          </div>
          <div className="text-xs text-muted-foreground">EC</div>
        </div>
      </div>

      {/* Plant Thumbnails */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-muted-foreground">Plants:</span>
        <div className="flex gap-1">
          {plants.slice(0, 5).map((plant) => (
            <div
              key={plant.id}
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
              style={{ 
                backgroundColor: getHealthColor(plant.healthScore) + '20',
                border: `1px solid ${getHealthColor(plant.healthScore)}`
              }}
              title={`${plant.species} - ${plant.healthScore}% health`}
            >
              {plant.avatar}
            </div>
          ))}
          {plants.length > 5 && (
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
              +{plants.length - 5}
            </div>
          )}
        </div>
      </div>

      {/* Alerts/CTAs */}
      <div className="space-y-2">
        {urgentTasks.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-alert-orange/10 border border-alert-orange/20 rounded-lg">
            <span className="text-alert-orange">⚠️</span>
            <span className="text-sm text-alert-orange font-medium">
              {urgentTasks[0].title}
            </span>
          </div>
        )}
        
        {harvestReadyPlants.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-neon-green/10 border border-neon-green/20 rounded-lg">
            <span className="text-neon-green">🌾</span>
            <span className="text-sm text-neon-green font-medium">
              {harvestReadyPlants.length} plant{harvestReadyPlants.length > 1 ? 's' : ''} ready for harvest!
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

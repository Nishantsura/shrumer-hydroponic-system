"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Colony } from '@/lib/schema';
import { getHealthColor, getStatusColor } from '@/lib/mock-data';

interface ColonyGridProps {
  colonies: Colony[];
  onColonySelect: (colony: Colony) => void;
}

export function ColonyGrid({ colonies, onColonySelect }: ColonyGridProps) {
  if (colonies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏠</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Colonies Found</h3>
        <p className="text-muted-foreground">
          No colonies match your current filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {colonies.map((colony, index) => (
        <motion.div
          key={colony.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="farm-tile farm-tile-interactive p-4 cursor-pointer"
          onClick={() => onColonySelect(colony)}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{colony.mascot}</div>
              <div>
                <h3 className="font-semibold font-poppins text-foreground">
                  {colony.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {colony.plants.length} plants • {colony.tasks.length} tasks
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div 
                className="text-2xl font-bold"
                style={{ color: getHealthColor(colony.healthScore) }}
              >
                {colony.healthScore}
              </div>
              <div className="text-xs text-muted-foreground">Health</div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getStatusColor(colony.status) }}
            />
            <span className="text-sm font-medium capitalize">
              {colony.status.replace('_', ' ')}
            </span>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {colony.sensors.waterLevel}%
              </div>
              <div className="text-xs text-muted-foreground">Water</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {colony.sensors.ph}
              </div>
              <div className="text-xs text-muted-foreground">pH</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {colony.sensors.ec}
              </div>
              <div className="text-xs text-muted-foreground">EC</div>
            </div>
          </div>

          {/* Plant Thumbnails */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Plants:</span>
            <div className="flex gap-1">
              {colony.plants.slice(0, 5).map((plant) => (
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
              {colony.plants.length > 5 && (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  +{colony.plants.length - 5}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

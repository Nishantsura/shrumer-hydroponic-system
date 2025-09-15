"use client"

import React from 'react';
import { Colony } from '@/lib/schema';

interface ResourceCountersProps {
  colonies: Colony[];
}

export function ResourceCounters({ colonies }: ResourceCountersProps) {
  // Calculate totals across all colonies
  const totalPlants = colonies.reduce((sum, colony) => sum + colony.plants.length, 0);
  const totalTasks = colonies.reduce((sum, colony) => sum + colony.tasks.length, 0);
  const urgentTasks = colonies.reduce((sum, colony) => 
    sum + colony.tasks.filter(task => task.priority === 'critical' || task.priority === 'high').length, 0
  );
  const harvestReady = colonies.reduce((sum, colony) => 
    sum + colony.plants.filter(plant => plant.daysToHarvest <= 3).length, 0
  );

  const counters = [
    {
      icon: '🌱',
      label: 'Plants',
      value: totalPlants,
      color: 'text-neon-green'
    },
    {
      icon: '✅',
      label: 'Tasks',
      value: totalTasks,
      color: 'text-foreground'
    },
    {
      icon: '⚠️',
      label: 'Urgent',
      value: urgentTasks,
      color: urgentTasks > 0 ? 'text-alert-orange' : 'text-muted-foreground'
    },
    {
      icon: '🌾',
      label: 'Harvest',
      value: harvestReady,
      color: harvestReady > 0 ? 'text-neon-green' : 'text-muted-foreground'
    }
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {counters.map((counter, index) => (
        <div
          key={counter.label}
          className="resource-counter flex-shrink-0"
        >
          <div className="resource-icon">
            {counter.icon}
          </div>
          <div className="flex flex-col">
            <span className={`font-bold ${counter.color}`}>
              {counter.value}
            </span>
            <span className="text-xs text-muted-foreground">
              {counter.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

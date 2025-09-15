"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Colony } from '@/lib/schema';

interface ColonyStatsProps {
  colonies: Colony[];
}

export function ColonyStats({ colonies }: ColonyStatsProps) {
  const totalPlants = colonies.reduce((sum, colony) => sum + colony.plants.length, 0);
  const totalTasks = colonies.reduce((sum, colony) => sum + colony.tasks.length, 0);
  const urgentTasks = colonies.reduce((sum, colony) => 
    sum + colony.tasks.filter(task => task.priority === 'critical' || task.priority === 'high').length, 0
  );
  const avgHealthScore = Math.round(
    colonies.reduce((sum, colony) => sum + colony.healthScore, 0) / colonies.length
  );

  const stats = [
    {
      label: 'Total Plants',
      value: totalPlants,
      icon: '🌱',
      color: 'text-neon-green'
    },
    {
      label: 'Active Tasks',
      value: totalTasks,
      icon: '✅',
      color: 'text-foreground'
    },
    {
      label: 'Urgent Tasks',
      value: urgentTasks,
      icon: '⚠️',
      color: urgentTasks > 0 ? 'text-alert-orange' : 'text-muted-foreground'
    },
    {
      label: 'Avg Health',
      value: `${avgHealthScore}%`,
      icon: '💚',
      color: avgHealthScore >= 80 ? 'text-neon-green' : avgHealthScore >= 60 ? 'text-alert-orange' : 'text-red-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 gap-3"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="farm-tile p-4 text-center"
        >
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className={`text-2xl font-bold ${stat.color} mb-1`}>
            {stat.value}
          </div>
          <div className="text-xs text-muted-foreground">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface QuickActionsProps {
  // We'll add props later as needed
}

export function QuickActions({}: QuickActionsProps) {
  const actions = [
    {
      id: 'water-all',
      icon: '💧',
      label: 'Water All',
      description: 'Quick water check',
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-500'
    },
    {
      id: 'harvest-ready',
      icon: '🌾',
      label: 'Harvest Ready',
      description: 'Check harvest status',
      color: 'bg-neon-green/10 border-neon-green/20 text-neon-green'
    },
    {
      id: 'add-nutrients',
      icon: '🧪',
      label: 'Add Nutrients',
      description: 'Weekly nutrients',
      color: 'bg-purple-500/10 border-purple-500/20 text-purple-500'
    },
    {
      id: 'health-check',
      icon: '🔍',
      label: 'Health Check',
      description: 'Plant diagnostics',
      color: 'bg-orange-500/10 border-orange-500/20 text-orange-500'
    }
  ];

  const handleActionClick = (actionId: string) => {
    console.log('Quick action clicked:', actionId);
    // We'll implement these actions later
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <motion.button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className={`
              p-3 rounded-lg border-2 transition-all duration-200
              ${action.color}
              hover:scale-105 active:scale-95
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{action.icon}</div>
              <div className="text-left">
                <div className="font-semibold text-sm">
                  {action.label}
                </div>
                <div className="text-xs opacity-75">
                  {action.description}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

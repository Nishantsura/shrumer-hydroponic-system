"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Colony } from '@/lib/schema';
import { getHealthColor, getStatusColor } from '@/lib/mock-data';

interface ColonyHeaderProps {
  colony: Colony;
}

export function ColonyHeader({ colony }: ColonyHeaderProps) {
  const router = useRouter();
  const { name, mascot, healthScore, status, plants } = colony;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="glass-header sticky top-0 z-40">
      <div className="px-4 py-4">
        {/* Back Button & Title */}
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            onClick={handleBack}
            className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </motion.button>
          <div className="flex-1">
            <h1 className="text-xl font-bold font-poppins text-foreground">
              {name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {plants.length} plants • {colony.tasks.length} tasks
            </p>
          </div>
        </div>

        {/* Colony Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{mascot}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getStatusColor(status) }}
                />
                <span className="text-sm font-medium capitalize">
                  {status.replace('_', ' ')}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Last updated: {colony.lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>
          
          {/* Health Score */}
          <div className="text-right">
            <div 
              className="text-3xl font-bold"
              style={{ color: getHealthColor(healthScore) }}
            >
              {healthScore}
            </div>
            <div className="text-xs text-muted-foreground">Health Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}

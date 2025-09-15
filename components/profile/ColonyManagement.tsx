"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Colony } from '@/lib/schema';

interface ColonyManagementProps {
  colonies: Colony[];
}

export function ColonyManagement({ colonies }: ColonyManagementProps) {
  const handleRenameColony = (colonyId: string) => {
    console.log('Rename colony:', colonyId);
    // This would open a rename modal
  };

  const handleDeleteColony = (colonyId: string) => {
    console.log('Delete colony:', colonyId);
    // This would open a confirmation modal
  };

  const handleAddColony = () => {
    console.log('Add new colony');
    // This would open the add colony flow
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="farm-tile p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Your Colonies</h3>
        <button
          onClick={handleAddColony}
          className="px-3 py-1 bg-neon-green text-dark-charcoal rounded-lg text-sm font-medium hover:bg-neon-green/90 transition-colors"
        >
          Add Colony
        </button>
      </div>

      <div className="space-y-3">
        {colonies.map((colony, index) => (
          <motion.div
            key={colony.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{colony.mascot}</div>
              <div>
                <h4 className="font-medium text-foreground">{colony.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {colony.plants.length} plants • {colony.tasks.length} tasks
                </p>
                <p className="text-xs text-muted-foreground">
                  Health: {colony.healthScore}% • Status: {colony.status}
                </p>
              </div>
            </div>
            
            <div className="flex gap-1">
              <button
                onClick={() => handleRenameColony(colony.id)}
                className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
                title="Rename"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDeleteColony(colony.id)}
                className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Colony Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">Colony Overview</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Plants</span>
            <span className="font-medium text-foreground">
              {colonies.reduce((sum, colony) => sum + colony.plants.length, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Active Colonies</span>
            <span className="font-medium text-foreground">
              {colonies.filter(c => c.isActive).length}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

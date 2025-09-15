"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { NutrientPack } from '@/lib/schema';

interface NutrientInventoryProps {
  nutrientPacks: NutrientPack[];
}

export function NutrientInventory({ nutrientPacks }: NutrientInventoryProps) {
  const getNutrientIcon = (type: string) => {
    switch (type) {
      case 'A': return '🧪';
      case 'B': return '⚗️';
      case 'C': return '🔬';
      case 'pH_up': return '📈';
      case 'pH_down': return '📉';
      default: return '🧪';
    }
  };

  const getNutrientColor = (type: string) => {
    switch (type) {
      case 'A': return '#2EE6A8';
      case 'B': return '#FFD93D';
      case 'C': return '#FF6F3C';
      case 'pH_up': return '#9B59B6';
      case 'pH_down': return '#3498DB';
      default: return '#6C757D';
    }
  };

  const getStockStatus = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100;
    if (percentage <= 20) return { status: 'critical', color: '#FF4757' };
    if (percentage <= 50) return { status: 'low', color: '#FF6F3C' };
    if (percentage <= 80) return { status: 'medium', color: '#FFD93D' };
    return { status: 'good', color: '#2EE6A8' };
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold font-poppins text-foreground">
        Nutrient Inventory
      </h2>
      
      <div className="space-y-3">
        {nutrientPacks.map((pack, index) => {
          const stockStatus = getStockStatus(pack.remainingDoses, pack.totalDoses);
          const isExpiringSoon = pack.expiryDate.getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000; // 30 days
          
          return (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="farm-tile p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: getNutrientColor(pack.type) + '20' }}
                  >
                    {getNutrientIcon(pack.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{pack.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {pack.colonyId ? `Assigned to Colony ${pack.colonyId}` : 'Unassigned'}
                    </p>
                  </div>
                </div>
                
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stockStatus.color }}
                />
              </div>

              {/* Stock Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Stock Level</span>
                  <span className="font-medium text-foreground">
                    {pack.remainingDoses}/{pack.totalDoses} doses
                  </span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(pack.remainingDoses / pack.totalDoses) * 100}%`,
                      backgroundColor: stockStatus.color
                    }}
                  />
                </div>
              </div>

              {/* Expiry Warning */}
              {isExpiringSoon && (
                <div className="mt-3 p-2 bg-alert-orange/10 border border-alert-orange/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-alert-orange">⚠️</span>
                    <span className="text-sm text-alert-orange">
                      Expires {pack.expiryDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-3 flex gap-2">
                <button className="flex-1 px-3 py-2 bg-card border border-border rounded-lg text-sm hover:bg-accent transition-colors">
                  Reorder
                </button>
                <button className="flex-1 px-3 py-2 bg-neon-green text-dark-charcoal rounded-lg text-sm hover:bg-neon-green/90 transition-colors">
                  Use Now
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add New Pack */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="farm-tile farm-tile-interactive p-4 w-full text-center border-2 border-dashed border-border hover:border-neon-green transition-colors"
      >
        <div className="text-3xl mb-2">➕</div>
        <div className="text-sm font-medium text-foreground">Add New Nutrient Pack</div>
        <div className="text-xs text-muted-foreground">Order additional supplies</div>
      </motion.button>
    </div>
  );
}

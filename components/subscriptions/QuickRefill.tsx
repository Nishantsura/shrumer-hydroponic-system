"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Subscription } from '@/lib/schema';

interface QuickRefillProps {
  subscription: Subscription;
}

export function QuickRefill({ subscription }: QuickRefillProps) {
  // Check if any nutrient packs are running low
  const lowStockPacks = subscription.nutrientPacks.filter(pack => pack.remainingDoses <= 2);
  const hasLowStock = lowStockPacks.length > 0;

  const handleQuickRefill = () => {
    console.log('Quick refill initiated');
    // This would trigger the refill flow
  };

  if (!hasLowStock) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="farm-tile p-4 border-2 border-neon-green/20"
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl">✅</div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">All Set!</h3>
            <p className="text-sm text-muted-foreground">
              Your nutrient supplies are well stocked.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="farm-tile p-4 border-2 border-alert-orange/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">⚠️</div>
          <div>
            <h3 className="font-semibold text-foreground">Low Stock Alert</h3>
            <p className="text-sm text-muted-foreground">
              {lowStockPacks.length} nutrient pack{lowStockPacks.length > 1 ? 's' : ''} running low
            </p>
            <div className="flex gap-1 mt-1">
              {lowStockPacks.map((pack) => (
                <span
                  key={pack.id}
                  className="text-xs px-2 py-1 bg-alert-orange/20 text-alert-orange rounded-full"
                >
                  {pack.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <motion.button
          onClick={handleQuickRefill}
          className="px-4 py-2 bg-neon-green text-dark-charcoal rounded-lg font-semibold text-sm hover:bg-neon-green/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Refill Now
        </motion.button>
      </div>
    </motion.div>
  );
}

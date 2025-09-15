"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/app-context';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { ColonyCard } from '@/components/dashboard/ColonyCard';
import { ResourceCounters } from '@/components/dashboard/ResourceCounters';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const router = useRouter();
  const { state, setSelectedTab, setSelectedColony } = useApp();
  const { colonies, selectedTab } = state;

  const handleColonySelect = (colony: any) => {
    setSelectedColony(colony);
    // Navigate to colony detail
    router.push(`/colony/${colony.id}`);
  };

  const handleAddColony = () => {
    // Navigate to add colony flow - we'll implement this later
    console.log('Add new colony');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-header sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-poppins text-foreground">
                Your Farm
              </h1>
              <p className="text-sm text-muted-foreground">
                {colonies.length} colonies • {colonies.reduce((sum, c) => sum + c.plants.length, 0)} plants
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors">
                🔔
              </button>
              <button 
                onClick={handleAddColony}
                className="p-2 rounded-lg bg-neon-green text-dark-charcoal hover:bg-neon-green/90 transition-colors"
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Counters */}
      <div className="px-4 py-4">
        <ResourceCounters colonies={colonies} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2">
        <QuickActions />
      </div>

      {/* Colonies Grid */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-poppins text-foreground">
            Your Colonies
          </h2>
          <button className="text-sm text-neon-green hover:text-neon-green/80 transition-colors">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {colonies.map((colony, index) => (
            <motion.div
              key={colony.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ColonyCard 
                colony={colony} 
                onSelect={handleColonySelect}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav 
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        notificationsCount={state.notifications.filter(n => !n.isRead).length}
      />
    </div>
  );
}

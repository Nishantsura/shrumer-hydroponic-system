"use client"

import React, { useState } from 'react';
import { useApp } from '@/contexts/app-context';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { ColonyGrid } from '@/components/colonies/ColonyGrid';
import { ColonyStats } from '@/components/colonies/ColonyStats';
import { AddColonyModal } from '@/components/colonies/AddColonyModal';
import { ColonyFilters } from '@/components/colonies/ColonyFilters';
import { motion } from 'framer-motion';

export default function ColoniesPage() {
  const { state, setSelectedTab } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'setup' | 'maintenance'>('all');

  const filteredColonies = state.colonies.filter(colony => {
    switch (filter) {
      case 'active':
        return colony.status === 'healthy';
      case 'setup':
        return colony.status === 'needs_water' || colony.status === 'low_nutrients';
      case 'maintenance':
        return colony.status === 'warning' || colony.status === 'critical';
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-header sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-poppins text-foreground">
                Your Colonies
              </h1>
              <p className="text-sm text-muted-foreground">
                {state.colonies.length} colonies • {state.colonies.reduce((sum, c) => sum + c.plants.length, 0)} plants
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="p-2 rounded-lg bg-neon-green text-dark-charcoal hover:bg-neon-green/90 transition-colors"
            >
              ➕
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-4 py-4">
        <ColonyStats colonies={state.colonies} />
      </div>

      {/* Filters */}
      <div className="px-4 py-2">
        <ColonyFilters currentFilter={filter} onFilterChange={setFilter} />
      </div>

      {/* Colonies Grid */}
      <div className="px-4 py-4">
        <ColonyGrid 
          colonies={filteredColonies}
          onColonySelect={(colony) => {
            // Navigate to colony detail
            window.location.href = `/colony/${colony.id}`;
          }}
        />
      </div>

      {/* Add Colony Modal */}
      {showAddModal && (
        <AddColonyModal 
          onClose={() => setShowAddModal(false)}
          onAdd={(colonyData) => {
            console.log('Add colony:', colonyData);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Bottom Navigation */}
      <MobileBottomNav 
        selectedTab={state.selectedTab}
        onTabChange={setSelectedTab}
        notificationsCount={state.notifications.filter(n => !n.isRead).length}
      />
    </div>
  );
}

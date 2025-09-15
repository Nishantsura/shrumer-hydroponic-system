"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/contexts/app-context';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { ColonyHeader } from '@/components/colony/ColonyHeader';
import { SensorDashboard } from '@/components/colony/SensorDashboard';
import { TaskQueue } from '@/components/colony/TaskQueue';
import { PlantGrid } from '@/components/colony/PlantGrid';
import { ColonyTabs } from '@/components/colony/ColonyTabs';
import { getColonyById } from '@/lib/mock-data';

export default function ColonyDetailPage() {
  const params = useParams();
  const { state, setSelectedTab } = useApp();
  const colonyId = params.id as string;
  
  const colony = getColonyById(colonyId);
  
  if (!colony) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h2 className="text-xl font-semibold mb-2">Colony Not Found</h2>
          <p className="text-muted-foreground">This colony doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <ColonyHeader colony={colony} />
      
      {/* Main Content */}
      <div className="px-4 py-4 space-y-6">
        {/* Sensor Dashboard */}
        <SensorDashboard sensors={colony.sensors} />
        
        {/* Task Queue */}
        <TaskQueue tasks={colony.tasks} colonyId={colony.id} />
        
        {/* Plant Grid */}
        <PlantGrid plants={colony.plants} colonyId={colony.id} />
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav 
        selectedTab={state.selectedTab}
        onTabChange={setSelectedTab}
        notificationsCount={state.notifications.filter(n => !n.isRead).length}
      />
    </div>
  );
}
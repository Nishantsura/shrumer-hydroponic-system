"use client"

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/contexts/app-context';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { PlantHeader } from '@/components/plant/PlantHeader';
import { PlantPublishingStatus } from '@/components/plant/PlantPublishingStatus';
import { PlantGrowthTimeline } from '@/components/plant/PlantGrowthTimeline';
import { PlantHealthMetrics } from '@/components/plant/PlantHealthMetrics';
import { PlantCareHistory } from '@/components/plant/PlantCareHistory';
import { PlantEnvironmentalData } from '@/components/plant/PlantEnvironmentalData';
import { PlantActions } from '@/components/plant/PlantActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function PlantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state, setSelectedTab } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Find the plant by ID
  const plant = state.colonies
    .flatMap(colony => colony.plants)
    .find(p => p.id === params.id);

  if (!plant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Plant Not Found</h2>
          <p className="text-muted-foreground mb-4">This plant doesn't exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-neon-green text-dark-charcoal rounded-lg font-semibold hover:bg-neon-green/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Find the colony this plant belongs to
  const colony = state.colonies.find(c => c.plants.some(p => p.id === plant.id));

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-header sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
            >
              ←
            </button>
            <div>
              <h1 className="text-xl font-bold font-poppins text-foreground">
                {plant.species}
              </h1>
              <p className="text-sm text-muted-foreground">
                {colony?.name} • Plant #{plant.id.split('-')[1]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plant Header */}
      <div className="px-4 py-4">
        <PlantHeader plant={plant} colony={colony} />
      </div>

      {/* Publishing Status */}
      <div className="px-4 py-2">
        <PlantPublishingStatus plant={plant} />
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="growth" className="text-xs">Growth</TabsTrigger>
            <TabsTrigger value="health" className="text-xs">Health</TabsTrigger>
            <TabsTrigger value="care" className="text-xs">Care</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <PlantEnvironmentalData plant={plant} />
              <PlantActions plant={plant} />
            </div>
          </TabsContent>
          
          <TabsContent value="growth" className="mt-4">
            <PlantGrowthTimeline plant={plant} />
          </TabsContent>
          
          <TabsContent value="health" className="mt-4">
            <PlantHealthMetrics plant={plant} />
          </TabsContent>
          
          <TabsContent value="care" className="mt-4">
            <PlantCareHistory plant={plant} />
          </TabsContent>
        </Tabs>
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

"use client"

import React, { useState } from 'react';
import { useApp } from '@/contexts/app-context';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { SubscriptionStatus } from '@/components/subscriptions/SubscriptionStatus';
import { NutrientInventory } from '@/components/subscriptions/NutrientInventory';
import { RefillHistory } from '@/components/subscriptions/RefillHistory';
import { QuickRefill } from '@/components/subscriptions/QuickRefill';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function SubscriptionsPage() {
  const { state, setSelectedTab } = useApp();
  const [activeTab, setActiveTab] = useState('status');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-header sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold font-poppins text-foreground">
            Subscriptions & Refills
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your nutrient supplies and subscription
          </p>
        </div>
      </div>

      {/* Quick Refill CTA */}
      <div className="px-4 py-4">
        <QuickRefill subscription={state.subscription} />
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="status" className="text-sm">Status</TabsTrigger>
            <TabsTrigger value="inventory" className="text-sm">Inventory</TabsTrigger>
            <TabsTrigger value="history" className="text-sm">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status" className="mt-4">
            <SubscriptionStatus subscription={state.subscription} />
          </TabsContent>
          
          <TabsContent value="inventory" className="mt-4">
            <NutrientInventory nutrientPacks={state.subscription.nutrientPacks} />
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <RefillHistory refillHistory={state.subscription.refillHistory} />
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

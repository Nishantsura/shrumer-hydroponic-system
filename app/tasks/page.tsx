"use client"

import React, { useState } from 'react';
import { useApp } from '@/contexts/app-context';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { TaskFeed } from '@/components/gamification/TaskFeed';
import { FamilyLeaderboard } from '@/components/gamification/FamilyLeaderboard';
import { AchievementGallery } from '@/components/gamification/AchievementGallery';
import { XPProgress } from '@/components/gamification/XPProgress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function TasksPage() {
  const { state, setSelectedTab } = useApp();
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-header sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold font-poppins text-foreground">
            Tasks & Gamification
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete tasks, earn XP, and climb the leaderboard!
          </p>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="px-4 py-4">
        <XPProgress user={state.currentUser} />
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="tasks" className="text-sm">Tasks</TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-sm">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements" className="text-sm">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks" className="mt-4">
            <TaskFeed tasks={state.tasks} />
          </TabsContent>
          
          <TabsContent value="leaderboard" className="mt-4">
            <FamilyLeaderboard familyMembers={state.familyMembers} />
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-4">
            <AchievementGallery user={state.currentUser} />
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

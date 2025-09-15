"use client"

import React, { useState } from 'react';
import { useApp } from '@/contexts/app-context';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { FamilyManagement } from '@/components/profile/FamilyManagement';
import { PersonalAchievements } from '@/components/profile/PersonalAchievements';
import { ColonyManagement } from '@/components/profile/ColonyManagement';
import { AppSettings } from '@/components/profile/AppSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { state, setSelectedTab } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-header sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold font-poppins text-foreground">
            Profile & Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your family, achievements, and app preferences
          </p>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-4 py-4">
        <ProfileHeader user={state.currentUser} />
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card">
            <TabsTrigger value="profile" className="text-sm">Profile</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4 space-y-4">
            <FamilyManagement familyMembers={state.familyMembers} />
            <PersonalAchievements user={state.currentUser} />
            <ColonyManagement colonies={state.colonies} />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4">
            <AppSettings />
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

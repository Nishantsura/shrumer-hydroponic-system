"use client"

import React, { useState } from 'react';
import { useApp } from '@/contexts/app-context';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { NotificationList } from '@/components/notifications/NotificationList';
import { NotificationFilters } from '@/components/notifications/NotificationFilters';
import { NotificationSettings } from '@/components/notifications/NotificationSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function NotificationsPage() {
  const { state, setSelectedTab } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical' | 'achievements'>('all');

  const filteredNotifications = state.notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'critical':
        return notification.type === 'critical';
      case 'achievements':
        return notification.type === 'achievement';
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-header sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold font-poppins text-foreground">
            Notifications
          </h1>
          <p className="text-sm text-muted-foreground">
            {state.notifications.filter(n => !n.isRead).length} unread notifications
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-4">
        <NotificationFilters 
          currentFilter={filter} 
          onFilterChange={setFilter}
          unreadCount={state.notifications.filter(n => !n.isRead).length}
        />
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card">
            <TabsTrigger value="all" className="text-sm">All Notifications</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <NotificationList 
              notifications={filteredNotifications}
              onMarkAsRead={(id) => {
                // This would be handled by the app context
                console.log('Mark as read:', id);
              }}
            />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4">
            <NotificationSettings />
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

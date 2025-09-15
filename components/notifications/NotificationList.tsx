"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Notification } from '@/lib/schema';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'achievement': return '🏆';
      default: return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-alert-orange/50 bg-alert-orange/10';
      case 'warning': return 'border-alert-orange/30 bg-alert-orange/5';
      case 'info': return 'border-neon-green/30 bg-neon-green/5';
      case 'achievement': return 'border-neon-green/50 bg-neon-green/10';
      default: return 'border-border bg-card';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔔</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Notifications</h3>
        <p className="text-muted-foreground">
          You're all caught up! Check back later for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification, index) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`farm-tile p-4 border-l-4 ${getNotificationColor(notification.type)} ${
            !notification.isRead ? 'opacity-100' : 'opacity-75'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className={`font-semibold text-foreground ${!notification.isRead ? 'font-bold' : ''}`}>
                  {notification.title}
                </h3>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {formatTimeAgo(notification.createdAt)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {notification.message}
              </p>
              
              {notification.actionRequired && notification.actionText && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onMarkAsRead(notification.id);
                      // Handle action - would navigate to relevant screen
                      console.log('Action clicked:', notification.actionUrl);
                    }}
                    className="px-3 py-1 bg-neon-green text-dark-charcoal rounded-lg text-sm font-medium hover:bg-neon-green/90 transition-colors"
                  >
                    {notification.actionText}
                  </button>
                  
                  {!notification.isRead && (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="px-3 py-1 bg-card border border-border rounded-lg text-sm text-muted-foreground hover:bg-accent transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

"use client"

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { TabType } from '@/lib/schema';

interface MobileBottomNavProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
  notificationsCount?: number;
}

const navItems = [
  {
    id: 'dashboard' as TabType,
    label: 'Home',
    icon: '🏠',
    path: '/dashboard'
  },
  {
    id: 'colonies' as TabType,
    label: 'Colonies',
    icon: '🌱',
    path: '/colonies'
  },
  {
    id: 'tasks' as TabType,
    label: 'Tasks',
    icon: '✅',
    path: '/tasks'
  },
  {
    id: 'subscriptions' as TabType,
    label: 'Refills',
    icon: '📦',
    path: '/subscriptions'
  },
  {
    id: 'profile' as TabType,
    label: 'Profile',
    icon: '👤',
    path: '/profile'
  }
];

export function MobileBottomNav({ 
  selectedTab, 
  onTabChange, 
  notificationsCount = 0 
}: MobileBottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (tab: TabType, path: string) => {
    onTabChange(tab);
    router.push(path);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-border"
    >
      <div className="flex items-center justify-around px-2 py-2 bg-background/80 backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = selectedTab === item.id || pathname.startsWith(item.path);
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleTabClick(item.id, item.path)}
              className={`
                relative flex flex-col items-center justify-center p-2 rounded-lg
                transition-all duration-200 min-w-[60px]
                ${isActive 
                  ? 'text-neon-green' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-neon-green/10 rounded-lg border border-neon-green/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              {/* Icon */}
              <div className="relative z-10 text-2xl mb-1">
                {item.icon}
                {/* Notification badge for tasks */}
                {item.id === 'tasks' && notificationsCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-alert-orange text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {notificationsCount > 9 ? '9+' : notificationsCount}
                  </motion.div>
                )}
              </div>
              
              {/* Label */}
              <span className={`
                text-xs font-medium relative z-10
                ${isActive ? 'text-neon-green' : 'text-muted-foreground'}
              `}>
                {item.label}
              </span>
              
              {/* Glow effect for active tab */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: '0 0 20px rgba(46, 230, 168, 0.3)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-background/80" />
    </motion.div>
  );
}

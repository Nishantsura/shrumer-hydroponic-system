"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface NotificationFiltersProps {
  currentFilter: 'all' | 'unread' | 'critical' | 'achievements';
  onFilterChange: (filter: 'all' | 'unread' | 'critical' | 'achievements') => void;
  unreadCount: number;
}

export function NotificationFilters({ currentFilter, onFilterChange, unreadCount }: NotificationFiltersProps) {
  const filters = [
    { id: 'all' as const, label: 'All', icon: '📋', count: null },
    { id: 'unread' as const, label: 'Unread', icon: '🔔', count: unreadCount },
    { id: 'critical' as const, label: 'Critical', icon: '⚠️', count: null },
    { id: 'achievements' as const, label: 'Achievements', icon: '🏆', count: null }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            currentFilter === filter.id
              ? 'bg-neon-green text-dark-charcoal'
              : 'bg-card border border-border text-foreground hover:bg-accent'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg">{filter.icon}</span>
          <span>{filter.label}</span>
          {filter.count !== null && filter.count > 0 && (
            <span className="px-2 py-1 bg-alert-orange text-white text-xs rounded-full min-w-[20px] text-center">
              {filter.count}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}

"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface ColonyFiltersProps {
  currentFilter: 'all' | 'active' | 'setup' | 'maintenance';
  onFilterChange: (filter: 'all' | 'active' | 'setup' | 'maintenance') => void;
}

export function ColonyFilters({ currentFilter, onFilterChange }: ColonyFiltersProps) {
  const filters = [
    { id: 'all' as const, label: 'All', icon: '🏠', count: null },
    { id: 'active' as const, label: 'Active', icon: '✅', count: null },
    { id: 'setup' as const, label: 'Setup', icon: '🔧', count: null },
    { id: 'maintenance' as const, label: 'Maintenance', icon: '⚠️', count: null }
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
        </motion.button>
      ))}
    </div>
  );
}

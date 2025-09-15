"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Plant } from '@/lib/schema';

interface PlantCareHistoryProps {
  plant: Plant;
}

export function PlantCareHistory({ plant }: PlantCareHistoryProps) {
  // Mock care history data
  const careHistory = [
    {
      id: '1',
      date: new Date('2024-01-15'),
      type: 'watering',
      description: 'Watered with nutrient solution',
      details: 'Added 500ml of pH-balanced nutrient solution',
      icon: '💧',
      color: '#2EE6A8'
    },
    {
      id: '2',
      date: new Date('2024-01-14'),
      type: 'nutrient',
      description: 'Nutrient solution changed',
      details: 'Replaced nutrient solution with fresh mix (EC: 1.8)',
      icon: '🧪',
      color: '#FFA500'
    },
    {
      id: '3',
      date: new Date('2024-01-13'),
      type: 'pruning',
      description: 'Leaf pruning completed',
      details: 'Removed 3 yellowing leaves to improve air circulation',
      icon: '✂️',
      color: '#FF6B6B'
    },
    {
      id: '4',
      date: new Date('2024-01-12'),
      type: 'measurement',
      description: 'Growth measurement taken',
      details: 'Height: 15cm (+2cm), Leaves: 8 (+1), Stem: 3mm',
      icon: '📏',
      color: '#9C88FF'
    },
    {
      id: '5',
      date: new Date('2024-01-11'),
      type: 'inspection',
      description: 'Health inspection completed',
      details: 'Overall health: 85%, No pests detected, Roots healthy',
      icon: '🔍',
      color: '#2EE6A8'
    },
    {
      id: '6',
      date: new Date('2024-01-10'),
      type: 'watering',
      description: 'Regular watering',
      details: 'Added 400ml of water to maintain optimal levels',
      icon: '💧',
      color: '#2EE6A8'
    }
  ];

  const getCareTypeIcon = (type: string) => {
    switch (type) {
      case 'watering': return '💧';
      case 'nutrient': return '🧪';
      case 'pruning': return '✂️';
      case 'measurement': return '📏';
      case 'inspection': return '🔍';
      case 'harvest': return '🌾';
      default: return '📝';
    }
  };

  const getCareTypeColor = (type: string) => {
    switch (type) {
      case 'watering': return '#2EE6A8';
      case 'nutrient': return '#FFA500';
      case 'pruning': return '#FF6B6B';
      case 'measurement': return '#9C88FF';
      case 'inspection': return '#2EE6A8';
      case 'harvest': return '#32CD32';
      default: return '#666';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Care Summary */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          📋 Care Summary
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-foreground">6</div>
            <div className="text-sm text-muted-foreground">Total Care Actions</div>
          </div>
          
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-foreground">2</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </div>
          
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground">Waterings</div>
          </div>
          
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-foreground">1</div>
            <div className="text-sm text-muted-foreground">Prunings</div>
          </div>
        </div>
      </div>

      {/* Care History Timeline */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          📅 Care History
        </h3>
        
        <div className="space-y-4">
          {careHistory.map((care, index) => (
            <motion.div
              key={care.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2"
                  style={{ 
                    backgroundColor: care.color + '20',
                    borderColor: care.color
                  }}
                >
                  {care.icon}
                </div>
                {index < careHistory.length - 1 && (
                  <div className="w-0.5 h-8 bg-border mt-2" />
                )}
              </div>
              
              {/* Care Details */}
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-foreground">{care.description}</h4>
                  <span className="text-xs text-muted-foreground">{formatDate(care.date)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{care.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Care Schedule */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          ⏰ Upcoming Care
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
            <span className="text-xl">💧</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Next Watering</p>
              <p className="text-xs text-muted-foreground">Due in 2 days</p>
            </div>
            <button className="px-3 py-1 bg-neon-green text-dark-charcoal rounded-lg text-xs font-medium">
              Mark Done
            </button>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
            <span className="text-xl">🧪</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Nutrient Check</p>
              <p className="text-xs text-muted-foreground">Due in 5 days</p>
            </div>
            <button className="px-3 py-1 bg-card border border-border rounded-lg text-xs text-muted-foreground">
              Schedule
            </button>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
            <span className="text-xl">📏</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Growth Measurement</p>
              <p className="text-xs text-muted-foreground">Due in 7 days</p>
            </div>
            <button className="px-3 py-1 bg-card border border-border rounded-lg text-xs text-muted-foreground">
              Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          ⚡ Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-neon-green text-dark-charcoal rounded-lg font-semibold hover:bg-neon-green/90 transition-colors">
            💧 Water Plant
          </button>
          <button className="p-3 bg-card border border-border rounded-lg text-foreground hover:bg-accent transition-colors">
            📏 Measure Growth
          </button>
          <button className="p-3 bg-card border border-border rounded-lg text-foreground hover:bg-accent transition-colors">
            🔍 Health Check
          </button>
          <button className="p-3 bg-card border border-border rounded-lg text-foreground hover:bg-accent transition-colors">
            📝 Add Note
          </button>
        </div>
      </div>
    </motion.div>
  );
}

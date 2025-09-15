"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FamilyMember } from '@/lib/schema';

interface XPProgressProps {
  user: FamilyMember;
}

export function XPProgress({ user }: XPProgressProps) {
  // Calculate XP needed for next level (simplified formula)
  const xpForCurrentLevel = (user.level - 1) * 200;
  const xpForNextLevel = user.level * 200;
  const xpProgress = user.totalXP - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = (xpProgress / xpNeeded) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="farm-tile p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{user.avatar}</div>
          <div>
            <h3 className="font-semibold text-foreground">{user.name}</h3>
            <p className="text-sm text-muted-foreground">Level {user.level} • {user.totalXP} XP</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-neon-green">
            {user.badges.length}
          </div>
          <div className="text-xs text-muted-foreground">Badges</div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level {user.level + 1}</span>
          <span className="text-neon-green font-medium">
            {xpProgress}/{xpNeeded} XP
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green to-neon-green/80 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tasks Completed</span>
          <span className="font-medium text-foreground">{user.tasksCompleted}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted-foreground">Plants Cared For</span>
          <span className="font-medium text-foreground">{user.plantsCaredFor}</span>
        </div>
      </div>
    </motion.div>
  );
}

"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FamilyMember } from '@/lib/schema';

interface ProfileHeaderProps {
  user: FamilyMember;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const { name, avatar, role, totalXP, level, badges, achievements } = user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="farm-tile p-6"
    >
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-card border-4 border-neon-green/20 flex items-center justify-center text-4xl">
          {avatar}
        </div>
        
        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold font-poppins text-foreground">{name}</h2>
          <p className="text-muted-foreground capitalize">{role}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-medium text-neon-green">Level {level}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm font-medium text-foreground">{totalXP} XP</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-neon-green">{badges.length}</div>
          <div className="text-xs text-muted-foreground">Badges</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-neon-green">{achievements.length}</div>
          <div className="text-xs text-muted-foreground">Achievements</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-neon-green">{user.tasksCompleted}</div>
          <div className="text-xs text-muted-foreground">Tasks Done</div>
        </div>
      </div>

      {/* Recent Badges */}
      {badges.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-2">Recent Badges</h3>
          <div className="flex gap-2">
            {badges.slice(0, 3).map((badge) => (
              <div
                key={badge.id}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-lg"
                title={badge.name}
              >
                {badge.icon}
              </div>
            ))}
            {badges.length > 3 && (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                +{badges.length - 3}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

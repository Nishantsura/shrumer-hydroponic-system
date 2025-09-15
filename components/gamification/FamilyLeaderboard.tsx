"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FamilyMember } from '@/lib/schema';

interface FamilyLeaderboardProps {
  familyMembers: FamilyMember[];
}

export function FamilyLeaderboard({ familyMembers }: FamilyLeaderboardProps) {
  // Sort family members by XP
  const sortedMembers = [...familyMembers].sort((a, b) => b.totalXP - a.totalXP);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return '#FFD700'; // Gold
      case 1: return '#C0C0C0'; // Silver
      case 2: return '#CD7F32'; // Bronze
      default: return '#6C757D';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold font-poppins text-foreground">
        Family Leaderboard
      </h2>
      
      <div className="space-y-3">
        {sortedMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`farm-tile p-4 ${
              index < 3 ? 'border-2' : ''
            }`}
            style={{
              borderColor: index < 3 ? getRankColor(index) : 'transparent'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Rank */}
                <div className="text-2xl font-bold" style={{ color: getRankColor(index) }}>
                  {getRankIcon(index)}
                </div>
                
                {/* Member Info */}
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{member.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Level {member.level} • {member.role}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="text-right">
                <div className="text-lg font-bold text-neon-green">
                  {member.totalXP}
                </div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
            </div>
            
            {/* Badges */}
            {member.badges.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Badges:</span>
                  <div className="flex gap-1">
                    {member.badges.slice(0, 3).map((badge) => (
                      <div
                        key={badge.id}
                        className="w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-xs"
                        title={badge.name}
                      >
                        {badge.icon}
                      </div>
                    ))}
                    {member.badges.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        +{member.badges.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Activity Stats */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tasks</span>
                  <span className="font-medium text-foreground">{member.tasksCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plants</span>
                  <span className="font-medium text-foreground">{member.plantsCaredFor}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Weekly Stats */}
      <div className="farm-tile p-4 mt-6">
        <h3 className="font-semibold text-foreground mb-3">This Week's Activity</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green">
              {familyMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green">
              {familyMembers.reduce((sum, member) => sum + member.totalXP, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total XP</div>
          </div>
        </div>
      </div>
    </div>
  );
}

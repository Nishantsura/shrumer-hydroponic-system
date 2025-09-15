"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FamilyMember } from '@/lib/schema';

interface PersonalAchievementsProps {
  user: FamilyMember;
}

export function PersonalAchievements({ user }: PersonalAchievementsProps) {
  const { badges, achievements } = user;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'care': return '#2EE6A8';
      case 'harvest': return '#FFD93D';
      case 'streak': return '#FF6F3C';
      case 'special': return '#9B59B6';
      default: return '#6C757D';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="farm-tile p-4"
    >
      <h3 className="font-semibold text-foreground mb-4">Your Achievements</h3>
      
      {/* Badges */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Badges ({badges.length})</h4>
        {badges.length > 0 ? (
          <div className="grid grid-cols-4 gap-2">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="aspect-square rounded-lg bg-card border border-border flex flex-col items-center justify-center p-2"
                title={badge.name}
              >
                <div className="text-lg mb-1">{badge.icon}</div>
                <div className="text-xs text-center text-foreground font-medium">
                  {badge.name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-2xl mb-2">🏆</div>
            <p className="text-sm text-muted-foreground">No badges yet</p>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Achievements ({achievements.length})</h4>
        {achievements.length > 0 ? (
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-2 bg-card rounded-lg border border-border"
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-foreground">{achievement.name}</h5>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <div 
                    className="text-xs px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: getCategoryColor(achievement.category) }}
                  >
                    +{achievement.xpReward} XP
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {achievement.earnedAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-sm text-muted-foreground">No achievements yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FamilyMember } from '@/lib/schema';

interface AchievementGalleryProps {
  user: FamilyMember;
}

export function AchievementGallery({ user }: AchievementGalleryProps) {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'care': return '🌱';
      case 'harvest': return '🌾';
      case 'streak': return '🔥';
      case 'special': return '⭐';
      default: return '🏆';
    }
  };

  return (
    <div className="space-y-6">
      {/* Badges Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold font-poppins text-foreground">
          Badges ({badges.length})
        </h2>
        
        {badges.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="farm-tile p-4 text-center"
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {badge.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {badge.description}
                </p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xs">{getCategoryIcon(badge.category)}</span>
                  <span 
                    className="text-xs px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: getCategoryColor(badge.category) }}
                  >
                    {badge.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Earned: {badge.earnedAt.toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-muted-foreground">No badges yet. Complete tasks to earn your first badge!</p>
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold font-poppins text-foreground">
          Achievements ({achievements.length})
        </h2>
        
        {achievements.length > 0 ? (
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="farm-tile p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span 
                        className="text-xs px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: getCategoryColor(achievement.category) }}
                      >
                        {achievement.category}
                      </span>
                      <span className="text-xs text-neon-green font-medium">
                        +{achievement.xpReward} XP
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {achievement.earnedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-muted-foreground">No achievements yet. Keep farming to unlock achievements!</p>
          </div>
        )}
      </div>

      {/* Achievement Progress */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-3">Achievement Progress</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Water Hero</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div className="w-16 bg-neon-green h-2 rounded-full"></div>
              </div>
              <span className="text-xs text-muted-foreground">50/50</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Harvest Master</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div className="w-12 bg-neon-green h-2 rounded-full"></div>
              </div>
              <span className="text-xs text-muted-foreground">25/50</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Plant's Favorite</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div className="w-8 bg-neon-green h-2 rounded-full"></div>
              </div>
              <span className="text-xs text-muted-foreground">8/20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

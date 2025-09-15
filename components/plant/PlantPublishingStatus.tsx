"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plant } from '@/lib/schema';

interface PlantPublishingStatusProps {
  plant: Plant;
}

export function PlantPublishingStatus({ plant }: PlantPublishingStatusProps) {
  const [isPublished, setIsPublished] = useState(plant.isPublished || false);
  const [publishSettings, setPublishSettings] = useState({
    showLocation: true,
    showGrowthData: true,
    showHealthMetrics: true,
    allowComments: true,
    shareToCommunity: false
  });

  const handlePublishToggle = () => {
    setIsPublished(!isPublished);
    // In a real app, this would update the plant's publishing status
    console.log('Publishing status changed:', !isPublished);
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setPublishSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="farm-tile p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            📱 Publishing Status
          </h3>
          <p className="text-sm text-muted-foreground">
            Share your plant's journey with the community
          </p>
        </div>
        
        <button
          onClick={handlePublishToggle}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isPublished
              ? 'bg-neon-green text-dark-charcoal'
              : 'bg-card border border-border text-foreground hover:bg-accent'
          }`}
        >
          {isPublished ? 'Published' : 'Unpublished'}
        </button>
      </div>

      {isPublished && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          {/* Publishing Stats */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-card rounded-lg border border-border">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">1.2K</div>
              <div className="text-xs text-muted-foreground">Views</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">47</div>
              <div className="text-xs text-muted-foreground">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">12</div>
              <div className="text-xs text-muted-foreground">Comments</div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Privacy Settings</h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span className="text-sm text-foreground">Show Location</span>
                </div>
                <button
                  onClick={() => handleSettingChange('showLocation', !publishSettings.showLocation)}
                  className={`w-10 h-5 rounded-full transition-colors ${
                    publishSettings.showLocation ? 'bg-neon-green' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      publishSettings.showLocation ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span className="text-sm text-foreground">Show Growth Data</span>
                </div>
                <button
                  onClick={() => handleSettingChange('showGrowthData', !publishSettings.showGrowthData)}
                  className={`w-10 h-5 rounded-full transition-colors ${
                    publishSettings.showGrowthData ? 'bg-neon-green' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      publishSettings.showGrowthData ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>💚</span>
                  <span className="text-sm text-foreground">Show Health Metrics</span>
                </div>
                <button
                  onClick={() => handleSettingChange('showHealthMetrics', !publishSettings.showHealthMetrics)}
                  className={`w-10 h-5 rounded-full transition-colors ${
                    publishSettings.showHealthMetrics ? 'bg-neon-green' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      publishSettings.showHealthMetrics ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>💬</span>
                  <span className="text-sm text-foreground">Allow Comments</span>
                </div>
                <button
                  onClick={() => handleSettingChange('allowComments', !publishSettings.allowComments)}
                  className={`w-10 h-5 rounded-full transition-colors ${
                    publishSettings.allowComments ? 'bg-neon-green' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      publishSettings.allowComments ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="flex gap-2">
            <button className="flex-1 py-2 px-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
              📘 Share to Facebook
            </button>
            <button className="flex-1 py-2 px-3 bg-blue-400 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors">
              🐦 Share to Twitter
            </button>
            <button className="flex-1 py-2 px-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
              📱 Copy Link
            </button>
          </div>
        </motion.div>
      )}

      {!isPublished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <div className="text-4xl mb-2">🔒</div>
          <p className="text-sm text-muted-foreground">
            This plant is private. Toggle to publish and share with the community.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

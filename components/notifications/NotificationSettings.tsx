"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    criticalAlerts: true,
    harvestReminders: true,
    taskReminders: true,
    achievementNotifications: true,
    weeklyReports: false,
    marketingEmails: false
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const notificationCategories = [
    {
      title: 'Critical Alerts',
      description: 'Immediate notifications for urgent issues',
      settings: [
        { key: 'criticalAlerts', label: 'Critical System Alerts', icon: '🚨' }
      ]
    },
    {
      title: 'Plant Care',
      description: 'Reminders for plant maintenance',
      settings: [
        { key: 'harvestReminders', label: 'Harvest Ready Notifications', icon: '🌾' },
        { key: 'taskReminders', label: 'Task Reminders', icon: '✅' }
      ]
    },
    {
      title: 'Achievements',
      description: 'Celebrate your farming milestones',
      settings: [
        { key: 'achievementNotifications', label: 'Achievement Unlocked', icon: '🏆' }
      ]
    },
    {
      title: 'Reports & Updates',
      description: 'Regular updates and insights',
      settings: [
        { key: 'weeklyReports', label: 'Weekly Farm Reports', icon: '📊' },
        { key: 'marketingEmails', label: 'Product Updates & Tips', icon: '📧' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Global Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="farm-tile p-4"
      >
        <h3 className="font-semibold text-foreground mb-4">Global Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Push Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
            </div>
            <button
              onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.pushNotifications ? 'bg-neon-green' : 'bg-muted'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <button
              onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-neon-green' : 'bg-muted'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Category Settings */}
      {notificationCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="farm-tile p-4"
        >
          <h3 className="font-semibold text-foreground mb-2">{category.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
          
          <div className="space-y-3">
            {category.settings.map((setting) => (
              <div key={setting.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{setting.icon}</span>
                  <span className="text-sm text-foreground">{setting.label}</span>
                </div>
                <button
                  onClick={() => handleSettingChange(setting.key, !settings[setting.key as keyof typeof settings])}
                  className={`w-10 h-5 rounded-full transition-colors ${
                    settings[setting.key as keyof typeof settings] ? 'bg-neon-green' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      settings[setting.key as keyof typeof settings] ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Test Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="farm-tile p-4"
      >
        <h3 className="font-semibold text-foreground mb-4">Test Notifications</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Send a test notification to verify your settings
        </p>
        <button className="w-full py-3 bg-neon-green text-dark-charcoal rounded-lg font-semibold hover:bg-neon-green/90 transition-colors">
          Send Test Notification
        </button>
      </motion.div>
    </div>
  );
}

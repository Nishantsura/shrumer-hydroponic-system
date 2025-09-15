"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function AppSettings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);

  const handleExportData = () => {
    console.log('Export data');
    // This would trigger data export
  };

  const handleImportData = () => {
    console.log('Import data');
    // This would trigger data import
  };

  const handleResetApp = () => {
    console.log('Reset app');
    // This would trigger app reset
  };

  return (
    <div className="space-y-4">
      {/* App Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="farm-tile p-4"
      >
        <h3 className="font-semibold text-foreground mb-4">App Preferences</h3>
        
        <div className="space-y-4">
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Push Notifications</h4>
              <p className="text-sm text-muted-foreground">Get alerts for tasks and plant health</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-neon-green' : 'bg-muted'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Dark Mode</h4>
              <p className="text-sm text-muted-foreground">Use dark theme for better viewing</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-neon-green' : 'bg-muted'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Auto Sync */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Auto Sync</h4>
              <p className="text-sm text-muted-foreground">Automatically sync data across devices</p>
            </div>
            <button
              onClick={() => setAutoSync(!autoSync)}
              className={`w-12 h-6 rounded-full transition-colors ${
                autoSync ? 'bg-neon-green' : 'bg-muted'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoSync ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Sound Effects</h4>
              <p className="text-sm text-muted-foreground">Play sounds for actions and notifications</p>
            </div>
            <button
              onClick={() => setSoundEffects(!soundEffects)}
              className={`w-12 h-6 rounded-full transition-colors ${
                soundEffects ? 'bg-neon-green' : 'bg-muted'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  soundEffects ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="farm-tile p-4"
      >
        <h3 className="font-semibold text-foreground mb-4">Data Management</h3>
        
        <div className="space-y-3">
          <button
            onClick={handleExportData}
            className="w-full p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">📤</div>
              <div>
                <h4 className="font-medium text-foreground">Export Data</h4>
                <p className="text-sm text-muted-foreground">Download your farm data</p>
              </div>
            </div>
          </button>

          <button
            onClick={handleImportData}
            className="w-full p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">📥</div>
              <div>
                <h4 className="font-medium text-foreground">Import Data</h4>
                <p className="text-sm text-muted-foreground">Restore from backup</p>
              </div>
            </div>
          </button>
        </div>
      </motion.div>

      {/* App Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="farm-tile p-4"
      >
        <h3 className="font-semibold text-foreground mb-4">App Information</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version</span>
            <span className="text-foreground">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Build</span>
            <span className="text-foreground">2024.01.15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Platform</span>
            <span className="text-foreground">Mobile Web</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={handleResetApp}
            className="w-full p-3 bg-alert-orange/10 border border-alert-orange/20 rounded-lg hover:bg-alert-orange/20 transition-colors text-alert-orange font-medium"
          >
            Reset App Data
          </button>
        </div>
      </motion.div>
    </div>
  );
}

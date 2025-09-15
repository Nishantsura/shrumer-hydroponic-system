"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export function WelcomeScreen({ onNext, onSkip }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-8xl mb-6"
        >
          🌱
        </motion.div>
        
        <h1 className="text-4xl font-bold font-poppins text-foreground mb-4">
          Welcome to Shrumer!
        </h1>
        
        <p className="text-xl text-muted-foreground mb-2">
          Your farm at home starts here
        </p>
        
        <p className="text-muted-foreground">
          Grow fresh vegetables with your family using smart hydroponic systems
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-sm space-y-4 mb-12"
      >
        <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
          <div className="text-2xl">📱</div>
          <div>
            <h3 className="font-medium text-foreground">Smart Monitoring</h3>
            <p className="text-sm text-muted-foreground">Track your plants 24/7</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
          <div className="text-2xl">👨‍👩‍👧‍👦</div>
          <div>
            <h3 className="font-medium text-foreground">Family Fun</h3>
            <p className="text-sm text-muted-foreground">Gamified growing experience</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
          <div className="text-2xl">🌿</div>
          <div>
            <h3 className="font-medium text-foreground">Fresh Harvest</h3>
            <p className="text-sm text-muted-foreground">Grow your own vegetables</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full max-w-sm space-y-3"
      >
        <motion.button
          onClick={onNext}
          className="w-full py-4 bg-neon-green text-dark-charcoal rounded-lg font-semibold text-lg hover:bg-neon-green/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
        
        <button
          onClick={onSkip}
          className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip Setup
        </button>
      </motion.div>
    </div>
  );
}

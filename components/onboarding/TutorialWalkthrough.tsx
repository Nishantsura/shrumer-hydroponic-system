"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TutorialWalkthroughProps {
  onComplete: () => void;
  onBack: () => void;
}

export function TutorialWalkthrough({ onComplete, onBack }: TutorialWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Monitor Your Plants",
      description: "Check sensor data and plant health scores daily",
      icon: "📊",
      tip: "Green health scores mean your plants are thriving!"
    },
    {
      title: "Complete Tasks",
      description: "Water plants, add nutrients, and harvest when ready",
      icon: "✅",
      tip: "Earn XP for every task you complete!"
    },
    {
      title: "Track Progress",
      description: "Watch your plants grow from seedling to harvest",
      icon: "🌱",
      tip: "Take photos to see your plants' growth journey"
    },
    {
      title: "Family Fun",
      description: "Compete with family members on the leaderboard",
      icon: "🏆",
      tip: "The whole family can join the farming adventure!"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col items-center justify-center text-center"
      >
        <div className="text-8xl mb-6">{currentStepData.icon}</div>
        <h1 className="text-3xl font-bold font-poppins text-foreground mb-4">
          {currentStepData.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-sm">
          {currentStepData.description}
        </p>
        <div className="farm-tile p-4 max-w-sm">
          <p className="text-sm text-foreground">
            💡 {currentStepData.tip}
          </p>
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentStep ? 'bg-neon-green' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 bg-card border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
        >
          {currentStep === 0 ? 'Back' : 'Previous'}
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3 bg-neon-green text-dark-charcoal rounded-lg font-semibold hover:bg-neon-green/90 transition-colors"
        >
          {currentStep === steps.length - 1 ? 'Start Farming!' : 'Next'}
        </button>
      </div>
    </div>
  );
}

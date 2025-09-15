"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PlantSelectionProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PlantSelection({ data, onUpdate, onNext, onBack }: PlantSelectionProps) {
  const [selectedPlants, setSelectedPlants] = useState<string[]>(data.selectedPlants || []);

  const plants = [
    { id: 'lettuce', name: 'Lettuce', icon: '🥬', days: 30, difficulty: 'Easy' },
    { id: 'tomato', name: 'Tomato', icon: '🍅', days: 70, difficulty: 'Medium' },
    { id: 'basil', name: 'Basil', icon: '🌿', days: 25, difficulty: 'Easy' },
    { id: 'spinach', name: 'Spinach', icon: '🥬', days: 28, difficulty: 'Easy' },
    { id: 'cucumber', name: 'Cucumber', icon: '🥒', days: 60, difficulty: 'Medium' },
    { id: 'pepper', name: 'Pepper', icon: '🌶️', days: 80, difficulty: 'Hard' }
  ];

  const togglePlant = (plantId: string) => {
    setSelectedPlants(prev => 
      prev.includes(plantId) 
        ? prev.filter(id => id !== plantId)
        : [...prev, plantId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ selectedPlants });
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">🌱</div>
        <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
          Choose Your Plants
        </h1>
        <p className="text-muted-foreground">
          Select the vegetables you'd like to grow
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          {plants.map((plant) => (
            <motion.button
              key={plant.id}
              onClick={() => togglePlant(plant.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPlants.includes(plant.id)
                  ? 'border-neon-green bg-neon-green/10'
                  : 'border-border bg-card hover:bg-accent'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-3xl mb-2">{plant.icon}</div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{plant.name}</h3>
              <p className="text-xs text-muted-foreground">{plant.days} days</p>
              <p className="text-xs text-muted-foreground">{plant.difficulty}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-3 mt-8"
      >
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-card border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedPlants.length === 0}
          className="flex-1 py-3 bg-neon-green text-dark-charcoal rounded-lg font-semibold hover:bg-neon-green/90 transition-colors disabled:opacity-50"
        >
          Continue ({selectedPlants.length} selected)
        </button>
      </motion.div>
    </div>
  );
}

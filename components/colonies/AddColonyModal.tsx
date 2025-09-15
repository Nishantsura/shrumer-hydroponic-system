"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AddColonyModalProps {
  onClose: () => void;
  onAdd: (colonyData: any) => void;
}

export function AddColonyModal({ onClose, onAdd }: AddColonyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: 12,
    mascot: '🌱'
  });

  const mascotOptions = ['🌱', '🏠', '🌿', '🌾', '🍅', '🥬', '🌶️', '🥒'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="farm-tile p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-poppins text-foreground">
              Add New Colony
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Colony Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter colony name"
                className="w-full p-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-green"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Kitchen, Balcony, Garage"
                className="w-full p-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-green"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Plant Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
                min="1"
                max="50"
                className="w-full p-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-neon-green"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Choose Mascot
              </label>
              <div className="grid grid-cols-4 gap-2">
                {mascotOptions.map((mascot) => (
                  <button
                    key={mascot}
                    type="button"
                    onClick={() => handleInputChange('mascot', mascot)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      formData.mascot === mascot
                        ? 'border-neon-green bg-neon-green/10'
                        : 'border-border bg-card hover:bg-accent'
                    }`}
                  >
                    <span className="text-2xl">{mascot}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-card border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-neon-green text-dark-charcoal rounded-lg font-semibold hover:bg-neon-green/90 transition-colors"
              >
                Create Colony
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

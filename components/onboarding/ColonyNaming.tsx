"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ColonyNamingProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ColonyNaming({ data, onUpdate, onNext, onBack }: ColonyNamingProps) {
  const [colonyName, setColonyName] = useState(data.colonyName || '');
  
  const suggestions = ['Kitchen Garden', 'Balcony Farm', 'Sunny Spot', 'Green Corner', 'Fresh Start'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ colonyName });
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">🏠</div>
        <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
          Name Your Colony
        </h1>
        <p className="text-muted-foreground">
          Give your growing space a personal touch
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="flex-1 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Colony Name
          </label>
          <input
            type="text"
            value={colonyName}
            onChange={(e) => setColonyName(e.target.value)}
            placeholder="Enter colony name"
            className="w-full p-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-green"
            required
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Suggestions</h3>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setColonyName(suggestion)}
                className="p-3 bg-card border border-border rounded-lg text-sm hover:bg-accent transition-colors text-left"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </motion.form>

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
          className="flex-1 py-3 bg-neon-green text-dark-charcoal rounded-lg font-semibold hover:bg-neon-green/90 transition-colors"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}

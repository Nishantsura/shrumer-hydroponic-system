"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AccountSetupProps {
  data: {
    name: string;
    email: string;
    colonyName: string;
    selectedPlants: string[];
    hardwareConnected: boolean;
  };
  onUpdate: (data: Partial<AccountSetupProps['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AccountSetup({ data, onUpdate, onNext, onBack }: AccountSetupProps) {
  const [formData, setFormData] = useState({
    name: data.name,
    email: data.email
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onNext();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">👤</div>
        <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
          Let's Get to Know You
        </h1>
        <p className="text-muted-foreground">
          Create your profile to personalize your farming experience
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="flex-1 space-y-6"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your name"
              className="w-full p-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-green"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-green"
              required
            />
          </div>
        </div>

        {/* Family Section */}
        <div className="farm-tile p-4">
          <h3 className="font-semibold text-foreground mb-3">Family Setup (Optional)</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Invite family members to join your farming adventure
          </p>
          <button
            type="button"
            className="w-full p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">👨‍👩‍👧‍👦</div>
              <div>
                <h4 className="font-medium text-foreground">Invite Family</h4>
                <p className="text-sm text-muted-foreground">Add family members later</p>
              </div>
            </div>
          </button>
        </div>
      </motion.form>

      {/* Navigation */}
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

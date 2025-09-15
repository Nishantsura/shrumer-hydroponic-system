"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plant } from '@/lib/schema';

interface PlantActionsProps {
  plant: Plant;
}

export function PlantActions({ plant }: PlantActionsProps) {
  const [showActionModal, setShowActionModal] = useState<string | null>(null);

  const quickActions = [
    {
      id: 'water',
      label: 'Water Plant',
      icon: '💧',
      color: '#2EE6A8',
      description: 'Add water or nutrient solution'
    },
    {
      id: 'measure',
      label: 'Measure Growth',
      icon: '📏',
      color: '#9C88FF',
      description: 'Record height and leaf count'
    },
    {
      id: 'prune',
      label: 'Prune Leaves',
      icon: '✂️',
      color: '#FF6B6B',
      description: 'Remove dead or yellowing leaves'
    },
    {
      id: 'inspect',
      label: 'Health Check',
      icon: '🔍',
      color: '#FFA500',
      description: 'Inspect for pests or issues'
    },
    {
      id: 'harvest',
      label: 'Harvest',
      icon: '🌾',
      color: '#32CD32',
      description: 'Harvest ready produce'
    },
    {
      id: 'note',
      label: 'Add Note',
      icon: '📝',
      color: '#666',
      description: 'Record observations or notes'
    }
  ];

  const handleActionClick = (actionId: string) => {
    setShowActionModal(actionId);
  };

  const handleActionComplete = (actionId: string, data: any) => {
    console.log('Action completed:', actionId, data);
    setShowActionModal(null);
    // In a real app, this would update the plant's care history
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Quick Actions Grid */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          ⚡ Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleActionClick(action.id)}
              className="p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{action.icon}</span>
                <div>
                  <h4 className="font-semibold text-foreground">{action.label}</h4>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Plant Status Actions */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          📊 Status Actions
        </h3>
        
        <div className="space-y-3">
          {plant.healthScore < 80 && (
            <div className="flex items-center gap-3 p-3 bg-alert-orange/10 border border-alert-orange/30 rounded-lg">
              <span className="text-xl">⚠️</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Health Below Optimal</p>
                <p className="text-xs text-muted-foreground">
                  Consider adjusting care routine or environmental conditions
                </p>
              </div>
              <button className="px-3 py-1 bg-alert-orange text-white rounded-lg text-xs font-medium">
                Fix Issues
              </button>
            </div>
          )}
          
          {plant.daysToHarvest <= 3 && (
            <div className="flex items-center gap-3 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
              <span className="text-xl">🌾</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Ready for Harvest</p>
                <p className="text-xs text-muted-foreground">
                  Your plant is ready to harvest! Check for optimal ripeness.
                </p>
              </div>
              <button className="px-3 py-1 bg-neon-green text-dark-charcoal rounded-lg text-xs font-medium">
                Harvest Now
              </button>
            </div>
          )}
          
          {plant.growthStage === 'vegetative' && (
            <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <span className="text-xl">🌿</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Vegetative Growth Phase</p>
                <p className="text-xs text-muted-foreground">
                  Focus on leaf development and stem strengthening
                </p>
              </div>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-medium">
                Optimize Growth
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action Modals */}
      {showActionModal && (
        <ActionModal
          actionId={showActionModal}
          plant={plant}
          onClose={() => setShowActionModal(null)}
          onComplete={handleActionComplete}
        />
      )}
    </motion.div>
  );
}

// Action Modal Component
function ActionModal({ actionId, plant, onClose, onComplete }: {
  actionId: string;
  plant: Plant;
  onClose: () => void;
  onComplete: (actionId: string, data: any) => void;
}) {
  const [formData, setFormData] = useState<any>({});

  const getActionConfig = (id: string) => {
    switch (id) {
      case 'water':
        return {
          title: 'Water Plant',
          icon: '💧',
          fields: [
            { name: 'amount', label: 'Amount (ml)', type: 'number', placeholder: '500' },
            { name: 'type', label: 'Type', type: 'select', options: ['Water', 'Nutrient Solution', 'pH Balanced'] }
          ]
        };
      case 'measure':
        return {
          title: 'Measure Growth',
          icon: '📏',
          fields: [
            { name: 'height', label: 'Height (cm)', type: 'number', placeholder: plant.height.toString() },
            { name: 'leaves', label: 'Leaf Count', type: 'number', placeholder: plant.leafCount.toString() },
            { name: 'stem', label: 'Stem Thickness (mm)', type: 'number', placeholder: plant.stemThickness.toString() }
          ]
        };
      case 'prune':
        return {
          title: 'Prune Leaves',
          icon: '✂️',
          fields: [
            { name: 'count', label: 'Leaves Removed', type: 'number', placeholder: '1' },
            { name: 'reason', label: 'Reason', type: 'select', options: ['Yellowing', 'Dead', 'Diseased', 'Overcrowding'] }
          ]
        };
      case 'inspect':
        return {
          title: 'Health Check',
          icon: '🔍',
          fields: [
            { name: 'overall', label: 'Overall Health (%)', type: 'number', placeholder: plant.healthScore.toString() },
            { name: 'issues', label: 'Issues Found', type: 'text', placeholder: 'None' },
            { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Additional observations...' }
          ]
        };
      case 'harvest':
        return {
          title: 'Harvest Plant',
          icon: '🌾',
          fields: [
            { name: 'amount', label: 'Amount Harvested', type: 'text', placeholder: 'e.g., 2 tomatoes' },
            { name: 'quality', label: 'Quality Rating', type: 'select', options: ['Excellent', 'Good', 'Fair', 'Poor'] }
          ]
        };
      case 'note':
        return {
          title: 'Add Note',
          icon: '📝',
          fields: [
            { name: 'title', label: 'Title', type: 'text', placeholder: 'Note title' },
            { name: 'content', label: 'Content', type: 'textarea', placeholder: 'Your observations...' }
          ]
        };
      default:
        return { title: 'Action', icon: '📝', fields: [] };
    }
  };

  const config = getActionConfig(actionId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(actionId, formData);
  };

  return (
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
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{config.icon}</span>
          <h2 className="text-xl font-bold font-poppins text-foreground">
            {config.title}
          </h2>
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-foreground mb-2">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, [field.name]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full p-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-green"
                  rows={3}
                />
              ) : field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, [field.name]: e.target.value }))}
                  className="w-full p-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-neon-green"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, [field.name]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full p-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-green"
                />
              )}
            </div>
          ))}

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
              Complete Action
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

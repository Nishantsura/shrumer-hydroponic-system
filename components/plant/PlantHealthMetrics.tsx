"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Plant } from '@/lib/schema';

interface PlantHealthMetricsProps {
  plant: Plant;
}

export function PlantHealthMetrics({ plant }: PlantHealthMetricsProps) {
  const healthMetrics = [
    {
      label: 'Overall Health',
      value: plant.healthScore,
      icon: '💚',
      color: plant.healthScore >= 80 ? '#2EE6A8' : plant.healthScore >= 60 ? '#FFA500' : '#FF6B6B',
      trend: '+5%',
      description: 'Based on all health factors'
    },
    {
      label: 'Leaf Health',
      value: plant.leafHealth,
      icon: '🍃',
      color: plant.leafHealth >= 80 ? '#2EE6A8' : plant.leafHealth >= 60 ? '#FFA500' : '#FF6B6B',
      trend: '+3%',
      description: 'Color, texture, and vitality'
    },
    {
      label: 'Root Health',
      value: plant.rootHealth,
      icon: '🌿',
      color: plant.rootHealth >= 80 ? '#2EE6A8' : plant.rootHealth >= 60 ? '#FFA500' : '#FF6B6B',
      trend: '+2%',
      description: 'Root development and color'
    },
    {
      label: 'Nutrient Uptake',
      value: plant.nutrientUptake,
      icon: '🧪',
      color: plant.nutrientUptake >= 80 ? '#2EE6A8' : plant.nutrientUptake >= 60 ? '#FFA500' : '#FF6B6B',
      trend: '+1%',
      description: 'Efficiency of nutrient absorption'
    }
  ];

  const getHealthStatus = (score: number) => {
    if (score >= 90) return { status: 'Excellent', color: '#2EE6A8', icon: '🌟' };
    if (score >= 80) return { status: 'Good', color: '#2EE6A8', icon: '✅' };
    if (score >= 70) return { status: 'Fair', color: '#FFA500', icon: '⚠️' };
    if (score >= 60) return { status: 'Poor', color: '#FF6B6B', icon: '❌' };
    return { status: 'Critical', color: '#FF0000', icon: '🚨' };
  };

  const overallStatus = getHealthStatus(plant.healthScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Overall Health Status */}
      <div className="farm-tile p-4">
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{ 
              backgroundColor: overallStatus.color + '20',
              border: `3px solid ${overallStatus.color}`
            }}
          >
            {overallStatus.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Health Status</h3>
            <p 
              className="text-lg font-semibold"
              style={{ color: overallStatus.color }}
            >
              {overallStatus.status}
            </p>
            <p className="text-sm text-muted-foreground">
              {plant.healthScore}% overall health score
            </p>
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 gap-4">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="farm-tile p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{metric.icon}</span>
                <div>
                  <h4 className="font-semibold text-foreground">{metric.label}</h4>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: metric.color }}
                >
                  {metric.value}%
                </div>
                <div className="text-sm text-green-500">{metric.trend}</div>
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${metric.value}%`,
                  backgroundColor: metric.color
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Health Alerts */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          🚨 Health Alerts
        </h3>
        
        <div className="space-y-3">
          {plant.healthScore < 80 && (
            <div className="flex items-center gap-3 p-3 bg-alert-orange/10 border border-alert-orange/30 rounded-lg">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="text-sm font-medium text-foreground">Health Below Optimal</p>
                <p className="text-xs text-muted-foreground">
                  Consider adjusting nutrients or environmental conditions
                </p>
              </div>
            </div>
          )}
          
          {plant.leafHealth < 70 && (
            <div className="flex items-center gap-3 p-3 bg-alert-orange/10 border border-alert-orange/30 rounded-lg">
              <span className="text-xl">🍃</span>
              <div>
                <p className="text-sm font-medium text-foreground">Leaf Health Concern</p>
                <p className="text-xs text-muted-foreground">
                  Check for nutrient deficiencies or pest issues
                </p>
              </div>
            </div>
          )}
          
          {plant.rootHealth < 70 && (
            <div className="flex items-center gap-3 p-3 bg-alert-orange/10 border border-alert-orange/30 rounded-lg">
              <span className="text-xl">🌿</span>
              <div>
                <p className="text-sm font-medium text-foreground">Root Health Issue</p>
                <p className="text-xs text-muted-foreground">
                  Check water levels and root zone conditions
                </p>
              </div>
            </div>
          )}
          
          {plant.healthScore >= 80 && (
            <div className="flex items-center gap-3 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
              <span className="text-xl">✅</span>
              <div>
                <p className="text-sm font-medium text-foreground">All Systems Healthy</p>
                <p className="text-xs text-muted-foreground">
                  Your plant is thriving! Keep up the great work.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Health Recommendations */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          💡 Health Recommendations
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
            <span className="text-lg">💧</span>
            <div>
              <p className="text-sm font-medium text-foreground">Water Management</p>
              <p className="text-xs text-muted-foreground">
                Maintain consistent water levels. Current: 85% - Optimal range: 80-90%
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
            <span className="text-lg">🧪</span>
            <div>
              <p className="text-sm font-medium text-foreground">Nutrient Balance</p>
              <p className="text-xs text-muted-foreground">
                pH: 6.2 (Good) • EC: 1.8 (Optimal) • Consider adding micronutrients
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
            <span className="text-lg">🌡️</span>
            <div>
              <p className="text-sm font-medium text-foreground">Environmental Control</p>
              <p className="text-xs text-muted-foreground">
                Temperature: 24°C (Good) • Humidity: 65% (Optimal) • Light: 12h/day
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

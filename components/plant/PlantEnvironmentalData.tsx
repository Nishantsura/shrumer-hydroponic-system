"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Plant } from '@/lib/schema';

interface PlantEnvironmentalDataProps {
  plant: Plant;
}

export function PlantEnvironmentalData({ plant }: PlantEnvironmentalDataProps) {
  const environmentalData = [
    {
      label: 'Temperature',
      value: '24°C',
      icon: '🌡️',
      status: 'optimal',
      range: '20-26°C',
      color: '#2EE6A8'
    },
    {
      label: 'Humidity',
      value: '65%',
      icon: '💧',
      status: 'optimal',
      range: '60-70%',
      color: '#2EE6A8'
    },
    {
      label: 'Light Intensity',
      value: '850 lux',
      icon: '☀️',
      status: 'good',
      range: '800-1000 lux',
      color: '#FFA500'
    },
    {
      label: 'Air Flow',
      value: 'Good',
      icon: '💨',
      status: 'optimal',
      range: 'Moderate',
      color: '#2EE6A8'
    },
    {
      label: 'CO2 Level',
      value: '420 ppm',
      icon: '🌬️',
      status: 'optimal',
      range: '400-500 ppm',
      color: '#2EE6A8'
    },
    {
      label: 'Water Temp',
      value: '22°C',
      icon: '🌊',
      status: 'optimal',
      range: '20-24°C',
      color: '#2EE6A8'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#2EE6A8';
      case 'good': return '#FFA500';
      case 'warning': return '#FF6B6B';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return '✅';
      case 'good': return '⚠️';
      case 'warning': return '❌';
      default: return '❓';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Environmental Overview */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          🌍 Environmental Conditions
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {environmentalData.map((data, index) => (
            <motion.div
              key={data.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-card border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{data.icon}</span>
                  <span className="text-sm font-medium text-foreground">{data.label}</span>
                </div>
                <span className="text-lg">{getStatusIcon(data.status)}</span>
              </div>
              
              <div className="text-lg font-bold text-foreground mb-1">{data.value}</div>
              <div className="text-xs text-muted-foreground">Range: {data.range}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Environmental Trends */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          📈 Environmental Trends (24h)
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground">Temperature</span>
              <span className="text-muted-foreground">24°C avg</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-neon-green h-2 rounded-full" style={{ width: '85%' }} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Stable within optimal range</div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground">Humidity</span>
              <span className="text-muted-foreground">65% avg</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-neon-green h-2 rounded-full" style={{ width: '90%' }} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Consistent humidity levels</div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground">Light Intensity</span>
              <span className="text-muted-foreground">850 lux avg</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-alert-orange h-2 rounded-full" style={{ width: '75%' }} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Slightly below optimal</div>
          </div>
        </div>
      </div>

      {/* Environmental Alerts */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          🚨 Environmental Alerts
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-alert-orange/10 border border-alert-orange/30 rounded-lg">
            <span className="text-xl">☀️</span>
            <div>
              <p className="text-sm font-medium text-foreground">Light Intensity Low</p>
              <p className="text-xs text-muted-foreground">
                Consider increasing light exposure for optimal growth
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
            <span className="text-xl">✅</span>
            <div>
              <p className="text-sm font-medium text-foreground">All Other Conditions Optimal</p>
              <p className="text-xs text-muted-foreground">
                Temperature, humidity, and air flow are within ideal ranges
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Recommendations */}
      <div className="farm-tile p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          💡 Environmental Recommendations
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
            <span className="text-lg">☀️</span>
            <div>
              <p className="text-sm font-medium text-foreground">Increase Light Exposure</p>
              <p className="text-xs text-muted-foreground">
                Current: 850 lux • Recommended: 900-1000 lux • 
                Consider adjusting grow light intensity or duration
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
            <span className="text-lg">🌡️</span>
            <div>
              <p className="text-sm font-medium text-foreground">Maintain Temperature</p>
              <p className="text-xs text-muted-foreground">
                Current: 24°C • Optimal range: 20-26°C • 
                Temperature is perfect, continue current settings
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
            <span className="text-lg">💧</span>
            <div>
              <p className="text-sm font-medium text-foreground">Humidity Control</p>
              <p className="text-xs text-muted-foreground">
                Current: 65% • Optimal range: 60-70% • 
                Humidity is ideal for current growth stage
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

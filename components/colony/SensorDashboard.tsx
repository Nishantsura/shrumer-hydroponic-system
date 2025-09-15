"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface SensorDashboardProps {
  sensors: {
    waterLevel: number;
    ph: number;
    ec: number;
    waterTemp: number;
    airTemp: number;
    humidity: number;
    lightIntensity: number;
  };
}

export function SensorDashboard({ sensors }: SensorDashboardProps) {
  const sensorData = [
    {
      id: 'water',
      label: 'Water Level',
      value: `${sensors.waterLevel}%`,
      icon: '💧',
      status: sensors.waterLevel > 80 ? 'good' : sensors.waterLevel > 50 ? 'warning' : 'critical',
      color: sensors.waterLevel > 80 ? '#2EE6A8' : sensors.waterLevel > 50 ? '#FFD93D' : '#FF6F3C'
    },
    {
      id: 'ph',
      label: 'pH Level',
      value: sensors.ph.toString(),
      icon: '🧪',
      status: sensors.ph >= 5.5 && sensors.ph <= 6.5 ? 'good' : 'warning',
      color: sensors.ph >= 5.5 && sensors.ph <= 6.5 ? '#2EE6A8' : '#FFD93D'
    },
    {
      id: 'ec',
      label: 'EC/TDS',
      value: sensors.ec.toString(),
      icon: '⚡',
      status: sensors.ec >= 1200 && sensors.ec <= 2000 ? 'good' : 'warning',
      color: sensors.ec >= 1200 && sensors.ec <= 2000 ? '#2EE6A8' : '#FFD93D'
    },
    {
      id: 'waterTemp',
      label: 'Water Temp',
      value: `${sensors.waterTemp}°C`,
      icon: '🌡️',
      status: sensors.waterTemp >= 20 && sensors.waterTemp <= 25 ? 'good' : 'warning',
      color: sensors.waterTemp >= 20 && sensors.waterTemp <= 25 ? '#2EE6A8' : '#FFD93D'
    },
    {
      id: 'airTemp',
      label: 'Air Temp',
      value: `${sensors.airTemp}°C`,
      icon: '🌡️',
      status: sensors.airTemp >= 20 && sensors.airTemp <= 25 ? 'good' : 'warning',
      color: sensors.airTemp >= 20 && sensors.airTemp <= 25 ? '#2EE6A8' : '#FFD93D'
    },
    {
      id: 'humidity',
      label: 'Humidity',
      value: `${sensors.humidity}%`,
      icon: '💨',
      status: sensors.humidity >= 60 && sensors.humidity <= 80 ? 'good' : 'warning',
      color: sensors.humidity >= 60 && sensors.humidity <= 80 ? '#2EE6A8' : '#FFD93D'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold font-poppins text-foreground">
        Sensor Dashboard
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        {sensorData.map((sensor, index) => (
          <motion.div
            key={sensor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="farm-tile p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">{sensor.icon}</div>
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: sensor.color }}
              />
            </div>
            
            <div className="space-y-1">
              <div 
                className="text-xl font-bold"
                style={{ color: sensor.color }}
              >
                {sensor.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {sensor.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

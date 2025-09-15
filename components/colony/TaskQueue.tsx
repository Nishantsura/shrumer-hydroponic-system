"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '@/lib/schema';
import { useApp } from '@/contexts/app-context';

interface TaskQueueProps {
  tasks: Task[];
  colonyId: string;
}

export function TaskQueue({ tasks, colonyId }: TaskQueueProps) {
  const { completeTask, state } = useApp();
  
  // Get urgent tasks (high priority or critical)
  const urgentTasks = tasks.filter(task => 
    task.priority === 'critical' || task.priority === 'high'
  );
  
  // Get other pending tasks
  const otherTasks = tasks.filter(task => 
    task.status === 'pending' && task.priority !== 'critical' && task.priority !== 'high'
  );

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId, state.currentUser.id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#FF4757';
      case 'high': return '#FF6F3C';
      case 'medium': return '#FFD93D';
      case 'low': return '#2EE6A8';
      default: return '#6C757D';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'water': return '💧';
      case 'nutrient': return '🧪';
      case 'harvest': return '🌾';
      case 'maintenance': return '🔧';
      case 'refill': return '📦';
      default: return '✅';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold font-poppins text-foreground">
        Task Queue
      </h2>
      
      {/* Urgent Tasks */}
      {urgentTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-alert-orange">⚠️ Urgent Tasks</h3>
          {urgentTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="farm-tile p-4 border-l-4"
              style={{ borderLeftColor: getPriorityColor(task.priority) }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getTaskIcon(task.type)}</div>
                  <div>
                    <h4 className="font-semibold text-foreground">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span 
                        className="text-xs px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      >
                        {task.priority}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        +{task.xpReward} XP
                      </span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => handleCompleteTask(task.id)}
                  className="px-4 py-2 bg-neon-green text-dark-charcoal rounded-lg font-semibold text-sm hover:bg-neon-green/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Complete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Other Tasks */}
      {otherTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Other Tasks</h3>
          {otherTasks.slice(0, 3).map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: (urgentTasks.length + index) * 0.1 }}
              className="farm-tile p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-xl">{getTaskIcon(task.type)}</div>
                  <div>
                    <h4 className="font-medium text-foreground">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                    <span className="text-xs text-muted-foreground">
                      +{task.xpReward} XP
                    </span>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => handleCompleteTask(task.id)}
                  className="px-3 py-1 bg-card border border-border rounded-lg text-sm hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Do
                </motion.button>
              </div>
            </motion.div>
          ))}
          
          {otherTasks.length > 3 && (
            <div className="text-center">
              <button className="text-sm text-neon-green hover:text-neon-green/80 transition-colors">
                View {otherTasks.length - 3} more tasks
              </button>
            </div>
          )}
        </div>
      )}
      
      {tasks.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-muted-foreground">No pending tasks! Your colony is running smoothly.</p>
        </div>
      )}
    </div>
  );
}
